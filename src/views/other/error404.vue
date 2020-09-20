<!--
//  404 page
// _________________________
//  Super simple 404 page with link home
// 
-->

<template>
	<div class="page">

		<div class="not-found">
			<!-- Error Text -->
			<div class="error-title">
				Ope
			</div>
			<!-- Error text -->
			<div class="error-text">
				We can't find the page you're looking for...
			</div>
			<!-- Action -->
			<div class="error-nav">
				<button class="button" aria-label="Go Home" @click="navigate('/')">
					<i class="far fa-home"></i>
					<span>Try the Home Page</span>
				</button>
			</div>
		</div>

	</div>
</template>

<script>
	// Mixins

	export default {
		name: 'error404',
		mixins: [
		],
		components: {
		},
		created: function () {
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	@import '~@/styles/variables.less';

	.not-found{

		// Remove padding for sidebar
		@media (max-width: @screenMD) {
			left: 0px;
		}

		.error-title{
			font-size: 20px;
			font-weight: 900;
			position: relative;
			z-index: 35;
			letter-spacing: 0.2px;
			display: block;
			width: 100%;
		}

		// Actual text for error
		.error-text{
			font-size: 26px;
			font-weight: 500;
			line-height: 32px;
			padding: 10px 0 20px 0;
			display: block;
			max-width: 360px;
			font-weight: bolder;

			// Center, full width on mobile
			@media (max-width: @screenMD) {
				max-width: none;
				text-align: center;
				width: 100%;
			}

			small{
				font-size: 18px;
				font-weight: 500;
			}
		}

		// Buttons to link elsewhere
		.error-nav{
			padding: 15px 0 35px 0;

			// Center, full width on mobile
			@media (max-width: @screenMD) {
				max-width: none;
				text-align: center;
				width: 100%;
			}
		}
	}
</style>
