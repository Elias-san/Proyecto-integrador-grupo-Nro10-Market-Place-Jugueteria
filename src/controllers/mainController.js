const fs = require('fs');
const path = require('path');

// ************ Function to Read an HTML File ************
function readHTML (fileName) {
	let filePath = path.join(__dirname, `/../views/${fileName}.html`);
	let htmlFile = fs.readFileSync(filePath, 'utf-8');
	return htmlFile;
}

const controller = {
	root: (req, res) => {
		let html = readHTML('index');
		res.send(html);
	},
	producto:(req,res)=>{
		let html = readHTML('detalle-de-producto');
		res.send(html);
	},
	registro:(req,res)=>{
		let html = readHTML('registro');
		res.send(html);
	},
	carrito:(req,res)=>{
		let html=readHTML('carrito-de-compras');
		res.send(html);
	},
	carga:(req,res)=>{
		let html=readHTML('carga-de-producto');
		res.send(html);
	}
};

module.exports = controller
