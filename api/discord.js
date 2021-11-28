const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();

router.post('/login', function (req, res) {
  const data = req.body;
  if (!data.access_token) {
    res.status(400).send({
      error: 'Missing accessToken',
    });
    return;
  }
  fetch('https://discordapp.com/api/users/@me', {
    headers: {
      Authorization: `${data.token_type} ${data.access_token}`,
    },
  })
    .then((result) => result.json())
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

module.exports = router;
