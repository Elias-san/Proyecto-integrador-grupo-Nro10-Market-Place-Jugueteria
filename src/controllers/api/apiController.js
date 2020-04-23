const db = require('../../database/models/');
const Producto = db.productos;
const Usuarios = db.usuario;
const Categorias = db.categorias;


const apiController = {

    
    listUsers: (req,res) =>{
        Usuarios
        .findAll({
            attributes: {
                exclude: ['clave'],
            }
        }
        )
        .then(users =>{
            let respuesta= {
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
                meta:{
                    status:200,
                    total:users.length,
                    url:"/api/users"

                },
                data: users
            };
            res.json(respuesta);
        });
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
                    url:"/products/api/user",
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
    listProducts:(req,res)=>{
       

        Producto
		.findAll()
		.then(products => {
			let respuesta={
                meta:{
                    status:200,
                    url:"/api/products",
                    total_results:products.length,
                },
                data:products,
               
            };
            res.json(respuesta)
			});
	},
	//muestra los productos por id
	byProduct: (req,res)=>{
        Producto
		.findAll({
            where:{
                idproducto: req.params.id,
            }
        })
		.then(products => {
			let respuesta={
                meta:{
                    status:200,
                    url:"/api/product/id",
                    total_results:products.length,
                },
                data:products
            };
            res.json(respuesta)
			});
    
    },
    categories: (req,res) =>{
        Categorias
        .findAll()
        .then(categories =>{
            let respuesta= {
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
                meta:{
                    status:200,
                    total:categories.length,
                    url:"/api/categories"

                },
                data: categories
            };
            res.json(respuesta);
        });
    },
    lastinput: (req,res)=>{
       

        Producto
        .findAll({
            order:[
                ['nombre','DESC'],
            ],
            limit:1,
        })
        .then(lastinput=>{
            let respuesta= {
               
                meta:{
                    status:200,
                    total:lastinput.length,
                    url:"/api/product/lastinput"

                },
                data: lastinput,
            
            };
            res.json(respuesta);

        })
        .catch()

    },
    totales:(req,res)=>{
        let sumaStock;
        let valorStock;
        Producto
        .sum('stock')
        .then(stock =>{
            sumaStock = stock;
        })

        Producto
        .sum('precio')
        .then(precio =>{
            valorStock = precio;
        })

        let respuesta={
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            meta:{
                status:200,
                url:"/api/products/totales",
                total_results:products.length,
            },
            data:{
                total_stock:sumaStock,
                valor_stock:valorStock,
            }
        };
        res.json(respuesta);
        
    }
  
};
	
	
module.exports = apiController;