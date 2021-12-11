const express = require('express');
const cors = require('cors');
const session = require('express-session');

const router = require('./router');
const db = require('./models/index');
require('dotenv').config();

const PORT = process.env.SERVER_PORT || 3001;
const SECRET = process.env.SECRET;

const app = express();

const corsConfig = {
  origin: process.env.ORIGIN,
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());

app.use(
  session({
    // the store property, if not specified, defaults to the in-memory store
    name: 'sid',
    saveUninitialized: false,
    resave: false,
    secret: SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1hr
      sameSite: true,
      httpOnly: false,
      secure: false,
    },
  })
);

app.use(router);
app.get('*', (req, res) => {
  res.status(404).send('Sorry, this page could not be found.');
});

(async function () {
  try {
    await db.sequelize.sync();
    console.log(`💿 Postgres db is connected through sequelize`);
  } catch {
    console.log(`❌ Could not connec to db`);
  }
  app.listen(PORT, () => {
    console.log(`🚀 Server is listening at ${PORT}`);
  });
})();
