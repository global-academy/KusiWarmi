$(function(
	var newHash= ""
		$mainContent= $("menu-Contenido"),
		$pagewrap   =$("page-wrap")
		tamBase     =0,
		
		$pagewrap.height($pagewrap.height());
		tamBase	=$pagewrap.height() - $mainContent.height();
		$(".menu").delegate("a","click",function(){
			window.location.hash =$(this).attr("href");
		return false;	
		});
		$(window).bind('hashchange', function(){

			newHash= window.location.hash.substring(1);
		});
		if (nuevocontenido.length) {
			$mainContent
			.find("#guts")
			.fadeout(200,f)
		};

{}));