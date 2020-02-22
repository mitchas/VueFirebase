<template>
	<div>
		<form id="deleteAccount" @submit.prevent="showTextConfirmation()">
			<p>
				Deleting your account is <b>permanent</b>. Period. It cannot be undone.
			</p>
			<!-- Consequences -->
			<ul id="consequences">
				<li><b>ALL</b> of your profile and user data will be deleted.</li>
				<li>Your username will <b>NOT</b> be released. Nobody else will be able to take it, but you also won't be able to get it back. This is done to prevent impersonations.</li>
				<li>Any public comments or submissions you've made will <b>NOT</b> be deleted, but will no longer link to your profile.</li>
				<li>You will be able to create a new account with the same email address in the future.</li>
			</ul>

			<!-- Check to agree -->
			<div class="agreement">
				<input type="checkbox" class="check" id="confirmDelete" v-model="confirmation" required/>
				<label for="confirmDelete">
					<span>Check this box if you understand want to proceed.</span>
				</label>
			</div>
			<!-- Proceed to confirmation -->
			<div class="continue-delete">
				<button type="submit" class="button red mtop-xs" :disabled="!confirmation">
					<span>Delete Account</span>
					<i class="far fa-user-times"></i>
				</button>
			</div>
		</form>

		<!-- Reauthentication Window -->
		<ReAuth v-if="showReAuth" v-on:authClosed="showReAuth = false" v-on:reauthenticated="userReauthenticated()"></ReAuth>

		<!-- Confirmation Modal -->
		<!-- Confirmation Modal -->
		<!-- Confirmation Modal -->
		<transition name="lightbox">
			<div class="lightbox" v-if="secondConfirmation"></div>
		</transition>
		
		<transition name="modal">

			<div class="modal-wrapper" v-on:click.self="cancelDelete()" v-if="secondConfirmation">

					<form v-if="secondConfirmation" class="modal" @submit.prevent="deleteAccount();">

						<!-- Close Modal (optional) -->
						<i class="far fa-times modal-close" @click="cancelDelete()"></i>
						<!-- Header -->
						<div class="modal-title">Last Chance</div>
						<!-- Body Content -->
						<div class="modal-body">
							<p>
								Type <b>goodbye</b> in the box below, then click the button to delete your account forever.
							</p>

							<div class="basic-field">
								<div class="field-body">
									<input type="text" v-model="textConfirmation" id="goodbye" placeholder="goodbye" required aria-label="Type the word GOODBYE to continue"  autocorrect="off" autocapitalize="none"/>
								</div>
							</div>

						</div>
						<!-- Footer/Buttons -->
						<div class="modal-footer">
							<button class="button transparent" type="button" @click="cancelDelete()">Cancel</button>
							<button class="button red" type="submit" :disabled="textConfirmation.toLowerCase() != 'goodbye'" aria-label="Continue">
								<span v-if="processing">Loading</span>
								<span v-else>Delete My Account</span>
								<i v-bind:class="{ 'fas fa-skull-crossbones': !processing, 'far fa-spinner-third fa-spin': processing }"></i>
							</button>
						</div>

					</form> <!-- End modal body/form -->

			</div>

		</transition>


	</div>
</template>

<script>
import ReAuth from "@/components/settings/ReAuth";
import toastMixin from "@/components/mixins/ui/toastMixin.js";
import scrollLockMixin from "@/components/mixins/ui/scrollLockMixin.js";

import firebase from "firebase";

export default {
	name: "DeleteAccount",
	mixins: [
		toastMixin,
		scrollLockMixin
	],
	components: {
		ReAuth
	},
	data() {
		return {
			showReAuth: false,
			confirmation: false,
			secondConfirmation: false,
			textConfirmation: '',
			processing: false
		};
	},
	methods: {
		showTextConfirmation: function(){
			this.scrollLock(true)
			this.secondConfirmation = true;
		},

		// Add this extension to your firebase console to automatically
		// Delete user data after account is deleted
		// https://firebase.google.com/products/extensions/delete-user-data
		// Configure at firestore paths `users/{UID},profiles/{UID}`
		deleteAccount: function(){
			let _this = this;

			// Loading
			_this.processing = true;

			var user = firebase.auth().currentUser;
			user.delete().then(function() {
				// User deleted.
				_this.toast("So long, friend", "Your account and all your data has been deleted", "blue", "far fa-sad-tear");
				
				// Go home
				_this.$router.replace("/");

			}).catch(function(error) {
				// An error occured.
				console.log("Error Deleting Account:")
				console.log(error);
				// If requires reauthentication
				if(error.code == "auth/requires-recent-login"){
					_this.showReAuth = true;
					_this.cancelDelete();
					_this.toast("Not so fast", "You haven't signed in recently. Enter your password to verify it's you, then try again.", "yellow", "fal fa-user-secret");
				}else{
					// Other errors
					_this.toast("Oops.", error.message, "red", "far fa-exclamation-circle");
				}
			});

		},
		cancelDelete: function(){
			// Cancel delete - make them re-check the box
			this.confirmation = false;
			this.processing = false;
			this.secondConfirmation = false;
			this.textConfirmation = "";
			this.scrollLock(false);
		},
		userReauthenticated: function(){
			// If user successfully reauthenticates
			this.confirmation = true;
			this.secondConfirmation = true;
			this.textConfirmation = "Goodbye";
			this.scrollLock(true)
		}
	}
};
</script>

<style lang="less">

	@import '~@/styles/variables.less';

	#deleteAccount{
		display: block;
		max-width: 600px;
		color: var(--text);

		// Confirm delete checkbox
		#confirmDelete{

			// Change check color to red
			&:after{
				color: var(--red) !important;
			}
		}

		// Paragraph
		p{
			color: var(--text);
		}

		// Text and consequences
		b{
			font-weight: bolder;
			letter-spacing: 0.3px;
			text-decoration: underline;
		}
		#consequences{

			li{
				font-size: 13px;
				letter-spacing: 0.5px;
				margin: 5px 0;

				// Increase size on mobile
				@media (max-width: @screenSM) {
					font-size: 15px;
					line-height: 20px;
					margin: 8px 0;
				}
			}
		}

		// Delete Account button
		.continue-delete{
			display: flex;
			justify-content: flex-start;
			padding-top: 10px;

			// Full width mobile
			@media (max-width: @screenSM) {
				justify-content: center;
			}
		}
	}


	// #goodbye input
	#goodbye{
		display: block;
		width: 200px;
		text-align: center;
		margin: 0 auto;
		font-size: 30px;
		font-family: var(--sans);
		font-weight: 600;
		height: 50px;
		letter-spacing: 2px;
		color: var(--red);
		border: none;
		background-color: var(--redTransparent);

		// Make placeholder red, too
		&::placeholder{
			color: var(--red);
			opacity: 0.3;
		}
	}
</style>