window.onload = function () {
	FB.getLoginStatus(function(response) {
    	if (response.status === 'connected'){
    		FB.api('/me', function(reply) {
    			document.getElementById('openModal').innerHTML = "Profilo";
    			getPersonalData(response.id);
    		})
		}else
			document.getElementById('openModal').innerHTML = "Registrati";
	});
	listOfZips();
	totAcufenizzati();
}

function noAcufene(){
	$('#closeLogin').click();
	$('#noAcufene').modal();
}

function totAcufenizzati(){
	  $.ajax({
      type: "POST",
      dataType: "json",
      url: "http://bbug.me/works/acufene/handler.php",
      data: {"action": "getTotal"},
      success: function(data) {
      	$("#acufenizzati").text(data.dataUser+" acufenizzati");
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
}

function listOfZips(){
	  $.ajax({
      type: "POST",
      dataType: "json",
      url: "http://bbug.me/works/acufene/handler.php",
      data: {"action": "getListOfZips"},
      success: function(data) {
      	var address = data['dataUser'];
	      	var markers = [];
	      	var latng = [];
	      	for(i=0;i<address.length;i++){
	      		latng = JSON.parse(address[i]);
	      		var latLng = new google.maps.LatLng(
	                            latng.results[0].geometry.northeast.lat,
	                            latng.results[0].geometry.northeast.lng);
		        var marker = new google.maps.Marker({
		            position: latLng,
		            map: map
		        });
		        markers.push(marker);
	      	}
	      	//var markerCluster = new MarkerClusterer(map, markers);
      	
        


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
}