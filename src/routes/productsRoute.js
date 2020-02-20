// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

let diskStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../../public/images/productos'));
	},
	filename: function (req, file, cb) {
		let finalName = Date.now() + path.extname(file.originalname);
		cb(null, finalName);
	}
});

let upload = multer({ storage: diskStorage })

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

        router.get('/',productsController.index);
        //Formulario de carga
        router.get('/create',productsController.create);
        //Acción de creación (a donde se envía el formulario)
        router.post('/cargar-producto',upload.single('product_photo'),productsController.cargarProducto);        
        //formulario de edicion
        router.get('/:id/edit',productsController.editForm);
        //Accion de editar 
        router.put('/:id/edit',productsController.edicion);
        //Borrar producto
        router.delete('/:id/delete?_method=DELETE',productsController.borrar);
        

module.exports = router;