<!-- 
// Weather Component
// Contained on top bar near account dropdown
// _________________________
// 
-->
<template>

	<div id="topBarWeather" v-if="$store.getters.hold.forecast">

		<button id="weatherButton" @click="togglePopover()" :class="{'active': showWeather}">
			<span>{{$store.getters.hold.forecast[0].temperature}}</span> 
			<i class="far fa-thermometer-half"></i>
		</button>

		<!-- Popover -->
		<transition name="collapse">
			<div id="weatherPopover" v-if="showWeather" tabindex="0" ref="weatherPopover" @mouseleave="showWeather = !showWeather">
				<div class="title">{{$store.getters.userPreferences.location.primary_city}}</div>
				<div class="current-temp">{{$store.getters.hold.forecast[0].temperature}}&deg;</div>
				<!-- Currently -->
				<div class="weather-heading">{{$store.getters.hold.forecast[0].name}}</div>
				<p class="small">{{$store.getters.hold.forecast[0].detailedForecast}}</p>
				<!-- Next -->
				<div class="weather-heading">{{$store.getters.hold.forecast[1].name}}</div>
				<p class="small">{{$store.getters.hold.forecast[1].detailedForecast}}</p>
			</div>
		</transition>
		
		
	</div>
		
</template>

<script>
import axios from 'axios';
// Mixins
import preferencesMixin from "@/components/mixins/preferencesMixin.js";


export default {
	name: "Weather",
	mixins: [
		preferencesMixin,
	],
	components: {
	},
	props: [
	],
	data() {
		return {
			showWeather: false,
		};
	},
	created() {

	},
	mounted(){
		let _this = this;
		setTimeout(function(){
			_this.getWeather();
		}, 2000);
	},
	computed: {
		locationChange () {
			return this.$store.getters.userPreferences.location;
		}
	},
	watch: {
		locationChange (newLoc, oldLoc) {
			let _this = this;
			setTimeout(function(){
				_this.getWeather();
			}, 500);
		}
	},
	methods: {

		// Show weather popover, focus it
		togglePopover: function(){
			let _this = this;
			
			_this.showWeather = !_this.showWeather;
			// Focus modal
			if(_this.showWeather){
				setTimeout(function(){
					_this.$refs.weatherPopover.focus();
				}, 100);
			}
		},

		// Get weather forecast
		getWeather: function(){
			console.log("GET WEATHER")
			let _this = this;

			// Get initial forecast
			if(_this.$store.getters.userPreferences.endpoints.forecast){
				
				axios.get(_this.$store.getters.userPreferences.endpoints.forecast).then(response => {
					var dta = response.data.properties.periods;
					_this.$store.getters.hold.forecast = dta;
				}).catch(e => {
					console.log(e);
				})

			}else{
				_this.getWeatherEndpoint();
			}
		},

		// Get weather endpoint, save to prefs
		getWeatherEndpoint: function(){
			let _this = this;

			var lat = _this.$store.getters.userPreferences.location.latitude;
			var lon = _this.$store.getters.userPreferences.location.longitude;

			axios.get("https://api.weather.gov/points/" + lat + "," + lon).then(response => {
				var dta = response.data.properties;

				var endpoints = _this.$store.getters.userPreferences.endpoints;

				endpoints.forecast = dta.forecast;
				endpoints.forecast_hourly = dta.forecastHourly;
				endpoints.forecast_grid_data = dta.forecastGridData;
				endpoints.observation_stations = dta.observationStations;

				_this.$store.getters.userPreferences.endpoints = endpoints;

				_this.savePreferences();
				_this.getWeather();
			}).catch(e => {
				console.log(e);
			})
		},
	}	
}	

</script>

<style lang="less">
	@import '~@/styles/variables.less';

	#topBarWeather{
		display: block;
		box-sizing: border-box;
		padding: 13px 0;
		position: relative;

		#weatherButton{
			display: block;
			height: 100%;
			font-size: 18px;
			margin-left: 10px;
			font-weight: 500;

			i{
				margin-left: 5px;
				transform: scale(1.2);
			}

			&:hover{
				span{
					text-decoration: underline;
				}
			}

			&.active{
				// background-color: var(--primary);
				// color: var(--white);
			}
		}

		// Weather popover
		#weatherPopover{
			transform-origin: top center;
			display: block;
			position: absolute;
			box-sizing: border-box;
			padding: 15px;
			box-shadow: var(--shadowDark);
			width: 300px;
			max-width: 80vw;
			right: 0;
			top: calc(100% + 10px);
			background-color: var(--background);
			border-radius: var(--borderRadiusSmall);
		
			@media (max-width: @screenSM) {
				width: 300px;
			}

			// Title 
			.title{
				text-align: center;
				font-weight: 700;
				font-size: 20px;
				padding: 15px 0;
			}
			.current-temp{
				font-size: 62px;
				text-align: center;
			}
			.weather-heading{
				display: block;
				font-size: 16px;
				font-weight: 600;
				padding: 12px 0 2px 0;
			}
			p{
				padding: 0;
				margin: 0;
			}
		}
		
	}



</style>