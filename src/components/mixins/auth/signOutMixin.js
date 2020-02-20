// Sign out mixin
import firebase from "firebase";

export default {
	methods: {
		/////////////////////
		//    Sign Out    //
		///////////////////
		signout: function() {
			firebase.auth().signOut().then(() => {
				
				// Return home
				this.$router.replace("/");
			});
		},
	}
};
