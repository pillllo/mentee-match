const express = require('express');
const cors = require('cors');

const router = require('./router');

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
  app.listen(PORT, () => {
    console.log(`🎯 Server is listening at ${PORT}`);
  });
})();
