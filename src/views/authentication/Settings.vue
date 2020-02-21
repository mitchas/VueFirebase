<template>

	<div id="settingsPage" class="page">
		<h1>Settings</h1>

		<!-- Account -->
		<div class="settings-group">
			<div class="settings-body">

				<!-- Username -->
				<!-- I built a component to change usernames, but it's not used. -->
				<div class="setting-row">
					<label>Username:</label>
					<div class="setting-value">
						{{$store.getters.userPreferences.username}}
					</div>
				</div>

				<!-- Email Address -->
				<ChangeEmail></ChangeEmail>

			</div>
		</div>

		<!-- Public Profile -->
		<h1>Profile</h1>
		<div class="settings-group">
			<div class="settings-body">
				<ProfileSettings v-if="$store.getters.userPreferences.firebase_uid"></ProfileSettings>
			</div>
		</div>

		<!-- General Preferences -->
		<h1>Preferences</h1>
		<div class="settings-group">
			<div class="settings-body">
				<!-- Username -->
				<div class="setting-toggle">
					<div class="setting-toggle-input">
						<input id="animationToggle" type="checkbox" class="toggle" v-model="$store.getters.userPreferences.animations" @change="toggleAnimations()"/>
					</div>
					<label class="setting-toggle-label" for="animationToggle">
						UI Animations
						<small>You can turn off the UI animations like the ones that transition between pages.</small>
					</label>
				</div>
				<!-- Email Address -->
				<div class="setting-toggle">
					<div class="setting-toggle-input">
						<input id="darkmodeToggle" type="checkbox" class="toggle" v-model="$store.getters.userPreferences.darkMode" @change="toggleDarkMode()"/>
					</div>
					<label class="setting-toggle-label" for="darkmodeToggle">
						Dark Mode
					</label>
				</div>
			</div>
		</div>

		<!-- Change Password -->
		<h1>Change Password</h1>
		<div class="settings-group">
			<div class="settings-body">
				<!-- Change Password Component -->
				<ChangePassword></ChangePassword>
			</div>
		</div>

		<!-- Delete Account -->
		<h1>Delete Account</h1>
		<div class="settings-group">
			<div class="settings-body">
				<!-- Delete Account Component -->
				<DeleteAccount></DeleteAccount>
			</div>
		</div>



		<!-- Other Stuff -->
		<h1>Other Stuff</h1>
		<div class="settings-group">
			<div class="settings-body">

				<!-- Date Created -->
				<div class="setting-row">
					<label>User Since:</label>
					<div class="setting-value">
						{{ new Date($store.getters.userPreferences.user_created) | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}
					</div>
				</div>
				<!-- User Number -->
				<div class="setting-row">
					<label>User Number:</label>
					<div class="setting-value">
						{{ $store.getters.userPreferences.user_number }}
					</div>
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
	import toastMixin from "@/components/mixins/ui/toastMixin.js";
	import metaMixin from "@/components/mixins/metaMixin.js";
	import preferencesMixin from "@/components/mixins/preferencesMixin.js";
	import firebase from "firebase";
	import scrollLockMixin from "@/components/mixins/ui/scrollLockMixin.js";


	export default {
		name: 'settings',
		mixins: [
			toastMixin,
			scrollLockMixin,
			metaMixin,
			preferencesMixin,
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

	

</style>
