<!--
//  Sign In view
// _________________________
//
//  Loads authentican component with email and password field for signing in
// 
// 		signinUser()
// 			- Takes username and password and signs in with Firebase, toast if error
//
// 		signinSuccess()
// 			- Called after signinUser success - saves isSignedIn to store, redirects home or to previous URL
// 		
-->

<template>

	<AuthenticationPage
		header="Welcome Back"
		v-bind:disabled="email.length < 5 || !password.length" 
		v-bind:formBottom="['Need an account?', '/register/', 'Sign Up']"
		submitText="Sign In"
		v-bind:formLoading="accountLoading"
		@formSubmitted="signinUser()">

		<!-- Email Address -->
		<div class="auth-field">
			<label for="signinEmail">Email address</label>
			<input type="email" v-model="email" id="signinEmail" placeholder=" " required>
		</div>

		<!-- Password -->
		<div class="auth-field">
			<label for="signinPassword">
				Password
				<router-link class="help-link" to="/passwordreset" tabindex="-1">Forgot it?</router-link>
			</label>
			<input type="password" v-model="password" id="signinPassword" required>
		</div>

	</AuthenticationPage>


</template>


<script>
import firebase from "firebase";
import { db } from "@/store/firebase";
// Components
import AuthenticationPage from "@/components/user/AuthenticationPage";
// Mixins

export default {
	name: "signinRegister",
	mixins: [
	],
	components: {
		AuthenticationPage
	},
	data() {
		return {
			email: "",
			password: "",

			// UI
			accountLoading: false,
		};
	},
	created: function () {
	},
	watch: {
	},
	methods: {

		///////////////////////
		//// Sign In User ////
		/////////////////////
		signinUser: function() {
			let _this = this;
			_this.accountLoading = true;

			firebase
			.auth()
			.signInWithEmailAndPassword(this.email, this.password)
			.then(
				function() {
					console.log("Sign in successful");
					// Stop loading spinner on button
					_this.accountLoading = false;
					// Success function
					_this.signinSuccess();
				},
				function(err) {
					_this.accountLoading = false;
					_this.toast("Oops", "That email and password combination didn't work.", "red", "far fa-exclamation-circle");
				}	
			);
		},

		/////////////////////////////
		//// Sign In Successful ////
		///////////////////////////
		signinSuccess: function(){
			// Commit signed in ttoo store
			this.$store.commit('isSignedIn', true);
			console.log("N?ULL FORE")
			this.$store.getters.hold.forecast = null;
			console.log(this.$store.getters.hold.forecast)
			// Get stored value from redirect
			var redirectAfterLogin = this.$store.getters.loginRedirectURL;

			// Default behavior redirects home
			if(redirectAfterLogin == null || redirectAfterLogin == "" || redirectAfterLogin == " "){
				this.$router.push('/');
			}
			// If redirectAfterLogin exists from loginRedirectURL in store,
			// send user to that URL instetad.
			else{
				this.$router.push(redirectAfterLogin);
			}
		},
		
	}
};


</script>


<style lang="less">

	// @import '~@/styles/variables.less';
		
</style>



