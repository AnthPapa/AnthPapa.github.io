var displayCoords, myAddress; 
  
       function getLocation() {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
          } else {
          displayCoords.innerHTML="Geolocation API not supported by your browser.";
       }
     }
  
  
     // Called when position is available
    function showPosition(position) {
       // displayCoords.innerHTML="Latitude: " + position.coords.latitude + 
       //    "<br />Longitude: " + position.coords.longitude;    
        showOnGoogleMap(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
 
    }
 
       var geocoder;
      var map;
      var infowindow = new google.maps.InfoWindow();
      var marker;
      
      function initialize() {
        displayCoords=document.getElementById("msg");
        myAddress = document.getElementById("address");
        
        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(34.0144, -6.83);
        var mapOptions = {
          zoom: 8,
          center: latlng,
          mapTypeId: 'roadmap'
        }
        map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions); 
      }
 
    function showOnGoogleMap(latlng) {
 
        geocoder.geocode({'latLng': latlng}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              map.setZoom(11);
              marker = new google.maps.Marker({
                  position: latlng,
                  map: map
              });
              infowindow.setContent(results[1].formatted_address);
              infowindow.open(map, marker);
              
              // Display address as text in the page
              // reverse geocoder returns an array of results with the first
              // one that should be the best, at index=0.
             // myAddress.innerHTML="Adress: " + results[0].formatted_address;
			  <!-- ALL YOUR CODE FOR TODAY GOES HERE-->
			  
			  var num = extractFromAddress(results[0].address_components, "street_number");
			  var street = extractFromAddress(results[1].address_components, "route");
			  var suburb = extractFromAddress(results[1].address_components, "locality");
			  var city = extractFromAddress(results[1].address_components, "route");
			  var state = extractFromAddress(results[1].address_components, "administrative_area_level_1");
			  var postcode = extractFromAddress(results[1].address_components, "postal_code");
			  var country = extractFromAddress(results[1].address_components, "country");
				//alert(street); //this is for testing only

				document.getElementById("number").value = num;
				document.getElementById("street").value = street;
				document.getElementById("suburb").value = suburb;
				document.getElementById("city").value = city;
				document.getElementById("state").value = state;
				document.getElementById("postcode").value = postcode;
				document.getElementById("country").value = country;
							
            } else {
              alert('No results found');
            }
          } else {
            alert('Geocoder failed due to: ' + status);
          }
        });
		
		
      }    

function extractFromAddress(components, type){
	for (var i=0; i<components.length; i++)
		for (var j=0; j<components[i].types.length; j++)
			if (components[i].types[j]==type) 
				return components[i].long_name;
	return "";
}	  