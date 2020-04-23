const db = require('../database/models/');
const Op = db.Sequelize.Op;
const {validationResult} = require('express-validator');
const Categorias = db.categorias;
const Producto = db.productos;
const Edades = db.edades;
const Carrito = db.carritos;




const productsController = {
	index:(req,res)=>{
		Producto
		.findAll()
		.then(products => {
			return res.render('products/index', {
				products: products
			});
		})
		.catch(error=>{
				res.send(error);
			});
	},
	//muestra los productos por categoria
	porCategoria: (req,res)=>{

		//Chequear categoría existente
		Categorias
		.count()
		.then(resultado =>{
			if (resultado < req.params.id){
				let error ="La categoría no existe";
				return res.render('products/errores',{ error });
			}
			
		});

		Producto
        .findAll({
            where:{
                categoriaid: req.params.id,
            }
        })
        .then(products =>{
			if (products.length === 0){
				let error= "No hay productos todavía para la categoría seleccionada";
				return res.render('products/errores',{ error })
			} else {
				res.render('products/categorias',{ products });
			}
            
        })
        .catch(error => {
            res.send(error)
        })

	}
	,
	//muestra los productos por categoria
	porEdad: (req,res)=>{

		//Chequear categoría existente
		Edades
		.count()
		.then(resultado =>{
			if (resultado < req.params.id){
				let error ="La edad seleccionada no existe";
				return res.render('products/errores',{ error });
			}
			
		});

		Producto
        .findAll({
            where:{
                edadid: req.params.id,
            }
        })
        .then(products =>{
			if (products.length === 0){
				let error= "No hay productos todavía para la edad seleccionada";
				return res.render('products/errores',{ error })
			} else {
				res.render('products/edades',{ products });
			}
            
        })
        .catch(error => {
            res.send(error)
        })

	}

	,
	detalle:(req,res)=>{
		// Traer los campos del producto
		// seleccionado según id
		Producto
		.findByPk(req.params.id,
			{include:["categoria","edades"]})
		.then(producto =>{
			res.render('products/detalleProducto',{producto : producto});
		})
	},
    crear: (req,res) => {
		// Traigo las categorias y edades de las tablas
		// para los combos desplegables
		let pedidoCategoria = Categorias.findAll();
		let pedidoEdad = Edades.findAll();

		Promise.all([pedidoEdad,pedidoCategoria])
				.then(function([edades,categoria]){	
					
					res.render('products/crearProducto',{ edades,categoria });
				})
				.catch(error=>{
					console.log(error)
				})
			
	},
	cargarProducto: (req,res) =>{
		/* Funcion para verificar errores en campos
		de formulario de carga.
		Retorna mensaje de error.*/
		

		
        const hasErrorGetMessage = (field, errors) => {
			for (let oneError of errors) {
				if (oneError.param == field) {
					return oneError.msg;
				}
			}
			return false;
        }

        //** trae errores ***/

        let errorsResult = validationResult(req);

		// Devolver los errores
        if ( !errorsResult.isEmpty() ) {

			let pedidoCategoria = Categorias.findAll();
			let pedidoEdad = Edades.findAll();

			Promise.all([pedidoEdad,pedidoCategoria])
				.then(function([edades,categoria]){	
					
					return res.render('products/crearProducto', {
						edades, categoria,
						errors: errorsResult.array(),
						hasErrorGetMessage,
						oldData: req.session.usuarioId
					})
				})

				.catch(error => console.log(error))
			
			
		} 
           
		// Aramar campos de producto para insertar
		// a la BD

		
		let url_imagen;
		if (typeof req.file === 'undefined'){

					url_imagen ='producto.jpg'
		} else {
					url_imagen = req.file.filename;
		}

		// a la variable usuario le agrego avatar 
		//y lo que viene por body
		let altaProducto = {
			nombre:req.body.nombre,
			descripcion:req.body.descripcion,
			usuarioid: req.session.usuarioId,
			edadid: req.body.edadid,
			categoriaid:req.body.categoriaid,
			genero:req.body.genero,
			marca: req.body.marca,
			precio: req.body.precio,
			stock: req.body.stock,
			url_imagen:url_imagen,


		};
		
		Producto
			.create(altaProducto)
				.then(producto => {
					//Redireccionar
						return res.redirect('/users/profile');
				})
				.catch(error => res.send(error));
         
    },
    editForm: (req,res) => {
		 Producto
			.findByPk(req.params.id)
			.then(producto =>{
				if (producto == null){
					let error ="El producto no existe";
					res.render('products/errores',{ error });
				} else {

					let pedidoCategoria = Categorias.findAll();
					let pedidoEdad = Edades.findAll();

					Promise.all([producto,pedidoEdad,pedidoCategoria])
						.then(function([producto,edad,categoria]){	
							res.render('products/editForm',{producto: producto, edad: edad,categoria:categoria});
						})
						.catch(error=>{
							res.send(error);
						})

				}
				
			})
		
		


		
    },
    edicion: (req,res) => {
		/* Funcion para verificar errores en campos
		de formulario de carga.
		Retorna mensaje de error.*/
		

		
        const hasErrorGetMessage = (field, errors) => {
			for (let oneError of errors) {
				if (oneError.param == field) {
					return oneError.msg;
				}
			}
			return false;
        }

        //** trae errores ***/

        let errorsResult = validationResult(req);

		// Devolver los errores
        if ( !errorsResult.isEmpty() ) {

			let pedidoCategoria = Categorias.findAll();
			let pedidoEdad = Edades.findAll();

			Promise.all([pedidoEdad,pedidoCategoria])
				.then(function([edades,categoria]){	
					
					return res.render('products/editForm', {
						edades, categoria,
						errors: errorsResult.array(),
						hasErrorGetMessage,
						oldData: req.body
					})
				})
			
			
		} 
           
		// Aramar campos de producto para actualizar
		// a la BD

		let url_imagen;
		if (typeof req.file === 'undefined'){

					url_imagen ='producto.jpg'
		} else {
					url_imagen = req.file.filename;
		}

		// a la variable producto le agregamos la url_imagen


		let updateProducto = {
			nombre:req.body.nombre,
			descripcion:req.body.descripcion,
			usuarioid: req.session.usuarioId,
			edadid: req.body.edad,
			genero:req.body.genero,
			marca: req.body.marca,
			precio: req.body.precio,
			stock: req.body.stock,
			categoriaid:req.body.categoriaid,
			url_imagen:url_imagen,
		};

		console.log(updateProducto);
		Producto
		.update({updateProducto	},{
			where: {
				idproducto: req.params.id
		}  
		});
		res.redirect("/products/");
	},
			
    borrar: (req,res)=>{
	

			Producto
			.destroy({
				where:{
				idproducto: req.params.id
			}
			
			});
			
			
			res.redirect('/users/profile');

	},

	addcart:(req,res) =>{
		var encontrado =false;
	
		Producto
			.findByPk(req.params.id)
			.then(ingresado =>{
							 
				 	if (req.session.cart.length ==0){

						req.session.cart.push({
							id:ingresado.idproducto,
							nombre:ingresado.nombre,
							precio:ingresado.precio,
							cantidad:1,
							imagen:ingresado.url_imagen,
						});
						return res.render('products/carrito',{carrito: req.session.cart});
					 } else {
							
							req.session.cart.forEach((item,indice) =>{
								console.log('session id: ',item.id);
								console.log('producto id: ',ingresado.idproducto);
								if (item.id == ingresado.idproducto){
									item.cantidad++;
									 encontrado =true;
								}

							})

							}
							
							if(encontrado == false){
								req.session.cart.push({
									id:ingresado.idproducto,
									nombre:ingresado.nombre,
									precio:ingresado.precio,
									cantidad:1,
									imagen:ingresado.url_imagen,
								});
								
							}
							return res.render('products/carrito',{carrito: req.session.cart});
			})
			.catch(error => console.log(error))
					
	},
	emptyCart: (req,res)=>{
		req.session.cart=[];
		res.render('products/carrito',{carrito: req.session.cart});
	},
	deleteItem: (req,res)=>{
		let temp = req.session.cart.filter(item => item.id != req.params.id);
		console.log('temp :',temp)
		req.session.cart=[];
		req.session.cart= temp;
		console.log('session cart: ',req.session.cart)
		res.render('products/carrito',{carrito: req.session.cart});
	},
	showCart: (req,res)=>{
	
		return res.render('products/carrito',{ carrito: req.session.cart});
	},
	finishCart: (req,res)=>{
		const codigoOp = Date.now();
		const ventas =[];
			req.session.cart.forEach((item,indice)=>{
				ventas.push({
					idproducto:item.id,
					cantidad: item.cantidad,
					codigo:codigoOp,
					idusuario:req.session.usuarioId,
				})
			})

			console.log(ventas);

			
			Carrito
			.bulkCreate(ventas)
				.then(producto => {
					//Redireccionar
						return res.redirect('/users/profile');
				})
				.catch(error => res.send(error));
		
	},
	search: (req,res)=>{
		let consulta= req.body.buscar;
		Producto
		.findAll({
			where:{
				nombre: {
					[Op.like]: `%${consulta}%`
				}
				}
			})
		.then(busqueda =>{
			console.log(busqueda);
			 res.render('products/search',{ busqueda, consulta });
		})

		
	}
	
}


module.exports = productsController;