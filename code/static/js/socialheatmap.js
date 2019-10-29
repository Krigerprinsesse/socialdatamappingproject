
var myMap = L.map("map", {
  center: [34.0522, -118.2437],
  zoom: 5
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);


var url = "/api/fb_data";

// d3.json(url, function(response) {
d3.json(url).then(function(response) {

  console.log(response);

  var heatArray = [];

  for (var i = 0; i < response.length; i++) {
    var location = response[i];
    if (location) {
      heatArray.push([location.latitude, location.longitude]);
    }
  }
  console.log(heatArray)
  var heat = L.heatLayer(heatArray, {
    radius: 50,
    blur: 35
  }).addTo(myMap);


d3.json(url).then(function(response) {

    console.log(response);

  // Create a new marker cluster group
  var markers = L.markerClusterGroup();

  // Loop through data
  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable
    var newlocation = response[i];

    // Check for location property
    if (newlocation) {

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([newlocation.latitude, newlocation.longitude])
        .bindPopup(response[i]));
    }

  }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});

});