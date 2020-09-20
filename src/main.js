// main
// _________________________
//
//	Sets up vue app
//		- Sets up app, imports, filters,
//		- Waits for firebase to return user or not before page load
// 

// Imports
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import VueFirestore from 'vue-firestore';
import './registerServiceWorker'
import { store } from '@/store/store'
import { db } from "@/store/firebase";
// Filters
import titleCase from './components/filters'
import numberFormat from './components/filters'
// Plugins
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
// Leaflet
import 'leaflet/dist/leaflet.css';
// Main styles
import './styles/main.less'
// Touch Events
import Vue2TouchEvents from 'vue2-touch-events';

// Plugins
import plugins from "@/components/plugins/plugins.js";
Vue.use(plugins)
import {InlineSvgPlugin} from "@/components/plugins/svg.js";
Vue.use(InlineSvgPlugin);

// Set configs
Vue.config.productionTip = false

// Use
Vue.use(VueFirestore);
Vue.use(require('vue-moment'));
Vue.use(VueLodash, { name: 'custom' , lodash: lodash })
Vue.use(Vue2TouchEvents)

// App
let app = '';

// Wait for firebase to determine if user is logged in
// Before loading
firebase.auth().onAuthStateChanged((user) => {

	// Create vue app
	if (!app) {
		// alert(process.env.VUE_APP_FIREBASE_API_KEY)
		app = new Vue({
			router,
			store,
			titleCase,
			data: {
				user: ""
			},
			render: h => h(App)
		}).$mount('#app');
	}
});
