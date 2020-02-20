<template>
	<div id="notFound" class="page">
		<div class="ope">
			four
			<b>ope</b>
			four
		</div>
		<div class="error-text">
			Whoops. It looks like that page doesn't exist.
		</div>
		<div class="error-nav">
			<button class="button blue" aria-label="Go Home" @click="navigate('/')">
				Try the home page
				<i class="far fa-mitten"></i>
			</button>
		</div>
	</div>
</template>

<script>
	import navigateMixin from "@/components/mixins/navigateMixin.js";

	export default {
		name: 'error404',
		mixins: [
			navigateMixin,
		],
		components: {
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	@import '~@/styles/variables.less';

	#notFound{
		color: var(--text);

		.ope{
			font-size: 110px;
			font-weight: 900;
			position: relative;
			z-index: 35;
			line-height: 60px;
			letter-spacing: -2px;
			display: block;
			width: fit-content;

			@media (max-width: @screenMD) {
				margin: 0 auto;
				padding: 35px 0;
			}

			b{
				display: block;
				color: var(--blue);
				padding-bottom: 22px;
			}
		}

		// Actual text for error
		.error-text{
			font-size: 26px;
			font-weight: 600;
			line-height: 32px;
			padding: 45px 0 20px 0;
			display: block;
			max-width: 450px;
			color: var(--textLighter);
		}

		// Buttons to link elsewhere
		.error-nav{
			padding: 15px 0 35px 0;
		}
	}
</style>
