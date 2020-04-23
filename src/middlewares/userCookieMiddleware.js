function userCookieMiddleware (req, res, next) {
	next();

	if (req.cookies.recordame != undefined &&
		req.session.usuarioId == undefined){
		req.session.usuarioId = req.cookies.recordame;
		}
	}
module.exports = userCookieMiddleware;
