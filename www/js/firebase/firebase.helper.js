/**
 * Created by yxia on 9/8/15.
 */
angular.module('firebase.helper', ['firebase', 'firebase.utils', 'angularGeoFire'])
    .factory('Auth', function ($firebaseAuth, fbutil) {
        return $firebaseAuth(fbutil.ref());
    })

    .service('fbMessageService', function (fbutil, $firebaseArray) {
        this.sendMessage = function (auth, receiver_uid, message) {
            var authData = auth.$getAuth();
            if (authData) {
                var userReference = fbutil.ref("users/" + receiver_uid);
                var syncArray = $firebaseArray(userReference.child("messages"));
                syncArray.$add({sender: authData.uid, message: message}).then(function () {
                    console.log('message sent');
                });
            }

        }
    })

    .service('fbUsernameService', function (fbutil, Auth, $q) {

        var authData = Auth.$getAuth();

        if (authData) {
            var uid = authData.uid
            var currentUserName = null;
            return {
                saveUserName: function (username) {
                    console.log(uid);
                    var userNameRef = fbutil.ref("usersInfo/" + uid);
                    userNameRef.set({userName: username});
                },

                getUserName: function () {
                    var def = $q.defer();
                    var userReference = fbutil.ref("usersInfo/" + uid);
                    userReference.on("value", function (data) {
                        console.log('get value!');
                        def.resolve(data.val().userName);
                    });

                    return def.promise;
                }
            };
        }
    })


//this.saveUserName = function (auth, username) {
//    var authData = auth.$getAuth();
//    if (authData) {
//        var userNameRef = fbutil.ref("usersInfo/" + authData.uid);
//        userNameRef.set({userName: username});
//    }
//};
//

//$scope.sendMessage = function (name, text, uid_of_reciever) {
//  var authData = $rootScope.fbAuth.$getAuth();
//  if (authData) {
//    var userReference = $rootScope.fb.child("users/" + uid_of_reciever);
//    var syncArray = $firebaseArray(userReference.child("messages"));
//    syncArray.$add({name: name, text: text}).then(function () {
//    });
//  } else {
//  }
//};

//.service('geoFireService', function (fbutil, $geofire) {
//  var geo = $geofire(fbutil.ref('users'));
//
//  this.set = function (key, location) {
//    return geo.$set(key, location);
//  };
//
//  this.get = function (key) {
//    return geo.$get(key);
//  };
//
//  this.query = function (center, radius) {
//    return geo.$query(center, radius)
//  }
//})

    .
    service('fbGeoService', function (fbutil, $firebaseArray, $geofire, $rootScope) {

        this.set = function (auth, location) {
            var authData = auth.$getAuth();
            var geo = $geofire(fbutil.ref("locations/"));
            geo.$set(authData.uid.toString(), location);
        };

        this.get = function (auth) {
            var authData = auth.$getAuth();
            var geo = $geofire(fbutil.ref("locations/"));
            geo.$get(authData.uid.toString()).then(function (location) {
                if (location === null) {
                    console.log("Provided key is not in GeoFire");
                }
                else {
                    console.log("Provided key has a location of " + location);
                }
            }, function (error) {
                console.log("Error: " + error);
            });
        };

        this.queryLocation = function (center, radius, maxDistance) {

            var locations = $geofire(fbutil.ref("/locations"));
            var locationsQuery = locations.$query({
                center: center,
                radius: radius
            });


            var locationQueryCallback = locationsQuery.on("key_entered", "SEARCH:KEY_ENTERED");
            var locationQueryCallback1 = locationsQuery.on("key_moved", "SEARCH:KEY_MOVED");

            $rootScope.$on("SEARCH:KEY_ENTERED", function (event, key, location, distance) {
                console.log("KEY ENTERED FOUND");
                $rootScope.otherUsersLocations.push({userId: key, location: location});
                // Cancel the query if the distance is > 5 km
                if (distance > maxDistance) {
                    locationQueryCallback.cancel();
                }
            });

            $rootScope.$on("SEARCH:KEY_MOVED", function (event, key, location, distance) {
                console.log("KEY MOVED FOUND");
                // Cancel the query if the distance is > 5 km
                if (distance > maxDistance) {
                    locationQueryCallback1.cancel();
                }
            });
        };


        //this.queryR = function (auth) {
        //  var authData = auth.$getAuth();
        //  var geo = $geofire(fbutil.ref("users/" + authData.uid));
        //  var query = geo.$query({
        //    center: [37.785583, 122.399219],
        //    radius: 20
        //  });
        //
        //  console.log(query);
        //
        //  query.on("key_entered", function (key, location, distance) {
        //    console.log(key + " entered query at " + location + " (" + distance + " km from center)");
        //  });
        //
        //  query.on("key_moved", function (key, location) {
        //    console.log(key + " entered query at " + location);
        //  });
        //
        //  return query;
        //}
    })
//.controller('AddLocationCtrl', function ($scope, Auth, fbutil, $firebaseArray, $geofire) {
//  $scope.addLocation = function (lat, lng) {
//    var lat_i = parseInt(lat);
//    var lng_i = parseInt(lng);
//    var authData = Auth.$getAuth();
//    if (authData) {
//      var geo = $geofire(fbutil.ref("users/" + authData.uid));
//      //var userReference = fbutil.ref("users/" + authData.uid);
//      //var syncArray = $firebaseArray(userReference.child("messages"));
//      geo.$set('location', [lat_i, lng_i])
//    }
//  }
