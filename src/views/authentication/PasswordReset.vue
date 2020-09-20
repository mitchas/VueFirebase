<!--
//  Password reset view
// _________________________
//  Loads authentican cmponent with single field for email address for resetting password
// 
// 		resetPassword()
// 			- Sends email to user with instructions for resetting password (Through firebase, no custom page)
// 			- Toast on fail
// 		
-->
<template>

	<AuthenticationPage
		header="Forgot your Password?"
		v-bind:disabled="email.length < 5" 
		v-bind:formBottom="['Nevermind,', '/signin/', 'I know my password.']"
		submitText="Reset Password"
		v-bind:formLoading="accountLoading"
		@formSubmitted="resetPassword()">

		<!-- Email -->
		<div class="field">
			<label for="passwordResetEmail">Email address</label>
			<div class="field-body">
				<input type="email" v-model="email" id="passwordResetEmail" placeholder=" " required>
			</div>
		</div>

	</AuthenticationPage>

</template>


<script>
import firebase from "firebase";
// Components
import AuthenticationPage from "@/components/user/AuthenticationPage";
// Mixins

export default {
	name: "passwordReset",
	mixins: [
	],
	components: {
		AuthenticationPage,
	},
	data() {
		return {
			email: "",
			// UI
			accountLoading: false
		};
	},
	created: function () {
	},
	methods: {

		//////////////////////////////////////////
		//// Password Reset through Firebase ////
		//////////////////////////////////////////
		resetPassword: function(){
			let _this = this;
			var auth = firebase.auth();
			var emailAddress = _this.email;

			auth.sendPasswordResetEmail(emailAddress).then(function() {
				console.log("Password Reset email sent.");
			}).catch(function(error) {
				console.log(error);
			});
			// Email sent.
			_this.toast("Check your email", "We'll send you instructions if there's an account under that address.", "green", "far fa-envelope-open-text");
			_this.accountLoading = false;
			// Redirect to signin
			_this.$router.push("/signin")
		},
		
	}
};

</script>


<style lang="less">

	// @import '~@/styles/variables.less';

</style>



