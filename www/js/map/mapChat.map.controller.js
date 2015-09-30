/**
 * Created by yxia on 9/30/15.
 */

angular.module('mapChat.map')
    .controller('MapController',
    function ($scope,
              $cordovaGeolocation,
              $stateParams,
              $ionicModal,
              $ionicPopup,
              $timeout,
              getCurrentLocation,
              $rootScope,
              fbGeoService,
              Auth,
              fbutil,
              SweetAlert,
              fbMessageService) {

        var center = [37.953757, -122.076692];
        var radius = 10;
        var maxDistance = 12;

        fbGeoService.queryLocation(center, radius, maxDistance);


        //MAP VIEW ENTERY POINT
        $scope.$on("$stateChangeSuccess", function () {
            $scope.initMap = function () {
                getCurrentLocation.then(function (current_position) {
                    var location = current_position.coords;
                    $scope.lat = location.latitude;
                    $scope.lng = location.longitude;
                    $scope.addMarkers(location);
                    console.log('debug 1');
                    $scope.setMap();
                    console.log('debug 2');
                });
            };

            $scope.initMap();
        });

        $scope.listenToNewMessage = function () {
            var messageRef = fbutil.ref("users/" + Auth.$getAuth().uid + "/messages");
            messageRef.limitToLast(1).on('child_added', function (snapshot) {
                var data = snapshot.val();
                $scope.incomingMessageFound = true;
                $scope.sender = data.sender;
                $scope.incomingMessage = data.message;
                //SweetAlert.swal(data.sender + " send you a message!", data.message);

                SweetAlert.swal({
                    title: data.sender,
                    text: data.message,
                    type: "info",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    cancelButtonText: "Ignore",
                    confirmButtonText: "Reply",
                    confirmButtonColor: "#33cd5f",
                    closeOnConfirm: false
                }, function () {
                    //SweetAlert.swal("Deleted!", "Your imaginary file has been deleted.", "success");
                    $scope.reply(data.sender);
                });
            });
        };


        $scope.reply = function (sender) {
            SweetAlert.swal({
                title: "Send Message to: " + sender,
                type: "input",
                showCancelButton: true,
                closeOnConfirm: true,
                animation: "pop",
                //inputPlaceholder: "Greetings!",
                confirmButtonText: "Send"
            }, function (inputValue) {
                if (inputValue === false) return false;
                if (inputValue === "") {
                    //SweetAlert.swal.showInputError("You need to write something!");
                    return false
                }
                //console.log('I am text');
                fbMessageService.sendMessage(Auth, sender, inputValue);
                //SweetAlert.swal("Nice!", "You wrote: " + inputValue, "success");
            });
        };

        //$scope.$watch('message', function(newValue, oldValue) {
        //  console.log('GOT NEW MESSAGE ' + newValue);
        //  $scope.message = newValue;
        //});

        $scope.watchCurrentPosition = function () {
            var watchOptions = {
                frequency: 1000,
                timeout: 3000,
                enableHighAccuracy: false // may cause errors if true
            };

            var watch = $cordovaGeolocation.watchPosition(watchOptions);

            watch.then(
                function () {
                },
                function (err) {
                    console.log(err);
                },
                function (location) {
                    console.log('getting current location');
                    location = location.coords;
                    console.log(location);
                    $scope.debuglat = location.latitude;
                    $scope.debuglng = location.longitude;
                });

            //geoWatchLocation.clearWatch();

            //var options = {
            //  enableHighAccuracy: true,
            //  timeout: 5000,
            //  maximumAge: 0
            //};
            //
            //function success(pos) {
            //  var location = pos.coords;
            //  console.log('getting current location:');
            //  console.log(location)
            //}
            //
            //function error(err) {
            //  console.warn('ERROR(' + err.code + '): ' + err.message);
            //}
            //
            //id = navigator.geolocation.watchPosition(success, error, options);
        };

        $scope.setMap = function () {
            $scope.map = {
                defaults: {
                    tileLayer: 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
                    maxZoom: 18,
                    zoomControlPosition: 'bottomleft'
                },

                markers: $scope.markers,
                events: {
                    map: {
                        enable: ['context'],
                        logic: 'emit'
                    }
                },
                center: {
                    lat: $scope.lat,
                    lng: $scope.lng,
                    zoom: 8
                }
            };
            console.log('map settings done, going to show the div')
            $scope.showMapDiv = true;
        };

        $scope.centerMarkIcon = {
            iconUrl: 'img/ping.png',
            //iconSize:     [38, 95], // size of the icon
            iconAnchor: [28, 13] // point of the icon which will
            //type: 'awesomeMarker',
            //icon: 'coffee',
            //markerColor: 'red'
            //markerColor: 'red'
        };


        $scope.addMarkers = function (current_location) {
            //Read other users' locations, and create markers on their locations.
            //Can be extended, more features can be added to this function.
            var otherUsers = $rootScope.otherUsersLocations;
            var markers = {};
            for (i = 0; i < otherUsers.length; i++) {
                var key = 'm' + i;
                var location = otherUsers[i].location;
                var userId = otherUsers[i].userId;
                markers[key] = {
                    lat: location[0],
                    lng: location[1],
                    message: "<div ng-include=\"'templates/mapMarkers/marker_popup.html'\" onload=\"userId = " + "'" + userId + "'" + "\"></div>",
                    icon: {
                        type: 'awesomeMarker',
                        icon: 'ion-person',
                        prefix: 'ion',
                        markerColor: 'darkgreen'
                    }

                };
            }
            //add center marker's icon
            markers['center'] = {
                lat: current_location.latitude,
                lng: current_location.longitude,
                message: "I am very upset",
                icon: {
                    type: 'awesomeMarker',
                    icon: 'ion-sad',
                    prefix: 'ion',
                    markerColor: 'orange'
                }
            };
            $scope.markers = markers;
        };


        $scope.locate = function () {
            $scope.setMap();
        };

        $scope.centerMapToCurrentLocation = function () {
            getCurrentLocation.then(function (current_position) {
                var location = current_position.coords;
                setMap(location);
            })
        };

        $scope.listenToNewMessage();
        $scope.watchCurrentPosition();
    });

