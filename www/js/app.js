// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic'])

    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider
            .state('loginPage', {
                url: '/login',
                templateUrl: 'templates/login.html'
            })

            .state('contents', {
                url: '/contents',
                templateUrl: 'templates/contents.html'
            })

            .state('myDevices', {
                url: '/my-devices',
                templateUrl: 'templates/myDinners.html'
            })

            .state('imageDetail', {
                url: '/imageDetail',
                templateUrl: 'templates/imageDetail.html'
            })

        ;

        // if none of the above states are matched, use this as the fallback

        $urlRouterProvider.otherwise('/login');
    })
    .controller('gestureController', function($scope){
        //$scope.onDragLeft = function(){
        //    $scope.toggleChecked = false
        //}
        $scope.checked = false;
        $scope.leftOneChecked=false;
        $scope.rightOneChecked=false;
        $scope.checkOnLeftOne=function(){
            $scope.leftOneChecked = true;
            $scope.rightOneChecked = false;
        }

        $scope.checkOnRightOne=function(){
            $scope.rightOneChecked = true;
            $scope.leftOneChecked = false;
        }

        $scope.toggleChecked = function() {
            $scope.checked = $scope.checked === false ? true: false;
        };

        //$scope.onDragRight = function(){
        //    $scope.debugText = "";
        //}

    });
