<!-- 
// Moderator component
// _________________________
// 
// 	Bar with moderation options to flag or edit different posts (resources, businesses, etc),
// 
// 		Accepts props:  
// 			- docid: Id of document to be edited/flaged/etc
// 			- type: What type of document (optional - needed to flag)
// 
// 		Emits:
// 			- "" - sends address object
// 
// 		flag():
// 			-Adds post ID to flagged list in firestore site meta collection
// 
-->

<template>
	<div>
		<!-- @change="!$refs.autocomplete.value.length && $emit('cleared')" -->
		<button class="button small red" v-on:click.stop="flag()">
			<i class="far fa-flag"></i>
			<span>Flag Post</span>
		</button>
	</div>
</template>

<script>
// Mixins
import { db } from "@/store/firebase";
import formatMixin from "@/components/mixins/formatMixin.js";

export default {
	name: "Moderator",
	mixins: [
		formatMixin,
	],
	components: {
	},
	props: [
		'docid',
		'type',
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
		/////////////////
		//    Flag    //
		///////////////
		flag: function() {

			let _this = this;

			var field = {}
			field[_this.docid] = "true";
			if(_this.type == 'resource'){
				db.collection("site").doc("flagged_"+ _this.type +"s").set(field, { merge: true }).then(() => {
					console.log('Successfully flagged ' + _this.type)
				}).catch(error => {
					console.error('There was an error editing preferences: ' + error)
				})
			}
		},

	}	
}	

</script>

<style lang="less">
	@import '~@/styles/variables.less';


</style>