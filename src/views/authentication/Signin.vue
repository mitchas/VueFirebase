<template>
	<div class="auth-page ptop-sm">
		<!-- ========================
			========================
			Sign in form 
			========================
			========================-->
		<div class="auth-page-header">
			<h1>Welcome back</h1>
		</div>
		<form class="auth-form-body" @submit.prevent="signinUser(); accountLoading = true">
			<!-- Email Address -->
			<div class="basic-field">
				<label for="signinEmail">Email address</label>
				<div class="field-body">
					<input type="email" v-model="email" id="signinEmail" placeholder=" " required>
				</div>
			</div>

			<!-- Password -->
			<div class="basic-field">
				<label for="signinPassword">
					Password
					<router-link id="forgotPassword" to="/passwordreset" tabindex="-1">Forgot it?</router-link>
				</label>
				<div class="field-body">
					<input type="password" v-model="password" id="signinPassword" required>
				</div>
			</div>

			<!-- Sign in button -->
			<button class="button auth-button" type="submit" :disabled="email.length < 5 || !password.length || accountLoading" aria-label="Sign In">
				<span v-if="accountLoading">Loading</span>
				<span v-else>Sign In</span>
				<i v-bind:class="{ 'fad fa-chevron-circle-right': !accountLoading, 'far fa-spinner-third fa-spin': accountLoading }"></i>
			</button>

			<!-- Create account -->
			<div class="auth-bottom">
				<p>
					Need an account?
					<router-link to="/register">Sign Up</router-link>
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
	name: "signinRegister",
	mixins: [
		toastMixin,
		metaMixin
	],
	components: {
		// FormMessage
	},
	data() {
		return {
			email: "",
			password: "",

			// UI
			accountLoading: false,
		};
	},
	created: function () {
		this.updateMeta("Sign In", "This is the sign in page description.")
	},
	watch: {
	},
	methods: {

		// Sign in existing user
		// Sign in existing user
		// Sign in existing user
		signinUser: function() {
			let _this = this;

			firebase
			.auth()
			.signInWithEmailAndPassword(this.email, this.password)
			.then(
				function() {
					console.log("Sign in successful");
					// Stop loading spinner on button
					_this.accountLoading = false;
					// Success function
					_this.signinSuccess();
				},
				function(err) {
					_this.accountLoading = false;
					_this.toast("Oops", "That email and password combination didn't work.", "red", "far fa-exclamation-circle");
				}	
			);
		},

		signinSuccess: function(){
			// Commit signed in ttoo store
			this.$store.commit('isSignedIn', true);
			// Get stored value from redirect
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
		
	}
};


</script>


<style lang="less">

	@import '~@/styles/variables.less';

	// Forgot Password button
	// Floats right of label
	#forgotPassword{
		float: right;
		padding: 0;
		margin: 0;
		border: none;
		font-size: 11px;
		font-weight: 600;
		color: var(--text);
		opacity: 0.35;
		top: 1px;
		letter-spacing: 0.25px;
		position: relative;
		transition: var(--transition);

		&:hover{
			opacity: 1;
			transition: var(--transition);
		}
	}
		
</style>



