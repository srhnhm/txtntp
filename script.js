$(document).ready(function() {
	

	var slidespeed = 200;
	var firstclick = false;

	$(window).on({
		click: function(){
			if (firstclick == false) {
				$('#main').css('opacity', 1);
				$('#main').focus(); 
				firstclick = true;
			} else {}
		}
	});
	

	$('#main').focus(function() {
		$('#sidebar').css("opacity", 1)
	})	
	
	$('#main').on({
		keydown: function(e){
			if ( e.keyCode == 9 ) {
		    	e.stopPropagation()
		        e.preventDefault();
		        $( this ).val( $( this ).val() + '\t' );
	    	}
		}
	});

	$('.action').on({
		click: function(){
			if ($(this).attr('class') == 'action mono') {
				$('#main').addClass('monospace')
			} else {$('#main').removeClass('monospace')}

			if ($(this).children('.addl').css('display') == "none") {
				$('.option').css('color', '#777777');
				$('.addl').slideUp(slidespeed);
				$(this).children('.addl').slideDown(slidespeed);
				$(this).css('background-color', '#F3F4F6');
				$(this).children('header').css('color', 'red');
			}
		},
		mouseenter: function(){
			$(this).children('.option').css('color', 'red')
			$(this).children('.option').css('background-color', '#ffffff')
		},
		mouseleave: function(){
			if ($(this).children('.addl').css('display') == "none") {
				$(this).children('.option').css('color', '#777777')
			}
			$(this).children('.option').css('background-color', 'transparent')
	    }
	});
	


	$('#mail').on({
		click: function(){
			var statusupdate = $(this).siblings('.status')
			$(statusupdate).html('Sending...')
			$.ajax({
				url: "server/pyscript.py",
				data: {
					action : "mail",
					recipient : $("#mail-to").val(),
					subject : $("#mail-subject").val(), 
					body : $("#main").val()  
				},
				type: "GET",
				dataType: "script",
				success: function() {
					$(statusupdate).html('Your email was sent.')
				}
			});
		}
	});




	$('#doc').on({
		click: function(){
			var statusupdate = $(this).siblings('.status')
			$(statusupdate).html('Creating document...')
			$.ajax({
				url: "server/pyscript.py",
				data: {
					action : "doc",
					title : $("#doc-title").val(),
					body : $("#main").val()
				},
				type: "GET",
				dataType: "text",
				success: function(msg) {
					$(statusupdate).html('<a href="https://docs.google.com/document/d/'+msg+'/edit">Your document</a> was created.')
				}
			});
		}
	});



	$('#gist').on({
		click: function(){
			$.ajax({
				url: "https://api.github.com",
				data: {
				  "description": "the description for this gist",
				  "public": true,
				  "files": {
				    "file1.txt": {
				      "content": "String file contents"
				    }
				  }
				},
				type: "POST /gists",
				// dataType: "script",
				success: function(msg) {
					// $('#main').append('Your document was created:')
				}
			});
		}
	});
	
	

});
