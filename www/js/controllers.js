/**
 * Created by yxia on 8/6/15.
 */

angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {
    })

    .controller('ChatsCtrl', function ($scope, Chats) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        };
    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    })

    //.controller('CameraController', function($scope) {
    //    $scope.settings = {
    //        enableFriends: true
    //    };
    //})

    .controller('gestureController', function ($scope) {
        //$scope.onDragLeft = function(){
        //    $scope.toggleChecked = false
        //}
        $scope.checked = false;
        $scope.leftOneChecked = false;
        $scope.rightOneChecked = false;
        $scope.checkOnLeftOne = function () {
            $scope.leftOneChecked = true;
            $scope.rightOneChecked = false;
        };

        $scope.checkOnRightOne = function () {
            $scope.rightOneChecked = true;
            $scope.leftOneChecked = false;
        };

        $scope.toggleChecked = function () {
            $scope.checked = $scope.checked === false ? true : false;
        };

        //$scope.onDragRight = function(){
        //    $scope.debugText = "";
        //}

    })

    .controller('CameraController', function ($ionicPlatform, $scope, $cordovaCamera) {
        //$scope.debugText = "debug text11";
        $ionicPlatform.ready(function () {
            var options = {
                quality: 100,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 100,
                targetHeight: 100,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            $scope.takePicture = function () {
                $cordovaCamera.getPicture(options).then(function (imageData) {
                    $scope.imgSrc = "data:image/jpeg;base64," + imageData;
                }, function (err) {
                    console.log(err);
                });
            };

            $scope.takePicture2 = function () {
                $cordovaCamera.getPicture(options).then(function (imageData) {
                    $scope.imgSrc2 = "data:image/jpeg;base64," + imageData;
                }, function (err) {
                    console.log(err);
                });
            }

        });
    })

    .controller('loginController', function ($scope, $firebaseAuth, $location, $rootScope) {
        $scope.loginQD = function (username, password) {
            var fbAuth = $firebaseAuth($rootScope.fb);
            fbAuth.$authWithPassword({
                email: username,
                password: password
            }).then(function (authData) {
                $scope.loginSuccessfull = true;
                $location.path("/contents");
            }).catch(function (error) {
                console.error("ERROR: " + error);
                $scope.loginError = true;
            });
        };
    })

    .controller('singUpController', function ($scope, $firebaseAuth, $location, $rootScope) {
        $scope.registerQD = function (username, password) {
            var fbAuth = $firebaseAuth($rootScope.fb);
            fbAuth.$createUser({email: username, password: password}).then(function () {
                return fbAuth.$authWithPassword({
                    email: username,
                    password: password
                });
            }).then(function (authData) {
                $scope.singUpAuthData = authData;
                //$location.path("/contents");
            }).catch(function (error) {
                console.error("ERROR " + error);
                $scope.debugMsg1 = error;
            });
        }
    })

    .controller('imageUploadController', function($scope, $state, $rootScope, $ionicHistory, $firebaseArray, $cordovaCamera) {

        $ionicHistory.clearHistory();

        $scope.images = [];

        var fbAuth = $rootScope.fb.getAuth();

        if (fbAuth) {
            var userReference = $rootScope.fb.child("users/" + fbAuth.uid);
            var syncArray = $firebaseArray(userReference.child("images"));
            $scope.images = syncArray;
        } else {

            //$state.go("firebase");
        }

        $scope.uploadMyImg = function () {
            var options = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                popoverOptions: CameraPopoverOptions,
                targetWidth: 500,
                targetHeight: 500,
                saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function (imageData) {
                syncArray.$add({image: imageData}).then(function () {
                    alert("Image has been uploaded");
                });
            }, function (error) {
                console.error(error);
            });
        }

    });


