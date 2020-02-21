<template>
	<form class="profile-settings" @submit.prevent="saveProfile()">
		<p>
			This information, if provided, is available on <router-link v-bind:to="'/user/' + $store.getters.userPreferences.username">your profile</router-link> for anyone to see.
		</p>
		<!-- Photo -->
		<div class="setting-row">
			<!-- Display profile photo -->
			<div class="profile-photo" v-bind:style="'background-image: url(' + $store.getters.profilePhoto + ');'" v-if="$store.getters.profilePhoto"></div>
			<div class="profile-photo empty" v-if="!$store.getters.profilePhoto"></div>
			<!-- Upload new file -->
			<div class="setting-value">
				<label for="uploadProfilePhoto" id="uploadProfilePhotoButton" class="button" tabindex="1" aria-label="Upload new profile photo">
					<div>
						<span v-if="!photoUploading">Select photo</span>
						<span v-if="photoUploading">Uploading...</span>
						<i class="far fa-image-polaroid"></i>
					</div>
				</label>
				<input type="file" id="uploadProfilePhoto" @change="uploadPhoto" hidden/>
			</div>
		</div>
		<!-- Bio -->
		<div class="setting-row mtop-xs">
			<label>About you:</label>
			<div class="setting-value">
				<textarea v-model="userProfile.bio" @keydown="profileChanges = true"></textarea>
			</div>
		</div>

		<!-- Save changes -->
		<button type="submit" class="button mtop-xs" :disabled="!profileChanges">
			<span>Save Changes</span>
			<i class="far fa-user-check"></i>
		</button>
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
				_this.toast("Error", error.message, "", "far fa-user-times");
				// Done uploading
				_this.photoUploading = false;
			})

		},
	}
};
</script>

<style lang="less">

	textarea{
		width: 100%;
		height: 120px;
	}

	// Profile photo
	.profile-photo{
		display: block;
		width: 122px;
		height: 122px;
		border-radius: 50%;
		background-size: cover;
		margin: 8px 0;
		box-sizing: border-box;

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
	}
	// Upload new photo button
	#uploadProfilePhotoButton{
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: fit-content;
		font-size: 12px;
		margin: 0;
		padding: 0;
		width: 122px;
		text-align: center;
	}
</style>