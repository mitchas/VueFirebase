// Peferences Mixin
import firebase from "firebase";
import { db } from "@/store/firebase";


export default {
	methods: {
		//////////////////////////////
		// Save prefs to firestore //
		////////////////////////////
		savePrefs: function(){
			// Only if user is signed in
			if(this.$store.getters.isSignedIn){
				var uid = this.$store.getters.user.uid;
				var prefs = this.$store.getters.userPreferences;

				db.collection("users").doc(uid).set(prefs, { merge: true }).then(() => {
					console.log('Successfully updated user prefs')
				}).catch(error => {
					console.error('There was an error editing prefs: ' + error)
				})
			}
		},
		/////////////////////////////
		//    Dark Mode Toggle    //
		///////////////////////////
		toggleDarkMode: function(mode){

			// If true/false argument passed
			if(mode != null){
				// If true, turn on
				if(mode){
					document.documentElement.setAttribute('data-theme', 'dark');
				}else{
					document.documentElement.setAttribute('data-theme', 'light');
				}

			}else{
				// Else simply toggle it
				if(this.$store.getters.userPreferences.darkMode){
					document.documentElement.setAttribute('data-theme', 'dark');
				}else{
					document.documentElement.setAttribute('data-theme', 'light');
				}
			}
			// Save dark mode pref to Firebase
			this.savePrefs();

		},
		////////////////////////
		// Toggle animations //
		//////////////////////
		toggleAnimations: function(){
			
			// Toggle no-animations class on body tag to toggle them
			if(this.$store.getters.userPreferences.animations){
				// Turn animations back on
				document.getElementsByTagName("body")[0].classList.remove("no-animations");
			}else{
				// Turn animations off with no-animations class on body
				document.getElementsByTagName("body")[0].classList.add("no-animations");
			}

			// Save animations pref to Firebase
			this.savePrefs();
		}
	}
};
