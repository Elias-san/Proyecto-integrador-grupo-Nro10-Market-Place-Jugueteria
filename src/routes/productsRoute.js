// ************ Require's ************
const express = require('express');
const router = express.Router();

const guestMiddleware = require('../middlewares/guestMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')
const productValidator = require('../middlewares/productValidator')
const upload = require('../middlewares/uploadProductMiddleware')
const cartMiddleware = require('../middlewares/cartMiddleware')

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

        router.get('/',productsController.index);
        // Detalle de producto
        router.get('/detalle/:id',productsController.detalle);
        // Formulario de carga
        router.get('/crear',authMiddleware,productsController.crear);
        // Acción de creación (a donde se envía el formulario)
        router.post('/cargar-producto',upload.single('url_imagen'),productValidator,authMiddleware,productsController.cargarProducto);
        // formulario de edicion
        router.get('/editar/:id',authMiddleware,productsController.editForm);
        // Accion de editar 
        router.post('/editar/:id',upload.single('url_imagen'),productValidator,authMiddleware,productsController.edicion);
        // Borrar producto
        router.post('/borrar/:id',authMiddleware,productsController.borrar);
        // Listar productos por categoria
        router.get('/categoria/:id',productsController.porCategoria);
        // Listar productos por edad
        router.get('/edad/:id',productsController.porEdad);
        // Agregar a carrito de compras
        router.post('/addcart/:id',authMiddleware,cartMiddleware,productsController.addcart);
        //Vaciar carrito
        router.get('/emptycart',authMiddleware,productsController.emptyCart);
         //Borrar item
         router.get('/deleteitemcart/:id',authMiddleware,productsController.deleteItem);
          //carrito
         router.get('/carrito',authMiddleware,productsController.showCart);
          // Finalizar compra
          router.get('/finishcart',authMiddleware,productsController.finishCart);
        //busquedas
        router.post('/search',productsController.search)
        


        

module.exports = router;