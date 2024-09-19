
let map;
let directionsService;
let directionsRenderer;
let trafficLayer;

function initMap() {
    const center = { lat: 40.7128, lng: -74.0060 }; 
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: center,
        mapTypeId: 'roadmap'
    });


    trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);


    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            const marker = new google.maps.Marker({
                position: userLocation,
                map: map,
                title: 'Your Location'
            });
            map.setCenter(userLocation);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

document.getElementById('checkTrafficBtn').addEventListener('click', () => {
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;

    if (!origin || !destination) {
        alert("Please enter both origin and destination.");
        return;
    }

    const request = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
        unitSystem: google.maps.UnitSystem.IMPERIAL
    };

    directionsService.route(request, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(response);
        } else {
            alert('Directions request failed due to ' + status);
        }
    });
});


window.onload = initMap;
