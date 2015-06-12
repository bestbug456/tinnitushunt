function verifyLogin(){
	FB.getLoginStatus(function(response) {
    	statusChangeCallback(response);
    	if (response.status === 'connected'){
    		FB.api('/me', function(reply) {
			    console.log(JSON.stringify(reply));
			    document.getElementById('myName').innerHTML =
	          	'Thanks for logging in, ' + reply.name + '!';
	          	$('#userProfile').modal();
			});
    		document.getElementById('openModal').innerHTML = "Click to edit your profile";
		}else{
			$('#socialLogin').modal();
			document.getElementById('openModal').innerHTML = "Click to open sign up on acufene website";
		}
	});
}

function showForm() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      		console.log('Successful login for: ' + response.name);
          	$('#closeLogin').click();
          	document.getElementById('myName').innerHTML =
          	'Thanks for logging in, ' + response.name + '!';
          	$('#userProfile').modal();
          	document.getElementById('openModal').innerHTML = "Click to edit your profile";
    });
}