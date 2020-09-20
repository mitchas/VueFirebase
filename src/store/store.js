// 
// Store
// 		Store and get values across components 
// 

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({

	state: {
		isSignedIn: null,
		loginRedirectURL: "",
		user: null,
		// Project stats
		projectStats: {
			user_count: null
		},
		// Holds data for later
		hold: {
			forecast: null,
			tooltipIcon: "far fa-feather",
			appVersion: "1.0.0",
		},
		// UserPreferences
		userPreferences: {
			has_business: false,
			username: "",
			firebase_uid: null,
			admin_level: 0,
			location: null,
			email: null,
			ui: {
				confirmLeave: true,
				dark_mode: false,
				animations: true,
				tooltips: true,
			},
			meta: {
				pwa_installed: false,
				user_number: null,
				user_created: null,
				new_user: false,
			},
			endpoints: {}
		},
		// UI
		// If screen size is mobile - watched by resize
		// isMac = navigator.appVersion.includes('Macintosh')
		device: {
			hasTouch: false,
			isMac: navigator.appVersion.includes('Macintosh'),
			softKeyboardVisible: false,
			standalone: false,
			orientationSensor: false,
			// mobile - less than 768px
			mobile: true,
			// If soft keyboard visible on mobile
			softKeyboard: false,
		},

		// Development Mode
		hostName: window.location.hostname,
	},
	mutations: {
		isSignedIn(state, isSignedIn) {
			state.isSignedIn = isSignedIn
		},
		loginRedirectURL(state, loginRedirectURL) {
			state.loginRedirectURL = loginRedirectURL
		},
		user(state, user) {
			state.user = user
		},
		softKeyboard(state, softKeyboard) {
			state.softKeyboard = softKeyboard
		},
		projectStats(state, projectStats) {
			state.projectStats = projectStats
		},
		hold(state, hold) {
			state.hold = hold
		},
		userPreferences(state, userPreferences) {
			state.userPreferences = userPreferences
		},
		device(state, device) {
			state.device = device
		},
		meta(state, meta) {
			state.meta = meta
		},

		hostName(state, hostName) {
			state.hostName = hostName
		},
	},
	getters: {
		isSignedIn: state => state.isSignedIn,
		loginRedirectURL: state => state.loginRedirectURL,
		user: state => state.user,
		softKeyboard: state => state.softKeyboard,
		projectStats: state => state.projectStats,
		hold: state => state.hold,
		userPreferences: state => state.userPreferences,
		device: state => state.device,
		meta: state => state.meta,

		hostName: state => state.hostName,
	}
})