const fs = require('fs');
const path = require('path');


// Users File Path
const productsFilePath = path.join(__dirname, '../data/products.json');

// Helper Functions
function getAllProducts () {
	let productsFileContent = fs.readFileSync(productsFilePath, 'utf-8');
	let productsArray;
	if (productsFileContent == '') {
		productsArray = [];
	} else {
		productsArray = JSON.parse(productsFileContent);
	}
	return productsArray;
}

function generateId () {
	let products = getAllProducts();
	if (products.length == 0) {
		return 1;
	}
	let lastProduct = products.pop();
	return lastProduct.id + 1;
}

function storeProduct (productData) {
	let products = getAllProducts();
	products.push(productData);
	fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
}


const productsController = {
    index: (req,res) => {
        res.render('products');
    },
    create: (req,res) => {
		res.render('create');
    },
    detalle: (req,res) => {
        //res.send('detalle');
    },
    cargarProducto: (req,res) => {
        // Genero la data del usuario
		let newProductData = {
			id: generateId(),
			photo: req.file.filename,
			...req.body
		}
		// Guardo al producto en el JSON
		storeProduct(newProductData);
		// Redirección
		res.redirect('/');
    },
    editForm: (req,res) => {
		let products = getAllProducts();
		
		for(let i=0;i < products.length;i++){
			if (products[i].id== req.params.id){
				let productFinded ={
					titulo:products[i].titulo,
					descripcion:products[i].descripcion,
					age:products[i].age,
					gender:products[i].gender
				} 
				//direccionar al formulario de edicion
				res.render('edit',{ productFinded});
			}
		}
    },
    edicion: (req,res) => {
		let products = getAllProducts();

		for(let i=0;i < products.length;i++){
			if (products[i].id== req.params.id){
				
					products[i].titulo=req.body.titulo;
					products[i].descripcion=req.body.descripcion;
					products[i].age=req.body.age;
					products[i].gender=req.body.gender;
				
				//guardar datos json
				fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
				
				//redireccionar al index
				res.redirect('/');
			}
		}

    },
    borrar: (req,res)=>{
		let products = getAllProducts();
			products = products.filter(elemnt => Element.id == req.params.id);
				
				//guardar datos json
				fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
				
				//redireccionar al index
				res.redirect('/');

	},
	
	carrito:(req,res)=>{
		res.render('carrito-de-compras');
	}

};

module.exports = productsController;