// Sign Out Mixin
// _________________________
//
// 	signout(): Simply signs user out of firebase, shows toast, redirects home

import firebase from "firebase";
// Mixins

export default {
	mixins: [
	],
	methods: {
		/////////////////////
		//    Sign Out    //
		///////////////////
		signout: function() {
			let _this = this;

			_this.$store.getters.hold.forecast = null;

			firebase.auth().signOut().then(() => {
				// Toast
				_this.toast("Goodbye", "You have been signed out!", "", "far fa-sign-out-alt");

				// Return home
				setTimeout(function(){
					_this.navigate("/");
				}, 500)
			});
		},
	}
};
