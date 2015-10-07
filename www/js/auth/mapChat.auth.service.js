/**
 * Created by yxia on 10/7/15.
 */
angular.module('mapChat.auth')
    .factory('authTrackerService', function () {
        var _loggedIn = 'whatever';

        return {
            setAuth: function(value) {
                _loggedIn = value;
            },

            getAuth: function() {
                return _loggedIn;
            }
        };
    })

    .factory('uidService', function () {
        var _uid = 'seems wrong';

        return {
            setUid: function(value) {
                _uid = value;
            },

            getUid: function() {
                return _uid;
            }
        };
    })
