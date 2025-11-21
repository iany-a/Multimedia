window.onload = function() {
    // Initialize the map and set its view to our chosen geographical coordinates and a zoom level
    var map = L.map('map').setView([44.44798031674696, 26.099151898347195], 13);
    var marker = L.marker([44.44798031674696, 26.099151898347195]).addTo(map);
   //, 
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                // Center the map
                map.setView([lat, lon], 15);

                // Add a marker
                L.marker([lat, lon]).addTo(map)
                    .bindPopup("You are here")
                    .openPopup();
            },
            (error) => {
                console.error("Error getting location:", error);
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
    
}