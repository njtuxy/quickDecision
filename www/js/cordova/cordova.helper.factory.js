/**
 * Created by yxia on 9/30/15.
 */
angular.module('cordova.helper')
    .factory('getCurrentLocation', function ($cordovaGeolocation, $q) {
        var def = $q.defer();
        $cordovaGeolocation.getCurrentPosition()
            .then(function (position) {
                def.resolve(position)
            });

        return def.promise;
    })
