<!-- 
// Loader Component
// _________________________
// 
// 	Shows animated loader while page loads
//
//	- Props:
//		- graphic - curve
// 
-->
<template>
	<div class="loader-component">
		<inline-svg class="curve-animated" :src="require('../../assets/graphics/curve.svg')" v-if="!graphic || graphic == 'curve'"/>
		<div class="text">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: "Loader",
	mixins: [
	],
	components: {
	},
	props: [
		'graphic'
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

	////////////////////////////////
	////    Loading Spinner    ////
	//////////////////////////////
	.loader-component{
		margin: 25px auto;
		width: fit-content;
		text-align: center;
		position: relative;

		.curve-animated{
			.curve-1 {
				animation: curve-animation-stroke-1 1.5s cubic-bezier(0.47, 0, 0.745, 0.715) 0.05s both infinite alternate;
			}
			.curve-2 {
				animation: curve-animation-stroke-2 1.5s cubic-bezier(0.47, 0, 0.745, 0.715) 0.55s both infinite alternate;
			}
		}
		

		.text{
			font-weight: 600;
			letter-spacing: 0.4px;
			color: var(--text);
			margin-top: 25px;
			font-size: 20px;
			display: block;
			line-height: 26px;
		}
	}

//////////////////////
// Curve Animation //
////////////////////
@keyframes curve-animation-stroke-1 {
  0% {
    stroke-dashoffset: 309.53265380859375px;
    stroke-dasharray: 309.53265380859375px;
  }

  50% {
    stroke-dashoffset: 0;
  }
}
@keyframes curve-animation-stroke-2 {
  0% {
    stroke-dashoffset: 277.9577941894531px;
    stroke-dasharray: 277.9577941894531px;
  }

  50% {
    stroke-dashoffset: 0;
  }
}




</style>