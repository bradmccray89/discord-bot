// Import the functions you need from the SDKs you need
const dotenv = require('dotenv');
dotenv.config();

const { initializeApp } = require('firebase/app');
const storage = require('firebase/storage');
const database = require('firebase/database');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.firebase_api_key,
  authDomain: process.env.firebase_auth_domain,
  databaseURL: process.env.firebase_database_url,
  projectId: process.env.firebase_project_id,
  storageBucket: process.env.firebase_storage_bucket,
  messagingSenderId: process.env.firebase_messaging_sender_id,
  appId: process.env.firebase_app_id,
  measurementId: process.env.firebase_measurement_id,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storageApp = storage.getStorage(firebaseApp);
const databaseApp = database.getDatabase(firebaseApp);

module.exports = {
  firebaseApp,
  storageApp,
  databaseApp,
};
