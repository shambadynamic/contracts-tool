var map;

/* Basemap Layers */
var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
   maxZoom: 20,
   subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
 });
var cartoLight = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
});
var usgsImagery = L.layerGroup([L.tileLayer("http://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}", {
  maxZoom: 15,
}), L.tileLayer.wms("http://raster.nationalmap.gov/arcgis/services/Orthoimagery/USGS_EROS_Ortho_SCALE/ImageServer/WMSServer?", {
  minZoom: 16,
  maxZoom: 19,
  layers: "0",
  format: 'image/jpeg',
  transparent: true,
  attribution: "Aerial Imagery courtesy USGS"
})]);

map = L.map("map", {
  zoom: 3,
  center: [-1.323,36.7232],
  layers: [googleStreets, ],
  zoomControl: false,
  attributionControl: false
});


var attributionControl = L.control({
  position: "bottomright"
});
attributionControl.onAdd = function (map) {
  var div = L.DomUtil.create("div", "leaflet-control-attribution");
  div.innerHTML = "<span class='hidden-xs'>Powered by <a href='http://shambadynamics.com'>Shamba Dynamics</a> | </span><a href='#' onclick='$(\"#attributionModal\").modal(\"show\"); return false;'>Attribution</a>";
  return div;
};
map.addControl(attributionControl);

var zoomControl = L.control.zoom({
  position: "topright"
}).addTo(map);

/* GPS enabled geolocation control set to follow the user's location */
var locateControl = L.control.locate({
  position: "bottomright",
  drawCircle: true,
  follow: true,
  setView: true,
  keepCurrentZoomLevel: true,
  markerStyle: {
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.8
  },
  circleStyle: {
    weight: 1,
    clickable: false
  },
  icon: "fa fa-location-arrow",
  metric: false,
  strings: {
    title: "My location",
    popup: "You are within {distance} {unit} from this point",
    outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
  },
  locateOptions: {
    maxZoom: 18,
    watch: true,
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
  }
}).addTo(map);

/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

var baseLayers = {
  "Google Map": googleStreets,
  "CartoLight Map": cartoLight,
  "Aerial Imagery": usgsImagery
};


var layerControl = L.control.groupedLayers(baseLayers, {
  collapsed: isCollapsed,
}).addTo(map);

var editableLayers = new L.FeatureGroup();
    map.addLayer(editableLayers);
    
    var MyCustomMarker = L.Icon.extend({
        options: {
            shadowUrl: null,
            iconAnchor: new L.Point(12, 12),
            iconSize: new L.Point(24, 24),
            iconUrl: 'link/to/image.png'
        }
    });
    
    var options = {
        position: 'topright',
        draw: {
            polyline: false,
            polygon: {
                showArea: true,
                allowIntersection: false, // Restricts shapes to simple polygons
                drawError: {
                    color: '#FF4F00', // Color the shape will turn when intersects
                    message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
                },
                shapeOptions: {
                    color: '#FF4F00'
                }
            },
            circle: {
                showArea: true,
                shapeOptions: {
                    color: '#FF4F00'
                }
            },
            rectangle: {
                showArea: true,
                shapeOptions: {
                    clickable: false,
                    color: '#FF4F00'
                }
            },
            marker: false
            // {
            //     icon: new MyCustomMarker()
            // }
        },
        edit: {
            featureGroup: editableLayers, //REQUIRED!!
            remove: false
        }
    };
    
    var drawControl = new L.Control.Draw(options);
    map.addControl(drawControl);
    
    map.on(L.Draw.Event.CREATED, function (e) {
        var type = e.layerType,
            layer = e.layer; 
        // if(map.hasLayer(editableLayers)){
        //   editableLayers.clearLayers()
        // }
        
        if (type === 'polygon' || type === 'rectangle') { 
            editableLayers.addLayer(layer);         
            editor.setValue(JSON.stringify(editableLayers.toGeoJSON(), null, 4));
            editor.setOption('mode', 'text/javascript');
            
        }
        if (type === 'circle') {
          var theCenterPt = layer.getLatLng();
          var center = [theCenterPt.lng,theCenterPt.lat]; 
          console.log(center);
          var theRadius = layer.getRadius();
          
          // Turf Circle
          var turfCircle;
          var options = {steps: 64, units: 'meters'};  //Change steps to 4 to see what it does.
          var turfCircle = turf.circle(center, theRadius, options);
          var NewTurfCircle = new L.GeoJSON(turfCircle, {color:"black"});
          //Turf Buffer
          var thepoint = turf.point(center);
          var buffered = turf.buffer(thepoint, theRadius, {units: 'meters'});
          var NewTurfBuffer = new L.GeoJSON(buffered,{color:'#FF4F00'}).addTo(map);
          console.log(NewTurfBuffer)
          NewTurfBuffer.eachLayer(function(layer) {
            editableLayers.addLayer(layer);
          });  
          editor.setValue(JSON.stringify(editableLayers.toGeoJSON(), null, 4));
          editor.setOption('mode', 'text/javascript');
          
        }    
       
      

        
    });

// Leaflet patch to make layer control scrollable on touch browsers
var container = $(".leaflet-control-layers")[0];
if (!L.Browser.touch) {
  L.DomEvent
  .disableClickPropagation(container)
  .disableScrollPropagation(container);
} else {
  L.DomEvent.disableClickPropagation(container);
}
