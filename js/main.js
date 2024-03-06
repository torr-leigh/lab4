
var map = L.map('map').setView([43.8, -120.55], 7);


L.tileLayer('https://api.mapbox.com/styles/v1/everythingismossome/cltdncjzi00po01ptewv35pho/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZXZlcnl0aGluZ2lzbW9zc29tZSIsImEiOiJjbHNqOXZjd3oycHRrMmt0MHE1MWFjc3d2In0.BFb9k5gMVQGbDhX-3aEXzA', {
}).addTo(map);



//_______________________________


//__ mapbox new style link
// mapbox://styles/everythingismossome/cltdncjzi00po01ptewv35pho

// old mapbox format
// mapbox style ID format: https://api.mapbox.com/styles/v1/YOUR_USERNAME/YOUR_STYLE_ID/tiles/256/{z}/{x}/{y}?access_token=YOUR_MAPBOX_ACCESS_TOKEN
// mapbox user & style ID://styles/everythingismossome/clsja9boj006z01rb9iqk0xjd
// access token: pk.eyJ1IjoiZXZlcnl0aGluZ2lzbW9zc29tZSIsImEiOiJjbHNqOXZjd3oycHRrMmt0MHE1MWFjc3d2In0.BFb9k5gMVQGbDhX-3aEXzA


var myStyle = {
    "color": "#8787A2",  
    "weight": 2,
    dashArray: '4',
    "fillOpacity": 0
};



//___add geojson from data folder to map
fetch('data/watershed_boundaries_OR.json') 
.then(response => response.json())
.then(geojsonData => {
    var geojson = L.geoJSON(geojsonData, {
        style: myStyle,
        onEachFeature: onEachFeature
    }).addTo(map);
})
.catch(error => console.error('Error: ', error));

// Event handling functions
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#40ABCF',
        dashArray: '',
        fillOpacity: 0.1
    });

    layer.bringToFront();
}

function resetHighlight(e) {
    var layer = e.target;
    layer.setStyle(myStyle);
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}


/*
var myStyle = {
    "color": "#8787A2",  
    "weight": 2,
    dashArray: '4',
    "fillOpacity": 0
};

var riverStyle = {
    "color": "#00B9E8",  
    "weight": 3,
    opacity: 0.1,
};

var riversLayer;

//___add geojson from data folder to map
fetch('data/watershed_boundaries_OR.json') 
.then(response => response.json())
.then(geojsonData => {
    var geojson = L.geoJSON(geojsonData, {
        style: myStyle,
        onEachFeature: onEachFeature
    }).addTo(map);
})
.catch(error => console.error('Error: ', error));

// Event handling functions
function highlightFeature(e) {
    var polygonLayer = e.target;

    // Highlight the polygon
    polygonLayer.setStyle({
        weight: 5,
        color: '#40ABCF',
        dashArray: '',
        fillOpacity: 0.0
    });
    polygonLayer.bringToFront();

    // Get the polygon bounds
    var polygonBounds = polygonLayer.getBounds();

    // Iterate through each river feature
    riversLayer.eachLayer(function (river) {
        // Check if the river intersects with the polygon bounds
        if (polygonBounds.intersects(river.getBounds())) {
            // Highlight the river
            river.setStyle({
                weight: 7,
                color: '#40ABCF',
                dashArray: '',
                fillOpacity: 0.75
            });
            river.bringToFront();
        }
    });
}


function resetHighlight(e) {
    var layer = e.target;
    layer.setStyle(myStyle);

    // Reset river styles
    riversLayer.eachLayer(function (river) {
        river.setStyle(riverStyle);
    });
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

fetch('data/rivers.geojson') 
.then(response => response.json())
.then(data => {
    riversLayer = L.geoJSON(data, {
        style: riverStyle,
        onEachFeature: onEachFeature
    }).addTo(map)
})
.catch(error => console.error('Error: ', error))
*/