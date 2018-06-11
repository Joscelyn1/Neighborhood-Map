// Sources: I used the example code from the Udacity Google API course as starter code. https://github.com/udacity/ud864
/* ======= model ======= */
var locationList = {
    locations: [{
            title: 'Ronald Reagan Library',
            location: {
                lat: 34.2597858,
                lng: -118.81989599999997
            },
            address: '40 Presidential Dr, Simi Valley, CA 93065',
            venueID: '4b463a3bf964a520b51a26e3'
        },
        {
            title: 'Simi Valley Library',
            location: {
                lat: 34.28901761295414,
                lng: -118.7193630981476
            },
            address: '2969 Tapo Canyon Rd, Simi Valley, CA 93063',
            venueID: '4b22cb20f964a520a64d24e3'
        },
        {
            title: 'Campos',
            location: {
                lat: 34.2744238,
                lng: -118.70930759999999
            },
            address: '2149 Tapo St, Simi Valley, CA 93063',
            venueID: '4ad503f3f964a5204c0121e3'
        },
        {
            title: 'Lemon Park',
            location: {
                lat: 34.2896751,
                lng: -118.7239667
            },
            address: '3700 Avenida Simi, Simi Valley, CA 93063',
            venueID: '4b26cf39f964a520478124e3'
        },
        {
            title: 'Starbucks',
            location: {
                lat: 34.2801792,
                lng: -118.76274480000001
            },
            address: '2991 Cochran St, Simi Valley, CA 93065',
            venueID: '570b2878498eaad5a8a3743a'
        }
    ]
};

//Location object
var Location = function(data) {
    this.title = data.title;
    this.lat = data.location.lat;
    this.lng = data.location.lng;
    this.address = data.address;
    this.venueID = data.venueID;
    this.marker = data.marker;
}


/* ======= viewModel ======= */

var viewModel = function() {
    var self = this;

    self.markerList = ko.observableArray([]);

    self.openMarker = function() {
        populateInfoWindow(this.marker, largeInfowindow);
        if (this.marker.getAnimation() !== null) {
            this.marker.setAnimation(null);
        } else {
            this.marker.setAnimation(google.maps.Animation.BOUNCE);
            this.marker.setAnimation(null);
        }

    }
}

var neighborhoodVm = new viewModel();

/* ======= Google API ======= */
var map;
var largeInfowindow;
// Create a new blank array for all the listing markers.
var markers = [];

function initMap() {

    var simiValley = {
        lat: 34.269447,
        lng: -118.781479
    };
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: simiValley,
        zoom: 13,
        mapTypeControl: false
    });

    largeInfowindow = new google.maps.InfoWindow();

    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locationList.locations.length; i++) {
        $.ajax({
            url: "https://api.foursquare.com/v2/venues/" + locationList.locations[i].venueID + "/?client_id=AIQ4PXY5VMLG5144MCAKHZ2WSJK2YAAYW00TWK14XLF1HWRH&client_secret=CIIBQS1LNSTDIMQ3WN4HG0IVKLAOQNYFLXPO3RLLPM3U4FJ3&v=20180602",
            dataType: 'jsonp',
            success: (function(index, data) {
                locationList.locations[index].description = "<img src=" + data.response.venue.bestPhoto.prefix + "100x100" + data.response.venue.bestPhoto.suffix + ">";
                // Get the position from the location array.



                // Create a marker per location, and put into markers array.
                var marker = new google.maps.Marker({
                    address: locationList.locations[index].address,
                    position: locationList.locations[index].location,
                    title: locationList.locations[index].title,
                    venueID: locationList.locations[index].venueID,
                    description: locationList.locations[index].description,
                    animation: google.maps.Animation.DROP,
                    id: index
                });
                // Push the marker to our array of markers.
                markers.push(marker);

                // Make each marker a property of its respective location
                locationList.locations[index].marker = marker;
                //Add to view locationList
                neighborhoodVm.markerList.push(new Location(locationList.locations[index]));

                // Create an onclick event to open an infowindow at each marker.
                marker.addListener('click', function() {
                    populateInfoWindow(this, largeInfowindow);

                    if (this.getAnimation() !== null) {
                        this.setAnimation(null);
                    } else {
                        this.setAnimation(google.maps.Animation.BOUNCE);
                        this.setAnimation(null);
                    }

                });
                showListings();

            }).bind(null, i),
            error: (function(index) {
                locationList.locations[index].description = "Picture not available";
                var marker = new google.maps.Marker({
                    address: locationList.locations[index].address,
                    position: locationList.locations[index].location,
                    title: locationList.locations[index].title,
                    venueID: locationList.locations[index].venueID,
                    description: locationList.locations[index].description,
                    animation: google.maps.Animation.DROP,
                    id: index
                });
                // Push the marker to our array of markers.
                markers.push(marker);

                // Make each marker a property of its respective location
                locationList.locations[index].marker = marker;
                //Add to view locationList
                neighborhoodVm.markerList.push(new Location(locationList.locations[index]));

                // Create an onclick event to open an infowindow at each marker.
                marker.addListener('click', function() {
                    populateInfoWindow(this, largeInfowindow);

                    if (this.getAnimation() !== null) {
                        this.setAnimation(null);
                    } else {
                        this.setAnimation(google.maps.Animation.BOUNCE);
                        this.setAnimation(null);
                    }

                });
                showListings();
            }).bind(null, i)
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
        infowindow.setContent('<div>' + marker.title + '<br>' + marker.description + '<br>' + marker.address + '</div>');
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


ko.applyBindings(neighborhoodVm);