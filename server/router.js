const { Router } = require('express');
const menteeController = require('./controllers/mentee.controller');
const mentorController = require('./controllers/mentor.controller');

const router = Router();

router.get('/', menteeController.getAll);
router.post('/login', mentorController.login);
router.put('/mentee/:id', menteeController.updateChoice);

module.exports = router;
