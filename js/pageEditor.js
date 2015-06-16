window.onload = function () {
	FB.getLoginStatus(function(response) {
    	if (response.status === 'connected'){
    		FB.api('/me', function(reply) {
    			document.getElementById('openModal').innerHTML = "Hello "+reply.first_name+" click to edit your profile";
    			getPersonalData(response.id);
    		})
		}else
			document.getElementById('openModal').innerHTML = "Click to open sign up on acufene website";
	});
}