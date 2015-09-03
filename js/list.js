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
		error: function(Errorror) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
};

var aumentarListaDenuncias = function(caso) {
	var list = $('#posts_list');

	var newItem = $('<li>');
	var newItem1 = $('<li>');
	var newItem2 = $('<li>');
	var newItem3 = $('<li>');
	var newItem4 = $('<li>');
	var newItem5 = $('<li>');

	var titulo = caso.attributes.titulo;
	var fecha = caso.attributes.fecha;
	var denuncia = caso.attributes.contenido;
/*
	if (caso.attributes.image) {
		itemContent += ' <img class="image image--small" src="' + caso.attributes.image._url + '">';
	}*/

	newItem.html(titulo);
	newItem1.html(fecha);
	newItem2.html(denuncia);	

	console.log(list);
	console.log(newItem);
	console.log(caso);
	console.log(caso.attributes.text);

	list.append(newItem);
	list.append(newItem1);
	list.append(newItem2);
};

$(document).on('ready', function() {
	recuperarDenuncias();
});