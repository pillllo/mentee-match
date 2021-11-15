const express = require('express');
const cors = require('cors');

const router = require('./router');
const db = require('./models/index');

const PORT = 3001;
const app = express();

const corsConfig = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(router);
app.get('*', (req, res) => {
  res.status(404).send('Sorry, not found 😞');
});

(async function () {
  try {
    await db.sequelize.sync();
    console.log(`🎯 Postgres db is connected through sequelize`);
  } catch {
    console.log(`🎯 Could not connec to db`);
  }
  app.listen(PORT, () => {
    console.log(`🎯 Server is listening at ${PORT}`);
  });
})();
