<!--
// 
// App.vue
// _________________________
//	Main app component, present on all views
// 
// -->

<template>
	<!-- <div id="app"> -->
	<div id="app">
		<transition name="load">

			<div class="app-wrapper" v-if="pageMounted">

				<!-- Top bar component -->
				<!-- Logo, account dropdown, etc -->
				<TopBar></TopBar>

				<!-- All page contetnt contained within main -->
				<main id="content">
					<!-- NavBar Component -->
					<NavBar></NavBar>
				
					<!-- Center/Main Content -->
					<div class="body-content">
						<!-- page transition defined in base.less -->
						<transition name="page" mode="out-in">
							<router-view v-if="$store.getters.isSignedIn != null"/>
						</transition>
					</div>
				</main>

				<!-- Toast Component -->
				<Toast ref="toastComponent"></Toast>
				<!-- Alert Component -->
				<Alert ref="alertComponent"></Alert>
				<!-- Confirm Leave Component -->
				<!-- <ConfirmLeave ref="confirmLeaveComponent"></ConfirmLeave> -->

			</div>
		</transition>
	</div>
</template>


<script>
import { db } from "@/store/firebase";
// Components
import Alert from "@/components/ui/Alert";
import Toast from "@/components/ui/Toast";
// import ConfirmLeave from "@/components/ui/ConfirmLeave";
import TopBar from "@/components/ui/TopBar/TopBar";
import NavBar from "@/components/ui/NavBar";
// Mixins
import userStateMixin from "@/components/mixins/auth/userStateMixin.js";
import screenResizeMixin from "@/components/mixins/ui/screenResizeMixin.js";

export default {
	name: "app",
	mixins: [
		userStateMixin,
		screenResizeMixin,
	],
	components: {
		Alert,
		Toast,
		TopBar,
		NavBar,
		// ConfirmLeave,
	},
	data() {
		return {
			scrollLockPos: 0,
			pageMounted: false,
		};
	},
	created: function () {
		// Run user check on create
		this.userStateCheck();
	},
	watch: {
	},
	mounted() {
		this.pageMounted = true;
		this.getProjectStats();
	},
	beforeDestroy() { 
	},
	methods: {

		////////////////////
		// Project Stats //
		//////////////////
		getProjectStats: function(){
			let _this = this;
			// Get project stats from firestore, save to vue store
			var statRef = db.collection("site").doc('stats');
			statRef.get().then(function(doc) {
				if (doc.exists) {
					// User exists
					_this.$store.commit('projectStats', doc.data());
				} else {
					console.log("Can't get project stats")
				}
			}).catch(function(error) {console.log("Error getting project stats:", error);});
		}

	}
};
</script>

<style lang="less">

	@import '~@/styles/variables.less';

	#app {
		display: block;
		width: 100%;
		margin: 0;
		min-height: 100%;
		box-sizing: border-box;
		min-height: 100%;

		.app-wrapper{
			width: 100%;
			margin: 0 auto;
			min-height: 100%;
			display: block;
		}

	}



	//////////////////////////////
	//    Main Content         //
	////////////////////////////
	main#content{
		box-sizing: border-box;
		padding-right: 0;
		z-index: 60;
		display: flex;
		min-height: 85vh;
		min-height: calc(~'100% - 70px');


		// Main body content
		// Main body content
		// Main body content
		.body-content{
			box-sizing: border-box;
			padding: 0;
			flex-grow: 3;
			min-height: 90vh;
			// to account for header
			min-height: calc(~'100% - 100px');
			overflow-x: hidden;

			@media (min-width: @screenMD) {
				padding-left: 50px;
				padding-right: 25px;
			}
			@media (min-width: @screenLG) {
				padding-left: 60px;
			}
			@media (min-width: @screenXL) {
				padding-left: 70px;
				padding-right: 45px;
			}
		}
	}


</style>
