<!-- 
// Search Results Component
// Shows below search input container on focus
// _________________________
// 
// 	More visible text callout with icon on left,
// 		Accepts props:  
// 			- searchText: string fron search input
// 
-->
<template>

	<div>
		
		<div id="globalSearchResults">

			<h6 class="pbottom-xs">Pages</h6>

			<button class="result" v-for="page in searchPages" :key="page.name">
				<i class="far" :class="page.icon"></i>
				<div class="result-text">
					<span>Search for <b>"{{search}}"</b> in <b>{{page.name}}</b></span>
				</div>
			</button>

		</div>
		
	</div>
		
</template>

<script>
export default {
	name: "SearchResults",
	mixins: [
	],
	components: {
	},
	props: [
		'search',
	],
	data() {
		return {
			searchPages: [
				{
					icon: 'fa-street-view',
					name: 'Explore'
				},{
					icon: 'fa-users',
					name: 'People'
				},{
					icon: 'fa-calendar-day',
					name: 'Events'
				}
			],
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


	#globalSearchResults{
		transform-origin: top center;
		display: block;
		width: 100%;
		position: absolute;
		top: 100%;
		background-color: var(--background);
		box-sizing: border-box;
		padding: 25px;
		border-radius: var(--borderRadius);
		box-shadow: var(--shadowDark);
		z-index: 1000;

		// Fixed with to prevent from getting too small
		@media (max-width: @screenLG) {
			padding: 20px;
			width: 480px;
		}
		// Fixed position on md screen, full 80%
		@media (max-width: @screenMD) {
			position: fixed;
			left: 10%;
			width: 80%;
		}
		// A little wider
		@media (max-width: @screenSM) {
			left: 4%;
			width: 92%;
		}

		.result{
			display: flex;
			box-sizing: border-box;
			padding: 12px 0;
			width: 100%;
			border-radius: 4px;

			i{
				width: 40px;
				transform: scale(1.3);
				text-align: center;
			}

			.result-text{
				font-size: 16px;
				display: flex;
				height: 100%;
				b{
					font-weight: bolder;
				}

				@media (max-width: @screenMD) {
					font-size: 15px;
				}
			}

			// Hover result

			&:hover,
			&:focus{
				background-color: var(--backgroundLayer);

				.result-text{
					text-decoration: underline;
				}
			}
		}
	}

</style>