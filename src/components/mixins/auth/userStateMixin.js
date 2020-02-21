// User State

import firebase from "firebase";
import { db } from "@/store/firebase";

import darkModeMixin from "@/components/mixins/ui/darkModeMixin.js";


export default {
	mixins: [
		darkModeMixin,
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
					_this.$store.commit('isSignedIn', true)
					_this.$store.commit('user', user)
					console.log("USER")
					console.log(user)

					// Commit user prefs to store
					var userPreferencesRef = db.collection("users").doc(user.uid);
					userPreferencesRef.get().then(function(doc) {
						if (doc.exists) {
							// If user exists, merge missing preferences with defaults
							var savedPrefs = doc.data();
							var defaultPrefs = {
								username: "",
								user_created: null,
								admin_level: 0,
								darkMode: false,
								email: _this.$store.getters.user.email,
								firebase_uid: _this.$store.getters.user.uid,
								animations:true
							}
							var merged = Object.assign({}, defaultPrefs, savedPrefs)

							// Save merged prefs to firebase if they're different
							if(savedPrefs != merged){
								db.collection("users").doc(user.uid).update(merged).then(() => {
									console.log('Successfully merged user prefs')
								}).catch(error => {
									console.log("There was an error merging user prefs.")
								});
							}

							// Commit merged prefs to store
							_this.$store.commit('userPreferences', merged)


							// If dark mode is true, set data-theme attribute,
							// Which will override their device settings
							// (Saved darkMode pref will always override device setting)
							if(merged.darkMode){
								document.documentElement.setAttribute('data-theme', 'dark');
							}else{ // Else set light
								document.documentElement.setAttribute('data-theme', 'light');
							}

							// Disable animations if saved pref
							if(merged.animations != null && !merged.animations){
								document.getElementsByTagName("body")[0].classList.add("no-animations");
							}

							// Get profile photo
							// Save to store
							var storageRef = firebase.storage().ref();
							storageRef.child("avi/" + user.uid + ".jpg").getDownloadURL().then(function(url) {
								// Commit profilePhoto to store
								_this.$store.commit("profilePhoto", url)
							}).catch(function(error) {
								console.log("Error getting profile photo url")
								console.log(error)
							});


						} else {console.log("No user data found!");}
					}).catch(function(error) {console.log("Error getting document:", error);});


				// Called on initial load and when user signs out
				// Logged out
				}else{
					_this.$store.commit('isSignedIn', false)
					_this.$store.commit('user', '')
					_this.$store.commit("profilePhoto", null)


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
						user_created: null,
						admin_level: 0,
						darkMode: currentDarkMode
					}
					_this.$store.commit('userPreferences', defaultPrefs)
				}
			});
		},
	}
};
