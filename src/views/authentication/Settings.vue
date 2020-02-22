<template>

	<div id="settingsPage" class="page">
		<h1>Account Settings</h1>

		<!-- Account -->
		<div class="settings-group">

			<!-- Username -->
			<!-- I built a component to change usernames, but it's not used. -->
			<div class="basic-field">
				<label>Username:</label>
				<div class="field-body">
					{{$store.getters.userPreferences.username}}
				</div>
			</div>

			<!-- Email Address -->
			<ChangeEmail></ChangeEmail>

			<!-- Date Created -->
			<div class="basic-field">
				<label>User Since:</label>
				<div class="field-body">
					<!-- Date created -->
					{{ new Date($store.getters.userPreferences.user_created) | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}
					<!-- Time since (ex "2 days ago") -->
					<small>
						{{ new Date($store.getters.userPreferences.user_created) | moment("from") }}
					</small>
					<!-- User number -->
					<small if="$store.getters.userPreferences.user_number">
						You were user #{{ $store.getters.userPreferences.user_number }} 
					</small>
				</div>
			</div>
		</div>

		<!-- Public Profile -->
		<h1>Public Profile</h1>
		<div class="settings-group">
			<ProfileSettings v-if="$store.getters.userPreferences.firebase_uid"></ProfileSettings>
		</div>

		<!-- General Preferences -->
		<h1>General Preferences</h1>
		<div class="settings-group">
			<!-- UI Animations -->
			<div class="setting-toggle">
				<div class="setting-toggle-input">
					<input id="animationToggle" type="checkbox" class="toggle" v-model="$store.getters.userPreferences.animations" @change="toggleAnimations()"/>
				</div>
				<label class="setting-label-large" for="animationToggle">
					UI Animations
					<small>You can turn off the UI animations like the ones that transition between pages.</small>
				</label>
			</div>
			<!-- Dark Mode -->
			<div class="setting-toggle">
				<div class="setting-toggle-input">
					<input id="darkmodeToggle" type="checkbox" class="toggle" v-model="$store.getters.userPreferences.darkMode" @change="toggleDarkMode()"/>
				</div>
				<label class="setting-label-large" for="darkmodeToggle">
					Dark Mode
				</label>
			</div>
		</div>

		<!-- Change Password -->
		<h1>Change Password</h1>
		<div class="settings-group">
			<!-- Change Password Component -->
			<ChangePassword></ChangePassword>
		</div>

		<!-- Delete Account -->
		<h1>Delete Account</h1>
		<div class="settings-group">
			<!-- Delete Account Component -->
			<DeleteAccount></DeleteAccount>
		</div>

		<!-- Legal Stuff -->
		<h1>Account Information</h1>
		<div class="settings-group">
			<div class="settings-account-info">
				<p>
					Make sure you have read our privacy policy and terms of service.
				</p>
				<div class="settings-account-info-buttons">
					<!-- Privacy Policy -->
					<button type="button" @click="navigate('/privacy')" aria-label="Read Privacy Policy">
						<i class="far fa-file-powerpoint"></i>
						<span>Privacy Policy</span>
					</button>
					<!-- Terms of Service -->
					<button type="button" @click="navigate('/terms')" aria-label="Read Terms of Service">
						<i class="far fa-book-user"></i>
						<span>Terms of Service</span>
					</button>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	// Components
	import ChangePassword from "@/components/settings/ChangePassword";
	import ChangeUsername from "@/components/settings/ChangeUsername";
	import ChangeEmail from "@/components/settings/ChangeEmail";
	import ProfileSettings from "@/components/settings/ProfileSettings";
	import DeleteAccount from "@/components/settings/DeleteAccount";
	import metaMixin from "@/components/mixins/metaMixin.js";
	import preferencesMixin from "@/components/mixins/preferencesMixin.js";
	import firebase from "firebase";
	import navigateMixin from "@/components/mixins/navigateMixin.js";


	export default {
		name: 'settings',
		mixins: [
			metaMixin,
			preferencesMixin,
			navigateMixin,
		],
		data() {
			return {
				newPassword: '',
				verifyNewPassword: '',
				// Setting toggles
			};
		},
		components: {
			ChangeEmail,
			ChangePassword,
			ChangeUsername,
			DeleteAccount,
			ProfileSettings
		},
		mounted() {
			if(this.$store.getters.userPreferences.username){
				this.updateMeta("Settings - " + this.$store.getters.userPreferences.username, "Adjust your preferences")
			}else{
				this.updateMeta("Settings", "Adjust your preferences")
			}
		},
		methods: {

			
		}
	}
</script>

<style lang="less">
	@import '~@/styles/variables.less';

	// Account information
	.settings-account-info{

		.settings-account-info-buttons{
			display: flex;
			justify-content: flex-start;

			@media (max-width: @screenSM) {
				justify-content: space-between;
			}

			button{
				background-color: transparent;
				border: none;
				padding: 10px 0;
				font-size: 16px;
				font-weight: 600;
				color: var(--text);
				margin-right: 35px;
				margin: 10px 35px 0 0;
				letter-spacing: 0.4px;

				i{
					margin-right: 10px;
					transform-origin: center center;
					transform: scale(1.2);
				}

				// No margin on mobile
				@media (max-width: @screenSM) {
					margin: 5px 10px;
				}

				// Hover state
				&:hover{
					cursor: pointer;
					text-decoration: underline;
				}
			}
		}
	}

</style>
