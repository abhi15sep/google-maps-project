//console.log("HELLO WORLD"); The JS print in console command

//When you load the website I want this to initiate
window.onload = () => { displayStores(); } //the syntax before siumulates a function in ES6

var map;
var markers = [];
var infoWindow;

function initMap() {
    var LosAngeles = {
        lat: 34.063380, 
        lng: -118.358080
    };
    map = new google.maps.Map(document.getElementById('map'), {
        center: LosAngeles,
        zoom: 11,
        mapTypeId: 'roadmap',
    });
    showStoresMarkers()
    infoWindow = new google.maps.InfoWindow();
}

function displayStores(){
    var storesHtml = '';
    for(var [index, store] of stores.entries()){
        var address = store['addressLines'];
        var phone = store['phoneNumber']
        
        storesHtml += `
            <div class="stores-list">
                <div class="store-container">
                    <div class="store-info-container">
                        <div class="store-address">
                            <span>${address[0]}</span>
                            <span>${address[1]}</span>
                        </div>
                        <div class="store-phone-number">${phone}</div>
                    </div>
                    <div class="store-number-container">
                        <div class="store-number">${index + 1}</div>
                    </div>
                </div>
            </div>
        `
        document.querySelector('.stores-list').innerHTML = storesHtml;
    }
}

function showStoresMarkers(){
    var bounds = new google.maps.LatLngBounds();
    for(var [index, store] of stores.entries()){
        var latlng = new google.maps.LatLng(
            store["coordinates"]["latitude"],
            store["coordinates"]["longitude"]);
        var name = store["name"];
        var address = store["addressLines"][0];
        var openStatusText = store["openStatusText"];
        var phoneNumber = store["phoneNumber"];
        bounds.extend(latlng);
        createMarker(latlng, name, address,openStatusText, phoneNumber, index+1)
    }
    map.fitBounds(bounds);
}

function createMarker(latlng, name, address, openStatusText, phoneNumber, index){
    var html = `
        <div class="store-info-window">
            <div class="store-info-name">
                ${name}
            </div>
            <div class="store-info-status">
                ${openStatusText}
            </div>
            <div class="store-info-address>
                ${address}
            </div>
            <div class="store-info-phone">
                ${phoneNumber}
            </div>
        </div>
    `;
    var marker = new google.maps.Marker({
      map: map,
      position: latlng
    });
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(html);
      infoWindow.open(map, marker);
    });
    markers.push(marker);
}