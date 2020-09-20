<!--
//  Change Username component
// 	NOT CURRENTLY UED
// 	SO MAYBE IT DOESNT WORK ANYMORE?
// _________________________
//
//  Simple .field element with inputs to change username
// 		Checks username against taken usernames, shows error
// 
-->


<template>
	<div class="field">
		<!-- Label -->
		<div>Username:</div>
		<!-- Value -->
		<div class="field-body">
			{{$store.getters.userPreferences.username}}

			<!-- Edit username button -->
			<transition name="basic">
				<button class="button grey small mleft-xs" @click="showChangeUsername()" v-if="!showUsernameEditor" aria-label="Change Username">
					<i class="far fa-pencil"></i>
					<span>Change</span>
				</button>
			</transition>


			<transition name="basic">

				<form @submit.prevent="validateUsername();" v-if="showUsernameEditor" class="edit-setting-form">

					<!-- New username input -->
					<div class="field">
						<label>New username</label>
						<div class="field-body">
							<input type="text" v-model="newUsername" id="newUsername" required>
						</div>
					</div>

					<!-- Cancel & Save button -->
					<div class="account-field-buttons">
						<!-- Cancel button -->
						<button class="button grey" type="button" aria-label="Cancel Change Username" @click="closeChangeUsername()">
							<span>Cancel</span>
							<i class="far fa-times"></i>
						</button>
						<!-- Save button -->
						<button class="button" type="submit" :disabled="!newUsername" aria-label="Change Username">
							<span v-if="changeUsernameLoading">Loading</span>
							<span v-else>Check Username</span>
							<i v-bind:class="{ 'far fa-user-check': !changeUsernameLoading, 'far fa-spinner-third fa-spin': changeUsernameLoading }"></i>
						</button>
					</div>

					<!-- Errors for usernames -->
					<div class="username-warnings" v-if="newUsernameInvalidLength || newUsernameInvalidCharacters || newUsernameTaken">
						<!-- Too long or short - max 30, min 3 -->
						<div class="warning" v-if="newUsernameInvalidLength">
							It has to be at least 3 characters, max 30.
						</div>
						<!-- Taken -->
						<div class="warning" v-if="newUsernameTaken">
							That username is already taken.
						</div>
						<!-- Invalid chars -->
						<div class="warning" v-if="newUsernameInvalidCharacters">
							You can only use letters, numbers, and hyphens.
						</div>
					</div>


				</form>
			</transition>



		</div>
	</div>

	
</template>

<script>
import firebase from "firebase";
import { db } from "@/store/firebase";
// Mixins
import preferencesMixin from "@/components/mixins/preferencesMixin.js";

export default {
	name: "ChangeUsername",
	mixins: [
		preferencesMixin,
	],
	components: {
	},
	data() {
		return {
			newUsername: "",
			showUsernameEditor: false,
			changeUsernameLoading: false,

			newUsernameInvalidCharacters: false,
			newUsernameInvalidLength: false,
			newUsernameTaken: false,
		};
	},
	methods: {
		// Verify username is able to be changed
		// Length, chars, taken, etc
		validateUsername: function(){



			// If username exists and is at least 3 chars
			if(this.newUsername.length && this.newUsername.length >= 3 && this.newUsername.length <= 30){
				let _this = this;
				// Valid length
				_this.newUsernameInvalidLength = false;

				// Only numbers, letters, hyphen allowed
				if(/^[aA-zZ0-9-]+$/g.test(_this.newUsername)){
					// Valid
					_this.newUsernameInvalidCharacters = false;


					// Check username against existing username
					var docRef = db.collection("businessurls").doc(_this.newUsername);
					docRef.get().then(function(doc) {
						if (doc.exists) {
							// User exists
							_this.newUsernameTaken = true;
						} else {
							// User doesn't exist
							_this.newUsernameTaken = false;
							_this.saveValidUsername();
						}
					}).catch(function(error) {console.log("Error getting document:", error);});

				}else{
					// Invalid characters
					_this.newUsernameInvalidCharacters = true;
				}
			}else{
				// Invalid Length
				_this.newUsernameInvalidLength = true;
			}


		},
		// Save username to firebase
		saveValidUsername: function(){
			let _this = this;
			_this.changeUsernameLoading = true;

			var uid = _this.$store.getters.user.uid;

			// Update username doc for lookup later
			var usernameChange = {
				uid: uid
			};
			db.collection("businessurls").doc(_this.newUsername).set(usernameChange, { merge: true }).then(() => {
				console.log('Successfully updated username')
				_this.toast("Success!", "You are now the user formerly known as " + _this.$store.getters.userPreferences.username, "", "far fa-guitar-electric");

				// Save in store
				_this.$store.getters.userPreferences.username = _this.newUsername;

				// Close editor
				_this.changeUsernameLoading = false;
				_this.closeChangeEmail();

			}).catch(error => {
				console.error('There was an error editing username: ' + error)
			})

		},
		// Close modal to change email
		showChangeUsername: function(){
			this.showUsernameEditor = true;
			this.newUsername = this.$store.getters.userPreferences.username;
		},
		// Close modal to change email
		closeChangeUsername: function(){
			this.changeUsernameLoading = false;
			this.showUsernameEditor = false;
			this.newUsername = this.$store.getters.userPreferences.username;
			this.newUsernameTaken = false;
			this.newUsernameInvalidLength = false;
			this.newUsernameInvalidCharacters = false;
		},
	}
};
</script>

<style lang="less">

	@import '~@/styles/variables.less';

	.username-warnings{
		display: block;

		.warning{
			display: block;
			background-color: var(--yellow);
			font-size: 12px;
			padding: 10px 5px;
			border-radius: var(--borderRadiusSmall);
			font-weight: 500;
			letter-spacing: 0.3px;
			line-height: 14px;
			text-align: center;
			margin: 10px auto 0 auto;
		}
	}
</style>