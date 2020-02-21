import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({

	// Defs:
	// isSignedIn: Whether user exists based on Firebase
	// loginRedirectURL: when user tries to access auth-locked page, this holds URL to redirect after login
	// user: user.data from firebase (uid, etc)
	// userPreferences: settings users (or anon) can toggle. Synced with firebase if logged in
	state: {
		scrollLock: false,
		isSignedIn: false,
		loginRedirectURL: "",
		user: null,
		// UI
		// If soft keyboard visible on mobile
		softKeyboard: false,
		// Project stats
		projectStats: {
			user_count: null
		},
		// UserPreferences
		// Update 3 places in App.vue
		// at var defaultPrefs
		userPreferences: {
			username: "",
			user_created: null,
			admin_level: 0,
			user_number: null,
			darkMode: false,
			email: null,
			firebase_uid: null,
			animations: true,
		},
		profilePhoto: "",
	},
	mutations: {
		scrollLock(state, scrollLock) {
			state.scrollLock = scrollLock
		},
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
		userPreferences(state, userPreferences) {
			state.userPreferences = userPreferences
		},
		profilePhoto(state, profilePhoto) {
			state.profilePhoto = profilePhoto
		},
	},
	getters: {
		scrollLock: state => state.scrollLock,
		isSignedIn: state => state.isSignedIn,
		loginRedirectURL: state => state.loginRedirectURL,
		user: state => state.user,
		softKeyboard: state => state.softKeyboard,
		projectStats: state => state.projectStats,
		userPreferences: state => state.userPreferences,
		profilePhoto: state => state.profilePhoto,
	}
})