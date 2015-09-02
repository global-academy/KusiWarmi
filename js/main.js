
var allowedFileExtensions = [
	'jpg',
	'png',
	'gif',
	'jpeg',
];

var crearDenuncia = function() {

	var titulo = $('#titulo').val();
	var fecha = $('#fecha').val();
	var denuncia = $('#denuncia').val();
	
	if (denuncia === '') {
		return;
	}

	var fileUploadControl = $('#denuncia_image_input')[0];

	// Verificar si hay un archivo
	if (fileUploadControl.files.length > 0) {
		var file = fileUploadControl.files[0];

		var fileExtension = file.name.substr(file.name.lastIndexOf('.') + 1);
		fileExtension = fileExtension.toLowerCase();

		if (allowedFileExtensions.indexOf(fileExtension) < 0) {
			alert('Ese tipo de archivo no está permitido! Por favor, asegúrate de subir un archivo de imagen.');
			return;
		}

		var parseFile = new Parse.File(file.name, file);
		parseFile.save().then(function(file) {

			// Una vez subido el archivo, guardar la denuncia
			crearDenunciaFin(titulo, fecha, denuncia, file);

		}, function(error) {
			console.log(error);
			alert('Lo siento, ocurrio un error al subir la imagen!');
		});

	} else {
		// Crear la denuncia sin imagen
		crearDenunciaFin(titulo, fecha, denuncia);
	}

};

var crearDenunciaFin = function(titulo, fecha, denuncia, image) {

	var nuevaDenuncia = {
		titulo: titulo,
		fecha: fecha,
		contenido: denuncia
	};

	if (image) {
		nuevaDenuncia.image = image;
	}

	var Denuncia = Parse.Object.extend('Caso');
	var nuevaDenunciaParse = new Denuncia();

	nuevaDenunciaParse.save(nuevaDenuncia).then(function(object) {
		// Limpiar los campos después de crear una denuncia
		$('#denuncia_text_input').val('');
		var fileUploadControl = $('#denuncia_image_input');
		fileUploadControl.replaceWith(input.val('').clone(true));

		alert('Tu denuncia ha sido enviada correctamente!');
	});
};


var recuperarDenuncias = function() {

	var Caso = Parse.Object.extend('Caso');
	var query = new Parse.Query(Caso);

	// query.equalTo("playerName", "Dan Stemkoski");	

	query.find({
		success: function(results) {
			for (var i = 0; i < results.length; i++) {
				var object = results[i];
				aumentarListaDenuncias(results[i]);
			}
		},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
};

var aumentarListaDenuncias = function(denuncia) {
	var list = $('#posts_list');

	var newItem = $('li');

	newItem.html(denuncia.text);

	list.append(newItem);
};
