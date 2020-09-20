// Router
// _________________________
//
//	Defines available routes and views
//
//		- meta
// 			- title - Page title set on route change
// 			- routeRequiresUser - user must be signed in to view
// 			- routeBlocksUser - user must be signed out to view
// 			- routeRequiresAdminLevel - different admin level numbers block different pages
// 				for example, to view the admin page, a user's admin level must be 1 or greater
//


// Imports
import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';
import { store } from '@/store/store'
// Home
import Home from './views/Home.vue';
// Static Pages
import About from './views/static/About.vue';
import Error404 from './views/other/error404.vue';
// Admin
import Admin from './views/admin/Admin.vue';
// Authentication
import SignIn from './views/authentication/SignIn.vue';
import Register from './views/authentication/Register.vue';
import PasswordReset from './views/authentication/PasswordReset.vue';
import Settings from './views/authentication/Settings.vue';
// Docs
import TermsOfService from './views/other/docs/TermsOfService.vue';
import PrivacyPolicy from './views/other/docs/PrivacyPolicy.vue';
import Interface from './views/other/docs/Interface.vue';

Vue.use(Router);

const router = new Router({
	mode: 'history',
	linkExactActiveClass: 'is-active',
	base: process.env.VUE_APP_BASE_PATH,
	// Return to top after route change
	scrollBehavior() {
		return { x: 0, y: 0 };
	},
	routes: [
		///////////
		// Home //
		/////////
		{
			path: '/',
			name: 'home',
			component: Home,
			meta: {
				title: 'ABCDEFG — Home'
			}
		},
		////////////
		// About //
		//////////
		{
			path: '/about',
			name: 'about',
			component: About,
			meta: {
				title: 'ABCDEFG — About'
			}
		},
		/////////////////////
		// Authentication //
		///////////////////
		// Sign in
		{
			path: '/signin',
			name: 'signin',
			component: SignIn,
			meta: {
				title: 'Sign In — ABCDEFG',
				routeBlocksUser: true
			}
		},
			// Register
			{
				path: '/register',
				name: 'register',
				component: Register,
				meta: {
					title: 'Register — ABCDEFG',
					routeBlocksUser: true
				}
			},
			// Reset Password
			{
				path: '/passwordreset',
				name: 'password_reset',
				component: PasswordReset,
				meta: {
					title: 'Reset Password',
					routeBlocksUser: true
				}
			},
			// User settings
			{
				path: '/settings',
				name: 'settings',
				component: Settings,
				meta: {
					title: 'User Settings',
					routeRequiresUser: true
				}
			},
		////////////////
		//   Admin   //
		//////////////
		{
			path: '/admin',
			name: 'admin',
			component: Admin,
			meta: {
				title: 'Admin — ABCDEFG',
				routeRequiresUser: true,
				routeRequiresAdminLevel: 1
			}
		},
		///////////
		// Docs //
		/////////		
		// TOS
		{
			path: '/terms',
			name: 'terms_of_service',
			component: TermsOfService,
			meta: {
				title: 'Terms of Service — ABCDEFG',
			}
		},
		// Privacy Policy
		{
			path: '/privacy',
			name: 'privacy_policy',
			component: PrivacyPolicy,
			meta: {
				title: 'Privacy Policy — ABCDEFG',
			}
		},
		// Interface
		// Example page for seeing UI Elements
		{
			path: '/interface',
			name: 'interface',
			component: Interface,
			meta: {
				title: 'Interface Examples — ABCDEFG',
			}
		},

		///////////////
		// 404 //
		/////////////		
		{
			path: '/404/',
			name: 'error_404',
			component: Error404,
			meta: {
				title: '404 - Page not Found — ABCDEFG',
			}
		},
		// If a route doesn't exist, go to 404
		{
			path: '*',
			redirect: '/404/'
		}
	]
});

router.beforeEach((to, from, next) => {
	document.title = to.meta.title
	next()
})

router.afterEach((to, from) => {
	// Signed in (or not) user
	const currentUser = firebase.auth().currentUser;
	// User's preferences from firebase
	const userPreferences = store.getters.userPreferences;
	// Meta definitions to check
	const routeRequiresUser = to.matched.some(record => record.meta.routeRequiresUser);
	const routeBlocksUser = to.matched.some(record => record.meta.routeBlocksUser);
	const routeRequiresAdminLevel = to.matched.some(record => record.meta.routeRequiresAdminLevel);
	// To path
	const toPath = to.path;

	// Pages where authentication is REQUIRED
	if (routeRequiresUser && !currentUser) {
		// Save clicked url to redirect after login
		store.commit('loginRedirectURL', toPath);
		// Redirect to login
		router.push('/register');
	}

	//////////////////////////////////////////////
	// Block specific pages for specific users //
	////////////////////////////////////////////
	// Block users to authentication pages
	else if(routeBlocksUser && currentUser){  
		router.push('/');
	}
	///////////////////
	// Admin levels //
	/////////////////
	else if(routeRequiresAdminLevel && currentUser && userPreferences.admin_level < routeRequiresAdminLevel){
		router.push('/');
	}
	
	////////////////////
	// Else Continue //
	//////////////////	
	else{
		return;
	}

});


export default router;
