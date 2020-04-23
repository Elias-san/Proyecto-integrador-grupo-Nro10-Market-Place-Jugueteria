function guestMiddleware (req, res, next) {
	
	// Esta pagina es solo para invitados
	
	if (req.session.usuarioId == undefined) {
		next();
	} else{
		res.send('Esta pagina es solo para invitados');
	}
	
}

module.exports = guestMiddleware;