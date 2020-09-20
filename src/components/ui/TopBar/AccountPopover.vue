<!-- 
// Account Popover Component
// Top bar, top right button, dropdown with profile and settings links
// _________________________
// 
-->
<template>
	<div class="settings-nav-popover">
		<!-- Only show to signed out users -->
		<!-- Sign In -->
		<button class="popover-link" @click="navigate('/signin')" aria-label="Login" v-if="!$store.getters.isSignedIn">
			<span>Sign In</span>
			<i class="far fa-lock"></i>
		</button>
		<!-- Register -->
		<button class="popover-link"  @click="navigate('/register')" aria-label="Create Account" v-if="!$store.getters.isSignedIn">
			<span>Sign Up</span>
			<i class="far fa-user-plus"></i>
		</button>

		<!-- Spacer -->
		<hr v-if="!$store.getters.isSignedIn"/>

		<!-- Account badge -->
		<div class="popover-username" v-if="$store.getters.isSignedIn">
			Hi <b>{{$store.getters.userPreferences.username}}</b>!
		</div>
		

		<!-- Your Business -->
		<!-- Only show for business owners-->
		<button class="popover-link" v-if="$store.getters.isSignedIn && $store.getters.userPreferences.has_business" @click="navigate('/co/' + $store.getters.userPreferences.business_url )" aria-label="Your Business Page">
			<span>Your Business</span>
			<i class="far fa-store"></i>
		</button>
		
		<!-- Show to signed in users -->
		<!-- Bookmarks -->
		<button class="popover-link" @click="navigate('/settings')" v-if="$store.getters.isSignedIn">
			<span>Your Bookmarks</span>
			<i class="far fa-bookmark"></i>
		</button>
		<!-- Settings -->
		<button class="popover-link" @click="navigate('/settings')" v-if="$store.getters.isSignedIn">
			<span>Preferences</span>
			<i class="far fa-toggle-off"></i>
		</button>


		<!-- Show to all users -->
		<!-- Toggle dark mode -->
		<button for="topBarDarkModeToggle" class="popover-link focusable" tabindex="0" aria-label="Toggle Dark" @click="toggleDarkMode();">
			<span v-if="!$store.getters.userPreferences.ui.dark_mode">Dark Mode</span>
			<span v-else>Light Mode</span>
			<i v-bind:class="{ 'far fa-lightbulb-slash': !$store.getters.userPreferences.ui.dark_mode, 'far fa-lightbulb-on': $store.getters.userPreferences.ui.dark_mode }"></i>
		</button>
		

		<!-- Spacer -->
		<hr v-if="$store.getters.isSignedIn"/>
		<!-- Sign out -->
		<button class="popover-link red" @click="signout()" aria-label="Sign Out" v-if="$store.getters.isSignedIn">
			<span>Sign Out</span>
			<i class="far fa-sign-out-alt"></i>
		</button>
		
	</div>
</template>

<script>
// Mixins
import preferencesMixin from "@/components/mixins/preferencesMixin.js";
import signOutMixin from "@/components/mixins/auth/signOutMixin.js";

export default {
	name: "SearchResults",
	mixins: [
		preferencesMixin,
		signOutMixin,
	],
	components: {
	},
	props: [
	],
	data() {
		return {
		};
	},
	created() {

	},
	mounted(){
	},
	methods: {
	}	
}	

</script>

<style lang="less">
	@import '~@/styles/variables.less';

	// Popup on hover
	.settings-nav-popover{
		display: block;
		width: 300px;
		max-width: 80vw;
		position: absolute;
		top: 74px;
		right: 0;
		background-color: var(--altBackground);
		border: 1px solid transparent;
		box-sizing: border-box;
		border-radius: var(--borderRadiusSmall);
		// border: 1px solid var(--borderFade);
		transform-origin: top center;
		padding: 10px 10px;
		box-shadow: var(--shadowDark);

		@media (max-width: @screenSM) {
			width: 260px;
			top: 64px;
			padding: 5px 10px 5px 10px;
		}

		// Change spacing on default hr
		hr{
			margin: 3px 0;
			border-color: var(--border);
		}

		// Username
		.popover-username{
			font-size: 22px;
			font-weight: bolder;
			display: block;
			text-align: center;
			box-sizing: border-box;
			width: 90%;
			color: var(--primary);
			margin: 0 auto;
			padding: 20px 0 5px 0;
		}

		// Links
		.popover-link{
			display: flex;
			justify-content: space-between;
			color: var(--text);
			height: 50px;
			width: 100%;
			padding: 0 20px;
			box-sizing: border-box;
			user-select: none;

			// Increase size on mobile
			@media (max-width: @screenMD) {
				padding: 0 10px;
				// height: 46px;
			}

			span, i{
				display: flex;
				flex-direction: column;
				justify-content: center;
				height: 50px;
			}
			span{
				font-weight: 700;
				box-sizing: border-box;
				transition: var(--transition);
				padding-left: 0;
				font-size: 16px;
				letter-spacing: 0.5px;

				@media (max-width: @screenSM) {
					font-size: 15px;
				}
			}
			i{
				font-size: 20px;
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
					padding-right: 6px;
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

			// Style variations
			// Red for signout
			&.red{
				span, i{
					color: var(--red);
				}
			}
		}
	}
</style>