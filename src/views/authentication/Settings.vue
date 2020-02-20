<template>

	<div id="settingsPage" class="page">
		<h1>Settings</h1>

		<!-- Account -->
		<div class="settings-group">
			<div class="settings-body">
				<!-- Username -->
				<div class="setting-row">
					<div class="setting-label">Username:</div>
					<div class="setting-value">{{$store.getters.userPreferences.username}}</div>
				</div>
				<!-- Email Address -->
				<div class="setting-row">
					<div class="setting-label">Email Address:</div>
					<div class="setting-value">{{$store.getters.userPreferences.email}}</div>
				</div>
			</div>
		</div>

		<!-- General Preferences -->
		<h2>Preferences</h2>
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

		<h2>Change Password</h2>
		<!-- Change Password -->
		<div class="settings-group">
			<div class="settings-body">
				<!-- Change Password Component -->
				<ChangePassword></ChangePassword>
			</div>
		</div>

		<h2>Delete Account</h2>
		<!-- Delete Account -->
		<div class="settings-group">
			<div class="settings-body">
				<!-- Delete Account Component -->
				<DeleteAccount></DeleteAccount>
			</div>
		</div>


	</div>
</template>

<script>
	// Components
	import ChangePassword from "@/components/settings/ChangePassword";
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
			preferencesMixin
		],
		data() {
			return {
				newPassword: '',
				verifyNewPassword: '',
				// Setting toggles
			};
		},
		components: {
			ChangePassword,
			DeleteAccount
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

	// Page wrapper
	#settingsPage{

		h2{
			// background-color: red;
			// margin-top: 10px;
			margin: 0;
			padding: 0;
		}
	}

	// Group of settings
	.settings-group{
		margin: 10px auto 50px auto;

		// Settings group body
		.settings-body{
			box-sizing: border-box;
			padding: 0 0;

			// Horizontal row layout for settings
			.setting-row{
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				width: 400px;
				padding: 10px 0;
				position: relative;

				@media (max-width: @screenMD) {
					width: 100%;
				}

				.setting-label{
					font-weight: 500;
					font-size: 14px;
					letter-spacing: 0.3px;
					display: block;
					padding: 0 0 6px 0;
				}
				.setting-value{
					display: block;
					font-weight: 600;
					font-size: 18px;
					letter-spacing: 0.4px;
				}
			}

			// Horizontal row layout for toggles
			.setting-toggle{
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				width: 400px;
				padding: 10px 0;
				position: relative;

				@media (max-width: @screenMD) {
					width: 100%;
				}

				.setting-toggle-input{
					display: block;
					padding-right: 15px;
				}

				.setting-toggle-label{
					font-weight: 500;
					font-size: 14px;
					letter-spacing: 0.3px;
					display: block;
					display: flex;
					flex-direction: column;
					justify-content: center;
					font-size: 16px;
					letter-spacing: 0.4px;
					font-weight: 600;

					small{
						font-size: 12px;
						font-weight: 400;
						line-height: 16px;
						padding-top: 10px;
						font-family: var(--systemFont);
					}
				}
				
			}
		}
	}

</style>
