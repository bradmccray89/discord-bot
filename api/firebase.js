const express = require('express');
const router = express.Router();
const path = require('path');
const { firebaseApp, storageApp, databaseApp } = require('../firebase-conf.js');
const database = require('firebase/database');
const storage = require('firebase/storage');

router.get('/', function (req, res) {
  res.json({ body: 'Hello World from api/storage' });
});

router.get('/voiceintrolist', function (req, res) {
  const voiceIntroList = [];
  const storageRef = storage.ref(storageApp, 'voice-intro-clips');
  // prettier-ignore
  storage.listAll(storageRef)
    .then(function (result) {
      result.items.forEach(function (item) {
        const voiceIntro = {
          name: path.parse(item.name).name,
          extension: path.parse(item.name).ext,
        };
        voiceIntroList.push(voiceIntro);
      });
      res.json({ body: voiceIntroList });
    })
    .catch(function (error) {
      console.log(error);
    });
});

router.get('/voiceintro/:name', async function (req, res) {
  const storageRef = storage.ref(
    storageApp,
    `voice-intro-clips/` + req.params.name
  );
  const fileRef = await storage.getDownloadURL(storageRef);
  res.json({ body: fileRef });
});

router.get('/userintro/:id', function (req, res) {
  const dbRef = database.ref(databaseApp);
  database
    .get(database.child(dbRef, `users/${req.params.id}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        res.json({ body: snapshot.val() });
      } else {
        res.json({ body: 'No data available' });
        console.log('No data available');
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

router.put('/userintro', function (req, res) {
  database.set(database.ref(databaseApp, 'users/' + req.body.id), {
    id: req.body.id,
    clipName: req.body.clipName,
  });
  res.json({ body: 'User intro updated' });
});

module.exports = router;
