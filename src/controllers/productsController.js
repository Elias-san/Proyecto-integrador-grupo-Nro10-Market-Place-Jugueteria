const fs = require('fs');
const path = require('path');
const db = require('../database/models/');
const Categorias = db.categorias;
const Productos = db.productos;
const Edades = db.edades;
const Usuarios = db.usuario;





const productsController = {
	index:(req,res)=>{
		Productos
		.findAll()
		.then(products => {
			return res.render('products/index', {
				products
			});
		})
		.catch(error=>{
				res.send(error);
			});
	},
    create: (req,res) => {
		res.render('create');
	},
	cargarProducto: (req,res) =>{
		Productos
		.create(req.body)
					.then(producto => {
						return res.redirect('/products');
						
					})
					.catch(error => res.send(error));
	},
    editForm: (req,res) => {
		Productos
		.findByPk(req.params.id)
		.then(products => {
			return res.render('products/edit', {
				products
			});
		})
			.catch(error=>{
				res.send(error);
			});

    },
    edicion: (req,res) => {
	
    },
    borrar: (req,res)=>{
		Products
			.findByPk(req.params.id, {
				include: ['categorias','edades']
			})
			.then(product => {
				product.removeCategorias(product.categories);
				product.removeEdades(product.edades);
				product.destroy();
				return res.redirect('/products');
			})
			.catch(error => res.send(error));

	}
}
	
module.exports = productsController;