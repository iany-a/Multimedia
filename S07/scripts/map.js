window.onload = function(){
    navigator.geolocation.getCurrentPosition(success, error);
}

function success(position){
    console.log("SUCCESS", position);

    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    var map = L.map('map').setView([lat, long], 18);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(map);

    L.marker([lat, long]).addTo(map);
}

