<template>
	<div class="page">

		<!-- No user found -->
		<transition name="page">
			<div class="no-profile" v-if="userLoaded && userNotFound">
				<h1>No profile found for @{{profileUsername}}</h1>
			</div>
		</transition>

		<!-- User exists -->
		<transition name="page">
			<div class="profile-wrapper" v-if="userLoaded && !userNotFound">
				
				<!-- Profile photo -->
				<div class="profile-photo" v-if="profilePhotoURL" v-bind:style="'background-image: url(' + profilePhotoURL + ');'"></div>
				<!-- No photo -->
				<div class="profile-photo empty" v-if="!profilePhotoURL"></div>

				<!-- Username header -->
				<h1 class="mbottom-sm">
					@{{ profileUsername }}
				</h1>

				<!-- User since -->
				<div class="user-created">
					<label>User since:</label>
					<span>{{ new Date(profileData.user_created) | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}</span>
				</div>
				
				<!-- Bio -->
				<p class="profile-bio" v-if="profileData.bio">
					{{profileData.bio}}
				</p>

			</div>
		</transition>

		

	</div>
</template>

<script>
import metaMixin from "@/components/mixins/metaMixin.js";
import firebase from "firebase";
import { db } from "@/store/firebase";

export default {
	name: "Profile",
	mixins: [
		metaMixin,
	],
	components: {
	},
	data() {
		return {
			profileUsername: this.$route.params.username,
			profileUid: "",
			userLoaded: false,
			userNotFound: false,
			profileData: {},
			profilePhotoURL: "",
		};
	},
	created: function () {
		// Capitalize username and set as title
		this.updateMeta(this.profileUsername.charAt(0).toUpperCase() + this.profileUsername.slice(1) + "'s Profile", "")
		// Load user based off username
		this.getUserUid();
	},
	methods: {
		getUserUid: function(){
			let _this = this;

			console.log("Getting user " + _this.profileUsername)
			console.log("User loaded");


			db.collection("usernames").doc(_this.profileUsername).get().then(function(doc) {
				if (doc.exists) {
					_this.userNotFound = false;
					// Save UID
					_this.profileUid = doc.data().uid;

					// Load user profile data from firebase
					_this.loadUserProfile();
				} else {
					// User not found
					_this.userNotFound = true;
					// User not found, show page
					_this.userLoaded = true;
				}
			}).catch(function(error) {console.log("Error getting document:", error);});


		},

		// Use user's UID to get profile data
		loadUserProfile: function(){
			let _this = this;

			db.collection("profiles").doc(_this.profileUid).get().then(function(doc) {
				if (doc.exists) {
					_this.userNotFound = false;
					// Save UID
					_this.profileData = doc.data();

					console.log("DOC DATA")
					console.log()

					// If user profile is disabled, make it look same as not found
					if(!doc.data().profile_enabled){
						// Data not found
						_this.userNotFound = true;
						// User loaded, show page
						_this.userLoaded = true;
					}else{
						// Get profile photo
						_this.getProfilePhoto();
					}

				} else {
					// Data not found
					_this.userNotFound = true;
					// User failed to load, show page
					_this.userLoaded = true;
				}
			}).catch(function(error) {console.log("Error getting document:", error);});
		},

		// User uid to get profile photo
		getProfilePhoto: function(){
			let _this = this;
			// Get profile photo
			var storageRef = firebase.storage().ref();
			storageRef.child("avi/" + _this.profileUid + ".jpg").getDownloadURL().then(function(url) {
				// Commit profilePhoto to store
				_this.profilePhotoURL = url;
				// User done loading, show page
				_this.userLoaded = true;
			}).catch(function(error) {
				console.log("Error getting profile photo url")
				console.log(error)
				// User done loading, show page
				_this.userLoaded = true;
			});
		}
	}
}
</script>

<style lang="less">
	@import '~@/styles/variables.less';

	.profile-wrapper{

		// Profile photo
		.profile-photo{
			display: block;
			height: 120px;
			width: 120px;
			border-radius: var(--borderRadiusSmall);
			margin: 0 0 25px 0;
			background-size: cover;

			&.empty{
				background-color: var(--inputBackground);
				border: 1px solid var(--border);

				&:after{
					content: '\f94c';
					font-size: 78px;
					display: flex;
					font-weight: lighter;
					flex-direction: column;
					justify-content: center;
					height: 100%;
					text-align: center;
					box-sizing: border-box;
					padding-bottom: 5px;
					color: var(--text);
					opacity: 0.2;
					font-family: var(--fontAwesome);
					// Animation to change icons
					animation: empty-profile 25s linear infinite;
				}
			}
		}

		h1{
			font-weight: 900;
		}

		// User created date
		.user-created{
			display: block;
			
			span{
				font-size: 18px;
				font-weight: 600;
			}
		}

		// Bio
		.profile-bio{
			font-size: 18px;
			line-height: 30px;
			margin-top: 25px;
		}
	}


	// Empty profile cycles through X font aweosme icons to show on profiles without photos
	// Just for fun
	@keyframes empty-profile {
		// Star trek guy
		0% {content: '\f94c';}
		// Alien guy
		10% {content: '\f94a';}
		// Robot guy
		20% {content: '\f94b';}
		// Ninja guy
		30% {content: '\f504';}
		// Injured guy
		40% {content: '\f728';}
		// Cowboy guy
		50% {content: '\f8ea';}
		// King guy
		60% {content: '\f6a4';}
		// Astronaut guy
		70% {content: '\f4fb';}
		// Creep guy
		80% {content: '\f21b';}
		// Graduate guy
		90% {content: '\f501';}
		// Tie guy
		100% {content: '\f508';}
	}
</style>