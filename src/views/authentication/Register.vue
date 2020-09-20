<!--
//  Registration view
// _________________________
//  Loads authentican cmponent with fields for creating a new account
// 
// 		registerUser() - if form is valid, creates user with email and password on Firebase
// 		submitNewUser()
// 			- called after successful registerUser()
// 			- Creates batch to update multiple firestore docs, saves data, redirects home
// 		checkUsername() - Checks entered username against all taken usernames
// 		validateForm()
// 			- makes sure all form entries meet requirements (ie username not taken, not too long)
// 		checkZipcode() - Check's entered zip code, shows warning if outside of MN
// 		
-->

<template>

	<div>

		
		<AuthenticationPage
			header="Sign Up"
			v-bind:disabled="email.length < 5 || !usernameValid || usernameTaken || !username.length || password.length < 6 || !tos || !zipcode || zipcode && zipcode.length < 5" 
			v-bind:formBottom="['Already have an account?', '/signin/', 'Sign In']"
			submitText="Create Account"
			v-bind:formLoading="accountLoading"
			@formSubmitted="registerUser()">

			<!-- Email Address -->
			<div class="auth-field">
				<label for="registerEmail">Email address</label>
				<input type="email" id="registerEmail" v-model="email" placeholder="" required/>
			</div>

			<!-- Username -->
			<div class="auth-field input-validator">
				<input type="text" id="registerUsername" class="input-to-validate" v-model="username" placeholder="" v-on:blur="checkUsername()" required autocapitalize="off"/>
				<label for="registerUsername">
					Username <small>- You can't change this later</small>
					<transition name="basic">
						<div class="validator-icon" v-if="username.length > 2">
							<i class="far" v-bind:class="{ 'fa-times-circle': !usernameValid && username.length > 2 || usernameTaken, 'fa-check-circle': usernameValid && !usernameTaken}"></i>
						</div>
					</transition>
				</label>
			</div>
			
			<!-- Password -->
			<div class="auth-field">
				<label for="registerPassword">Password</label>
				<input type="password" id="registerPassword" v-model="password" placeholder="" v-on:blur="validateForm()" required/>
			</div>
			
			<!-- Zip Code -->
			<div class="auth-field">
				<label for="registerZipcode">Your Home Zip Code</label>
				<input type="number" maxlength="5" id="registerZipcode" v-model="zipcode" placeholder="" v-on:blur="checkZipcode(); validateForm();" required/>
			</div>

			<!-- Terms of Service -->
			<div class="agreement">
				<input type="checkbox" class="check" id="registerTOS" v-model="tos" required/>
				<label for="registerTOS">
					<span>Check this box to agree to the <router-link to="/terms">Terms of Service</router-link> and <router-link to="/privacy">Privacy Policy</router-link>.</span>
				</label>
			</div>

			<!-- Form Messages -->
			<transition-group name="basic" v-if="!usernameValid || usernameTaken || password.length < 6">
				<!-- Callout for each error -->
				<Callout
					v-for="error in formErrors" :key="error.message"
					icon="far fa-exclamation-circle"
					class="mbottom-xs mtop-xs"
					color="red"
					size="narrow">
					<!-- Message -->
					<span>{{error.message}}</span>
				</Callout>
			</transition-group>

		</AuthenticationPage>

		<!-- Out of state warning -->
		<Modal size="small"
			v-bind:show="stateError"
			title="Hey, Neighbor"
			confirmText="Okay"
			color="blue"
			confirmIcon="fas fa-check"
			@confirmed="stateError = ''"
			@dismissed="stateError = ''">

			<h5 class="padding-none">
				It looks like you aren't in Minnesota.
			</h5>
			<p class="small mtop-xs padding-none">
				The features you get by registering aren't really useful outside of MN.
			</p>
			<p class="small mtop-xs padding-none">
				Of course anyone is free to use the app without an account, though!
			</p>

		</Modal>


	</div>


</template>


<script>
import firebase from "firebase";
import { db } from "@/store/firebase";
import axios from 'axios';
// Components
import AuthenticationPage from "@/components/user/AuthenticationPage";
import Modal from "@/components/ui/Modal";
import Callout from "@/components/ui/Callout";
// Mixins

export default {
	name: "Register",
	mixins: [
	],
	components: {
		AuthenticationPage,
		Modal,
		Callout,
	},
	data() {
		return {
			email: "",
			password: "",
			zipcode: null,
			username: "",
			usernameArray: [],

			// UI
			accountLoading: false,
			stateError: false,

			// Form validations
			tos: false,
			usernameValid: null,
			usernameLengthValid: null,
			usernameTaken: null,
			passwordValid: false,
			formErrors: [],

			// Location from zip code data
			locationData: null,
		};
	},
	created: function () {
	},
	mounted() {
	},
	methods: {
		
		////////////////////////////
		//// Register new user ////
		//////////////////////////
		registerUser: function(){
			let _this = this;

			_this.accountLoading = true;
			
			firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
				function(data){
					console.log("New account created");
					// Unset loading for button spinner
					_this.accountLoading = false;

					axios.get('/data/zip_lookup.json').then(response => {
						var dta = response.data[_this.zipcode];
						_this.locationData = dta;
						_this.submitNewUser(data.user.uid, data.user.email);
					}).catch(e => {
						console.log(e);
						_this.submitNewUser(data.user.uid, data.user.email);
					})
				},
				function(err){
					_this.accountLoading = false;
					_this.toast("Whoops", err.message, "red", "far fa-exclamation-circle");
				}
			)
		},

		/////////////////////////////////
		//// Save User to Firestore ////
		///////////////////////////////
		submitNewUser: function(uid, email){

			// Write batch to submit profile and prefs and meta
			var batch = db.batch();

			// Site Meta
			// Update meta information
			var stats = {
				'user_count': 1,
			}
			if(this.$store.getters.projectStats){
				var stats = this.$store.getters.projectStats;
				stats.user_count = stats.user_count + 1;
			}
			var siteMetaRef = db.collection("site").doc('stats');
			batch.set(siteMetaRef, stats, { merge: true });

			// Extract location data needed
			var userLocation = null;
			if(this.locationData){
				userLocation = this.locationData;
				userLocation.zip_code = this.zipcode;
			}
			

			
			// Set user prefs (private)
			// Should also be defined in store.js and userState Mixin
			var preferenceData = {
				username: this.username,
				email: email,
				firebase_uid: uid,
				admin_level: 0,
				location: userLocation,
				has_business: false,
				// Set new user to true to show instructions until they complete them
				new_user: true,

				ui: {
					confirmLeave: true,
					dark_mode: this.$store.getters.userPreferences.ui.dark_mode,
					animations: true,
					tooltips: true,
				},
				meta: {
					pwa_installed: false,
					user_number: stats.user_count,
					user_created: new Date().toString(),
					new_user: true,
				},
				endpoints: {}


			}
			var prefrenceRef = db.collection("users").doc(uid);
			batch.set(prefrenceRef, preferenceData);

			// Username Doc
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

			// Store user is signed in
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

		/////////////////////////
		//// Check Username ////
		///////////////////////
		// On keyup, check if username is taken, alert user
		// On blur, alert them if too short
		checkUsername: function(){
			let _this = this;

			// To lowercase
			_this.username = _this.username.toLowerCase();

			// If username exists and is at least 3 chars
			if(_this.username.length && _this.username.length >= 3 && _this.username.length <= 30){
				_this.usernameLengthValid = true;

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
				_this.usernameLengthValid = false;
			}

			// Validate form
			_this.validateForm();

		},

		////////////////////////
		//// Validate Form ////
		//////////////////////
		// Called on blur on any input
		// Checks which fields are valid, shows message for those that are not
		validateForm: function(){
			var newErrors = [];

			// If password is valid 
			if(this.password && this.password.length < 6){
				newErrors.push({message: "Your password must be at least six characters."})
			}

			// If username is too short 
			if(this.username && this.usernameLengthValid != null && !this.usernameLengthValid){
				newErrors.push({message: "Your username must be at least 3 characters, max 30."})
			}
			// If username is invalid 
			if(this.usernameValid != null && !this.usernameValid){
				newErrors.push({message: "Username can only be letters, numbers, and hyphens."})
			}
			// If username is taken 
			if(this.usernameTaken){
				newErrors.push({message: "Sorry, that username is taken."})
			}

			// Make sure a 5-digit zip code is entered 
			if(this.zipcode && this.zipcode.length != 5){
				newErrors.push({message: "Zip Code must be 5 numbers."})
			}

			this.formErrors = newErrors;
		},

		////////////////////////
		//// Check Zipcode ////
		//////////////////////
		checkZipcode: function(){

			// MN Zip codes range from 55001 to 56763
			// So if zip is less than 55000 or greater than 56763, it's not MN
			if(this.zipcode && this.zipcode < 55000 || this.zipcode > 56763){
				this.stateError = true;
			}else{
				this.stateError = false;
			}

		}
		
	}
};
</script>


<style lang="less">
	// @import '~@/styles/variables.less';
</style>



