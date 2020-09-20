<!--
//  ChangeLocation component
// _________________________
//
//  	- Change home location city,
// 		- Input searches public/data/zip_lookup.json. On confirmation, updates store.userPreferences.location.
// 
-->

<template>
	<div>

		<transition name="lightbox">
			<div class="lightbox" v-if="showModal"></div>
		</transition>
		
		<transition name="modal">

			<div class="modal-wrapper" v-on:click.self="closeLocationChange()" v-if="showModal">

				<form class="modal" tabindex="0" ref="modal" @submit.prevent="changeArea();">

					<!-- Header -->
					<div class="modal-title">
						Change Home Area
					</div>
					<!-- Body Content -->
					<div class="modal-body overflow">
						<p class="small padding-none">
							This determines what is recommended and shown to you by default.
						</p>
						<p class="padding-none">
							Your currernt home area is <b>{{$store.getters.userPreferences.location.primary_city}}</b>.
						</p>
						<div class="field mtop-sm" id="zipcodeWrapper">
							<label for="newZip">Enter your Zip Code</label>
							<div class="field-body">
								<input type="number" max="99999" v-model="newZip" id="newZip" placeholder="55409" required>
							</div>
						</div>

						<!-- <p class="small">
							Or choose an 
						</p> -->

						<label class="small">Or choose a City</label>
						<div class="location-links">
							<button @click="changeArea('55402')">Minneapolis</button>
							<button @click="changeArea('55101')">St. Paul</button>
							<button @click="changeArea('55902')">Rochester</button>
							<button @click="changeArea('55802')">Duluth</button>
							<button @click="changeArea('56301')">St. Cloud</button>
							<button @click="changeArea('56560')">Moorehead</button>
							<button @click="changeArea('56001')">Mankato</button>
						</div>
					</div>
					<!-- Footer/Buttons -->
					<div class="modal-footer">
						<button class="button grey" type="button" @click="closeLocationChange()">Cancel</button>
						<button class="button" type="submit" :disabled="newZip.length != 5" aria-label="Confirm">
							<span>Confirm</span>
							<i class="far fa-check-circle"></i>
						</button>
					</div>
				</form> <!-- End modal body/form -->

			</div>

		</transition>

	</div>
</template>

<script>
import firebase from "firebase";
import axios from 'axios';
// Mixins
import scrollLockMixin from "@/components/mixins/ui/scrollLockMixin.js";
import preferencesMixin from "@/components/mixins/preferencesMixin.js";

export default {
	name: "ChangeLocation",
	mixins: [
		scrollLockMixin,
		preferencesMixin,
	],
	data() {
		return {
			showModal: false,
			newZip: '',
			zipCodeData: null,
		};
	},
	mounted() {
		let _this = this;
		_this.showModal = true;
		_this.scrollLock(true)
		// Focus modal
		setTimeout(function(){
			_this.$refs.modal.focus();
		}, 100)

		axios.get('/data/zip_lookup.json').then(response => {
			_this.zipCodeData = response.data;
		}).catch(e => {
			console.log(e);
		})
	},
	computed: {
	},
	methods: {
		///////////////////////
		//   Change Area    //
		/////////////////////
		changeArea: function(preset){
			let _this = this;

			if(preset){
				var zip = preset;
			}else{
				var zip = _this.newZip;
			}

			// MN Zip codes range from 55001 to 56763
			if(zip && zip < 55000 || zip > 56763){
				_this.toast("Oops.", "That zip code didn't work. Try again.", "red", "far fa-exclamation-circle");
			}else{
				// Update prefs
				var loc = _this.zipCodeData[zip]
				loc.zip_code = zip;
				_this.$store.getters.userPreferences.location = loc;

				// Save prefs
				_this.savePreferences();
				_this.closeLocationChange();
				_this.toast("Success!", "Your Home Area has been changed.", "green", "far fa-house");
			}
		},
		///////////////////////
		//    Close Modal    //
		/////////////////////
		// emit authClosed
		closeLocationChange: function(){
			let _this = this;
			// Hide Modal
			_this.showModal = false;
			// Unlock Scroll
			_this.scrollLock(false)

			// Emit to hide component after 0.3s to account for transition
			setTimeout(function(){
				_this.$emit("changeLocationClosed");
			}, 300)
		},
	}
};
</script>

<style lang="less">
	@import '~@/styles/variables.less';

	// Zip code input wrapper element
	#zipcodeWrapper{
		max-width: 400px;
		margin: 0 auto;
		padding: 20px 0 15px 0;
	}

	.location-links{
		display: flex;
		flex-wrap: wrap;
		font-size: 13px;
		padding: 5px 0 0 0;
		
		button{
			padding: 0;
			color: var(--textLighter);
			margin: 0 10px 10px 0;

			&:hover{
				cursor: pointer;
				text-decoration: underline;
			}
		}
	}
</style>