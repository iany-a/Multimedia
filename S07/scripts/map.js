window.onload = function(){
    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
            
        var map = L.map('map').setView([lat, long], 18  );

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">My awesome website</a>'
        }).addTo(map);
   
        L.marker([lat, long]).addTo(map);
    })

}