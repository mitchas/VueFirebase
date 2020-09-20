<!-- 
// NavBar
// _________________________
// 	Navigation bar
// 
// 		Left-hand sidebaron desktop
// 		Bottom bar on mobile
// 
-->

<template>
	<div id="sidebar">

		<nav id="navigationBar" aria-label="Navigation Menu" v-bind:class="{ 'hide-keyboard': $store.getters.softKeyboard }">
			<!-- Home/Dashboard -->
			<button class="icon-link" @click="navigate('/')" aria-label="Home Page" v-bind:class="{'is-active': $route.name == 'home'}">
				<i class="far fa-sparkles"></i>
				<span>Home</span>
			</button>
			<!-- Explore -->
			<button class="icon-link" @click="navigate('/explore/')" aria-label="Explore" v-bind:class="{'is-active': $route.name == 'explore'}">
				<i class="far fa-street-view"></i>
				<!-- <i class="far fa-compass"></i> -->
				<span>Explore</span>
			</button>
			<!-- Resources -->
			<button class="icon-link" @click="navigate('/more/')" aria-label="More" v-bind:class="{'is-active': $route.name == 'more'}">
				<i class="far fa-books"></i>
				<span>More</span>
			</button>

			<!-- 
				/////////////////////
				// Optional Links //
				///////////////////
			 -->
			<!-- Admin -->
			<button class="icon-link red" @click="navigate('/admin/')" aria-label="Admin" v-bind:class="{'is-active': $route.path.startsWith('/admin')}" v-if="$store.getters.userPreferences.admin_level > 0">
				<i class="far fa-crown"></i>
				<span>Admin</span>
			</button>
			
		</nav> <!-- End Nav Links -->

	</div>
</template>

<script>
// Mixins
import scrollLockMixin from "@/components/mixins/ui/scrollLockMixin.js";

export default {
	name: "NavBar",
	mixins: [
		scrollLockMixin,
	],
	data() {
		return {
		};
	},
	mounted() {
		
	},
	methods: {
	}
};
</script>

<style lang="less">

	@import '~@/styles/variables.less';

	#sidebar{
		display: block;
		height: auto;
		overflow: visible;
		z-index: 45;
		width: 200px;
		min-width: 200px;
		max-width: 200px;
		box-sizing: border-box;
		padding: 30px 0 0 25px;

		// Hide actual sidebar and all other content on mobile, only show #navigationBar
		@media (max-width: @screenMD) {
			padding: 0;
			width: 0px;
			min-width: 0px;
			max-width: none;
		}

		// Main content of sidebar
		#navigationBar{
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			position: sticky;
			// 92 offset to account for top bar and padding
			top: 92px;

			// Large mobile - convert to bottom tab bar
			@media (max-width: @screenMD) {
				background: var(--navBackground);
				backdrop-filter: blur(3px);
				position: fixed;
				bottom: 0px;
				left: 0px;
				top: unset;
				width: 100%;
				padding: 0px 8px;
				z-index: 600;
				height: 60px;
				flex-direction: row;
				justify-content: space-around;
				transition: 0.05s ease;

				// Hide if on screen keyboard is visible
				&.hide-keyboard{
					bottom: -65px;
					transition: 0.05s ease;
				}
			}
			@media (max-width: @screenSM) {
				height: 50px;
			}

			// Link elements
			a,
			.icon-link{
				margin: 0 0 0 0;
				display: flex;
				height: 40px;
				text-decoration: none;
				border: 2px solid transparent;
				box-sizing: border-box;
				border-radius: var(--borderRadiusSmall);
				padding: 0 0 0 10px;
				width: 100%;
				margin-bottom: 5px;

				// Stacked on mobile, bottom bar
				@media (max-width: @screenMD) {
					border: none;
					margin: 0;
					padding: 0;
					height: 100%;
					width: 25%;
					text-align: center;
					display: block;
				}

				*{
					transition: var(--transition);
				}

				i,
				span{
					display: flex;
					flex-direction: column;
					color: var(--textLight);
					justify-content: center;
					height: 100%;
					opacity: 1;
					
					// Mobile
					@media (max-width: @screenMD) {
						text-align: center;
						color: var(--textLighter);
						margin: 0 auto;
						min-width: 100%;
					}
				}

				i{
					font-size: 18px;
					width: 34px;
					margin-right: 4px;
					text-align: center;
					position: relative;

					// Mobile
					@media (max-width: @screenMD) {
						font-size: 18px;
						width: 100%;
						display: inline-block;
						font-weight: 300;
						margin: 0 0 4px 0;
						height: fit-content;
					}
					@media (max-width: @screenSM) {
						font-size: 22px;
					}
				}

				span{
					font-size: 16px;
					box-sizing: border-box;
					letter-spacing: 0.35px;
					font-family: var(--systemFont);
					font-weight: 600;
					// Large mobile, tweak size
					@media (max-width: @screenMD) {
						font-size: 13px;
						letter-spacing: 0px;
						font-weight: 500;
						height: fit-content;
						width: 100%;
					}
				}

				// Hover State
				&:hover{
					*{
						transition: var(--transition);
					}
					&:after,span,i{
						opacity: 1;
						color: var(--text);
					}
					span{
						text-decoration: underline;
					}
				}

				// Active Link
				&.is-active{
					// border: 1px solid var(--borderHover);
					background-color: var(--backgroundLayer);

					// Chevron right on mobile
					&:after,
					span,
					i{
						color: var(--active);
						opacity: 1;
						@media (max-width: @screenMD) {
							color: var(--active);
						}
					}
					i{
						color:var(--active);
					}
					&:hover span{
						text-decoration: none;
					}


					// Large mobile, no border
					// Add dot below
					@media (max-width: @screenMD) {
						border: none;
						border-radius: 0;
						position: relative;
						background-color: transparent;
						box-shadow: none;
						// background-color: var(--primaryLight);

						span,i{
							color: var(--active);
						}
						i{
							font-weight: 600;
						}

						&:before{
							// content: '';
							width: 10px;
							height: 10px;
							border-radius: 50%;
							background-color: var(--text);
							position: absolute;
							bottom: -3px;
							left: 50%;
							margin-left: -5px;
						}

					}
				}

				// Active click down
				&:active{
					@media (max-width: @screenSM) {
						// Chevron right
						&:after{
							opacity: 0.5;
							transition: var(--transition);
						}
						i, span{
							opacity: 0.5;
						}
					}
				}

				// Red, admin only
				&.red{
					span,i{
						color: var(--red);
					}

					&.is-active{
						background-color: var(--red);

						span,i{
							color: var(--white);
						}
					}
				}
			}
		} // End Sidebar Body


	} // End Sidebar


	// Mozilla doesn't support backdrop-filter, set to white instead
	@-moz-document url-prefix() {
		#navigationBar {
			@media (max-width: @screenMD) {
				background: var(--background) !important;
			}
		}
	}
		
</style>