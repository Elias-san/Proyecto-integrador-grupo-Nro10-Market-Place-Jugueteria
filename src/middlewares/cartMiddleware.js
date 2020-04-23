module.exports = (req, res, next) => {

	// Si no existe session.cart, lo inicializamos vacío
	if (req.session.cart ===undefined) {
		req.session.cart = [];
	}
	
	next();
}