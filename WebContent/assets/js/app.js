$(document).ready(function() {
		
	var chatPane = document.getElementById("chat");	
	var id = 0;
	/**
	 * méthode pour le rendu des messages
	 */
	var render = function(side,author,msg){
		
		if(side=="self"){
			realSide = "left";
		}else{
			realSide= "right";
		}
		// créer une nouvelle liste si l'utilisateur change					
		if(!$('#chat ul').last().hasClass(side)){
			$('#chat').append('<ul class="'+side+'"></ul>');
		}
		// ajout du message dans la fenetre					
		$('#chat ul.'+side).last().append('<li><p class="message-wrapper m-a-0 '+side+'" data-author="'+author+'"><span class="message">'+msg+'</span></p></li>');
		// pour chaque liste, ajouter une avatar
		$.each($('#chat ul.'+side).find('li:first').find('p'), function(index, val) {
			if(!$(this).find('span.name').length){
				$('#chat ul.'+side).find('li:first').find('p').prepend('<span   data-toggle="tooltip" data-placement="'+realSide+'" title="'+author+'"  class="name">'+author.charAt(0)+'</span>');	
				// ajouter une tooltip aux avatars;
				$('[data-toggle="tooltip"]').tooltip();
			}
		});
		// altérner des classes pour le changement de positions (pour créer l'effet messenger)
		$('ul.'+side+' li p').addClass('center').removeClass('first').removeClass('last');
	    $('ul.'+side).find('li:first').find('p').addClass('first').removeClass('center').removeClass('last');
	    $('ul.'+side).find('li:last').find('p').addClass('last').removeClass('first').removeClass('center');
	    // scroller jusqu'au bas de la fenetre
	    chatPane.scrollTop = chatPane.scrollHeight;
	}
	
	/**
	 * méthode pour l'envoie des messages
	 */
	var send = function(msg){
		var newMsg =".";
		if(msg.length>0){
			$.post('chat',{msg: msg,author: $('textarea').attr('data-author')}, function(data) {
			    newMsg = data.split('+');
			    id= newMsg[2];
			    render("self",newMsg[0],newMsg[1]);
			    $('textarea').val('').focus();
		    });
		}
		
	}
	/**
	 * méthode pour avoir la mise à jour des messages
	 */
	var refresh = function(){
		$.post('chat',{refresh: $('ul li').length}, function(data) {
			// s'il y'a des données de retour (de nouveaux messages )
			if(data){
				msgs= data.split('+');
				$.each(msgs, function( index, value ) {
					msg = JSON.parse(value);
					render("other",msg.author,msg.content);
				});
			}	
		});
	}
	
	// rafraichir chaque 1 secondes	
	setInterval(refresh, 1000);
	
	/* Evenements */
	$('button#submit').click(function(e){
		send($('textarea').val());
	});
	$(document).keyup(function(e) {
		e.preventDefault();
	    if(e.which == 13 && !e.shiftKey) {
	    	var msg = $('textarea').val();
	    	if(msg.trim().length>0){
		        send(msg);	    		
	    	}else{
	    		$('textarea').val("");
	    	}
	    }
	});
	
//-- end of file --
	
});
