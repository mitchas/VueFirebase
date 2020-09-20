// User State Mixin
// _________________________
//
// 	userStateCheck(): called on app create, checks if user is already signed in
// 			Gets user data from firebase if signed in
// 			Applies saved preferences where necessary (for example, disabling animations if user has them turned off)
// 			
// 			For all users, signed in or not, it sets theme mode (from firebase prefs, or device settings if not signed in)
// 
// 			Sets isSignedIn variable to true or false

import firebase from "firebase";
import { db } from "@/store/firebase";
// Mixins
import preferencesMixin from "@/components/mixins/preferencesMixin.js";

export default {
	mixins: [
		preferencesMixin,
	],
	methods: {
		//////////////////////////////
		//    User State Change    //
		////////////////////////////
		userStateCheck: function(darkModeEnabled){
			let _this = this;


			// Firebase auth state change
			firebase.auth().onAuthStateChanged((user) => {

				// If someone signed in
				if(user){
					console.log("User:")
					console.log(user)

					// Load preferences from firestore, commit to vue store
					var userPreferencesRef = db.collection("users").doc(user.uid);
					userPreferencesRef.get().then(function(doc) {
						// If user has prefs saved
						if (doc.exists) {
							// If user exists, merge missing preferences with defaults
							var savedPrefs = doc.data();

							// Commit merged prefs to store
							_this.$store.commit('userPreferences', savedPrefs)
							console.log("User preferences")
							console.log(savedPrefs)
						} else {console.log("No user data found!");}

					}).catch(function(error) {console.log("Error getting document:", error);});

					// User has now signed in and fully loaded 
					_this.$store.commit('isSignedIn', true)
					_this.$store.commit('user', user)

				// Called on initial load and when user signs out
				// Logged out
				}else{

					// This will check for device dark mode and toggle it
					// Detect dark mode - if dark, enable dark
					// Otherwise default to theme before logout or light
					var currentDarkMode;
					if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
						currentDarkMode = true;
						_this.toggleDarkMode(true);
					}else{
						// Else set to false, which makes default theme light
						currentDarkMode = false;
						_this.toggleDarkMode(false);
					}

					// Set non-user preferences they can toggle
					var defaultPrefs = {
						username: "",
						location: {
							area_codes: "612",
							county: "Hennepin County",
							estimated_population: 9201,
							latitude: 44.96,
							longitude: -93.26,
							primary_city: "Minneapolis",
							region: "Metro",
							type: "STANDARD",
							unacceptable_cities: null,
							acceptable_cities: null
						},
						ui: {
							dark_mode: currentDarkMode,
						},
						meta: {
							new_user: false,
						},
						endpoints: {
							forecast: "https://api.weather.gov/gridpoints/MPX/108,70/forecast",
							forecast_grid_data: "https://api.weather.gov/gridpoints/MPX/108,70",
							forecast_hourly: "https://api.weather.gov/gridpoints/MPX/108,70/forecast/hourly",
							observation_stations: "https://api.weather.gov/gridpoints/MPX/108,70/stations",
						},
					}
					_this.$store.commit('userPreferences', defaultPrefs)

					// User is loaded
					_this.$store.commit('isSignedIn', false)
					_this.$store.commit('user', '')
				}

				// Set prefs
				_this.setPrefs();

			});
		},

		//////////////////////
		// Set Preferences //
		////////////////////
		// Call this function to set preferences on UI based on value
		setPrefs: function(){
			// Start Page
			// Save device info
			var deviceProps = this.$store.getters.device;

			// Touch Screen
			if(('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
				deviceProps.hasTouch = true;
			}
			// Standalone mode
			if (window.matchMedia('(display-mode: standalone)').matches) {
				deviceProps.standalone = true;

				// user is opening for first time after install - track it, then update pref so it doesn't track again
				if(!this.$store.getters.userPreferences.meta.pwa_installed){
					// _paq.push(['trackEvent', 'Action', 'Install', "PWA"]);
					this.$store.getters.userPreferences.meta.pwa_installed = true;
				}
				
			}
			// Save back to store
			this.$store.commit('device', deviceProps);

			// Dark mode
			if(this.$store.getters.userPreferences.ui.darkMode){
				document.documentElement.setAttribute('data-theme', 'dark');
			}else{ // Else set light
				document.documentElement.setAttribute('data-theme', 'light');
			}
	
			// Animations
			if(this.$store.getters.userPreferences.ui.animations != null && !this.$store.getters.userPreferences.ui.animations){
				document.getElementsByTagName("body")[0].classList.add("no-animations");
			}else{
				document.getElementsByTagName("body")[0].classList.remove("no-animations");
			}
	
			// App Version
			// Get prefs from local storage
			// Local storage instead of firebase because it's browser dependent.
			var userAppVersion = "0";
			if (localStorage.getItem('tmn_app_version')){
				userAppVersion = localStorage.getItem('tmn_app_version');
			}

			var latestAppVersion = this.$store.getters.hold.appVersion;

			// Strip periods and parse into to compare numbers
			userAppVersion = parseInt(userAppVersion.replace(/\D/g,''));
			// Create new var for latest int so regular x.x.x format can be stored.
			var latestVersionInt = parseInt(latestAppVersion.replace(/\D/g,''));

			// If user's version is lower than latest
			// If userAppVersion is 0 - they just visited for the first time
			if(userAppVersion < latestVersionInt){
				// Update version in local storage
				localStorage.setItem('tmn_app_version', latestAppVersion);

				// Tell them about the update if it's not their first visit - default v for new users is 0
				if(userAppVersion > 0){
					var _this = this;
					setTimeout(function(){
						_this.hello("ABCDEFG updated to v" + latestAppVersion + "", "fas fa-sparkles")
					}, 500)
				}
				
			}

			// Get profile photo
			// Save to store
			// var storageRef = firebase.storage().ref();
			// storageRef.child("avi/" + user.uid + ".jpg").getDownloadURL().then(function(url) {
			// 	// Commit profilePhoto to store
			// 	_this.$store.commit("profilePhoto", url)
			// }).catch(function(error) {
			// 	console.log("Error getting profile photo url")
			// });

		},
	}
};
