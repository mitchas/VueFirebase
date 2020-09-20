// Preferences mixin
// Methods for managing user preferences
// _________________________
//
// 	savePreferences(): saves current preferences object to firebase if user is signed in, otherwise nothing
// 
// 	toggleDarkMode(mode): sets browser theme
// 			mode true/false can be passed, but is optional. Default is toggle
// 			If user is signed in, it'll call savePreferences() to save their change to firebase
// 
// 	toggleAnimations(mode): toggles UI animations
// 			If user is signed in, it'll call savePreferences() to save their change to firebase
// 

import { db } from "@/store/firebase";

export default {
	methods: {
		////////////////////////////////////
		// Save preferences to firestore //
		//////////////////////////////////
		savePreferences: function(){
			let _this = this;

			// Save preferences to Firebase
			setTimeout(function(){
				// Only if user is signed in
				if(_this.$store.getters.isSignedIn){
					var uid = _this.$store.getters.user.uid;
					var preferences = _this.$store.getters.userPreferences;

					db.collection("users").doc(uid).set(preferences, { merge: true }).then(() => {
						console.log('Successfully updated user preferences')
					}).catch(error => {
						console.error('There was an error editing preferences:s ' + error)
					})
				}
			}, 500)

		},

		/////////////////////////////
		//    Dark Mode Toggle    //
		///////////////////////////
		toggleDarkMode: function(mode){
			var _this = this;

			var dark = function(){
				document.documentElement.setAttribute('data-theme', 'dark');
				_this.$store.getters.userPreferences.ui.dark_mode = true;
				document.querySelector('meta[name="theme-color"]').setAttribute('content',  '#07070f');
			}
			var light = function(){
				document.documentElement.setAttribute('data-theme', 'light');
				_this.$store.getters.userPreferences.ui.dark_mode = false;
				document.querySelector('meta[name="theme-color"]').setAttribute('content',  '#483BF3');
			}

			// If true/false argument passed
			if(mode != null){
				// If true, turn on
				if(mode){
					dark()
				}else{
					light()
				}

			}else{
				// Else simply toggle it
				if(!_this.$store.getters.userPreferences.ui.dark_mode){
					dark()
				}else{
					light()
				}
			}

			// Save preferences to Firebase
			_this.savePreferences();
		},
		////////////////////////
		// Toggle animations //
		//////////////////////
		toggleAnimations: function(){
			
			// Toggle no-animations class on body tag to toggle them
			if(this.$store.getters.userPreferences.ui.animations){
				// Turn animations back on
				document.getElementsByTagName("body")[0].classList.remove("no-animations");
			}else{
				// Turn animations off with no-animations class on body
				document.getElementsByTagName("body")[0].classList.add("no-animations");
			}

			// Save preferences to Firebase
			this.savePreferences();
		}
	}
};
