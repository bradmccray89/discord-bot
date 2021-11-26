const express = require('express');
const router = express.Router();
// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
const { getStorage, ref, listAll } = require('firebase/storage');
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
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

router.get('/', function (req, res) {
  res.json({ body: 'Hello World from api/storage' });
});

router.get('/voiceintrolist', function (req, res) {
  const storageRef = ref(storage, 'voice-intro-clips');
  listAll(storageRef)
    .then(function (result) {
      result.items.forEach(function (prefix) {
        console.log(`Prefix: ${prefix}`);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports = router;
