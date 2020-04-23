const multer = require('multer');
const path = require('path');


let diskStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../../public/images/productos'));
	},
	filename: function (req, file, cb) {
		let prodName = req.body.nombre.replace(/ /g, '-').toLowerCase();
		let finalName = prodName + '-' + Date.now() + path.extname(file.originalname);
		cb(null, finalName);
	}
});

let upload = multer({ storage: diskStorage })

module.exports = upload;
