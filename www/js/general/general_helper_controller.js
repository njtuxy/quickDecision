/**
 * Created by yxia on 9/30/15.
 */
/**
 * Created by yxia on 8/6/15.
 */

angular.module('general.helper')

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

    //.controller('loginController', function ($scope, $firebaseAuth, $location, $rootScope) {
    //    $scope.loginQD = function (username, password) {
    //        var fbAuth = $firebaseAuth($rootScope.fb);
    //        fbAuth.$authWithPassword({
    //            email: username,
    //            password: password
    //        }).then(function (authData) {
    //            $scope.loginSuccessfull = true;
    //            $location.path("/contents");
    //        }).catch(function (error) {
    //            console.error("ERROR: " + error);
    //            $scope.loginError = true;
    //        });
    //    };
    //})

    //.controller('singUpController', function ($scope, $firebaseAuth, $location, $rootScope) {
    //    $scope.registerQD = function (username, password) {
    //        var fbAuth = $firebaseAuth($rootScope.fb);
    //        fbAuth.$createUser({email: username, password: password}).then(function () {
    //            return fbAuth.$authWithPassword({
    //                email: username,
    //                password: password
    //            });
    //        }).then(function (authData) {
    //            $scope.singUpAuthData = authData;
    //            //$location.path("/contents");
    //        }).catch(function (error) {
    //            console.error("ERROR " + error);
    //            $scope.debugMsg1 = error;
    //        });
    //    }
    //})


    .controller('postUploadController', function ($scope, $state, $rootScope, $ionicHistory, $firebaseArray) {
        $ionicHistory.clearHistory();
        $scope.posts = [];
        var fbAuth = $rootScope.fb.getAuth();

        if (fbAuth) {
            var userReference = $rootScope.fb.child("users/" + fbAuth.uid);
            var syncArray = $firebaseArray(userReference.child("posts"));
            $scope.posts = syncArray;
        } else {
            console.log("Error found!");
        }


        $scope.uploadPost = function () {
            console.log(fbAuth);
            syncArray.$add({"xxx": "text1111"}).then(function () {
                alert("post uploaded!");
            });
        }

    })

    .controller('imageUploadController', function ($scope, $state, $rootScope, $ionicHistory, $firebaseArray, $cordovaCamera) {

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

    })

    .controller("ShopController", function ($scope, $http) {
        $http.get("testdata.json").success(function (data) {
            $scope.products = data.products;
        });
    })

    .controller('PlaylistsCtrl', function ($scope) {
        $scope.playlists = [
            {title: 'Reggae', id: 1},
            {title: 'Chill', id: 2},
            {title: 'Dubstep', id: 3},
            {title: 'Indie', id: 4},
            {title: 'Rap', id: 5},
            {title: 'Cowbell', id: 6}
        ];
    })


//PostService.getUserDetails(a).then(function (n) {
    //    $scope.user = n
    //});
    //PostService.getUserLikes(a).then(function (n) {
    //    $scope.likes = n
    //});
    //$scope.getUserLikes = function (e) {
    //    $ionicHistory.currentView($ionicHistory.backView());
    //    $ionicHistory.nextViewOptions({disableAnimate: !0}); $state.go("app.profile.likes", {userId: e})
    //};
    //
    //$scope.getUserPosts = function (e) {
    //    $ionicHistory.currentView($ionicHistory.backView()); $ionicHistory.nextViewOptions({disableAnimate: !0}); $state.go("app.profile.posts", {userId: e})
    //}
    //});


    .controller("FeedCtrl", function ($scope, $http, $ionicActionSheet, $state, $ionicPlatform, $cordovaCamera) {

        $http.get("testdata.json").success(function (data) {
            $scope.posts = _.filter(data.posts, function (post) {
                return post.userId == 8
            });


        });

        var options = {};

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

            //$scope.takePicture = function () {
            //    $cordovaCamera.getPicture(options).then(function (imageData) {
            //        $scope.imgSrc = "data:image/jpeg;base64," + imageData;
            //    }, function (err) {
            //    });
            //};
            //
            //$scope.takePicture2 = function () {
            //    $cordovaCamera.getPicture(options).then(function (imageData) {
            //        $scope.imgSrc2 = "data:image/jpeg;base64," + imageData;
            //    }, function (err) {
            //        console.log(err);
            //    });
            //}

        });

        $scope.showActionsheet = function () {
            $ionicActionSheet.show({
                //titleText: 'Upload A Picture',
                buttons: [
                    {text: '<i class="icon ion-ios-camera-outline"></i> Camera'},
                    {text: '<i class="icon ion-images"></i> Gallery'},
                ],
                //destructiveText: 'Delete',
                //cancelText: 'Cancel',

                cancel: function () {
                    console.log('CANCELLED');

                },

                buttonClicked: function (index) {
                    if (index === 0) {
                        $cordovaCamera.getPicture(options).then(function (imageData) {
                            $scope.imgSrc = "data:image/jpeg;base64," + imageData;
                        }, function (err) {
                            console.log("error when taking picture!");
                        });
                    }
                    return true;
                }

                //destructiveButtonClicked: function () {
                //    console.log('DESTRUCT');
                //    return true;
                //}
            });
        };

    });



