<template>
	<div id="topBar">
		<!-- Branding - Logo -->
		<div id="branding">
			<div id="logo">
				<img src="@/assets/branding/logo-light.png" @click="navigate('/')" title="ABCDEFG Logo" v-if="!$store.getters.userPreferences.darkMode"/>
				<img src="@/assets/branding/logo-dark.png" @click="navigate('/')" title="ABCDEFG Logo" v-if="$store.getters.userPreferences.darkMode"/>
			</div>
		</div>

		<!--  
			Settings Nav
			Settings Nav Floated right
			Settings Nav
		-->
		<nav id="settingsNav" aria-label="Settings Menu">

			<!-- Nav for signed-in users -->
			<div class="settings-nav">
				<div class="settings-nav-dropdown" @click="showSettingsPopover = !showSettingsPopover" @mouseleave="showSettingsPopover = false">
					<!-- Hover label to show dropdown -->
					<div class="hover-label">
						<!-- Username -->
						<span v-if="$store.getters.isSignedIn">{{ $store.getters.userPreferences.username }}</span>
						<!-- Profile photo - if signed in and has one -->
						<div class="hover-label-photo" v-bind:style="'background-image: url(' + $store.getters.profilePhoto + ');'" v-if="$store.getters.isSignedIn && $store.getters.profilePhoto"></div>
						<!-- Not signed in -->
						<span v-if="!$store.getters.isSignedIn">Hey there!</span>
						<!-- Chevron down -->
						<i v-bind:class="{'far fa-chevron-circle-down': !showSettingsPopover, 'far fa-chevron-circle-up': showSettingsPopover}" v-if="!$store.getters.isSignedIn || !$store.getters.profilePhoto"></i>
					</div>
					<!-- Popup on hover/focus -->
					<div class="settings-nav-popover" v-bind:class="{'visible': showSettingsPopover}">
						<!-- Sign In -->
						<!-- Only show to signed out users -->
						<button class="popover-link" @click="navigate('/signin')" aria-label="Login" v-if="!$store.getters.isSignedIn">
							<span>Sign In</span>
							<i class="far fa-lock"></i>
						</button>
						<!-- Register -->
						<!-- Only show to signed out users -->
						<button class="popover-link"  @click="navigate('/register')" aria-label="Create Account" v-if="!$store.getters.isSignedIn">
							<span>Create Account</span>
							<i class="far fa-user-plus"></i>
						</button>
						<!-- Spacer -->
						<hr v-if="!$store.getters.isSignedIn"/>
						<!-- Show to all users -->
						<!-- Toggle dark mode -->
						<label for="topBarDarkModeToggle" class="popover-link" tabindex="1">
							<span v-if="!$store.getters.userPreferences.darkMode">Dark Mode</span>
							<span v-else>Light Mode</span>
							<i v-bind:class="{ 'far fa-lightbulb-slash': !$store.getters.userPreferences.darkMode, 'far fa-lightbulb-on': $store.getters.userPreferences.darkMode }"></i>
						</label>
						<input type="checkbox" id="topBarDarkModeToggle" v-model="$store.getters.userPreferences.darkMode" @change="toggleDarkMode()" hidden/>
						<!-- Profile -->
						<!-- Show to signed in users -->
						<button class="popover-link" @click="navigate('/user/' + $store.getters.userPreferences.username )" v-if="$store.getters.isSignedIn">
							<span>Profile</span>
							<i class="far fa-user"></i>
						</button>
						<!-- Settings -->
						<!-- Show to signed in users -->
						<button class="popover-link" @click="navigate('/settings')" v-if="$store.getters.isSignedIn">
							<span>Settings</span>
							<i class="far fa-cog"></i>
						</button>
						<!-- Spacer -->
						<hr v-if="$store.getters.isSignedIn"/>
						<!-- Sign out -->
						<!-- Only show to signed in users -->
						<button class="popover-link" @click="signout()" aria-label="Sign Out" v-if="$store.getters.isSignedIn">
							<span>Sign Out</span>
							<i class="far fa-sign-out-alt"></i>
						</button>
					</div>
				</div>
			</div>
		</nav>
	</div>
</template>

<script>
import navigateMixin from "@/components/mixins/navigateMixin.js";
import preferencesMixin from "@/components/mixins/preferencesMixin.js";
import signOutMixin from "@/components/mixins/auth/signOutMixin.js";


export default {
	name: "Sidebar",
	mixins: [
		navigateMixin,
		preferencesMixin,
		signOutMixin,
	],
	data() {
		return {
			showSettingsPopover: false,
		};
	},
	methods: {

	}
};
</script>

<style lang="less">

	@import '~@/styles/variables.less';

	// Top nav bar
	// Has logo and hover menu for account/dark mode
	#topBar{
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 0 20px;
		box-sizing: border-box;
		height: 70px;
		position: sticky;
		top: 0px;
		background: var(--navBackground);
		z-index: 50;

		&:after{
			content: ' ';
			width: 0px;
			height: 0px;
			position: absolute;
			opacity: 0;
			transition: all 0s ease 0.22s, opacity 0.22s ease;
		}


		// Adjust padding on larger screens
		@media (min-width: @screenMD) {
			padding: 0 35px;
		}

		// Logo
		#branding{
			display: flex;
			flex-direction: column;
			justify-content: center;

			#logo{
				transform: scale(1.0);
				transition: var(--transition);

				img{
					height: 38px;
					width: auto;
				}

				&:hover{
					transition: var(--transition);
					cursor: pointer;
					transform: scale(0.975);
				}
			}
		}
	}


	// settings Nav
	// settings Nav
	// settings Nav
	// Contained inside top nav- wanted styling seperatet
	nav#settingsNav{
		display: flex;
		box-sizing: border-box;
		height: 100%;
		// Username with dropdown
		// For signed in users
		.settings-nav{
			display: flex;
			flex-direction: column;
			justify-content: center;

			.settings-nav-dropdown{
				position: relative;
				padding: 8px 0;
				z-index: 100;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;

				// Username and chevron down
				.hover-label{
					color: var(--text);
					font-weight: 800;
					box-sizing: border-box;
					display: flex;
					min-width: 160px;
					justify-content: flex-end;

					// Profile photo
					.hover-label-photo{
						display: block;
						height: 34px;
						width: 34px;
						border-radius: var(--borderRadius);
						margin-left: 10px;
						background-size: cover;
						position: relative;
						top: -2px;

						// Adjust padding on larger screens
						@media (min-width: @screenMD) {
						}
					}

					span,i{
						display: inline-flex;
						flex-direction: column;
						justify-content: center;
					}
					span{
						letter-spacing: 0.3px;
						font-size: 16px;
						font-weight: 800;
						letter-spacing: 0.3px;
					}
					i{
						margin-left: 10px;
						font-size: 22px;
						font-weight: 500;
						padding-bottom: 2px;
						transition: var(--transition);

						// Decrease margin on mobile
						@media (max-width: @screenMD) {
							margin-left: 8px;
						}
					}
				}

				// Hover dropdown
				&:hover{
					cursor: pointer;

					.hover-label{
						span{
							text-decoration: underline;
						}
					}
				}


				// Popup on hover
				.settings-nav-popover{
					display: block;
					width: 200px;
					position: absolute;
					top: 56px;
					transition: 0.1s ease;
					right: 0;
					max-height: 0;
					overflow: hidden;
					background-color: var(--backgroundLayer);
					box-shadow: var(--shadow);
					box-sizing: border-box;
					border-radius: var(--borderRadiusSmall);
					padding: 0 10px;
					overflow: 0;
					// Increase size on mobile
					@media (max-width: @screenMD) {
						width: 220px;
					}

					// Visible Class
					&.visible{
						max-height: 220px;
						transition: 0.15s ease;
						padding: 10px;
						overflow: 1;
					}

					// Change spacing on default hr
					hr{
						border-color: var(--borderFade);
						margin: 4px 0 3px 0;
					}

					// Links
					.popover-link{
						display: flex;
						justify-content: space-between;
						color: var(--text);
						height: 40px;
						width: 100%;
						padding: 0 10px;
						box-sizing: border-box;

						// Increase size on mobile
						@media (max-width: @screenMD) {
							height: 44px;
							padding: 0 2px;
						}

						span, i{
							display: flex;
							flex-direction: column;
							justify-content: center;
							height: 40px;

							@media (max-width: @screenMD) {
								height: 44px;
							}
						}
						span{
							font-weight: 700;
							box-sizing: border-box;
							transition: var(--transitionFast);
							padding-left: 0;
							font-size: 14px;
							letter-spacing: 0.5px;

							// Increase size on mobile
							@media (max-width: @screenMD) {
								font-size: 15px;
								padding-left: 10px;
							}
						}
						i{
							font-size: 18px;
							width: 30px;
							text-align: center;

							&.fa-user-cog,
							&.fa-sign-out-alt,
							&.fa-user-plus{
								position: relative;
								left: 4px;
							}

							// Increase size on mobile
							@media (max-width: @screenMD) {
								font-size: 22px;
								padding-right: 10px;
							}
						}

						&:hover,
						&:focus{
							text-decoration: none;
							cursor: pointer;
							span{
								text-decoration: underline;
							}
						}
						&:active{
							span{
								text-decoration: underline;
								padding-left: 6px;
								transition: var(--transitionFast);
							}
						}

						// Style variations
						// Red for signout
						&.red{
							span, i{
								color: var(--red);
							}
						}
					}
				}

			}
		}
	}
	
</style>