const { Router } = require('express');
const authMiddleware = require('./middlewares/auth');
const menteeController = require('./controllers/mentee.controller');
const mentorController = require('./controllers/mentor.controller');

const router = Router();

// router.post('/login', userController.login);
router.post('/login', mentorController.login);

// router.get('/me', authMiddleware, userController.profile);
router.get('/me', authMiddleware, mentorController.profile);

// router.post('/logout', authMiddleware, userController.logout);
router.post('/logout', authMiddleware, mentorController.logout);

router.get('/', menteeController.getAll);
router.put('/mentee/:menteeId/:mentorId', menteeController.updateChoice);

// router.post('/register', userController.create);
// router.post('/register', mentorController.create);

module.exports = router;
