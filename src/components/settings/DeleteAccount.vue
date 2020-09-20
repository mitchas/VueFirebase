<!--
//  Delete account component
// _________________________
//
//  	- Warning for users that it's permanent,
// 		- Multi-step confirmation
// 			- Click delete
//			- Type "goodbye" into modal
// 			- Click delete again to confirm
// 
//  	- If user hasn't signed in recently, ReAuth component is used
// 
// 		deleteAccount() function uses firebase to delete user's account, prompt ReAuth if error
// 			- This does NOT delete user's firestore data. That is/can be configured on the firebase console with the Delete Uer Data extension (See ReadME)
// 		cancelDelete() closes modal
// 		userReauthenticated() callback from reauthentication - continue where left off in modal, one more click to delete
//
-->

<template>
	<div>
		<form id="deleteAccount" @submit.prevent="showTextConfirmation()">
			<p>
				Deleting your account is <b>permanent</b>. Period. It cannot be undone.
			</p>
			<!-- Consequences -->
			<ul id="consequences">
				<li><b>ALL</b> of your profile information, business page data, and other user data will be deleted.</li>
				<li>Your username or business URL will <b>NOT</b> be released. Nobody else will be able to take it, but you also won't be able to get it back. This is done to prevent impersonations.</li>
				<li>Any public comments or submissions you've made will <b>NOT</b> be deleted, but will no longer link to back to you in any way.</li>
				<li>You will be able to create a new account with the same email address in the future.</li>
			</ul>

			<!-- Check to agree -->
			<div class="field-horizontal">
				<div class="input">
					<input type="checkbox" class="check" id="confirmDelete" v-model="confirmation" required/>
				</div>
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
		<!-- Out of state warning -->
		<!-- If a user is not in MN, ask them not to create an account -->
		<transition name="lightbox">
			<div class="lightbox" v-if="secondConfirmation"></div>
		</transition>
		
		<transition name="modal">

			<div class="modal-wrapper" v-on:click.self="cancelDelete()" v-if="secondConfirmation">

				<form v-if="secondConfirmation" class="modal" tabindex="0" ref="modal" @submit.prevent="deleteAccount();">

					<!-- Close Modal (optional) -->
					<i class="far fa-times modal-close" @click="cancelDelete()"></i>
					<!-- Header -->
					<div class="modal-title">Last Chance</div>
					<!-- Body Content -->
					<div class="modal-body">
						<p>
							Type <b>goodbye</b> in the box below, then click the button to delete your account forever.
						</p>

						<div class="field ptop-sm pbottom-xs">
							<div class="field-body">
								<input type="text" v-model="textConfirmation" id="goodbye" placeholder="goodbye" required aria-label="Type the word GOODBYE to continue"  autocorrect="off" autocapitalize="none"/>
							</div>
						</div>

					</div>
					<!-- Footer/Buttons -->
					<div class="modal-footer">
						<button class="button grey" type="button" @click="cancelDelete()">
							<i class="far fa-times"></i>
							<span>Cancel</span>
						</button>
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
import firebase from "firebase";
// Components
import ReAuth from "@/components/settings/ReAuth";
// Mixins
import scrollLockMixin from "@/components/mixins/ui/scrollLockMixin.js";


export default {
	name: "DeleteAccount",
	mixins: [
		scrollLockMixin
	],
	components: {
		ReAuth,
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
		//////////////////////////////
		//    Show confirmation    //
		////////////////////////////
		showTextConfirmation: function(){
			let _this = this;

			_this.scrollLock(true)
			_this.secondConfirmation = true;

			// Focus modal
			setTimeout(function(){
				_this.$refs.modal.focus();
			}, 100)
		},

		///////////////////////////
		//    Delete Account    //
		/////////////////////////
		// Add this extension to your firebase console to automatically
		// Delete user data after account is deleted
		// https://firebase.google.com/products/extensions/delete-user-data
		// Configure at firestore paths `users/{UID},businesses/{UID}`
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
		//////////////////////////
		//    Cancel Delete    //
		////////////////////////
		cancelDelete: function(){
			// Cancel delete - make them re-check the box
			this.confirmation = false;
			this.processing = false;
			this.secondConfirmation = false;
			this.textConfirmation = "";
			this.scrollLock(false);
		},
		////////////////////////////////////
		//    Use has reauthenticated    //
		//////////////////////////////////
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
		max-width: 220px;
		width: 100%;
		text-align: center;
		margin: 0 auto;
		font-size: 30px;
		font-family: var(--sans);
		font-weight: 600;
		height: 56px;
		letter-spacing: 2px;
		color: var(--red);
		// border: none;
		border: 2px solid var(--red);
		background-color: var(--redLight);

		// Make placeholder red, too
		&::placeholder{
			color: var(--red);
			opacity: 0.3;
			letter-spacing: 2px;
			font-weight: 600;
		}
	}
</style>