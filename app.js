

var markers = [
                    {
                        name : 'Ronald Reagan Library',
                        position : {lat: 34.2598767, lng: 118.81982089999997},
                        lat : 34.2598767,
                        long : 118.81982089999997,
                    },
                    {
                        name : 'Simi Valley Library',
                        position : {lat: 34.28901761295414, lng: -118.7193630981476},
                        lat : 34.28901761295414,
                        long : -118.7193630981476,
                    },
                    {
                        name : 'Campos',
                        position : {lat: 34.2744238, lng: -118.70930759999999},
                        lat : 34.2744238,
                        long : -118.70930759999999,
                    },
                    {
                        name : 'Lemon Park',
                        position : {lat: 34.2896751, lng: -118.7239667},
                        lat : 34.2896751,
                        long : -118.7239667,
                    },
                    {
                        name : 'Arroyo Simi Bike Path',
                        position : {lat: 34.268684, lng: -118.705252},
                        lat : 34.268684,
                        long : -118.705252
                    }
];



var Marker = function(data) {
    this.name = ko.observable(data.name);
    this.lat = ko.observable(data.lat);
    this.long = ko.observable(data.long);
    this.position = ko.observable(data.position);
    this.marker = new google.maps.Marker({
        position: data.position,
        setMap: map,
        title: data.name
      });

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