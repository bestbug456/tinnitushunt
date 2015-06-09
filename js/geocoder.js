var geocoder;
var map;
function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(41.902783, 12.496366);
  var mapOptions = {
    zoom: 8,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var marker = new google.maps.Marker({
    position: map.getCenter(),
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 1
    },
    draggable: true,
    map: map
  });



}


function codeAddress() {
  var address = document.getElementById('address').value;
  $(this).serialize()
  saveAddress(address);
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });

}

function initializeListAddress(address) {
  
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });

}

function saveAddress(address){
    
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "http://bbug.me/works/acufene/handler.php",
      data: {"action": "insert",
              "address": address},
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


google.maps.event.addDomListener(window, 'load', initialize);

