$(document).ready(function(){

    // --------------------------------------------Création d'une carte-------------------------------------- 
    var map = L.map('map',{
        center: [44.5, 0],
        zoom : 8,
        maxZoom: 17, // niveau de zoom max de la carte
        minZoom: 7, // niveau de zoom mini de la carte
        zoomControl: false, // Fait disparaitre les controles de zoom
        doubleClickZoom: false

    });

    //--------------------------------------------------Zoom home-----------------------------------------------
    var zoomHome = L.Control.zoomHome({
        zoomHomeIcon: 'house', // nom de l'icone utilisé
        zoomInTitle: 'Attention tu vas zoomer !', 
        zoomOutTitle: 'Attention tu vas dézoomer !',
        zoomHomeTitle: 'Retour à la vue initiale',
    });
    zoomHome.addTo(map);

    //-------------------------echelle----------------------------------
    var barreEchelle = L.control.scale({
        imperial: false,
        position: 'bottomright'
    });
    barreEchelle.addTo(map);

    /// -------------------------------------------------cooo survol---------------------------------------------
    var coordonnees = L.control.coordinates({
        position: 'bottomright', // position
        enableUserInput: false // empecher saisie coord
    });
    coordonnees.addTo(map);

    //-------------------------------- minimap-------------------------

    var osm2 = new L.TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {minZoom: 0, maxZoom: 13});

    // Instanciation de miniMap
    var miniMap = new L.Control.MiniMap(osm2,{
        position: 'topright',
        toggleDisplay: true
    });
    miniMap.addTo(map);

    //----------------------------------OSM----------------------------------
    var fondOSM = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { 

        maxZoom: 20, // Zoom max d'affichage
        minZoom: 5, 
        attribution:'&copy;<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' 
    });
    // ajout du fond OSM a la carte
    fondOSM.addTo(map);
    //--------------------------------orthophotoIGN---------------------------------

    var ortho = new L.tileLayer('https://data.geopf.fr/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GETTile'+
        '&LAYER=HR.ORTHOIMAGERY.ORTHOPHOTOS'+
        '&STYLE=normal'+
        '&FORMAT=image/jpeg'+
        '&TILEMATRIXSET=PM'+
        '&TILEMATRIX={z}'+
        '&TILEROW={y}'+
        '&TILECOL={x}'
    );

    ortho.addTo(map);

    //------------------------------plan IGn------------------------------------

    var plan1 = new L.tileLayer('https://data.geopf.fr/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GETTile'+
        '&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2'+
        '&STYLE=normal'+
        '&FORMAT=image/png'+
        '&TILEMATRIXSET=PM'+
        '&TILEMATRIX={z}'+
        '&TILEROW={y}'+
        '&TILECOL={x}'
    );
    //plan1.addTo(map);



    //----------------------- style---------------------------------------------
    /*
    function jolicommune(feature){
        return{fillColor: 'yellow',
            color: 'black',
            fillOpacity:0.3,
            weight: 1,
            

        }
    }
    */

    //---------------------------------------------- Itinéraire---------------------------------------------

    
    

//---------------------------------------- recup attribut ----------------------
    /*
    function onEachCommune(feature, Layer){
        console.log(feature);
        var infoContent ='<h1>';
            infoContent += feature.properties.nom;
            infoContent += '</h1>';

            for(var key in feature.properties){
                infoContent +=  key + ': ' +'<span style="color: red;">' + feature.properties[key]+'</span><br>';
            }

            Layer.on('click',function(){
                $('#info').html(infoContent);
            
            

            });
    }

    */
   

//------------------------------------seuil visibilité-------------------------------------------------
    /*
    map.on('zoomend',function(){
        var zoom =map.getZoom();
        console.log(zoom);
    if($('#couche_commune').is(':checked')){
            if(zoom> 10){
                map.addLayer(vCommune_cda);
            }else{
                map.removeLayer(vCommune_cda)
            }
        }

    });
    */
//-----------------------------------recup yelo ------------------------------------------------------------

    /*
    var cluster = L.markerClusterGroup({



    });

    $.getJSON('https://opendata.agglo-larochelle.fr/d4c/api/records/1.0/search/dataset=yelo___disponibilite_des_velos_en_libre_service&facet=station_nom', function (data) {
        data.records.forEach(record => {
            console.log(record.fields.geo_points_2d);

            var lat = record.fields.station_latitude;
            var long = record.fields.station_longitude;
            var accroches = record.fields.nombre_emplacements;
            var velos = record.fields.velos_disponibles;
            var taux = velos * 100 / accroches;
            var station_nom = record.fields.station_nom;


            var color;

            if (taux >= 75) {
                color = 'green';
            } else if (taux > 25) {
                color = 'orange';
            } else {
                color = 'red';
            }


            var station = L.circleMarker([lat, long], {
                fillColor: color

            });

            cluster.addLayer(station);

            station.on('click', function () {
                var infoVelo = '<b>' + station_nom + '</b><br>';
                infoVelo += 'Nb vélos dispo:' + velos + '<br>';
                infoVelo += 'Nb accroches dispo:' + accroches + '<br>';
                infoVelo += 'Taux vélos dispo:' + taux + '%<br>';
                $('#info').html(infoVelo);



                map.panTo([latitude, longitude]);

            });
            cluster.addTo(map);
        //station.addTo(map);

    });
    
    
    */    
//// -------------------------------------------- barre info couche ------------------------------


$('#fond_de_plan').change(function(){
 
 var fondchoisi = $(this).val();
 Swal.fire({
    title: 'Fond de plan sélectionné',
    text: 'Désormais la carte est : ' + fondchoisi,
    icon: 'info',
    confirmButtonText: 'OK',
    confirmButtonColor: '#3085d6'
});



    if(fondchoisi == 'orthophoto'){
        map.removeLayer(plan1);
        map.removeLayer(fondOSM);
        map.addLayer(ortho);
    }
    else if (fondchoisi == 'plan'){
        map.addLayer(plan1);
        map.removeLayer(fondOSM);
        map.removeLayer(ortho);
    }
    else if (fondchoisi == 'fondOSM'){
        map.removeLayer(plan1);
        map.addLayer(fondOSM);
        map.removeLayer(ortho);
    }


 }
);

var myIcon = L.icon({
    iconUrl: 'assets/img/parasol.png', // Chemin vers votre image locale
    iconSize: [20, 50], // Taille de l'icône
    iconAnchor: [20, 50], // Point de l'icône correspondant à la position du marqueur
    popupAnchor: [-3, -76] // Point d'où la popup s'ouvre par rapport à l'icône
});
    
    //-------------------------------------------recup plage via flux + geojson-------------------------------
    
        var vPigma; // Variable globale pour stocker les marqueurs
        var allFeatures = []; // Stocker les données GeoJSON initiales

    // Fonction pour déclencher l'alerte et obtenir les coordonnées
    function triggerAlert1() {
        Swal.fire({
            title: 'Calcul itinéraire en cours...',
            icon: 'info',
            showConfirmButton: false,  // Pas de bouton "OK"
            timer: 3000,  // Disparaît après 3 secondes
            background: `url('assets/img/route.png') center center no-repeat`,  // Image de fond centrée
            backgroundSize: 'contain',  // Fond foncé
            color: '#ECF0F1',  // Texte clair
            timerProgressBar: true,  // Barre de progression
        });

        // Obtenir la géolocalisation du point de départ
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var depart = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                };

                // Utiliser map._popup pour obtenir la popup actuelle
                var popup = map._popup;

                if (popup) {
                    var arrivee = {
                        lat: popup.getLatLng().lat,
                        lon: popup.getLatLng().lng
                    };

                    console.log('Départ:', depart);
                    console.log('Arrivée:', arrivee);

                    // Construire l'URL du webhook avec les coordonnées de départ et d'arrivée
                    var webhookUrl = `https://n8n.legeomaticien.com/webhook/65bac41e-96a9-4dc1-a546-a50f49d948e0?start=${depart.lon},${depart.lat}&end=${arrivee.lon},${arrivee.lat}`;
                    console.log("URL du webhook :", webhookUrl);

                    // Faire une requête GET au webhook
                    $.ajax({
                        url: webhookUrl,
                        type: 'GET',
                        success: function(response) {
                            console.log("Réponse du webhook :", response);
                            console.log("Structure de geojson :", response.geojson);

                            // Vérifier si les données GeoJSON sont valides
                            if (response.geojson && response.geojson.geometry && response.geojson.geometry.coordinates) {
                                var coordinates = response.geojson.geometry.coordinates;
                                console.log("Coordonnées brutes :", coordinates);

                                if (!Array.isArray(coordinates) || coordinates.length === 0) {
                                    console.error("Les coordonnées sont vides ou mal formatées !");
                                    return;
                                }

                                var leafletCoordinates = coordinates.map(coord => [coord[1], coord[0]]);
                                console.log("Coordonnées Leaflet :", leafletCoordinates);

                                // Ajouter la polyligne à la carte
                                var polyline = L.polyline(leafletCoordinates, { color: 'blue' }).addTo(map);
                                console.log("Polyligne ajoutée à la carte :", polyline);

                                // Zoomer sur la polyligne
                                map.fitBounds(polyline.getBounds());
                                console.log("Zoom sur la polyligne effectué.");
                            } else {
                                console.log("Aucune donnée de géométrie trouvée dans la réponse.");
                                if (response.geojson) {
                                    console.log(response.geojson.type);
                                }
                            }
                        },
                        error: function(error) {
                            console.error("Erreur lors de la requête au webhook :", error);
                        }
                    });
                } else {
                    console.error("La variable 'popup' n'est pas définie.");
                }
            });
        } else {
            console.log("La géolocalisation n'est pas supportée par ce navigateur.");
        }
    }

    // Récupérer les données GeoJSON et ajouter les marqueurs
    $.getJSON(
        'https://www.pigma.org/geoserver/giplit/ows?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=giplit:plages_na-4&outputFormat=application/json&SRSNAME=EPSG:4326',
        {},
        function(data) {
            console.log("Données reçues :", data);

            // Vérification de la structure des données avant d'essayer d'accéder aux éléments
            if (data && data.features && data.features.length > 0) {
                console.log("Première entité :", data.features[0]);
                allFeatures = data.features; // Stocker toutes les entités reçues

                // Ajouter tous les marqueurs au début
                vPigma = L.geoJSON(data, {
                    pointToLayer: function(feature, latlng) {
                        return L.marker(latlng, { icon: myIcon }); // Utilisez l'icône personnalisée ici
                    },
                    onEachFeature: function(feature, layer) {
                        var contenu = "<div class='custom-popup'>" +
                            "<h4>Nature de baignade:</h4> <p>" + feature.properties.nature_baignade + "</p>" +
                            "<h4>Commune:</h4> <p>" + feature.properties.commune + "</p>" +
                            "<h4>Nom du site:</h4> <p>" + feature.properties.nom_plage + "</p>" +
                            "<button class='alert-button' onclick='triggerAlert1()'>Obtenir l'itinéraire</button>" +
                            "</div>";
                        layer.bindPopup(contenu);

                        layer.on('popupopen', function() {
                            var button = document.querySelector('.alert-button');
                            if (button) {
                                button.addEventListener('click', triggerAlert1);
                            }

                            // Lorsque le popup est ouvert, mettez à jour la barre latérale avec les données descriptives
                            updateSidebar(feature);
                            updateSidebar2(feature);
                        });
                    }
                }).addTo(map);
            } else {
                console.warn("Aucune donnée valide trouvée ou le tableau 'features' est vide !");
            }
        }
    );
    //---------------------------------------------filtre barre déroulante---------------------------
    function filtrerMarqueurs() {
        var selectedValue = document.getElementById("Infobaignade").value; // Récupérer la sélection

        // Supprimer l'ancien layer s'il existe
        if (vPigma) {
            map.removeLayer(vPigma);
        }

        // Filtrer les entités en fonction de la sélection
        var filteredFeatures = allFeatures.filter(function (feature) {
            return feature.properties.nature_baignade === selectedValue;
        });

        // Vérifier si des entités filtrées existent
        if (filteredFeatures.length > 0) {
            // Ajouter les marqueurs filtrés à la carte
            vPigma = L.geoJSON({ type: "FeatureCollection", features: filteredFeatures }, {
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, { icon: myIcon }); // Utilisez l'icône personnalisée ici
                },
                
            }).addTo(map);
        } else {
            console.warn("Aucun marqueur correspondant à cette sélection !");
        }
    }

    // Ajouter l'événement pour écouter le changement de sélection
    document.getElementById("Infobaignade").addEventListener("change", filtrerMarqueurs);
    // ----------------------------------------------Fonction pour mettre à jour la barre latérale avec les données descriptives
    function updateSidebar(feature) {
        // Récupérer le contenu du descriptif de la plage
        var descriptif = feature.properties.descriptif || "Pas de descriptif disponible.";

        // Créer le contenu à afficher dans la barre latérale
        var sidebarContent = `
            
            <p>${descriptif}</p>
        `;

        // Insérer le contenu dans le div de la barre latérale
        document.getElementById("sidebar-content").innerHTML = sidebarContent;
    }

    function updateSidebar2(feature) {
        // Récupérer le contenu du descriptif de la plage
        var descriptif2 = feature.properties.nom_plage || "Pas de descriptif disponible.";

        // Créer le contenu à afficher dans la barre latérale
        var sidebarContent2 = 
        `
            <p>${descriptif2}</p>
        `;

        // Insérer le contenu dans le div de la barre latérale
        document.getElementById("sidebar-content2").innerHTML = sidebarContent2;
    }


    // ---------------------------------------------------------------Fonction pour filtrer les marqueurs
    

    //--------------------- Info baigande------------------------------------------------------------

    /*$('#Infobaignade').change(function(){
 
        var typebain = $(this).val();
        alert(typebain)




    }
    );*/
    //----------------------------------------Function création marqueur---------------------------------


    var markerClic;

    map.on('dblclick',function(event){

        var lati = event.latlng.lat;
        var long = event.latlng.lng;
        
        if (markerClic){
            map.removeLayer(markerClic)
        }

        markerClic = L.marker([lati,long],{icon: myIcon});
        markerClic.addTo(map);




    // Récupérer l'adresse via l'API IGN
    var urlApi = 'https://data.geopf.fr/geocodage/reverse?lon=';
        urlApi += long;
        urlApi += '&lat=';
        urlApi += lati;
        urlApi += '&index=address&limit=1&returntruegeometry=false';
        console.log(urlApi);
    $.getJSON(urlApi, function(data){

        var adresse = data.features[0].properties.label;

        markerClic.bindPopup(adresse);
        markerClic.openPopup();
        
    });

    


    });

    


});

    






















