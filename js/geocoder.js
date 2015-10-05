var geocoder;
var map;
function initialize() {
  /*Autocomplete address*/
  var input = document.getElementById('indirizzo');
  var options = {};

  new google.maps.places.Autocomplete(input, options);

  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(41.902783, 12.496366);
  var mapOptions = {
    zoom: 5,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

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



google.maps.event.addDomListener(window, 'load', initialize);
