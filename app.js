// display the map
function initMap() {
// focus the map on Simi Valley
  var simiValley = {lat: 34.269447, lng: -118.781479};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: simiValley
  });

}

var markers = [
                    {
                        name : 'Ronald Reagan Library',
                        lat : 34.2598767,
                        long : 118.81982089999997,
                    },
                    {
                        name : 'Simi Valley Library',
                        lat : 34.28901761295414,
                        long : -118.7193630981476,
                    },
                    {
                        name : 'Campos',
                        lat : 34.2744238,
                        long : -118.70930759999999,
                    },
                    {
                        name : 'Lemon Park',
                        lat : 34.2896751,
                        long : -118.7239667,
                    },
                    {
                        name : 'Arroyo Simi Bike Path',
                        lat : 34.268684,
                        long : -118.705252
                    }
];



var Marker = function(data) {
    this.name = ko.observable(data.name);
    this.lat = ko.observable(data.lat);
    this.long = ko.observable(data.long);
    this.position = ko.computed(function() {
        return this.lat() + ", " + this.long();
    }, this);

}



var viewModel = function() {
    var self = this;
// make an empty array called "markerList"
    this.markerList = ko.observableArray([]);
// push each marker into the markerList array
    markers.forEach(function(markerItem) {
        self.markerList.push( new Marker(markerItem) );
    });


    this.currentMarker = ko.observable( this.markerList()[0] );

}


ko.applyBindings(new viewModel());