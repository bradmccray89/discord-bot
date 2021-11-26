const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  res.json({ body: 'Hello World from api/discord' });
});

module.exports = router;
