const multer = require('multer');
const path = require('path');

const diskStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		let avatarsFolderPath = path.join(__dirname, '../../public/images/users');		
		cb(null, avatarsFolderPath);
	},
	filename: (req, file, cb) => {
		let productName = req.body.usuario.replace(/ /g, '-').toLowerCase();
		let finalName = productName + '-' + Date.now() + path.extname(file.originalname);
		cb(null, finalName);
	}
});

const upload = multer({ storage: diskStorage });

module.exports = upload;