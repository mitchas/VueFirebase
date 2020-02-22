<template>
	<div>
		<form id="passwordChange" @submit.prevent="changePassword()">
			<!-- New Password -->
			<div class="basic-field">
				<label for="newPassword">New password</label>
				<div class="field-body">
					<input type="password" v-model="newPassword" id="newPassword" placeholder=" " required>
				</div>
			</div>
			<!-- Verify Password -->
			<div class="basic-field">
				<label for="verifyNewPassword">Retype new password</label>
				<div class="field-body">
					<input type="password" v-model="verifyNewPassword" id="" placeholder=" " required>
				</div>
			</div>
			<!-- Save New Password -->
			<button type="submit" class="button save-setting-button" :disabled="newPassword.length < 6 || newPassword != verifyNewPassword">
				<span>Save Password</span>
				<i class="far fa-lock-alt"></i>
			</button>
			<!-- Show errors -->
			<div class="password-error">
				<!-- If passwords dont match -->
				<span v-if="(verifyNewPassword.length >= newPassword.length) && verifyNewPassword != newPassword">
					Your passwords don't match
				</span>
				<!-- If password too short -->
				<span v-if="newPassword.length > 0 && newPassword.length < 6 && verifyNewPassword.length > 0">
					Your password must be at least 6 characters.
				</span>
			</div>
		</form>


		<!-- Reauthentication Window -->
		<ReAuth v-if="showReAuth" v-on:authClosed="showReAuth = false" v-on:reauthenticated="changePassword()" ></ReAuth>

	</div>
</template>

<script>
import ReAuth from "@/components/settings/ReAuth";
import toastMixin from "@/components/mixins/ui/toastMixin.js";
import firebase from "firebase";

export default {
	name: "ChangePassword",
	mixins: [
		toastMixin
	],
	components: {
		ReAuth
	},
	data() {
		return {
			newPassword: '',
			verifyNewPassword: '',
			showReAuth: false
		};
	},
	methods: {

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

		// Submit button
		button{
			margin-top: 12px;
		}

		.password-error{
			display: block;
			box-sizing: border-box;
			padding: 4px 0 0 0;

			span{
				text-align: left;
				font-size: 11.5px;
				font-weight: 500;
				letter-spacing: 0.2px;
				color: var(--red);
			}
		}

	}
	
</style>