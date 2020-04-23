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
const loginValidator = require('../middlewares/loginValidator')

/* GET to /users/register */
router.get('/list',authMiddleware,usersController.listUser);
router.get('/register',guestMiddleware, usersController.registerForm);
/* POST to /users/register */
router.post('/register', upload.single('avatar'), registerValidations , usersController.store);

/*Formulario de login */
router.get('/login', guestMiddleware, usersController.loginForm);

/* Procesar login del usuario*/
router.post('/login', loginValidator,usersController.processLogin);

router.get('/editar/:id',usersController.editForm);
/* Edición de los datos de usuario */
router.post('/editar/:id',upload.single('avatar'), registerValidations ,usersController.edicion);
/* Vista de datos del perfil de usuario */
router.get('/profile', authMiddleware, usersController.profile);
/* Eliminar cuenta de usuario */
router.post('/borrar/:id', authMiddleware, usersController.borrar);
router.get('/logout', usersController.logout);

module.exports = router;