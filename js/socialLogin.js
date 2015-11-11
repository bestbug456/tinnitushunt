function verifyLogin(){
	FB.getLoginStatus(function(response) {
    	statusChangeCallback(response);
    	if (response.status === 'connected'){
    		FB.api('/me', function(reply) {
			    console.log(JSON.stringify(reply));
			    document.getElementById('myName').innerHTML =
	          	'Ciao ' + reply.name;
          		$('#userProfile').modal();
	          	document.getElementById('openModal').innerHTML = "Profilo";
              document.getElementById('forms-top').style.display = "inline";
			});

		}else{
			$('#socialLogin').modal();
			document.getElementById('openModal').innerHTML = "Registrati";
		}
	});
}

function showForm() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      		console.log('Successful login for: ' + response.name);
          	$('#closeLogin').click();
          	document.getElementById('myName').innerHTML =
          	'Ciao ' + response.email;
          	getPersonalData();
          	$('#userProfile').modal();
          	document.getElementById('openModal').innerHTML = "Profilo";
            document.getElementById('forms-top').style.display = "inline";
    });
}
