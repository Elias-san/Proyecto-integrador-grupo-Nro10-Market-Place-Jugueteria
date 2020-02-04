// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const usersController = require('../controllers/userController');

// *** Middleware***
const registerValidations = require('../middlewares/registerValidator')
const upload = require('../middlewares/uploadMiddleware')
const guestMiddleware = require('../middlewares/guestMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')

/* GET to /users/register */
router.get('/register', usersController.registerForm);
/* POST to /users/register */
router.post('/register', upload.single('user_avatar'), registerValidations , usersController.store);

/*Formulario de login */
router.get('/login', guestMiddleware, usersController.loginForm);

/* Procesar login del usuario*/
router.post('/login', usersController.login);

router.get('/profile', authMiddleware, usersController.profile);
router.get('/logout', usersController.logout);

module.exports = router;