<!--
// 
// Admin.vue
// _________________________
//
//	Add data for tracking page
//
// -->

<template>
	<div class="page form-page">

		<!-- Section tabs -->
		<div class="tabs no-scrollbars mbottom-sm">
			<!-- Shop Local -->
			<button class="tab" v-bind:class="{'active': section == 'document-editor'}" @click="section = 'document-editor'">
				<i class="far fa-document"></i>
				<span>Document Editor</span>
			</button>
			<!-- Data Tools -->
			<button class="tab" v-bind:class="{'active': section == 'data-sync'}" @click="section = 'data-sync'">
				<i class="far fa-sync"></i>
				<span>Data Sync</span>
			</button>
		</div>


		<transition-group name="basic">
			
			<!-- Document Editor -->
			<div v-if="section == 'document-editor'" key="1">
				<h3 class="mbottom-sm">Document Editor</h3>
			</div>
		
		
			<!-- Data Syncing -->
			<div v-if="section == 'data-sync'" key="2">
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

				<!-- Output -->
				<div class="field mtop-md">
					<textarea v-model="dataIO" id="ioTextarea"></textarea>
				</div>
			</div>

		</transition-group>

		


	</div>
</template>

<script>
import { db } from "@/store/firebase";
import firebase from "firebase";
// Components
import Callout from "@/components/ui/Callout";
// Mixins
// Definitions
require("vue-moment");

export default {
	name: "admin",

	components: {
		// Callout,
	},

	mixins: [
	],

	data() {
		return {
			// View section/tab
			section: null,
			// Collection to get
			collection: "",
			// Output received
			dataIO: "",
			// Show input and output
			showIO: false,
		};
	},

	mounted() {
	},

	computed: {
	},
	
	created() {
		// Get (optional) section param from URL and set tab
		if(this.$route.params.section){
			this.section = this.$route.params.section;
		}else{
			this.section = "document-editor";
		}
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
						_this.dataIO = JSON.stringify(dataObject);
					}
				});	
			}).catch(function(error) {
				_this.dataIO = "Error getting collection: " + error.msg;
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
				console.log("There was an error creating the business page. " + error);
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