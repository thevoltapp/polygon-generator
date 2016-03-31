var map;
var iw = new google.maps.InfoWindow();
var lat_longs = new Array();
var markers = new Array();
var drawingManager;

function initialize() {
    var myLatlng = new google.maps.LatLng(41.1119553, 29.0576034);
    var myOptions = {
        zoom: 9,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    
    drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [google.maps.drawing.OverlayType.POLYGON]
        }, polygonOptions: {
            editable: true
        }
    });

    drawingManager.setMap(map);

    google.maps.event.addListener(drawingManager, "overlaycomplete", function(event) {
        var newShape = event.overlay;
        newShape.type = event.type;
    });

    google.maps.event.addListener(drawingManager, "overlaycomplete", function(event){
        overlayClickListener(event.overlay);
        var coords_serialize = "";
        var coords = event.overlay.getPath().getArray();

        for (var i=0; i < coords.length; i++) {
            if(coords_serialize != "")
                coords_serialize += ", "
            coords_serialize += coords[i].lng() + " " + coords[i].lat();
            if(i == coords.length - 1 && coords.length != 1) {
                coords_serialize += ", " + coords[0].lng() + " " + coords[0].lat();
            }
        }

        coords = "POLYGON ((" + coords_serialize + "))";
        
        $('#vertices').val(coords);
    });
}

function overlayClickListener(overlay) {
    google.maps.event.addListener(overlay, "mouseup", function(event){
        $('#vertices').val(overlay.getPath().getArray());
    });
}

new Clipboard('.btn');

initialize();
