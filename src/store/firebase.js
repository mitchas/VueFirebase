import { firebase } from "@firebase/app";
import "@firebase/firestore";

// Connect Firebase
// Copy .env and .env.production to make .env.local and .env.production.local
// At the root of the project
// And fill in your secrets 
const firebaseApp = firebase.initializeApp({
	apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
	authDomain: process.env.VUE_APP_FIREBASE_AUTHDOMAIN,
	databaseURL: process.env.VUE_APP_FIREBASE_DATABASEURL,
	projectId: process.env.VUE_APP_FIREBASE_PROJECTID,
	storageBucket: process.env.VUE_APP_FIREBASE_STORAGEBUCKET,
	messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGINGSENDERID,
	appId: process.env.VUE_APP_FIREBASE_APPID
});

export const db = firebaseApp.firestore();