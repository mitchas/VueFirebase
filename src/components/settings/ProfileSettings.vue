<template>
	<form class="profile-settings" @submit.prevent="saveProfile()">
		
		<!-- 
			Photo 
			Photo 
			Photo 
		-->
		<div class="field-row">
			<!-- Display profile photo -->
			<!-- Label elements so you can click them and trigger file upload window -->
			<label for="uploadProfilePhoto" class="profile-photo" v-bind:style="'background-image: url(' + $store.getters.profilePhoto + ');'" v-if="$store.getters.profilePhoto"></label>
			<label for="uploadProfilePhoto" class="profile-photo empty" v-if="!$store.getters.profilePhoto"></label>
			<!-- Upload new file -->
			<div class="field-body mtop-xs">
				<button for="uploadProfilePhoto" id="uploadProfilePhotoButton" class="button" tabindex="1" aria-label="Upload new profile photo">
					<span v-if="!photoUploading">
						Select photo
						<i class="far fa-image-polaroid"></i>
					</span>
					<span v-else>
						Uploading...
						<i class="far fa-spinner-third fa-spin"></i>
					</span>
				</button>
				<input type="file" id="uploadProfilePhoto" @change="uploadPhoto" hidden/>
			</div>
		</div>

		<!-- Enable Profile -->
		<div class="setting-toggle mtop-xs">
			<div class="setting-toggle-input">
				<input id="enableProfileToggle" type="checkbox" class="toggle" v-model="userProfile.profile_enabled" @change="toggleProfile()"/>
			</div>
			<label class="setting-toggle-label" for="animationToggle">
				Enable Public Profile
				<small>Toggle whether people can access your public profile.</small>
			</label>
		</div>

		<!-- Profile fields -->
		<!-- Only visible if public profile is enabled -->
		<transition name="basic">
			<div v-if="userProfile.profile_enabled">

				<!-- Privacy Warrning -->
				<p>
					This information - all completely optional - is available on <router-link v-bind:to="'/user/' + $store.getters.userPreferences.username">your profile</router-link> for anyone to see.
				</p>


				<!-- 
					Name 
					Name 
					Name 
				-->
				<div class="field-row">
					<label>Name:</label>
					<div class="field-body">
						<input type="text" v-model="userProfile.display_name" @keydown="profileChanges = true"/>
					</div>
				</div>
				<!-- 
					Bio 
					Bio 
					Bio 
				-->
				<div class="field-row">
					<label>About you:</label>
					<div class="field-body">
						<textarea v-model="userProfile.bio" @keydown="profileChanges = true"></textarea>
					</div>
				</div>

				<!-- 
					Save changes 
					Save changes 
					Save changes 
				-->
				<button type="submit" class="button save-setting-button" :disabled="!profileChanges">
					<span>Save Changes</span>
					<i class="far fa-user-check"></i>
				</button>

			</div>
		</transition>
		
	</form>

	
</template>

<script>
import toastMixin from "@/components/mixins/ui/toastMixin.js";
import firebase from "firebase";
import navigateMixin from "@/components/mixins/navigateMixin.js";
import { db } from "@/store/firebase";

export default {
	name: "ProfileSettings",
	mixins: [
		toastMixin,
	],
	components: {
	},
	data() {
		return {
			userProfile: {},
			profileChanges: false,
			photoUploading: false,
		};
	},
	created() {
		this.getUserProfile();
	},
	methods: {
		// ///////////////
		// Profile
		// ///////////////
		// Get user profile from firestore
		getUserProfile: function(){
			let _this = this;

			db.collection("profiles").doc(_this.$store.getters.userPreferences.firebase_uid).get().then(function(doc) {
				if (doc.exists) {
					_this.userProfile = doc.data();
				} else {console.log("No profile found")}
			}).catch(function(error) {console.log("Error getting document:", error);});
		},
		// Save profile changes to firestore
		saveProfile: function(){
			let _this = this;

			db.collection("profiles").doc(_this.$store.getters.userPreferences.firebase_uid).set(_this.userProfile, { merge: true }).then(() => {
				console.log('Successfully updated profile')
				_this.toast("Profile updated", "Your profile changes have been saved. ", "", "far fa-user-check");
				// Reset disabled button
				_this.profileChanges = false;
			}).catch(error => {
				_this.toast("Error", error.message, "", "far fa-user-times");
			})
		},
		// Toggle enable/disable profile
		toggleProfile: function(){
			let _this = this;

			var toggleState = "enabled"
			// Default to true
			var profileState = {profile_enabled: true}
			// If profile not enabled, or if field doesn't exist
			if(!_this.userProfile.profile_enabled){
				toggleState = "disabled"
				profileState = {profile_enabled: false}
			}

			console.log("your profile has been  " + toggleState)

			db.collection("profiles").doc(_this.$store.getters.userPreferences.firebase_uid).set(profileState, { merge: true }).then(() => {
				console.log('Successfully toggled profile to ' + toggleState)
				_this.toast("Profile " + toggleState, "Your public profile has been " + toggleState, "", "far fa-user");
				// Reset disabled button
			}).catch(error => {
				_this.toast("Error", error.message, "", "far fa-user-times");
			})

		},

		// ///////////////
		// Photo
		// ///////////////
		uploadPhoto: function(event){
			let _this = this;

			// Photo uploading
			_this.photoUploading = true;

			// Save file to firebase storage at /avi/uid.jpg
			var storageRef = firebase.storage().ref();
			var profilePhotoRef = storageRef.child("avi/" + _this.$store.getters.userPreferences.firebase_uid + ".jpg");

			var file = event.target.files[0];
			// Get file size (bytes / 1024 = kb / 1024 = mb)
			var fileSize = (file.size/1024)/1024
			console.log(parseFloat(fileSize))
			// Restrict file size to 3mb
			if(parseFloat(fileSize) > 2.0){
				_this.toast("File too large", "Your image must be smaller than 2mb in size", "red", "far fa-file-times");
				_this.photoUploading = false;
			}else{
				profilePhotoRef.put(file).then(function(snapshot) {
					// Success toast
					_this.toast("Photo updated", "Your profile photo has been changed. ", "", "far fa-camera-alt");

					// Save to store
					snapshot.ref.getDownloadURL().then(function(downloadURL) {
						_this.$store.commit("profilePhoto", downloadURL + "?=" + Math.random().toString(36).substring(7))
					});
					// Done uploading
					_this.photoUploading = false;
				}).catch((error) => {
					console.log("Error uploading photo")
					console.log(error)
					_this.toast("Error", error.message, "red", "far fa-user-times");
					// Done uploading
					_this.photoUploading = false;
				})
			}

			

		},
	}
};
</script>

<style lang="less">
	@import '~@/styles/variables.less';

	textarea{
		width: 100%;
		height: 120px;
	}

	// If public profile is disabled, profile fields can be disabled
	.profile-disabled{
		opacity: 0.2;
	}

	// Full width inputs on mobile
	.field-row input{
		@media (max-width: @screenSM) {
			width: 100%;
		}
	}

	// Profile photo
	.profile-photo{
		display: block;
		width: 140px;
		height: 140px;
		border-radius: 50%;
		background-size: cover;
		margin: 0 0 8px 0;
		box-sizing: border-box;
		transition: var(--transition);
		background-blend-mode: multiply;
		background-color: transparent;

		// Center mobile
		@media (max-width: @screenSM) {
			margin: 0 auto 8px auto;
		}

		// No profile photo
		&.empty{
			background-color: var(--inputBackground);
			border: 1px solid var(--border);

			&:after{
				content: '\f332';
				font-size: 48px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				height: 100%;
				text-align: center;
				box-sizing: border-box;
				padding-bottom: 5px;
				color: var(--text);
				opacity: 0.2;
				font-family: var(--fontAwesome);
			}
		}

		// Hover, pointer
		&:hover{
			cursor: pointer;
			transition: var(--transition);
			background-color: rgba(10,30,50,0.05);
		}
		
	}

	#uploadProfilePhotoButton{
		@media (max-width: @screenSM) {
			margin: 0 auto 0 auto;
			display: block;
		}
	}
</style>