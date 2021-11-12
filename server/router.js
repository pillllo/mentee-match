const { Router } = require('express');
const menteeController = require('./controllers/mentee.controller');

const router = Router();

router.get('/', menteeController.getAll);
router.put('/mentee/:id', menteeController.updateChoice);

module.exports = router;
