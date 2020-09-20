// 
// This PROBABLY doesnt need to be changed ever
// 
// 		This file takes secrets from the .env files to create the connection to firebase.
// 
// 		Again, don't change anything here. Just change your values in the .env files (see ReadMe)
// 

import { firebase } from "@firebase/app";
import "@firebase/firestore";

// Connect Firebase
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