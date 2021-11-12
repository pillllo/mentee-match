const { Router } = require('express');
const menteeController = require('./controllers/mentee.controller');

const router = Router();

router.get('/', menteeController.getAll);
router.get('/mentees', menteeController.filterMentees);
router.put('/mentee/:id', menteeController.updateChoice);

// router.get('/mentee/:id', menteeController.getById);

module.exports = router;
