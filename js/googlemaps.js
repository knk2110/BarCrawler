// Google Maps API
// var geocoder = new google.maps.Geocoder();
var ZIP_ZOOM = 15;
var PATH_WEIGHT = 3;
var PATH_COLOR = "blue";

// var API_KEY = "AIzaSyCLmg3Ze8aC4aeiBlb3r-kSoII9GLxrcUo";

// function buildMap(address, zoom) {
//   console.log(address);
//     geocoder.geocode( { 'address': address}, function(results, status) {
//       if (status == google.maps.GeocoderStatus.OK) {
//           var mapOptions = {
//           zoom: zoom
//         };
//           });
//         var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
//         });
//         map.setCenter(results[0].geometry.location);
//       } else {
//         alert("Geocode was not successful for the following reason: " + status);
//       }
//     });
//     google.maps.event.addDomListener(window, 'load', buildMap);
// }

// Load static map using zoom. width, height, address and locations
// Pass in a Map object 
// =============== Locator Object ==================
// Require fields: height and width
// Optional: zip code, array of locations - each location is an object with a lat and long
// Output: URL string of map
function buildMapURL(locator){
  // necessary for all calls
  var urlString =  "http://maps.googleapis.com/maps/api/staticmap?";
  var sizeString = "size=" + locator.width + "x" + locator.height;
  var pathString = "&path=weight:" + PATH_WEIGHT + "%7Ccolor:" + PATH_COLOR; 
  // if zipcode is provided
  // center at the zip code and zoom in standard
  if(locator.zipcode){
     urlString += "center=" + locator.zipcode + "&zoom=" + ZIP_ZOOM + "&" + sizeString; 
  }
  // otherwise, take the locations array and provide the url based on the locations
  else if(locator.locations){
    // standard url string
    urlString += sizeString + "&markers=color:blue";
    var pointsString = '';
    // put markers on map
      for(var i=0; i<locator.locations.length ; i++){
        urlString += "&markers=color:blue%7Clabel:" + (i+1) + "%7C" + locator.locations[i].lat +"," + locator.locations[i].lng;
      }
      // if more than one marker - draw path on map
    if(locator.locations.length > 1){
      urlString += pathString;
      for(var i=0; i<locator.locations.length ; i++){
        urlString += "%7C" + locator.locations[i].lat +"," + locator.locations[i].lng;
      }
    }
  }
  else{
    alert('Invalid input!');
  }
  urlString += "&sensor=true";

  return urlString;
}