const { Router } = require('express');
const menteeController = require('./controllers/mentee.controller');

const router = Router();

router.get('/home', menteeController.getAll);
router.get('/mentee/:id', menteeController.getById);

module.exports = router;
