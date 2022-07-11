var DPLA_API = YOUR_API_HERE

var map;
function myMap() {
    geocoder = new google.maps.Geocoder();
    var mapProp= {
        center:new google.maps.LatLng(47.6062, -122.3321),
        zoom:1,
    };
    // Set the initial map that loads when the application starts
    map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
}

function calculateCenter(min, max) {
    /*! Calcuate the Center from bounding box for each geocode object.
    Need to pass this result to getCollections so I can set a default pin for
    collection items that don't have a coordinates field under spatial.
    */
    const difference = max - min
    return min + difference
}

var geocoder;
async function getCityMap() {
    /*! Centers the current map on the location user inputs */
    var latitude;
    var longitude;
    var city = document.getElementById('city-name').value;
    var infowindow = new google.maps.InfoWindow({});

    // Geocode returns the coordinates for city typed into input field.
    await geocoder.geocode( { 'address': city}, function(results, status) {
        if (status == 'OK') {
            latitude = calculateCenter(results[0].geometry.bounds.wb.lo, results[0].geometry.bounds.wb.hi);
            longitude = calculateCenter(results[0].geometry.bounds.Ra.lo, results[0].geometry.bounds.Ra.hi);
            map.setCenter(results[0].geometry.location);
            map.setZoom(14);
        } else {
            alert('Errors: ' + status);
            latitude = 0;
            longitude = 0;
        }
    })

    // Get collection items for city typed into input field.
    await getCollections(city, latitude, longitude, infowindow);
}

async function getCollections(city, lt, lg, infowindow) {
    /*! Queries all collections for destination city and populates the markers on the map */
    let response = await fetch('https://api.dp.la/v2/items?sourceResource.spatial='+city+'&page_size=500&api_key='+DPLA_API);
    let data = await response.json();
    var markers = [];
    var count = 0;

    // Iterate through response object to add a map pin for each collection item.
    Object.entries(data.docs).forEach(([key, value]) => {
        if (value.sourceResource.spatial[0].coordinates) {
            var coordinates = value.sourceResource.spatial[0].coordinates.split(", ");
            var lat = parseFloat(coordinates[0])
            var lng = parseFloat(coordinates[1]) + count
            count += .0005;
        } else {
            var lat = parseFloat(lt);
            var lng = parseFloat(lg) + count;
            count += .0005;
        }
        
        const marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(lat, lng),
        });

        marker.addListener("click", () => {
            infowindow.setContent(
                "<div><img src="+value.object+"></div>\
                <div padding: 10px;'><b>"+value.sourceResource.title[0]+"</b>\
                <form action='"+value.isShownAt+"'><input type='submit' value='Learn More' /></form></div>"
            )
            infowindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
            });
        });
        markers.push(marker);
    });
    
    return data
}