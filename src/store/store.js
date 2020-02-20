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
		user: '',
		// UI
		// If soft keyboard visible on mobile
		softKeyboard: false,
		// UserPreferences
		// Update 3 places in App.vue
		// at var defaultPrefs
		userPreferences: {
			username: "",
			user_created: null,
			admin_level: 0,
			darkMode: false,
			animations: true
		},
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
		userPreferences(state, userPreferences) {
			state.userPreferences = userPreferences
		},
	},
	getters: {
		scrollLock: state => state.scrollLock,
		isSignedIn: state => state.isSignedIn,
		loginRedirectURL: state => state.loginRedirectURL,
		user: state => state.user,
		softKeyboard: state => state.softKeyboard,
		userPreferences: state => state.userPreferences,
	}
})