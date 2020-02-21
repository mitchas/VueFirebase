<template>
	<div class="auth-page ptop-sm">

		<!-- 
			========================
			========================
			Register form 
			========================
			========================
		-->
		<div class="auth-page-header">
			<h1>Sign up</h1>
			<p class="tight">
				Create an account to post and save preferences & favorites.
			</p>
		</div>
		<form class="auth-form-body" @submit.prevent="registerUser(); accountLoading = true">

			<!-- Email Address -->
			<div class="field">
				<input type="email" id="registerEmail" v-model="email" placeholder="" required/>
				<label for="registerEmail">
					Email Address
				</label>
			</div>
			<!-- Username -->
			<div class="field">
				<input type="text" id="registerUsername" v-model="username" placeholder="" v-on:blur="checkUsername()" required autocapitalize="off"/>
				<label for="registerUsername">
					Username <small>- You can't change this later</small>
					<transition name="basic">
						<div class="username-check" v-if="username.length > 2 && usernameValid != null && usernameTaken != null">
							<i class="far" v-bind:class="{ 'fa-times-circle': !usernameValid && username.length > 2 || usernameTaken, 'fa-check-circle': usernameValid && !usernameTaken}"></i>
						</div>
					</transition>
				</label>
			</div>
			<!-- Password -->
			<div class="field">
				<input type="password" id="registerPassword" v-model="password" placeholder="" v-on:blur="validateForm()" required/>
				<label for="registerPassword">Password</label>
			</div>

			<!-- Terms of Service -->
			<div class="agreement">
				<input type="checkbox" class="check" id="registerTOS" v-model="tos" required/>
				<label for="registerTOS">
					<span>Check this box to agree to our <router-link to="/terms">Terms of Service</router-link> and <router-link to="/privacy">Privacy Policy</router-link>.</span>
				</label>
			</div>

			<!-- Form Messages -->
			<transition-group name="basic">
				<div role="status" class="form-message" v-for="error in formErrors" :key="error.message" v-if="!usernameValid || usernameTaken || password.length < 6">
					<span>{{ error.message }}</span>
				</div>
			</transition-group>

			<!-- Create account button -->
			<button class="button auth-button" type="submit" :disabled="email.length < 5 || !usernameValid || usernameTaken || password.length < 6 || !tos || accountLoading" aria-label="Create Account">
				<span v-if="accountLoading">Loading</span>
				<span v-else>Create Account</span>
				<i v-bind:class="{ 'fad fa-chevron-circle-right': !accountLoading, 'far fa-spinner-third fa-spin': accountLoading }"></i>
			</button>

			<div class="auth-bottom">
				<p>
					Already have an account? <router-link to="/signin">Sign In</router-link>
				</p>
			</div>
		</form>

	</div>

	

</template>


<script>
import firebase from "firebase";
import { db } from "@/store/firebase";
import toastMixin from "@/components/mixins/ui/toastMixin.js";
import metaMixin from "@/components/mixins/metaMixin.js";


export default {
	name: "Register",
	mixins: [
		toastMixin,
		metaMixin
	],
	data() {
		return {
			email: "",
			password: "",
			username: "",
			usernameArray: [],

			// UI
			accountLoading: false,

			// Form validations
			tos: false,
			usernameValid: null,
			usernameTaken: null,
			passwordValid: false,
			formErrors: []
		};
	},
	created: function () {
		this.updateMeta("Create Account", "This is the create account page description.")
	},
	methods: {
		

		// Register new user
		// Register new user
		// Register new user
		registerUser: function(){
			let _this = this;

			firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
				function(data){
					console.log("New account created");
					// Unset loading for button spinner
					_this.accountLoading = false;
					// Create new user function
					_this.submitNewUser(data.user.uid, data.user.email);
				},
				function(err){
					_this.accountLoading = false;
					_this.toast("Whoops", err.message, "red", "far fa-exclamation-circle");
				}
			)
		},

		// Save user prefs, redirect
		submitNewUser: function(uid, email){

			// Update meta information
			var newUserCountValue = 1;
			if(this.$store.getters.projectStats.user_count){
				newUserCountValue = this.$store.getters.projectStats.user_count + 1;
			}
			var newUserCountObject = {user_count: newUserCountValue}
			
			db.collection("site").doc("stats").set(newUserCountObject, { merge: true }).then(() => {
				console.log('Successfully updated site stats')
			}).catch(error => {
				console.error('There was an error editing site stats: ' + error)
			})



			// Write batch to submit profile and prefs and meta
			var batch = db.batch();
			
			// Set user prefs (private)
			var preferenceData = {
				username: this.username,
				email: email,
				firebase_uid: uid,
				user_created: new Date().toString(),
				user_number: newUserCountValue,
				admin_level: 0,
				darkMode: this.$store.getters.userPreferences.darkMode,
				animations: true,
			}
			var prefrenceRef = db.collection("users").doc(uid);
			batch.set(prefrenceRef, preferenceData);

			// Update profile (public)
			var profileData = {
				username: this.username,
				user_created: new Date().toString(),
				profile_enabled: true
			}
			var profileRef = db.collection("profiles").doc(uid);
			batch.set(profileRef, profileData);

			// Update username doc for lookup later
			var newUserUsername = {
				uid: uid
			};
			var usernameRef = db.collection("usernames").doc(this.username);
			batch.set(usernameRef, newUserUsername, { merge: true });

			// Commit the batch
			batch.commit().then(() => {
				console.log('Successfully updated user new user.')
			}).catch(error => {
				console.log("There was an error updating new user. " + error)
			});

			// Store is signed in
			this.$store.commit('isSignedIn', true);

			// If redirect after login
			var redirectAfterLogin = this.$store.getters.loginRedirectURL;
			// Default behavior redirects home
			if(redirectAfterLogin == null || redirectAfterLogin == "" || redirectAfterLogin == " "){
				this.$router.push('/');
			}
			// If redirectAfterLogin exists from loginRedirectURL in store,
			// send user to that URL instetad.
			else{
				this.$router.push(redirectAfterLogin);
			}
		},


		// On keyup, check if username is taken, alert user
		// On blur, alert them if too short
		checkUsername: function(){
			let _this = this;

			// To lowercase
			_this.username = _this.username.toLowerCase();

			// If username exists and is at least 3 chars
			if(_this.username.length && _this.username.length >= 3 && _this.username.length <= 20){

				// Only numbers, letters, hyphen allowed
				if(/^[aA-zZ0-9-]+$/g.test(_this.username)){
					this.usernameValid = true;

					// Check username against existing username
					var docRef = db.collection("usernames").doc(_this.username);
					docRef.get().then(function(doc) {
						if (doc.exists) {
							// User exists
							_this.usernameTaken = true;
							// Validate form
							_this.validateForm();
						} else {
							// User doesn't exist
							_this.usernameTaken = false;
							// Validate form
							_this.validateForm();
						}
					}).catch(function(error) {console.log("Error getting document:", error);});

				}else{
					// Username has bad characters
					_this.usernameValid = false;
				}
			}else{
				// Else it's too short
				_this.usernameValid = false;
			}

			// Validate form
			_this.validateForm();

		},

		// Validate form
		// Called on blur on any input
		// Checks which fields are valid, shows message for those that are not
		validateForm: function(){
			var newErrors = [];

			// If password is valid 
			if(this.password && this.password.length < 6){
				newErrors.push({message: "Your password must be at least six characters."})
			}

			// If username is too short 
			if(this.username && this.username.length < 3 || this.username.length > 20){
				newErrors.push({message: "Your username must be at least 3 characters, max 20."})
			}
			// If username is invalid 
			if(this.username.length > 2 && !this.usernameValid){
				newErrors.push({message: "Usernames can only be letters, numbers, and hyphens."})
			}
			// If username is taken 
			if(this.usernameTaken){
				newErrors.push({message: "Sorry, that username is taken."})
			}

			this.formErrors = newErrors;
		},
		
	}
};


</script>


<style lang="less">

	@import '~@/styles/variables.less';

	// Small / hint inside labels
	label small{
		font-size: 11.5px;
		opacity: 0.5;
	}

	// Username validator
	.username-check{
		display: block;
		width: 100%;
		position: absolute;
		top: 100%;
		overflow: visible;
		height: 40px;
		pointer-events: none;
		display: flex;
		justify-content: flex-end;
		box-sizing: border-box;
		padding-top: 2px;
		z-index: 1;

		// Fix padding on mobile
		@media (max-width: @screenMD) {
			height: 50px;
		}

		i{
			display: flex;
			flex-direction: column;
			justify-content: center;
			font-size: 20px;
			padding: 0 12px 2px 0;
			box-sizing: border-box;

			&.fa-check-circle{
				color: var(--green);
			}
			&.fa-times-circle{
				color: var(--red);
			}

			// Increase size on mobile
			@media (max-width: @screenMD) {
				font-size: 24px;
			}
		}
	}
	// If the username input is focused on mobile, hide check
	// Keyup doesn't work on mobile, so it's not accurate until blur
	#registerUsername{

		&:focus{
			+ label .username-check{

				// Hide check/x icon
				i{
					display: none;
				}

				// Add ellipses to indicate "typing"
				&:after{
					content: '\f70b';
					font-family: var(--fontAwesome);
					display: flex;
					flex-direction: column;
					justify-content: center;
					color: var(--text);
					font-size: 16px;
					padding: 0px 13.5px;
					box-sizing: border-box;
					transform-origin: 50% 50%;
					text-align: center;
					animation: username-loader 1.6s linear infinite;
					position: relative;
					top: -1px;
				}
			}
		}
		
	}

	// Keyframe for username loader
	@keyframes username-loader {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

</style>



