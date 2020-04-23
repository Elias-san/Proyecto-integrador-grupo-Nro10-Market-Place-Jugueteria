const path = require('path');
const { check } = require('express-validator');

module.exports = [
	// validando campo nombre
	check('nombre')
	.notEmpty().withMessage('El nombre es obligatorio').notEmpty(),
    // validando campo apellido
	check('apellido')
	.notEmpty().withMessage('El apellido es obligatorio').notEmpty(),
    // validando campo apellido
	check('usuario')
	.notEmpty().withMessage('El usuario es obligatorio').notEmpty(),

	// validando campo email
	check('email')
		.notEmpty().withMessage('El email es obligatorio').bail()
		.isEmail().withMessage('Escribí un email válido'),

	// validando campo password
	check('clave')
		.notEmpty().withMessage('Escribí una contraseña').bail()
        .isLength({ min: 5 }).withMessage('La contraseña debe tener más de 5 letras'),
    
    check('categoria')
		.notEmpty().withMessage('Selecciona una categoria').bail(),
		
	check('direccion')
	.notEmpty().withMessage('Escribí una dirección').bail(),
	
	check('localidad')
    .notEmpty().withMessage('Ingresá una localidad').bail(),
	
	check('provincia')
	.notEmpty().withMessage('Ingresá una provincia').bail(),
	
	check('telefono')
	.notEmpty().withMessage('Ingresá un telefono').bail()
	.isNumeric().withMessage('Ingresá un telefono válido').bail(),
	
		
	// validando campo avatar
	check('avatar')
		.custom((value, { req }) => {
			let acceptedExtensions = ['.jpg', '.jpeg', '.png'];
			if (typeof req.file == 'undefined') {
				throw new Error('Elegí una imagen de perfil');
			} else if (req.file.originalname) {
				let fileExtension = path.extname(req.file.originalname);
				let extensionIsOk = acceptedExtensions.includes(fileExtension);
				if (!extensionIsOk) {
					throw new Error('Los formatos válidos son JPG, JPEG y PNG');
				}
			}
			return true;
		})
];