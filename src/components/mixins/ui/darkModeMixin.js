// Dark Mode mixin
import firebase from "firebase";
import { db } from "@/store/firebase";
import preferencesMixin from "@/components/mixins/preferencesMixin.js";

export default {
	methods: {
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
					document.documentElement.setAttribute('data-theme', 'light');
				}else{
					document.documentElement.setAttribute('data-theme', 'dark');
				}
			}

		},
	}
};
