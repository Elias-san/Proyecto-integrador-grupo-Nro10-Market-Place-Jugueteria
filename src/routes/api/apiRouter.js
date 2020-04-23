// ************ Require's ************
const express = require('express');
const router = express.Router();

const apiController= require('../../controllers/api/apiController');

        router.get('/users/',apiController.listUsers);

        router.get('/user/:id',apiController.findByUser);

        router.get('/products/',apiController.listProducts);

        router.get('/product/:id',apiController.byProduct);

        router.get('/products/categories/',apiController.categories);

        router.get('/products/lastinput',apiController.lastinput);

        router.get('/products/totales',apiController.totales);

module.exports = router;