const { Router } = require('express');
const menteeController = require('./controllers/mentee.controller');

const router = Router();

router.get('/home', menteeController.getAll);

module.exports = router;
