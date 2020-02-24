import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
// Authentication
import Signin from './views/authentication/Signin.vue';
import Register from './views/authentication/Register.vue';
import PasswordReset from './views/authentication/PasswordReset.vue';
import Settings from './views/authentication/Settings.vue';
import Error404 from './views/other/error404.vue';

// Docs
import TermsOfService from './views/other/docs/TermsOfService.vue';
import PrivacyPolicy from './views/other/docs/PrivacyPolicy.vue';

// Profile
import ProfilePage from './views/profile/ProfilePage.vue';

import { store } from '@/store/store'


import firebase from 'firebase';
Vue.use(Router);


const router = new Router({
	mode: 'history',
	linkExactActiveClass: 'is-active',
	base: process.env.VUE_APP_BASE_PATH,
	// Return to top after route change
	scrollBehavior() {
		return { x: 0, y: 0 };
	},
	routes: [{
			path: '/',
			name: 'home',
			component: Home,
		},
		//////////////////////////////
		// AUTHENTICATION
		//////////////////////////////
		// Sign in
		{
			path: '/signin',
			name: 'signin',
			component: Signin,
			meta: {
				authBlocked: true
			}
		},
		// Register
		{
			path: '/register',
			name: 'register',
			component: Register,
			meta: {
				authBlocked: true
			}
		},
		// Password Reset
		{
			path: '/passwordreset',
			name: 'passwordreset',
			component: PasswordReset,
			meta: {
				authBlocked: true
			}
		},
		// User settings
		{
			path: '/settings',
			name: 'settings',
			component: Settings,
			meta: {
				requiresAuth: true
			}
		},
		//////////////////////////////
		// Public profiles
		//////////////////////////////
		{
			path: '/user/:username/',
			name: 'profile',
			component: ProfilePage,
		},

		//////////////////////////////
		// Help & Docs
		//////////////////////////////
		// TOS
		{
			path: '/terms',
			name: 'TermsOfService',
			component: TermsOfService
		},
		// Privacy Policy
		{
			path: '/privacy',
			name: 'PrivacyPolicy',
			component: PrivacyPolicy
		},

		// 404
		// 404
		// 404
		{
			path: '/404',
			name: 'error404',
			component: Error404
		},
		{
			path: '*',
			redirect: '/404'
		}
	]
});

router.afterEach((to, from) => {
	const currentUser = firebase.auth().currentUser;
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
	const authBlocked = to.matched.some(record => record.meta.authBlocked);
	const toPath = to.path;

	// Pages where authentication is REQUIRED
	if (requiresAuth && !currentUser) {
		// Save clicked url to redirect after login
		store.commit('loginRedirectURL', toPath);
		// Redirect to login
		router.replace('/register');
	
	// Pages where authentication is BLOCKED
	// Meaning signed in users will be redirected home
	// Login and Register pages
	}else if(authBlocked && currentUser){  
		router.replace('/');
	}else{
		return;
	}

});


export default router;
