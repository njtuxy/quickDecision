angular.module("underscore", []).factory("_", function () {
    return window._
});

angular.module('qd', ['ionic', 'qd.controllers', 'qd.services', 'ngCordova', 'firebase', 'underscore'])
    .run(function ($ionicPlatform, $rootScope) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            $rootScope.fb = new Firebase('https://qd.firebaseio.com');
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js


        $stateProvider
            .state("auth", {
                url: "/auth",
                templateUrl: "templates/login/auth.html",
                abstract: true

            })

            .state("auth.welcome", {
                url: "/welcome",
                templateUrl: "templates/login/welcome.html",
                controller: "WelcomeCtrl"
            })

            .state("shop", {
                url: "/shop",
                abstract: true,
                views: {
                    "menuContent": {templateUrl: "templates/shop/shop.html"}
                }
            })

            .state("shophome", {
                url: "/shophome",
                templateUrl: "templates/shop/shop-home.html",
                //templateUrl: 'templates/contents.html'
                controller: "ShopController"
            })


            //.state("app.shop.home", {
            //    url: "/home",
            //    views: {
            //        "shop-home": {
            //            templateUrl: "templates/shop/shop-home.html",
            //            controller: "ShopController"
            //        }
            //    }
            //})

            //.state('loginPage', {
            //    url: '/login',
            //    templateUrl: 'templates/login.html',
            //    controller: 'loginController'
            //})
            //
            //.state('sign-up', {
            //    url: '/sign-up',
            //    templateUrl: 'templates/sign-up.html',
            //    controller: 'singUpController'
            //})

            .state('imageUpload', {
                url: '/imageUpload',
                templateUrl: 'templates/imageUpload.html',
                controller: 'imageUploadController'
            })

            //.state('landingPage', {
            //    url: '/landing',
            //    templateUrl: 'templates/landing.html'
            //})


            .state('contents', {
                url: '/contents',
                templateUrl: 'templates/contents.html'
            })

            //Cannot debug when using Controller.
            .state('camera', {
                url: '/camera',
                templateUrl: 'templates/camera.html',
                //controller: 'CameraController'
            })

            .state('imageDetail', {
                url: '/imageDetail',
                templateUrl: 'templates/imageDetail.html'
            })

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })

            // Each tab has its own nav history stack:

            .state('tab.dash', {
                url: '/dash',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/tab-dash.html',
                        controller: 'DashCtrl'
                    }
                }
            })


            .state('tab.chats', {
                url: '/chats',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/tab-chats.html',
                        controller: 'ChatsCtrl'
                    }
                }
            })
            .state('tab.chat-detail', {
                url: '/chats/:chatId',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/chat-detail.html',
                        controller: 'ChatDetailCtrl'
                    }
                }
            })

            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/contents.html',
                        controller: 'AccountCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback

        $urlRouterProvider.otherwise('/shophome');
    });