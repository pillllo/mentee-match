const { Router } = require('express');
const menteeController = require('./controllers/mentee.controller');
const mentorController = require('./controllers/mentor.controller');

const router = Router();

router.get('/', menteeController.getAll);
router.put('/mentee/:id', menteeController.updateChoice);
router.post('/login', mentorController.login);

module.exports = router;
