<template>
	<div class="auth-page">

		<!-- 
			========================
			========================
			Password Reset Form 
			========================
			========================
		-->
		<div class="auth-page-header">
			<h1>Forgot your password?</h1>
		</div>
		<form class="auth-form-body" @submit.prevent="resetPassword(); accountLoading = true">
			<!-- Email -->
			<div class="field">
				<input type="email" v-model="email" id="passwordResetEmail" placeholder=" " required>
				<label for="passwordResetEmail">Email Address</label>
			</div>

			<!-- Send password reset email -->
			<button class="button auth-button" type="submit" :disabled="email.length < 5 || accountLoading" aria-label="Reset Password">
				<span v-if="accountLoading">Loading</span>
				<span v-else>Reset Password</span>
				<i v-bind:class="{ 'fad fa-chevron-circle-right': !accountLoading, 'far fa-spinner-third fa-spin': accountLoading }"></i>
			</button>

			<!-- Forgot Password -->
			<div class="auth-bottom">
				<p>
					Nevermind,
					<router-link to="/signin">I know my password.</router-link>
				</p>
			</div>
		</form>

	</div>

	

</template>


<script>
import firebase from "firebase";
import toastMixin from "@/components/mixins/ui/toastMixin.js";
import metaMixin from "@/components/mixins/metaMixin.js";

export default {
	name: "passwordReset",
	mixins: [
		toastMixin,
		metaMixin
	],
	data() {
		return {
			email: "",
			// UI
			accountLoading: false
		};
	},
	created: function () {
		this.updateMeta("Reset Password", "This is the reset password page description.")
	},
	methods: {

		// Send password reset email
		// Done through firebase
		resetPassword: function(){
			let _this = this;
			var auth = firebase.auth();
			var emailAddress = _this.email;

			auth.sendPasswordResetEmail(emailAddress).then(function() {
				// Email sent.
				_this.toast("Check your email", "We sent you instructions for resetting your password.", "green", "far fa-envelope-open-text");
				_this.accountLoading = false;
				// Redirect to signin
				_this.$router.push("/signin")
			}).catch(function(error) {
				// An error happened.
				_this.accountLoading = false;
				_this.toast("Something went wrong", error.message, "red", "far fa-siren-on");
			});
		},
		
	}
};


</script>


<style lang="less">

	@import '~@/styles/variables.less';

</style>



