<!--
//  Change Email component
// _________________________
//
//  Simple .field element with text input to change email
// 		Buttons below to save or cancel the change
// 		Checks email format, then submits to firebase to change
// 		If user hasn't signed in recently, the ReAuth component is used to prompt user for their password again
// 
-->

<template>

	<div class="field">
		<!-- Label -->
		<label>Email Address</label>
		<!-- Value -->
		<div class="field-body">

			<div class="field-value">
				<div class="value">
					{{$store.getters.userPreferences.email}}
				</div>
				<div class="action">
					<!-- Change Email Button -->
					<button class="button small grey" @click="showChangeEmail()" aria-label="Change Email Address" v-if="!showEmailEditor">
						<i class="far fa-pencil"></i>
						<span>Change</span>
					</button>
				</div>
			</div>


			<!-- Transition form to edit email in -->
			<transition name="basic">

				<form @submit.prevent="changeEmailAddress();" v-if="showEmailEditor" class="card">
					<!-- New email input -->
					<div class="field">
						<label for="newEmailAddress">New email address</label>
						<div class="field-body">
							<input type="email" v-model="newEmailAddress" id="newEmailAddress" required>
						</div>
					</div>
					<!-- Cancel and save buttons -->
					<div class="card-buttons">
						<!-- Cancel button -->
						<button class="button grey" type="button" aria-label="Cancel Change Email" @click="closeChangeEmail()">
							<span>Cancel</span>
							<i class="far fa-times"></i>
						</button>
						<!-- Save button -->
						<button class="button" type="submit" :disabled="!newEmailAddress" aria-label="Change Email">
							<span v-if="changeEmailLoading">Loading</span>
							<span v-else>Change Email</span>
							<i v-bind:class="{ 'far fa-check': !changeEmailLoading, 'far fa-spinner-third fa-spin': changeEmailLoading }"></i>
						</button>
					</div>

				</form>
			</transition>

			<!-- Reauthentication Window -->
			<ReAuth v-if="showReAuth" v-on:authClosed="showReAuth = false" v-on:reauthenticated="changeEmailAddress()" ></ReAuth>

		</div>
	</div>

	
</template>

<script>
import firebase from "firebase";
// Components 
import ReAuth from "@/components/settings/ReAuth";
// Mixins
import preferencesMixin from "@/components/mixins/preferencesMixin.js";

export default {
	name: "ChangeEmail",
	mixins: [
		preferencesMixin,
	],
	components: {
		ReAuth
	},
	data() {
		return {
			newEmailAddress: "",
			showEmailEditor: false,
			changeEmailLoading: false,
			showReAuth: false
		};
	},
	methods: {
		//////////////////////////
		//    Change email     //
		////////////////////////
		changeEmailAddress: function(){

			let _this = this;

			_this.changeEmailLoading = true;

			var user = firebase.auth().currentUser;

			// Update password
			user.updateEmail(_this.newEmailAddress).then(function() {
				// Update successful.
				_this.toast("Success!", "Your email address has been changed.", "green", "far fa-asterisk");
				// Set and save in store
				_this.$store.getters.userPreferences.email = _this.newEmailAddress;
				_this.savePreferences();
				// Close & reset modal
				_this.closeChangeEmail();
			}).catch(function(error) {
				// An error occured.
				console.log("Error Changing Password:")
				console.log(error);
				// If requires reauthentication
				if(error.code == "auth/requires-recent-login"){
					_this.showReAuth = true;
					_this.changeEmailLoading = false;
					_this.showEmailEditor = false;
					_this.toast("Let's make sure it's you", "Enter your password, then try that again.", "yellow", "fal fa-user-secret");
				}else{
					// Other errors
					_this.toast("Oops.", error.message, "red", "far fa-exclamation-circle");
				}
			});
		},
		// Close modal to change email
		showChangeEmail: function(){
			this.showEmailEditor = true;
			this.newEmailAddress = this.$store.getters.userPreferences.email;
		},
		// Close modal to change email
		closeChangeEmail: function(){
			this.changeEmailLoading = false;
			this.showEmailEditor = false;
			this.newEmailAddress = "";
		}

	}
};
</script>

<style lang="less">

</style>