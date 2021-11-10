const express = require('express');
const cors = require('cors');

const router = require('./router');

const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

(async function () {
  app.listen(PORT, () => {
    console.log(`🎯 Server is listening at ${PORT}`);
  });
})();
