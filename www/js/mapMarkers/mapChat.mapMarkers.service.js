/**
 * Created by yxia on 10/7/15.
 */
angular.module('mapChat.mapMarkers')
    .factory('otherUserMarkersLocationsService', function () {
        var _otherUserMarkersLocations = [];

        return {
            addOtherUserMarkersLocations: function (value) {
                _otherUserMarkersLocations.push(value);
            },

            getOtherUserMarkerLocations: function () {
                return _otherUserMarkersLocations;
            }
        };
    })
