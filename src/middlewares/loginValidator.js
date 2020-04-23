const { check } = require('express-validator');


module.exports = [
    check('email')
    .notEmpty().withMessage('Debe ingresar su email de usuario').bail()
    .isEmail().withMessage('Ingrese el email correctamente'),
    check('clave')
    .notEmpty().withMessage('Debe ingresar la constraseña')
    .isLength({min: 6}).withMessage("La contraseña debe tener al menos 6 caracteres")
];