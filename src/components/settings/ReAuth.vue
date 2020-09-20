<!--
//  ReAuth component
// _________________________
//
//  	- Prompts user to re-enter password in modal,
// 		- Required by firebase for certain operations - password change, delete account, email change, etc.
// 
// 		reauthenticate() emits 'reauthenticated' to let parent component know it was successful, and to continue. 
// 			- Toast if password error 
// 
-->

<template>
	<div>

		<transition name="lightbox">
			<div class="lightbox" v-if="showModal"></div>
		</transition>
		
		<transition name="modal">

			<div class="modal-wrapper" v-on:click.self="closeAuth()" v-if="showModal">

				<form v-if="showModal" class="modal small" tabindex="0" ref="modal" @submit.prevent="reauthenticate();">

					<!-- Close Modal (optional) -->
					<!-- <i class="far fa-times modal-close" @click="closeAuth()"></i> -->
					
					<!-- Header -->
					<div class="modal-title">
						Enter your password
					</div>
					<!-- Body Content -->
					<div class="modal-body">
						<p>
							You'll need to re-enter your password to do that.
						</p>
						<div class="field mtop-sm">
							<label for="reAuthPassword">Password</label>
							<div class="field-body">
								<input type="password" v-model="password" id="reAuthPassword" placeholder=" " required>
							</div>
						</div>
					</div>
					<!-- Footer/Buttons -->
					<div class="modal-footer">
						<button class="button grey" type="button" @click="closeAuth()">Cancel</button>
						<button class="button" type="submit" :disabled="!password.length" aria-label="Continue">
							<span v-if="reAuthLoading">Loading</span>
							<span v-else>Continue</span>
							<i v-bind:class="{ 'far fa-long-arrow-right': !reAuthLoading, 'far fa-spinner-third fa-spin': reAuthLoading }"></i>
						</button>
					</div>
				</form> <!-- End modal body/form -->

			</div>

		</transition>

	</div>
</template>

<script>
import firebase from "firebase";
// Mixins
import scrollLockMixin from "@/components/mixins/ui/scrollLockMixin.js";

export default {
	name: "ReAuth",
	mixins: [
		scrollLockMixin
	],
	data() {
		return {
			showModal: false,
			reAuthLoading: false,
			password: ''
		};
	},
	mounted() {
		let _this = this;
		_this.showModal = true;
		_this.scrollLock(true)
		// Focus modal
		setTimeout(function(){
			_this.$refs.modal.focus();
		}, 100)
	},
	methods: {
		///////////////////////
		//    Close Auth    //
		/////////////////////
		// emit authClosed
		closeAuth: function(){
			let _this = this;
			// Hide Modal
			_this.showModal = false;
			// Unlock Scroll
			_this.scrollLock(false)

			// Emit to hide component after 0.3s to account for transition
			setTimeout(function(){
				_this.$emit("authClosed");
			}, 300)
		},
		//////////////////////////////////
		//    Reauthenticate Window    //
		////////////////////////////////

		reauthenticate: function(){
			let _this = this;

			// Toggle loading spinner
			_this.reAuthLoading = true;

			// Re-authenticate user
			var user = firebase.auth().currentUser;
			var credential = firebase.auth.EmailAuthProvider.credential(
				user.email, 
				_this.password
			);
			user.reauthenticateWithCredential(credential).then(function() {
				// User re-authenticated.
				_this.reAuthLoading = false;
				// _this.toast("Success", "Now try that again", "green", "far fa-check-circle");
				_this.$emit("reauthenticated");
				// _this.$parent.showReAuth = false;
				_this.closeAuth();
			}).catch(function(error) {
				// An error happened.
				_this.reAuthLoading = false;
				_this.toast("Whoops", error.message, "red", "far fa-exclamation-circle");
			});
		}
	}
};
</script>

<style lang="less">
	// @import '~@/styles/variables.less';
</style>