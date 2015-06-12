window.onload = function () {
	FB.getLoginStatus(function(response) {
    	if (response.status === 'connected')
    		document.getElementById('openModal').innerHTML = "Click to edit your profile";
		else
			document.getElementById('openModal').innerHTML = "Click to open sign up on acufene website";
	});
}