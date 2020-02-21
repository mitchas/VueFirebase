import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import './registerServiceWorker'
import VueFirestore from 'vue-firestore';

import './styles/base.less'

Vue.config.productionTip = false
Vue.use(VueFirestore);
Vue.use(require('vue-moment'));

let app = '';

import { store } from '@/store/store'
import { db } from "@/store/firebase";


// Wait for firebase to determine if user is logged in
// Before loading
firebase.auth().onAuthStateChanged((user) => {

	// Create vue app
	if (!app) {
		// alert(process.env.VUE_APP_FIREBASE_API_KEY)
		app = new Vue({
			router,
			store,
			data: {
				user: ""
			},
			render: h => h(App)
		}).$mount('#app');
	}
});
