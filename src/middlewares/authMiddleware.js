function authMiddleware (req, res, next) {
	// Si el usuario esta logueado es autorizado
	if (req.session.usuarioId != undefined) {
		next();
	} else{
		let mustLogin = 'Debés estar logueado para acceder aquí';
		res.render('users/login', {message: mustLogin});
		//res.send('Esta pagina es solo para usuarios');

	}
	
}

module.exports = authMiddleware;