$('#facebook').click(function(){
	sendAjax("facebook");
});

$('#twitter').click(function(){
	sendAjax("Twitter");
});

function sendAjax(socialName){
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "http://bbug.me/works/acufene/handler.php",
		data: {"action": "socialLogin",
		      "social": socialName},
	success: function(data) {
		alert("Form submitted successfully.\nReturned json: " + data["json"]);
	},
	error: function(xhr,e){
	    if(xhr.status==0){
	        alert('You are offline!!\n Please Check Your Network.');
	    }else if(xhr.status==404){
	        alert('Requested URL not found.');
	    }else if(xhr.status==500){
	        alert('Internel Server Error.');
	    }else if(e=='parsererror'){
	        alert('Error.\nParsing JSON Request failed.');
	    }else if(e=='timeout'){
	        alert('Request Time out.');
	    }else {
	        alert('Unknow Error.\n'+x.responseText);
	    }
	}
	});
	return false;
}