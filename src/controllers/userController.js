const path = require('path');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const db = require('../database/models/');
const Usuarios = db.usuario;




const controller = {
	
	registerForm: (req, res) => {
		res.render('users/register');
	},
	loginForm: (req, res) => {
		res.render('users/login');
	},
	profile: (req, res) => {
		Usuarios
		.findByPk(req.session.usuarioId)
		.then(perfilLogueado => {
			if (perfilLogueado.categoria == 0){
				res.render('users/userProfile', { perfilLogueado });
			}
				res.render('users/adminDashboard',{ perfilLogueado })
		})
	},
	processLogin: (req,res)=>{
			const hasErrorGetMessage = (field, errors) => {
				for (let oneError of errors) {
					if (oneError.param == field) {
						return oneError.msg;
					}
				}
				return false;
			}

			let errors = validationResult(req);
			
			if(!errors.isEmpty()) {
				return res.render('users/login', {
					errors: errors.array(),
					hasErrorGetMessage,
					oldData: req.body
				});

			} else {
				// Buscar usuario por email
				
				Usuarios
					.findOne({
						where: {email: req.body.email}
					})
					// Validación info de usuario
					.then(usuario => {
						if(usuario != null){
					 
                       if (bcrypt.compareSync(req.body.clave, usuario.clave)) {
						   // Setear en session el ID del usuario
						   // para buscar luego por id
                           req.session.usuarioId = usuario.idusuario;

                           // Setear la cookie, en caso que cierre el navegador
                           if (req.body.recordame) {
                               res.cookie('recordame', usuario.idusuario, { maxAge: 60000 * 60 });
                           }

                           // Redireccionamos al perfil de usuario ok
								return res.redirect('/users/profile/');
							} else {
								//si la clave esta mal vuelvo al login con mensaje
								// de error
								let noValido = 'La clave ingresada es incorrecta';
								res.render('users/login', {message: noValido});
							}
                    } else {
							//sino encuentro el usuario registrado vuelvo al login
							let noValido = 'El usuario ingresado no está registrado';
							res.render('users/login', {message: noValido});
                    }
                })
	}
	
	},

	editForm: (req,res) => {

		//Chequear usuario existente
		Usuarios
		.findByPk(req.params.id)
		.then(resultado =>{
			if (resultado == null){
				let error ="El usuario no existe";
				return res.render('products/errores',{ error });
			
			} else {

				res.render('users/editForm', { perfilLogueado: resultado });

			}});
			
	},
	edicion: (req,res) => {

			console.log(req.body);
			
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
				
				return res.render('users/userProfile', {
					errors: errorsResult.array(),
					hasErrorGetMessage,
					oldData: req.body
				})
			}
			
			
					// Hash del password
					req.body.clave = bcrypt.hashSync(req.body.clave, 10);
					
					let avatar;
					if (typeof req.file === 'undefined'){

						avatar ='usuario.jpg'
					} else {
						avatar = req.file.filename;
					}

					// a la variable usuario le agrego avatar y lo que viene por body
					let userUpdate = {
						avatar: avatar,
						...req.body,

					};
					
					
					Usuarios
					.update({userUpdate},
						{
							where: {
								idusuario: req.params.id
							}
						});
							// ir al perfil
							return res.redirect('/users/profile');
						
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
			})
		} 
		
		//
		// Verificar sino está registado el mail o usuario
		//
		Usuarios
                .findOne({
                    where: {email: req.body.email}
                })
                // Validación info de usuario
                .then(usuario => {
                  if(usuario != null){
					if (usuario.email == req.body.email){
							let yaExiste = "El email ya está registrado";
							res.render('users/register',{ message: yaExiste})
						}
					  if (usuario.usuario==req.body.usuario){
							let yaExiste = "El nombre de usuario no está disponible";
							res.render('users/register',{ message: yaExiste})
					  	}
					}
				})
				

				// Hash del password
				req.body.clave = bcrypt.hashSync(req.body.clave, 10);
				
				let avatar;
				if (typeof req.file === 'undefined'){

					avatar ='usuario.jpg'
				} else {
					avatar = req.file.filename;
				}

				// a la variable usuario le agrego avatar y lo que viene por body
				let userRegister = {
					avatar: avatar,
					...req.body,

				};
				
				
				Usuarios
				.create(userRegister)
					.then(usuario => {
						req.session.usuarioId = Usuario.idusuario;

						res.cookie('usuarioCookie',Usuario.idusuario,{maxAge:60000 * 60});
						// ir al perfil
						res.render('users/userProfile');
					})
				.catch(error => res.send(error));	

		
		
	},// Store
	borrar: (req,res)=>{
			Usuarios
			.destroy({
				where:{
				idusuario: req.params.id
			}
			
			});
			
			
			res.redirect('/users/profile');
	},
	listUser: (req,res)=>{
		Usuarios
			.findAll()
			.then (usuarios =>{
				return res.render('users/listadoUsuarios',{ usuarios: usuarios });
			})
			.catch(error => console.log(error))
		
	},
			
	logout: (req, res) => {
		// Destruir la session
		req.session.destroy();
		// Destruir la cookie
		res.cookie('userCookie', null, { maxAge: 1 });
		
		return res.redirect('/');
	}
};

module.exports = controller