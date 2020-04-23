
/****  Validación del formulario ****/

// 1. Capturamos el formulario y el botón
let form = document.querySelector('#cargaproducto');
let submitButton = document.querySelector('button');

// 2. Capturamos los elementos del formulario en formato array
let formElements = Array.from(form.elements);

// 3. Sacamos al último elemento que es el botón
formElements.pop();

// * Definimos un objeto literal que contendrá los campos con error
let inputsWithErrors = {};

// 4. Iteramos sobre el array de campos
for (let oneInput of formElements) {
	// 4a. Validación de campos vaciós - Asignamos el evento blur a cada campo
	oneInput.addEventListener('blur', function () {
		// 4b. Capturamos el valor del campo
		let inputValue = this.value;
		// 4c. Validamos si el valor del campo está vacío
		if(validator.isEmpty(inputValue)) {
			// 4c-I. Agregamos la clase "is-invalid" y eliminamos la clase "is-valid"
			this.classList.add('is-invalid');
			this.classList.remove('is-valid');
			// 4c-II. Al <p> que está inmediatamente después del campo le agregamos el texto de error
			this.nextElementSibling.innerHTML = `El campo <b>${this.dataset.name}</b> es obligatorio`;
			// Agregamos al objeto de errores, un error para ese campo
			inputsWithErrors[this.name] = true;
		} else {
			// 4c-III Eliminamos la clase "is-invalid"
			this.classList.remove('is-invalid');
			// 4c-IV Agregamos la clase "is-valid"
			this.classList.add('is-valid');
			// 4c-IV Eliminamos el texto
			this.nextElementSibling.innerHTML = '';
			// Eliminado del objeto de errores, el error de ese campo
			delete inputsWithErrors[this.name];
		}
		// Control
		console.table(inputsWithErrors);
	});



	// 4e. Validamos el campo de imagen
	if (oneInput.name == 'url_imagen') {
		// 4e-I. Asignamos el evento change
		oneInput.addEventListener('change', function (e) {
			// 4e-II. Sacamos la extensión del archivo
			let fileExtension = this.value.split('.').pop();
			// 4e-III. Armamos un array de las extensiones aceptadas
			let acceptedExtensions = ['jpg', 'jpeg', 'png', 'webm', 'svg'];
			// 4e-IV. Validamos si la extensión es aceptada
			if(!acceptedExtensions.includes(fileExtension)) {
				// 4e-V. Agregamos la clase "is-invalid" y eliminamos la clase "is-valid"
				this.classList.add('is-invalid');
				this.classList.remove('is-valid');
				// 4e-VI. Al <p> que está inmediatamente después del campo le agregamos el texto de error
				this.nextElementSibling.innerHTML = `Formato de imagen no aceptada. Los formatos de imagen aceptados son: ${acceptedExtensions}`;
				// Agregamos al objeto de errores, un error para ese campo
				inputsWithErrors[this.name] = true;
			} else {
				// 4e-VI. Eliminamos la clase "is-invalid"
				this.classList.remove('is-invalid');
				this.classList.add('is-valid');
				// 4e-VI. Al <p> que está inmediatamente después del campo le sacamos el texto
				this.nextElementSibling.innerHTML = '';
				// Eliminamo del objeto de errores, el error de ese campo
				delete inputsWithErrors[this.name];
				// Preview de la imagen
				let imgPreviewParent = this.parentElement.querySelector('#imgPreview');
				imgPreviewParent.innerHTML = '<img class="img-thumbnail mb-2" style="width: 30%;">';
				const reader = new FileReader();
				reader.onload = (e) => imgPreviewParent.querySelector('img').setAttribute('src', e.target.result);
				reader.readAsDataURL(e.target.files[0]);
			}
		});
	}
}


// 5. Asignamos el evento submit al formulario
form.addEventListener('submit', function (e) {
	// 5a Iteramos el array de campos para ver si hay alguno vacío
	formElements.forEach(function (oneInput) {
		if (validator.isEmpty(oneInput.value)) {
			inputsWithErrors[oneInput.name] = true;
			oneInput.classList.add('is-invalid');
			oneInput.nextElementSibling.innerHTML = 'Campo obligatorio';
		}
	});

	console.table(inputsWithErrors);

	// 5b. Evitamos que se dispare el evento si el objeto inputsWithErrors tiene cosas
	if(Object.keys(inputsWithErrors).length > 0) {
		e.preventDefault();
	}
})
