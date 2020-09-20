<!--
//  Settings view
// _________________________
//
//  User account settings view
// 
// 		- Account
// 			- Business URL if it exists
// 			- Username
// 			- Email address with component to change it
// 			- User Since
// 		- Preferences
// 			- UI Animations toggle
// 			- Dark mode toggle
// 		- Change password component
// 		- Delete account component
// 		- Other information
// 			- Link to TOS and Privacy
// 
-->

<template>

	<div class="page form-page">


		<!-- Account -->
		<h2>Account</h2>
		<p class="mbottom-md">
			This is your private information about your ABCDEFG account.
		</p>

		<!-- Username -->
		<!-- I built a component to change usernames/urls, but it's not used. -->
		<div class="field" v-if="$store.getters.userPreferences.has_business">
			<label>Username</label>
			<div class="field-body">

				<div class="field-value">
					<div class="value">
						{{$store.getters.userPreferences.username}}
					</div>
				</div>
			</div>
		</div>

		<!-- Change Email Component -->
		<ChangeEmail class="mtop-md"></ChangeEmail>

		<!-- Change Location -->
		<div class="field mtop-md">
			<!-- Label -->
			<label>Home Area</label>
			<!-- Value -->
			<div class="field-body">

				<div class="field-value">
					<div class="value">
						{{$store.getters.userPreferences.location.primary_city}} - {{$store.getters.userPreferences.location.zip_code}}
					</div>
					<div class="action">
						<!-- Change Email Button -->
						<button class="button small grey" @click="changeHomeArea = true" aria-label="Change Home Area">
							<i class="far fa-house"></i>
							<span>Change</span>
						</button>
					</div>
				</div>

				<ChangeLocation v-if="changeHomeArea" v-on:changeLocationClosed="changeHomeArea = false"></ChangeLocation>
			</div>
		</div>

		<!-- User Since -->
		<div class="field mtop-md" v-if="$store.getters.userPreferences.has_business">
			<label>User Since</label>
			<div class="field-body">

				<div class="field-value">
					<div class="value">
						{{ new Date($store.getters.userPreferences.meta.user_created) | moment("dddd, MMMM Do YYYY")}}
						<!-- Time since (ex "2 days ago") -->
						<small class="block text-fade">
							{{ new Date($store.getters.userPreferences.meta.user_created) | moment("from") }}
						</small>
						<!-- User number -->
						<small class="block text-fade" if="$store.getters.userPreferences.meta.user_number">
							You were user #{{ $store.getters.userPreferences.meta.user_number }} 
						</small>
					</div>
				</div>
			</div>
		</div>


		<!-- General Preferences -->
		<h2 class="mtop-xl">Preferences</h2>
		<p class="mbottom-md">
			Adjust these settings to make ABCDEFG look & feel how you want.
		</p>

		<!-- UI Animation Toggle -->
		<div class="field mtop-md">
			<div class="preference">
				<div class="input">
					<input id="animationToggle" type="checkbox" class="toggle" v-model="$store.getters.userPreferences.ui.animations" @change="toggleAnimations()"/>
				</div>
				<label for="animationToggle">
					UI Animations
					<small>You can turn off the UI animations like the ones that transition between pages.</small>
				</label>
			</div>
		</div>

		<!-- Dark Mode Toggle -->
		<div class="field mtop-md">
			<div class="preference">
				<div class="input">
					<input id="darkmodeToggle" type="checkbox" class="toggle" v-model="$store.getters.userPreferences.ui.dark_mode" @change="toggleDarkMode()"/>
				</div>
				<label for="darkmodeToggle">
					Dark Mode
				</label>
			</div>
		</div>




		<!-- Change Password -->
		<h2 class="mtop-xl">Change Password</h2>
		<div class="mtop-md">
			<!-- Change Password Component -->
			<ChangePassword></ChangePassword>
		</div>

		<!-- Delete Account -->
		<h2 class="mtop-xl">Delete Account</h2>
		<!-- Delete Account Component -->
		<DeleteAccount></DeleteAccount>

		<!-- Legal Stuff -->
		<h2 class="mtop-xl">Other Information</h2>
		<p class="mbottom-md">
			Make sure you have read our privacy policy and terms of service.
		</p>
		<div class="settings-account-info-buttons pbottom-xl">
			<!-- Privacy Policy -->
			<button type="button" class="button grey mright-sm" @click="navigate('/privacy')" aria-label="Read Privacy Policy">
				<i class="far fa-file-powerpoint"></i>
				<span>Privacy Policy</span>
			</button>
			<!-- Terms of Service -->
			<button type="button" class="button grey" @click="navigate('/terms')" aria-label="Read Terms of Service">
				<i class="far fa-book-user"></i>
				<span>Terms of Service</span>
			</button>
		</div>

	</div>
</template>

<script>
	import firebase from "firebase";
	// Components
	import ChangePassword from "@/components/settings/ChangePassword";
	import ChangeUsername from "@/components/settings/ChangeUsername";
	import ChangeEmail from "@/components/settings/ChangeEmail";
	import ChangeLocation from "@/components/settings/ChangeLocation";
	import DeleteAccount from "@/components/settings/DeleteAccount";
	import Callout from "@/components/ui/Callout";
	// Mixins
	import preferencesMixin from "@/components/mixins/preferencesMixin.js";


	export default {
		name: 'settings',
		mixins: [
			preferencesMixin,
		],
		data() {
			return {
				// Setting toggles
				changeHomeArea: false,
			};
		},
		components: {
			ChangeEmail,
			ChangePassword,
			ChangeLocation,
			ChangeUsername,
			DeleteAccount,
			Callout,
		},
		mounted() {
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	@import '~@/styles/variables.less';

	// Account information
	.settings-account-info-buttons{
		display: flex;
		justify-content: flex-start;

		@media (max-width: @screenSM) {
			justify-content: space-between;
		}
	}

</style>
