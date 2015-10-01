/**
 * Created by yxia on 9/29/15.
 */
angular.module('mapChat.sideMenu')
    .controller('SideMenuController', function ($scope, $http, Auth) {
        console.log('side menu controller loadded!');
        console.log(Auth.$getAuth());
        $http.get("testdata.json").success(function (data) {
            $scope.loggedUser = data.users[3];
        });
    })
