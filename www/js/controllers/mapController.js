angular.module('mapChat')
    .controller('AccountCtrl', function ($scope, $state, Auth) {
        $scope.login = function (email, pass) {
            $scope.err = null;
            Auth.$authWithPassword({email: email, password: pass}, {rememberMe: true})
                .then(function (/* user */) {
                    console.log('logged in!');
                    $state.go('app.map');
                }, function (err) {
                    console.log(err);
                    //$scope.err = errMessage(err);
                });
        };

        $scope.logout = function () {
            Auth.$unauth();
            console.log('logged out!')
        }
    })

//.controller('AddLocationCtrl', function ($rootScope, $scope, Auth, fbGeoService) {
//  //var center = [37.785584, -122.39923];
//
//  var center = [37.953757, -122.076692];
//  var radius = 10;
//  var maxDistance = 12;
//
//  fbGeoService.queryLocation(center, radius, maxDistance);
//
//  //DEBUG PURPOSE, REMOVE WHOLE SECTION LATER!
//  var authData = Auth.$getAuth();
//  $scope.currentLoginAs = authData.uid;
//  if (authData) {
//    $scope.currentLoginAs = authData.uid;
//    $scope.addLocation = function (lat, lng) {
//      fbGeoService.set(Auth, [parseFloat(lat), parseFloat(lng)]);
//      console.log('location added!');
//    };
//    $scope.getLocation = function () {
//      fbGeoService.get(Auth);
//    };
//  }
//});



