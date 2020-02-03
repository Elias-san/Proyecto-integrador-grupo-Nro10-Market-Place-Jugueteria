const multer = require('multer');
const path = require('path');

const diskStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		let avatarsFolderPath = path.join(__dirname, '../../public/images/avatars');		
		cb(null, avatarsFolderPath);
	},
	filename: (req, file, cb) => {
		let userName = req.body.name.replace(/ /g, '-').toLowerCase();
		let finalName = userName + '-' + Date.now() + path.extname(file.originalname);
		cb(null, finalName);
	}
});

const upload = multer({ storage: diskStorage });

module.exports = upload;