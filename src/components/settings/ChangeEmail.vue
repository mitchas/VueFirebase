<template>

	<div class="field-row">
		<!-- Label -->
		<label>Email Address:</label>
		<!-- Value -->
		<div class="field-body">
			{{$store.getters.userPreferences.email}}

			<!-- Edit email button -->
			<button class="edit-preference" @click="showChangeEmail()" v-bind:class="{ 'ignore': showEmailEditor}" aria-label="Change Email Address">
				<i class="far fa-pencil"></i>
			</button>

			<!-- Transition form to edit email in -->
			<transition name="basic">

				<form @submit.prevent="changeEmailAddress();" v-if="showEmailEditor" class="edit-setting-form">

					<!-- New email input -->
					<div class="field-row">
						<label for="newEmailAddress">New email address</label>
						<div class="field-body">
							<input type="email" v-model="newEmailAddress" id="newEmailAddress" required>
						</div>
					</div>


					<!-- Cancel and save buttons -->
					<div class="account-field-buttons">
						<!-- Cancel button -->
						<button class="button transparent" type="button" aria-label="Cancel Change Email" @click="closeChangeEmail()">
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
import toastMixin from "@/components/mixins/ui/toastMixin.js";
import firebase from "firebase";
import ReAuth from "@/components/settings/ReAuth";
import preferencesMixin from "@/components/mixins/preferencesMixin.js";

export default {
	name: "ChangeEmail",
	mixins: [
		toastMixin,
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
		// Change email address
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
				_this.savePrefs();
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