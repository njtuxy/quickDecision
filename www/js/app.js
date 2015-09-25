//angular.module("underscore", []).factory("_", function () {
//    return window._
//});

angular.module('mapChat', ['ionic',
    'qd.controllers',
    'qd.services',
    'qd.directives',
    'ngCordova',
    'firebase',
    'underscore',
    'mapChat.controller',
    'leaflet-directive',
    'ngCordova',
    'igTruncate',
    'ngAnimate',
    'oitozero.ngSweetAlert'])
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
            $rootScope.otherUsersLocations = new Array();
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


            .state("app", {
                url: "/app",
                abstract: true,
                templateUrl: "templates/theme1/side-menu.html",
                controller: "sideMenuController"
            })

            .state("app.feed", {
                url: "/feed",
                views: {
                    menuContent: {
                        templateUrl: "templates/theme1/feed.html",
                        controller: "FeedCtrl"
                    }
                }
            })

            .state("app.shop", {
                url: "/shop",
                abstract: true,
                views: {
                    "menuContent": {
                        templateUrl: "templates/shop/shop.html",
                        controller: "MapController"
                    }
                }
            })

            .state("test", {
                url: '/test',
                views: {
                    'test': {
                        templateUrl: 'templates/map.html',
                        controller: "MapController"
                    }
                }
            })

            .state('app.shop.home', {
                url: '/',
                views: {
                    'shop-home': {
                        templateUrl: 'templates/shop/shop-home.html',
                        //controller: "MapController"
                    }
                }
            })

            .state('app.shop.popular', {
                url: '/shop-popular',
                views: {
                    'shop-popular': {
                        templateUrl: 'templates/shop/shop-popular.html',
                        controller: "ShopController"
                    }
                }
            })

            .state('app.shop.sale', {
                url: '/shop-sale',
                views: {
                    'shop-sale': {
                        templateUrl: 'templates/shop/shop-sale.html',
                        controller: "ShopController"
                    }
                }
            })

            .state('app.profile', {
                url: '/profile',
                abstract: true,
                views: {
                    "menuContent": {
                        templateUrl: "templates/profile/profile.html",
                        controller: "ProfileCtrl"
                    }
                }
            })

            .state('app.profile.posts', {
                url: "/posts",
                views: {
                    "profileContent": {
                        templateUrl: "templates/profile/profile.posts.html"
                    }
                }
            })

            .state('app.profile.addnewpost', {
                url: "/new-post",
                views: {
                    "profileContent": {
                        templateUrl: "templates/posts/add-post.html",
                        controller: "postUploadController"
                    }
                }
            })

            //.state('contents', {
            //    url: "/contents",
            //    views: {
            //        'mainContent' :{
            //            templateUrl: "templates/test/view1.html"
            //        }
            //    }
            //})

            //.state('app.contents', {
            //    url: '/contents',
            //    views: {
            //        'menuContent': {
            //            templateUrl: 'templates/contents.html'
            //        }
            //    }
            //})

            //
            //
            //.state("shophome", {
            //    url: "/shop-home",
            //    templateUrl: "templates/shop/shop-home.html",
            //    //templateUrl: 'templates/contents.html'
            //    controller: "ShopController"
            //})
            //
            //
            ////.state("app.shop.home", {
            ////    url: "/home",
            ////    views: {
            ////        "shop-home": {
            ////            templateUrl: "templates/shop/shop-home.html",
            ////            controller: "ShopController"
            ////        }
            ////    }
            ////})
            //
            ////.state('loginPage', {
            ////    url: '/login',
            ////    templateUrl: 'templates/login.html',
            ////    controller: 'loginController'
            ////})
            ////
            ////.state('sign-up', {
            ////    url: '/sign-up',
            ////    templateUrl: 'templates/sign-up.html',
            ////    controller: 'singUpController'
            ////})
            //
            //.state('imageUpload', {
            //    url: '/imageUpload',
            //    templateUrl: 'templates/imageUpload.html',
            //    controller: 'imageUploadController'
            //})
            //
            ////.state('landingPage', {
            ////    url: '/landing',
            ////    templateUrl: 'templates/landing.html'
            ////})
            //
            //
            //Cannot debug when using Controller.
            .state('camera', {
                url: '/camera',
                templateUrl: 'templates/camera.html',
                //controller: 'CameraController'
            })

        //
        //.state('imageDetail', {
        //    url: '/imageDetail',
        //    templateUrl: 'templates/imageDetail.html'
        //})
        //

        //setup an abstract state for the tabs directive
        //
        //.state('tab', {
        //    url: '/tab',
        //    abstract: true,
        //    templateUrl: 'templates/tabs.html'
        //})
        //
        //
        //// Each tab has its own nav history stack:
        //
        //.state('tab.dash', {
        //    url: '/dash',
        //    views: {
        //        'tab-dash': {
        //            templateUrl: 'templates/tab-dash.html',
        //            controller: 'DashCtrl'
        //        }
        //    }
        //})
        //
        //
        //.state('tab.chats', {
        //    url: '/chats',
        //    views: {
        //        'tab-chats': {
        //            templateUrl: 'templates/tab-chats.html',
        //            controller: 'ChatsCtrl'
        //        }
        //    }
        //})
        //.state('tab.chat-detail', {
        //    url: '/chats/:chatId',
        //    views: {
        //        'tab-chats': {
        //            templateUrl: 'templates/chat-detail.html',
        //            controller: 'ChatDetailCtrl'
        //        }
        //    }
        //})
        //
        //.state('tab.account', {
        //    url: '/account',
        //    views: {
        //        'tab-account': {
        //            templateUrl: 'templates/contents.html',
        //            controller: 'AccountCtrl'
        //        }
        //    }
        //})
        //
        //.state('contents', {
        //    url: '/contents',
        //    views: {
        //        'menuContent': {
        //            templateUrl: 'templates/contents.html'
        //        }
        //    }
        //});

// if none of the above states are matched, use this as the fallback

        $urlRouterProvider.otherwise('/auth/welcome');
        //$urlRouterProvider.otherwise('/shop-home');
    })
;