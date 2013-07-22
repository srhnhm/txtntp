$(document).ready(function() {

	//catching the first click and revealing textarea and sidebar
	var firstclick = false;
  console.log("LS:", localStorage.getItem("test"))
  console.log("LOCATION", location)

	$(window).on({
		click: function(){
			if (firstclick == false) {
				$('#maintext').css('opacity', 1);
				$('#sidebar').css("opacity", 1)
				$('#maintext').focus();
				firstclick = true;
			} else {}
		}
	});

	$('#maintext').on({
		keydown: function(e){
			if ( e.keyCode == 9 ) { // Tab key
		    	e.stopPropagation()
		        e.preventDefault();
		        $( this ).val( $( this ).val() + '\t' );
	    	}
		}
	});



	//controls for the sidebar UI

	var textNormal = $('body').css('color');
	var textHighlight = '#FF2A00';
	var bgHighlight = '#FFFFFF';
	var bgSelected = '#F3F4F6';
	var slidespeed = 200;

	$('.option').on({
		click: function(){
			var thisOption = $(this);
			var thisAddl = thisOption.children('.addl')
			var thisTitle = thisOption.children('.title')
			// Check if text area should be monospaced
			if (thisOption.hasClass('mono') == true) {
				$('#maintext').addClass('monospace')
			} else {$('#maintext').removeClass('monospace')}


			// Sidebar rollover behaviors
			if (thisAddl.css('display') == "none") {
				// resets all the (other) list items
				$('.title').css('color', textNormal);
				$('.addl').slideUp(slidespeed);
				// features the clicked list item
				thisAddl.slideDown(slidespeed);
				thisOption.css('background-color', bgSelected);
				thisTitle.css('color', textHighlight);
			}
		},
		mouseenter: function(){
			var thisTitle = $(this).children('.title')
			thisTitle.css('color', textHighlight)
			thisTitle.css('background-color', bgHighlight)
		},

		mouseleave: function(){
			var thisOption = $(this)
			var thisTitle = thisOption.children('.title')
			if (thisOption.children('.addl').css('display') == "none") {
				thisTitle.css('color', textNormal)
			}
			thisTitle.css('background-color', 'transparent')
	    }
	});


	//scripts to send the text to various services

  $('#gmail-login').on({
		click: function(){
			//var statusupdate = $(this).siblings('.status')
			//$(statusupdate).html('Sending...')
			$.ajax({
        url: "http://localhost:8000/auth/google",
				type: "GET",
				success: function() {
					$(statusupdate).html('Logged in.')
				}
			});
		}
	});
	$('#mail').on({
		click: function(){
			var statusupdate = $(this).siblings('.status')
			$(statusupdate).html('Sending...')
			$.ajax({
        url: "http://localhost:8000/gmail",
				data: {
					recipient : $("#mail-to").val(),
					subject : $("#mail-subject").val(),
					body : $("#maintext").val()
				},
				type: "POST",
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
					body : $("#maintext").val()
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
    click: function() {
      var token = githubAuth.getAccessToken();
      console.log("token!", token);
      //TODO: check for token
      //and do appropriate logic

    }
  });
  


  //login stuff
  //using excellent lib from here: http://smus.com/oauth2-chrome-extensions/
  //https://github.com/borismus/oauth2-extensions

  /*
  var googleAuth = new OAuth2('google', {
    client_id: '',
    client_secret: '',
    api_scope: 'https://www.googleapis.com/auth/tasks'
  });
  */

  /*
  var githubAuth = new OAuth2('github', {
    client_id: '5889bee02b7ec7f46084',
    client_secret: '448de7256296cf61d08d786e487d6f2adda9550b',
  });

  $('#github_login').on({
    click: function() {
      githubAuth.authorize(function() {
        // Ready for action, can now make requests with
        var token = githubAuth.getAccessToken();
        console.log("token", token);
      });
    }
  });
  */


	
	

});
