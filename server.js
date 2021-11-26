const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

const discord = require('./api/discord.js');
const firebase = require('./api/firebase.js');

const allowedOrigins = ['http://localhost:4200', 'http://www.myyodabot.com'];
const port = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.options('*', cors());

app.use('/api/discord', discord);
app.use('/api/firebase', firebase);

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
