const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

// Users File Path
const usersFilePath = path.join(__dirname, '../data/users.json');

// Helper Functions
function getAllUsers () {
	let usersFileContent = fs.readFileSync(usersFilePath, 'utf-8');
	let usersArray;
	if (usersFileContent == '') {
		usersArray = [];
	} else {
		usersArray = JSON.parse(usersFileContent);
	}
	return usersArray;
}

//Buscar usuario por mail del login form
function buscarUsuario(id){
	let usuarios = getAllUsers();
	let usuarioId = usuarios.find(usuario => usuario.id == id);
	return usuarioId;
}


function generateId () {
	let users = getAllUsers();
	if (users.length == 0) {
		return 1;
	}
	let lastUser = users.pop();
	return lastUser.id + 1;
}

function storeUser (userData) {
	let users = getAllUsers();
	users.push(userData);
	fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
}

const controller = {
	registerForm: (req, res) => {
		res.render('users/register');
	},
	loginForm: (req, res) => {
		res.render('users/login');
	},
	login: (req,res)=>{
		// Buscar usuario por email
		let user = buscarUsuario(req.body.email);		

		// Si encontramos al usuario
		if (user != undefined) {
			// Al ya tener al usuario, comparamos las contraseñas
			if (bcrypt.compareSync(req.body.password, user.password)) {
				// Setear en session el email del usuario
				req.session.email = req.body.email;

				// Setear la cookie
				if (req.body.remember_user) {
					res.cookie('userCookie', req.body.email, { maxAge: 60000 * 60 });
				}
		// Redireccionamos al visitante a su perfil
				return res.redirect(`/users/profile/`);
			} else {
				res.send('Credenciales inválidas');
			}
		} else {
			res.send('No hay usuarios registrados con ese email');
		}
	},
	store: (req, res) => {		
		const hasErrorGetMessage = (field, errors) => {
			for (let oneError of errors) {
				if (oneError.param == field) {
					return oneError.msg;
				}
			}
			return false;
		}
		
		let errorsResult = validationResult(req);

		if ( !errorsResult.isEmpty() ) {
			return res.render('users/register', {
				errors: errorsResult.array(),
				hasErrorGetMessage,
				oldData: req.body
			});
		} else {
			return res.send('<h1>Ok, pasó las validaciones</h1>');
		}
		// Hash del password
		req.body.password = bcrypt.hashSync(req.body.password, 10);

		// Asignar el nombre final de la imagen
		req.body.avatar = req.file.filename;

		// Guardar al usario y como la función retorna la data del usuario lo almacenamos en ela variable "user"
		let user = storeUser(req.body);

		// Setear en session el email del usuario nuevo para auto loguearlo
		req.session.email = req.body.email;

		// Setear la cookie para mantener al usuario logueado
		res.cookie('userCookie', req.session.email, { maxAge: 60000 * 60 });

		// Redirección al profile
		return res.redirect('/users/profile');
	},// Store
	
		
	
	profile: (req, res) => {
		let userLogged = req.session.email;
		res.render('users/userProfile', { userLogged });
	},
	
	logout: (req, res) => {
		// Destruir la session
		req.session.destroy();
		// Destruir la cookie
		res.cookie('userCookie', null, { maxAge: 1 });
		
		return res.redirect('/users/profile');
	}
};

module.exports = controller