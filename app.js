
/* ======= model ======= */


var model = {
  locations: [
    {title: 'Ronald Reagan Library', location: {lat: 34.2597858, lng: -118.81989599999997}},
    {title: 'Simi Valley Library', location: {lat: 34.28901761295414, lng: -118.7193630981476}},
    {title: 'Campos', location: {lat: 34.2744238, lng: -118.70930759999999}},
    {title: 'Lemon Park', location: {lat: 34.2896751, lng: -118.7239667}},
    {title: 'Arroyo Simi Bike Path', location: {lat: 34.268684, lng: -118.705252}}
  ]

};

/* ======= Google API ======= */
var map;

// Create a new blank array for all the listing markers.
var markers = [];

function initMap() {
  var simiValley = {lat: 34.269447, lng: -118.781479};
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: simiValley,
    zoom: 13,
    mapTypeControl: false
  });


  var largeInfowindow = new google.maps.InfoWindow();

  // The following group uses the location array to create an array of markers on initialize.
  for (var i = 0; i < model.locations.length; i++) {
    // Get the position from the location array.
    var position = model.locations[i].location;
    var title = model.locations[i].title;
    // Create a marker per location, and put into markers array.
     var marker = new google.maps.Marker({
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      id: i
    });
    // Push the marker to our array of markers.
    markers.push(marker);
    // Create an onclick event to open an infowindow at each marker.
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
    });
  }
  document.getElementById('show-listings').addEventListener('click', showListings);
  document.getElementById('hide-listings').addEventListener('click', hideListings);
}

// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {
  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.setContent('<div>' + marker.title + '</div>');
    infowindow.open(map, marker);
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick', function() {
      infowindow.marker = null;
    });
  }
}

// This function will loop through the markers array and display them all.
function showListings() {
  var bounds = new google.maps.LatLngBounds();
  // Extend the boundaries of the map for each marker and display the marker
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
    bounds.extend(markers[i].position);
  }
  map.fitBounds(bounds);
}

// This function will loop through the listings and hide them all.
function hideListings() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}

/* ======= viewModel ======= */

var viewModel = function(model) {
  var self = this;
  self.markerList = ko.observableArray(model.locations);

}

ko.applyBindings(new viewModel());



