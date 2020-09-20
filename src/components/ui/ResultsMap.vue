<!-- 
// Results Map
// _________________________
// 
// 	Full width and height (fits parent) LEAFLET map that displays the mapData passed to it
// 
// 		Accepts props:  
// 			- zoom: zoom level integer
// 			- center: [lat, lng], pair
// 			- mapData: Data of map points to display, with all data for popups, etc
// 
-->

<template>
<!-- Page wrapper, could add buttons above within wrapper, but outside of map -->
	<div id="resultsMap">
		<!-- Actual Map -->
		<l-map
			id="resultsMapElement"
			:zoom="zoom"
			:center="center"
			:options="mapOptions"
			:max-bounds="maxBounds">
			<l-tile-layer :url="url"></l-tile-layer>
			<!-- User's search location -->
			<!-- <l-marker :lat-lng="center" :icon="searchLocationMarker" v-if="mapData != null"></l-marker> -->
			<!-- V-for all points/results -->
			<l-marker :icon="businessMarker" v-for="(business, index) in mapData" :key="index" :lat-lng="[business.address.lat, business.address.lng]">

				<l-popup>
					<b>{{business.display_name}}</b>
					<small>{{business.address.locality}}</small>
					<a @click="navigate('/co/' + business.username)">View Business</a>
				</l-popup>

			</l-marker>

		</l-map>
	</div>
</template>

<script>
// Leaflet imports
import L from 'leaflet';
import {LMap, LTileLayer, LLayerGroup, LPopup, LCircle, LMarker} from 'vue2-leaflet';
import { latLngBounds, latLng } from "leaflet";

export default {
	name: "ResultsMap",
	mixins: [
	],
	props: [
		'zoom',
		'center',
		'mapData',
	],
	components: {
	    LMap,
    	LTileLayer,
		LMarker,
		LLayerGroup,
    	LPopup,
    	LCircle,
	},
	data() {
		return {
			url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
			// url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
			bounds: null,
			// Marker for current location/search location
			// searchLocationMarker: L.divIcon({
			// 	className: 'marker current-location',
			// 	iconSize: [30, 30],
			// 	iconAnchor: [15, 15]
			// }),
			businessMarker: L.divIcon({
				className: 'marker business',
				iconSize: [22, 22],
				iconAnchor: [11, 11]
			}),

			// Map options
			mapOptions: {
				zoomSnap: 0.5,
				zoomControl: false
			},
			maxBounds: latLngBounds([
				[43.814348, -100.605668],
				[48.760805, -84.972810]
			]),

			// [[[-97.23926191,43.49942875],[-89.48338506,43.49942875],[-89.48338506,49.38449004],[-97.23926191,49.38449004],[-97.23926191,43.49942875]]]

		};
	},
	methods: {
	}
};

// var Stamen_Toner = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
// 	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// 	subdomains: 'abcd',
// 	minZoom: 0,
// 	maxZoom: 20,
// 	ext: 'png'
// });

</script>




<style lang="less">

	@import '~@/styles/variables.less';

	#resultsMap{
		display: block;
		width: 100%;
		height: 100%;

		// Actual Map
		#resultsMapElement{
			display: block;
			width: 100%;
			border-radius: var(--borderRadius);
			height: 100%;
			z-index: 10;
		}
	}
	

	// Map markers
	.marker{
		display: block;
		box-shadow: var(--shadow);

		&:after{
			font-family: var(--fontAwesome);
			display: flex;
			flex-direction: column;
			justify-content: center;
			width: 100%;
			height: 100%;
			font-size: 18px;
			font-weight: 800;
			color: white;
			text-align: center;
		}

		&.current-location{
			background-color: var(--primary);
			border-radius: 50%;
			height: 100%;
			width: 100%;

			&:after{
				content: '\f007';
			}
		}

		&.business{
			height: 100%;
			width: 100%;

			&:after{
				color: var(--primary);
				content: '\f3c5';
			}
		}
	}

	// Leaflet changes
	.leaflet-popup-content{
		margin: 0 !important;
		padding: 8px !important;
		font-size: 13px;
		font-weight: 500;
		line-height: 14px !important;
		text-transform: capitalize;
		width: fit-content !important;

		b{
			max-width: 150px;
			display: block;
			white-space: pre-line;
			min-width: 100px;
		}

		small{
			font-size: 12px;
			letter-spacing: 0.2px;
		}

		a{
			display: block;
			font-size: 11.5px;
			letter-spacing: 0.1px;
			color: var(--primary) !important;
		}
	}
</style>