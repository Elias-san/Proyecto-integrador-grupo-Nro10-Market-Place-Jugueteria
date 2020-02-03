function guestMiddleware (req, res, next) {
	if (req.session.email != undefined) {
		return res.redirect('/users/profile');
	}
	next();
}

module.exports = guestMiddleware;