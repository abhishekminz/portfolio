import * as firebase from "firebase/app";

// FIREBASE FEATURE
import "firebase/database";
import "firebase/storage";
import "firebase/auth";

// firebaseConfig removed for security purpose
const firebaseConfig = {};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const storage = firebase.storage();
const firebaseAuth = firebase.auth();

export { database, storage, firebaseAuth };
