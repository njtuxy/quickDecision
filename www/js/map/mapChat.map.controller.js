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
            $ionicScrollDelegate,
            $timeout,
            getCurrentLocation,
            fbGeoService,
            Auth,
            fbutil,
            SweetAlert,
            fbMessageService,
            otherUserMarkersLocationsService,
            fbUsernameService) {

    var center = [37.953757, -122.076692];
    var radius = 10;
    var maxDistance = 12;

    var showChatFootBar = false;
    var showChatHeadBar = false;

    fbGeoService.queryLocation(center, radius, maxDistance);


    //MAP VIEW ENTERY POINT
    $scope.$on("$stateChangeSuccess", function () {
      $scope.initMap = function () {
        getCurrentLocation.then(function (current_position) {
          var location = current_position.coords;
          $scope.lat = location.latitude;
          $scope.lng = location.longitude;
          $scope.addMarkers(location);
          $scope.setMap();
          $scope.$on("leafletDirectiveMarker.click", function (event, args) {
            //console.log('>>>>>>>>>>>>>>>>>>>>>>>>> marker clicke event');
            var marker_key = args.modelName;
            $scope.markers[marker_key].icon.markerColor = 'red';
            $scope.showChatFootBar = !showChatFootBar;
            $scope.showChatHeadBar = !showChatHeadBar;
            $scope.hideTabs = !showChatFootBar;
            $scope.reciever_id = $scope.markers[marker_key].userId
          });

          $scope.$on("leafletDirectiveMap.click", function (event, args) {
            $scope.showChatFootBar = false;
            $scope.showChatHeadBar = false;
            cordova.plugins.Keyboard.close();
            console.log('show bottom set to false');
          })

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
      //var api_token = 'pk.eyJ1Ijoibmp0dXh5IiwiYSI6ImNpZXZ3dTI1MDB3bGxyeG0yOTFoZ2JqeTUifQ.mf238ctd4keoYEEUEfS2JA';
      $scope.map = {
        defaults: {
          //tileLayer: 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
          //tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          tileLayer: 'http://api.tiles.mapbox.com/v4/njtuxy.cievwu1t40xsxt6m3u0r2gmdq/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoibmp0dXh5IiwiYSI6ImNpZXZ3dTI1MDB3bGxyeG0yOTFoZ2JqeTUifQ.mf238ctd4keoYEEUEfS2JA',
          maxZoom: 18,
          zoomControl: false,
          attributionControl: false,
          dragging: false,
          doubleClickZoom: false
          //zoomControlPosition: 'bottomleft'
        },

        markers: $scope.markers,
        //events: {
        //  map: {
        //    enable: ['context'],
        //    logic: 'emit'
        //  }
        //},
        center: {
          lat: $scope.lat,
          lng: $scope.lng,
          zoom: 15
        }
      };

      $scope.small_map = {
        defaults: {
          //tileLayer: 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
          tileLayer: 'http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
          //tileLayer: 'http://api.tiles.mapbox.com/v4/njtuxy.cievwu1t40xsxt6m3u0r2gmdq/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoibmp0dXh5IiwiYSI6ImNpZXZ3dTI1MDB3bGxyeG0yOTFoZ2JqeTUifQ.mf238ctd4keoYEEUEfS2JA',
          maxZoom: 18,
          zoomControl: false,
          attributionControl: false
          //zoomControlPosition: 'bottomleft'
        },

        markers: $scope.markers,
        //events: {
        //  map: {
        //    enable: ['context'],
        //    logic: 'emit'
        //  }
        //},
        center: {
          lat: $scope.lat,
          lng: $scope.lng,
          zoom: 10
        }
      };

    console.log('map settings done, going to show the div');
      //$scope.showMapDiv = true;
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





      var markers = {};

      var otherUsers = otherUserMarkersLocationsService.getOtherUserMarkerLocations();

      for (i = 0; i < otherUsers.length; i++) {
        var key = 'mcmarker_' + i;
        var location = otherUsers[i].location;
        var userId = otherUsers[i].userId;
        var userName = otherUsers[i].userName;


        markers[key] = {
          userName: userName,
          userId: userId,
          lat: location[0],
          lng: location[1],

          //message: "<div> <i class='icon ion-chatbubble'></i> </div>",
          //message: "<div class='my-calm-border' ng-include=\"'templates/mapMarkers/marker_popup.html'\" onload=\"userName = " + "'" + userName + "'" + "\"></div>",
          icon: {
            type: 'awesomeMarker',
            icon: 'ion-ios-musical-notes',
            prefix: 'ion',
            markerColor: 'purple',
            spin: true
          }

        };
      }


      //add center marker's icon
      markers['center'] = {
        lat: current_location.latitude,
        lng: current_location.longitude,
        message: "Hello, world",
        icon: {
          type: 'awesomeMarker',
          icon: 'ion-sad',
          prefix: 'ion',
          markerColor: 'red',
          spin: true
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

    //$scope.listenToNewMessage();
    //$scope.watchCurrentPosition();


    //messagen input methods:
    var alternate, isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();


    $scope.sendMessageToReciever = function () {
      alternate = !alternate;
      fbMessageService.sendMessage(Auth, $scope.reciever_id, "xxxxxxxx");
      $scope.showChatFootBar = false;
      $ionicScrollDelegate.scrollBottom(true);
    };

    $scope.inputUp = function(){
      console.log("##################################### input up event #########################################3");
      //if(isIOS) $scope.inputData.keyboardHeight = 216;
      //$timeout(function(){
      //  $ionicScrollDelegate.scrollBottom(true);
      //}, 300);

    };

    $scope.inputDown = function(){
      console.log("##################################### input down event #########################################3");
      //if(isIOS) $scope.inputData.keyboardHeight = 0;
      //$ionicScrollDelegate.resize();

    };

    $scope.inputData = {};



  }
)
;

