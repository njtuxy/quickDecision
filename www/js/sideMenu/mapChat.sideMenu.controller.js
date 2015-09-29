/**
 * Created by yxia on 9/29/15.
 */
angular.module('mapChat.sideMenu')
    .controller('SideMenuController', function ($scope, $http) {
        console.log('side menu controller loadded!');
        $http.get("testdata.json").success(function (data) {
            $scope.loggedUser = data.users[3];
        });
    })
