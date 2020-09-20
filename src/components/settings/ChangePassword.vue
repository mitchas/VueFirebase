<!--
//  Password Email component
// _________________________
//
//  Simple form element with two password inputs to change password
// 		Button below to update password
// 		Checks if passwords patch, then submits to firebase to change
// 		If user hasn't signed in recently, the ReAuth component is used to prompt user for their password again
// 
// 		changePassword()
// 			Sends password to firebase to update
// 			Toast whether results successful or not
// 
-->

<template>
	<div>
		<form id="passwordChange" @submit.prevent="changePassword()">
			<!-- New Password -->
			<div class="field">
				<label for="newPassword">New password</label>
				<div class="field-body">
					<input type="password" v-model="newPassword" id="newPassword" placeholder=" " required>
				</div>
			</div>
			<!-- Verify Password -->
			<div class="field mtop-xs">
				<label for="verifyNewPassword">Retype new password</label>
				<div class="field-body">
					<input type="password" v-model="verifyNewPassword" id="" placeholder=" " required>
				</div>
			</div>
			
			<!-- Show errors -->
			<!-- No match -->
			<transition name="basic">
				<Callout
					v-if="(verifyNewPassword.length >= newPassword.length) && verifyNewPassword != newPassword"
					icon="far fa-exclamation-circle"
					class="mtop-sm"
					color="red"
					size="narrow">
					<span>Those passwords don't match.</span>
				</Callout>
			</transition>
			<!-- Not long enough -->
			<transition name="basic">
				<Callout
					v-if="newPassword.length > 0 && newPassword.length < 6 && verifyNewPassword.length > 0"
					icon="far fa-exclamation-circle"
					class="mtop-sm"
					color="red"
					size="narrow">
					<span>Your password must be at least 6 characters.</span>
				</Callout>
			</transition>

			<!-- Save New Password -->
			<button type="submit" class="button mtop-sm" :disabled="newPassword.length < 6 || newPassword != verifyNewPassword">
				<span>Save Password</span>
				<i class="far fa-lock-alt"></i>
			</button>
		</form>


		<!-- Reauthentication Window -->
		<ReAuth v-if="showReAuth" v-on:authClosed="showReAuth = false" v-on:reauthenticated="changePassword()" ></ReAuth>

	</div>
</template>

<script>
import firebase from "firebase";
// Components
import ReAuth from "@/components/settings/ReAuth";
import Callout from "@/components/ui/Callout";
// Mixins

export default {
	name: "ChangePassword",
	mixins: [
	],
	components: {
		ReAuth,
		Callout,
	},
	data() {
		return {
			newPassword: '',
			verifyNewPassword: '',
			showReAuth: false
		};
	},
	methods: {
		////////////////////////////
		//    Change Password    //
		//////////////////////////

		changePassword: function(){

			let _this = this;

			var user = firebase.auth().currentUser;

			// Update password
			user.updatePassword(this.newPassword).then(function() {
				// Update successful.
				_this.toast("Hey, it worked!", "Your password has been changed. Don't forget it!", "green", "far fa-asterisk");
				_this.newPassword = "";
				_this.verifyNewPassword = "";
			}).catch(function(error) {
				// An error occured.
				console.log("Error Changing Password:")
				console.log(error);
				// If requires reauthentication
				if(error.code == "auth/requires-recent-login"){
					_this.showReAuth = true;
					// _this.toast("Let's make sure it's you", "Enter your password, then try that again.", "yellow", "fal fa-user-secret");
				}else{
					// Other errors
					_this.toast("Oops.", error.message, "red", "far fa-exclamation-circle");
				}
			});
		}
	}
};
</script>

<style lang="less">

	@import '~@/styles/variables.less';

	#passwordChange{
		display: block;
		max-width: 260px;

		// Full width mobile
		@media (max-width: @screenSM) {
			width: 100%;
			max-width: none;
		}
	}
	
</style>