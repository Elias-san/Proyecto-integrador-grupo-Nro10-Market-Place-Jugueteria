const { check } = require('express-validator');
const path = require('path');


module.exports = [
    check('nombre')
    .notEmpty().withMessage('Ingresa un nombre de producto'),
    check('descripcion')
    .notEmpty().withMessage('Ingresa una descipción de producto'),
    check('genero')
    .notEmpty().withMessage('Seleccione un género para el producto'),
    check('marca')
    .notEmpty().withMessage('Agregue una marca de producto'),
    check('stock')
    .notEmpty().withMessage('Ingrese stock').bail()
    .isInt({ min: 1}).withMessage('Ingrese cantidad mayor que 0'),
    check('precio')
    .notEmpty().withMessage('Ingrese precio de venta').bail()
    .isInt({ min: 1}).withMessage('Ingrese precio mayor que 0'),
    check('categoriaid')
    .notEmpty().withMessage('Seleccione una categoria'),
    check('url_imagen')
    .custom((value, { req }) => {
        let acceptedExtensions = ['.jpg', '.jpeg', '.png'];
        if (typeof req.file == 'undefined') {
            throw new Error('Debe ingresar una foto del servicio');
        } else if (req.file.originalname) {
            let fileExtension = path.extname(req.file.originalname);
            let extensionIsOk = acceptedExtensions.includes(fileExtension.toLowerCase());
            if (!extensionIsOk) {
                throw new Error('Los formatos válidos son JPG, JPEG y PNG');
            }
        }
        return true;
    })
];