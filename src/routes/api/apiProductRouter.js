// ************ Require's ************
const express = require('express');
const router = express.Router();
//************ Middleware ************/
const guestMiddleware = require('../../middlewares/guestMiddleware')
const authMiddleware = require('../../middlewares/authMiddleware')
const productValidator = require('../../middlewares/productValidator')
const upload = require('../../middlewares/uploadProductMiddleware')
const productAPIController= require('../../controllers/api/productsAPIController');

//router.get('/',productAPIController.list);
router.get('/byuser/:id',productAPIController.findByUser);

router.get('/crear',authMiddleware,productAPIController.crear);
//Acción de creación (a donde se envía el formulario)
router.post('/cargar-producto',upload.single('url_imagen'),productValidator,authMiddleware,productAPIController.cargarProducto);
router.get('/',productAPIController.edades);

//router.get('/categorias',productAPIController.categorias);

module.exports = router;