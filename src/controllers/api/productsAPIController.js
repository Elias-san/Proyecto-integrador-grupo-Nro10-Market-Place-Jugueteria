const db = require('../../database/models/');
const Categorias = db.categorias;
const Producto = db.productos;
const Edades = db.edades;




const apiController = {
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
			
			return res.render('products/crearProducto', {
				errors: errorsResult.array(),
				hasErrorGetMessage,
				oldData: req.body
			})
		} 
           
		// Aramar campos de producto para insertar
		// a la BD

		console.log(req.body);
		let url_imagen;
		if (typeof req.file === 'undefined'){

					url_imagen ='producto.jpg'
		} else {
					url_imagen = req.file.filename;
		}

		// a la variable usuario le agrego avatar y lo que viene por body
		let altaProducto = {
			url_imagen: url_imagen,
			usuarioid:  req.session.usuarioId,
			edadid: req.body.edadid,
			categoriaid: req.body.categoriaid,
			...req.body,

		};
		
		
		
		Producto
			.create(altaProducto)
				.then(producto => {
					//Redireccionar
						return res.redirect('/products/');
				})
				.catch(error => res.send(error));
         
    },
    edades:(req,res)=>{
        Edades
        .findAll({
            attribute:{
              exclude:['createdAt','updatedAt']
            }
        })
        .then(tablaEdad =>{
            let respuesta= {
                meta:{
                    status:200,
                    total:tablaEdad.length,
                    url:"/products/api/edades",

                },
                data: tablaEdad
            };
            return res.json(respuesta);
            
            })
    
        .catch(error => {
            console.log(error);
        })
    },
    // Trae ub array de objetos de la tabla categorias
    categorias:(req,res) =>{
        Categorias
        .findAll({
            attribute:{
              exclude:['createdAt','updatedAt']
            }
        })
        .then(resultados =>{
            let respuesta = {
                meta: {
                    status: 200,
                    total:respuesta.length,
                    url:'/products/api/categorias',
                },
                data:resultados
            
            };
           return  res.json(respuesta)
        })
        .catch(error => {
            res.send(error)
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
			
			return res.render('products/crearProducto', {
				errors: errorsResult.array(),
				hasErrorGetMessage,
				oldData: req.body
			})
		} 
           
		// Aramar campos de producto para insertar
		// a la BD

		
		let url_imagen;
		if (typeof req.file === 'undefined'){

					url_imagen ='producto.jpg'
		} else {
					url_imagen = req.file.filename;
		}

		// a la variable usuario le agrego avatar y lo que viene por body
		let altaProducto = {
			url_imagen: url_imagen,
			usuarioid:  req.session.usuarioId,
			edadid: req.body.edadid,
			categoriaid: req.body.categoriaid,
			...req.body,

		};
		
			
		Producto
			.create(altaProducto)
				.then(producto => {
					//Redireccionar
						return res.redirect('/products/');
				})
				.catch(error => res.send(error));
         
    },
    findByUser:(req,res)=>{
        //Traer los productos por el id de usuario
        //
        Producto
        .findAll({
            where:{
                usuarioid: req.params.id,
            }
        })
        .then(productos =>{
            let respuesta={
                meta:{
                    status:200,
                    url:"/products/api/byuser",
                    
                },
                data:productos,
                total_results:productos.length,
            };
            res.json(respuesta)
        })
        .catch(error => {
            res.send(error)
        })
        
    },
    //Trae productos por categoria
    
    findByCategory:(req,res)=>{
        //Traer los productos por el id de usuario
        //
        Producto
        .findAll({
            where:{
                categoriaid: req.params.id,
            }
        })
        .then(productos =>{
            let respuesta={
                meta:{
                    status:200,
                    url:"/products/api/bycategory",
                    total_results:productos.length,
                },
                data:productos
            };
            res.json(respuesta)
        })
        .catch(error => {
            res.send(error)
        })
        
    },
    // Trae un array de objetos de la tabla categorias
    categorias:(req,res) =>{
        Categorias
        .findAll()
        .then(resultados =>{
            let respuesta = {
                meta: {
                    status: 200,
                    url:'/products/api/categorias'
                },
                data:resultados
            
            };
            res.json(respuesta)
        })
        .catch(error => {
            res.send(error)
        })
    },

};
	
	
module.exports = apiController;

