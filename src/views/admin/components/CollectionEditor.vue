<!--
// 
// CollectionEditor.vue
// _________________________
//
//	Loads collection from Firebase to edit
//
// -->

<template>
	<div class="page form-page">

		<!-- City Entry -->
		<div v-if="$store.getters.userPreferences.admin_level > 1" class="mbottom-sm">
			<h3 class="mbottom-sm">Collection Editor</h3>
			<div class="field">
				<!-- City Name -->
				<input type="text" v-model="city.name" class="mbottom-xs" placeholder="Name" autocapitalize="none">
				<input type="text" v-model="city.county" class="mbottom-xs" placeholder="County" autocapitalize="none">
				<!-- Get collection -->
				<button class="button small mright-sm" @click="getCollection()">
					<i class="far fa-cloud-download"></i>
					<span>Get Colletion</span>
				</button>
				<!-- Replace collection -->
				<button class="button small mright-sm" @click="replaceCollection()" >
				<!-- <button class="button small mright-sm" @click="replaceCollection()" v-if="$store.getters.hostName == 'localhost'"> -->
					<i class="far fa-cloud-upload"></i>
					<span>Upload & Replace</span>
				</button>
			</div>
		</div>

		<!-- Data Syncing -->
		<div v-if="$store.getters.userPreferences.admin_level > 1" class="mbottom-sm">
			<h3 class="mbottom-sm">Data Syncing</h3>
			<div class="field">
				<!-- Collection name input -->
				<input type="text" v-model="collection" class="mbottom-xs" placeholder="Collection name - ie 'tracking'" autocapitalize="none">
				<!-- Get collection -->
				<button class="button small mright-sm" @click="getCollection()">
					<i class="far fa-cloud-download"></i>
					<span>Get Colletion</span>
				</button>
				<!-- Replace collection -->
				<button class="button small mright-sm" @click="replaceCollection()" >
				<!-- <button class="button small mright-sm" @click="replaceCollection()" v-if="$store.getters.hostName == 'localhost'"> -->
					<i class="far fa-cloud-upload"></i>
					<span>Upload & Replace</span>
				</button>
			</div>
		</div>

		<!-- Output -->
		<div class="field mtop-md">
			<textarea v-model="dataIO" id="ioTextarea"></textarea>
		</div>


	</div>
</template>

<script>
import { db } from "@/store/firebase";
import firebase from "firebase";
// Components
import Callout from "@/components/ui/Callout";
// Mixins
// Definitions
require('vue-moment');

export default {
	name: "home",

	components: {
		Callout,
	},

	mixins: [
	],

	data() {
		return {
			// Collection to get
			collection: '',
			// Output received
			dataIO: '',
			// Show input and output
			showIO: false,
		}
	},

	mounted() {
	},

	computed: {
	},
	
	methods: {

		/////////////////////
		// Get Collection //
		///////////////////
		getCollection: function(){
			let _this = this;

			var dataObject = {};
			db.collection(_this.collection).get().then(function(querySnapshot) {
				var count = 0;
				querySnapshot.forEach(function(doc) {
					count ++;
					dataObject[doc.id] = doc.data();
					// Concat results, save to queryResults
					if(count == querySnapshot.docs.length){
						// _this.trackingData = _.concat(_this.trackingData, resultsToAdd)
						_this.dataIO = JSON.stringify(dataObject)
					}
				});	
			}).catch(function(error) {
				_this.dataIO = "Error getting collection: " + error.msg
			});

		},

		/////////////////////////
		// Replace Collection //
		///////////////////////
		replaceCollection: function(){
			let _this = this;

			var input = JSON.parse(_this.dataIO);
			var batch = db.batch();
			for (var data in input) {
				var ref = db.collection(_this.collection).doc(data);
				batch.set(ref, input[data]);
			}

			// Set data after timeout for iterations
			// setTimeout(function(){
				
			// Commit the batch
			batch.commit().then(() => {
				_this.toast("Success", "The collection has been replaced", "green", "far fa-cloud-upload");
			}).catch(error => {
				console.log("There was an error creating the business page. " + error)
				_this.toast("Ope", error.message, "red", "far fa-exclamation-circle");
			});

			// }, 5000)

			

		}
	}
};

</script>


<style lang="less">

	@import '~@/styles/variables.less';

	#ioTextarea{
		min-height: 300px;
		font-size: 11px;
		line-height: 13px;
	}

</style>