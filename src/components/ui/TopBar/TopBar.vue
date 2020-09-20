<!-- 
// 	Top Navigation bar
// 	_________________________
// 
// 	 Bar at top of screen with logo and account/settings dropdown
// 		Visible on all screen sizes
// 			70px height 
// 			Sticky, floating on top of most things (not modals)
// 
-->

<template>
	<div id="topBar">
		
		<!-- Branding - Logo -->
		<div id="branding">
			<button id="logo" @click="navigate('/')" tabindex="0" aria-label="Home">
				<img class="desktop" src="@/assets/branding/logo-light-text.png" title="ABCDEFG Logo" v-if="!$store.getters.userPreferences.ui.dark_mode"/>
				<img class="desktop" src="@/assets/branding/logo-dark-text.png"  title="ABCDEFG Logo" v-if="$store.getters.userPreferences.ui.dark_mode"/>
				<img class="mobile" src="@/assets/branding/logo-light.png" title="ABCDEFG Logo" v-if="!$store.getters.userPreferences.ui.dark_mode"/>
				<img class="mobile" src="@/assets/branding/logo-dark.png"  title="ABCDEFG Logo" v-if="$store.getters.userPreferences.ui.dark_mode"/>
			</button>
		</div>

		<!-- Float center - search bar -->
		<div id="centerNav">
			
			<!-- Search bar -->
			<div id="navSearchWrapper">
				<div id="navSearchInputWrapper">
					<i class="far fa-telescope search-icon"></i>
					<input type="text" :class="{'searching': showSearchResults && searchText}" :value="searchText" @input="e => searchText = e.target.value" @focus="showSearchResults = true" placeholder="Search for things" aria-label="Search for things"/>
					<button @click="searchText = ''" v-if="searchText"><i class="far fa-times-circle"></i></button>
				</div>
				<!-- <input type="text" v-model="searchText" @input="showSearchResults = true" @focus="showSearchResults = true" placeholder="Search for things" aria-label="Search for things"/> -->
				<!-- Results component -->
				<transition name="collapse">
					<SearchResults v-if="searchText && showSearchResults" :search="searchText" tabindex="0"></SearchResults>
				</transition>

				<!-- Backdrop -->
				<transition name="lightbox">
					<div class="results-backdrop" @click="showSearchResults = false" v-if="showSearchResults && searchText"></div>
				</transition>

			</div>

			<!-- Weather -->
			<!-- <WeatherPopover v-if="$store.getters.userPreferences.location"></WeatherPopover> -->
		</div>

		<!--  
			Settings Nav
			Settings Nav Floated right
			Settings Nav
		-->
		<nav id="settingsNav" aria-label="Settings Menu">

			<!-- Nav for signed-in users -->
			<div class="settings-nav">
				<div class="settings-nav-dropdown">
					<!-- Hover label to show dropdown -->
					<button class="hover-label" @click="showSettingsPopover = !showSettingsPopover" aria-label="Account Dropdown">
						<!-- Username -->
						<!-- <span v-if="$store.getters.isSignedIn">{{$store.getters.userPreferences.username}}</span> -->
						<!-- Profile photo - if signed in and has one -->
						<!-- <div class="hover-label-photo" v-bind:style="'background-image: url(' + $store.getters.profilePhoto + ');'" v-if="$store.getters.isSignedIn && $store.getters.profilePhoto"></div> -->
						<!-- Not signed in -->
						<span v-if="!$store.getters.isSignedIn">Hey there!</span>
						<!-- Toggle icon -->
						<i v-if="$store.getters.isSignedIn" v-bind:class="{'far fa-user-circle': !showSettingsPopover, 'far fa-chevron-circle-up': showSettingsPopover}"></i>
						<i v-if="!$store.getters.isSignedIn" v-bind:class="{'far fa-chevron-circle-down': !showSettingsPopover, 'far fa-chevron-circle-up': showSettingsPopover}"></i>
						<!-- <i v-bind:class="{'far fa-mitten': !showSettingsPopover && !$store.getters.isSignedIn, 'far fa-user-circle': !showSettingsPopover && $store.getters.isSignedIn, 'far fa-chevron-circle-up': showSettingsPopover}"></i> -->
					</button>
					<!-- Popup on hover/focus -->
					<span @click="showSettingsPopover = false"  @mouseleave="showSettingsPopover = false">
						<transition name="collapse">
							<AccountPopover v-if="showSettingsPopover"></AccountPopover>
						</transition>
					</span>
				</div>
			</div>
		</nav>

	</div>
</template>

<script>
// Mixins
import preferencesMixin from "@/components/mixins/preferencesMixin.js";
// Components
import SearchResults from "@/components/ui/TopBar/SearchResults";
import AccountPopover from "@/components/ui/TopBar/AccountPopover";
import WeatherPopover from "@/components/ui/TopBar/WeatherPopover";

export default {
	name: "TopBar",
	components: {
		SearchResults,
		AccountPopover,
		WeatherPopover,
	},
	mixins: [
		preferencesMixin,
	],
	data() {
		return {
			searchText: "",
			showSearchResults: false,
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
		padding: 0 25px 0 40px;
		box-sizing: border-box;
		height: 64px;
		position: sticky;
		top: 0px;
		backdrop-filter: blur(3px);
		background: var(--navBackground);
		z-index: 50;
		backdrop-filter:  grayscale(50%) blur(4px);

		// Adjust padding and height on smaller screens
		@media (max-width: @screenMD) {
			padding: 0 20px;
			background: var(--navBackground);
			height: 60px;
		}
		@media (max-width: @screenSM) {
			height: 54px;
			padding: 0 15px;
		}

		// Logo
		#branding{
			display: flex;
			flex-direction: column;
			justify-content: center;
			width: 200px;

			@media (max-width: @screenMD) {
				width: auto;
			}

			#logo{
				transition: var(--transition);
				margin: 0 15px 0 0;
				padding: 0;

				img{
					height: 38px;
					width: auto;
					@media (max-width: @screenMD) {
						height: 38px;
					}
					@media (max-width: @screenSM) {
						height: 32px;
					}

					&.desktop{
						display: block;
						@media (max-width: @screenMD) {
							display: none;
						}
					}
					&.mobile{
						display: none;
						@media (max-width: @screenMD) {
							display: block;
						}
					}
				}

				&:hover{
					cursor: pointer;
				}
			}
		}
	}


	// Center Nav
	// Center Nav
	// Center Nav
	// Center aligned navbar area - searchbar
	#centerNav{
		flex-grow: 3;
		max-width: 800px;
		display: flex;
		justify-content: center;
		box-sizing: border-box;
		position: relative;


		// Search Bar
		#navSearchWrapper{
			display: flex;
			height: 100%;
			flex-direction: column;
			justify-content: center;
			flex-grow: 3;
			max-width: 560px;
			position: relative;
			margin: 0 10px;

			#navSearchInputWrapper{
				display: flex;
				position: relative;
				z-index: 100;
				
				// Search icon - floats over
				.search-icon{
					left: 0px;
					position: absolute;
					padding-left: 12px;
					font-size: 18px;
					color: var(--text);
					opacity: 0.25;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					box-sizing: border-box;

					@media (max-width: @screenMD) {
						padding-left: 8px;
						font-size: 16px;
					}
				}

				// Text input
				input{
					width: 100%;
					height: 40px;
					padding-left: 44px;
					border: 1px solid transparent;
					box-shadow: none;
					// background-color: transparent;
					// border: 1px solid var(--border);

					&.searching{
						background-color: white;
						border: 1px solid var(--border);
						box-shadow: var(--shadow);
					}

					@media (max-width: @screenMD) {
						height: 34px;
						padding-left: 36px;
					}
				}

				// Clear input button
				button{
					position: absolute;
					right: 0;
					height: 100%;
					padding: 0 15px;
					transition: 0.1s;
					opacity: 0.35;

					&:hover{
						transition: 0.1s;
						cursor: pointer;
						opacity: 1;
					}
				}
			}


			

			// Backdrop/lightbox
			.results-backdrop{
				display: block;
				width: 100%;
				height: 500px;
				position: fixed;
				background-color: var(--lightbox);
				width: 100vw;
				height: 100vh;
				top: 0;
				left: 0;
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
		width: 200px;
		justify-content: flex-end;

		@media (max-width: @screenMD) {
			width: auto;
		}

		// Username with dropdown
		// For signed in users
		.settings-nav{
			display: flex;
			flex-direction: column;
			justify-content: center;

			.settings-nav-dropdown{
				position: relative;
				padding: 8px 0;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				margin-left: 10px;

				// Username and chevron down
				.hover-label{
					color: var(--text);
					font-weight: 800;
					box-sizing: border-box;
					display: flex;
					// min-width: 160px;
					justify-content: flex-end;
					user-select: none;
					height: 80%;

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
					}
					// label and icon
					span,i{
						display: inline-flex;
						flex-direction: column;
						height: 100%;
						justify-content: center;
					}
					// Label text - either username or "Hey There!"
					span{
						letter-spacing: 0.3px;
						font-size: 16px;
						font-weight: 800;
						letter-spacing: 0.3px;
						padding-right: 8px;

						@media (max-width: @screenSM) {
							font-size: 14.5px;
							display: none;
						}
					}
					// Caret down arrow
					i{
						font-size: 22px;
						font-weight: 500;
						padding-bottom: 2px;
						transition: var(--transition);
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
			}
		}
	}

	// Mozilla doesn't support backdrop-filter, set to white instead
	@-moz-document url-prefix() {
		#topBar {
			background: var(--background) !important;
		}
	}

</style>