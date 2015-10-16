//angular.module("underscore", []).factory("_", function () {
//    return window._
//});

angular.module('mapChat',
  ['ionic',
    'mapChat.auth',
    'mapChat.sideMenu',
    'mapChat.map',
    'mapChat.mapMarkers',
    'mapChat.profile',
    'mapChat.settings',
    'mapChat.chats',
    'cordova.helper',
    'firebase.helper',
    'general.helper',
    'oitozero.ngSweetAlert'
  ])
  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      //if (window.cordova && window.cordova.plugins.Keyboard) {
      //    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      //}

      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(false);
        console.log('keyboard loaded!')

      }

      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      }

      //$rootScope.fb = new Firebase('https://qd.firebaseio.com');
      //$rootScope.otherUsersLocations = new Array();
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $urlRouterProvider.otherwise('/auth/welcome');

    $stateProvider
      .state("auth", {
        url: "/auth",
        templateUrl: "templates/auth/auth.html",
        abstract: true

      })

      .state("auth.welcome", {
        url: "/welcome",
        templateUrl: "templates/auth/welcome.html",
        controller: "AuthController"
      })


      .state("app", {
        url: "/app",
        abstract: true,
        templateUrl: "templates/sideMenu/side-menu.html",
        controller: "SideMenuController"
      })

      //.state("app.feed", {
      //    url: "/feed",
      //    views: {
      //        menuContent: {
      //            templateUrl: "templates/theme1/feed.html",
      //            controller: "FeedCtrl"
      //        }
      //    }
      //})

      .state("app.map", {
        url: "/map",
        abstract: true,
        views: {
          "menuContent": {
            templateUrl: "templates/map/map.html",
            controller: "MapController"
          }
        }
      })

      .state('app.map.local', {
        url: '/',
        views: {
          'map-local': {
            templateUrl: 'templates/map/map-local.html'
          }
        }
      })

      .state('app.map.world', {
        url: '/map-world',
        views: {
          'map-world': {
            templateUrl: 'templates/map/map-world.html',
            controller: "ShopController"
          }
        }
      })

      .state('app.map.favorites', {
        url: '/map-favorites',
        views: {
          'map-favorite': {
            templateUrl: 'templates/map/map-favorites.html',
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
            controller: "ProfileController"
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

      .state('app.chats', {
        url: "/chats",
        abstract: true,
        views: {
          "menuContent": {
            templateUrl: "templates/chats/chats.html",
            controller: 'ChatsController'
          }
        }
      })


      .state('app.chats.list', {
        url: "/settings-detail",
        views: {
          "chatsList": {
            templateUrl: "templates/chats/chats-list.html"
          }
        }
      })


      .state('app.settings', {
        url: "/settings",
        abstract: true,
        views: {
          "menuContent": {
            templateUrl: "templates/settings/settings.html",
            controller: 'SettingsController'
          }
        }
      })

      .state('app.settings.detail', {
        url: "/settings-detail",
        views: {
          "settingsDetail": {
            templateUrl: "templates/settings/settingsDetail.html"
          }
        }
      });

    //.state('app.profile.addnewpost', {
    //    url: "/new-post",
    //    views: {
    //        "profileContent": {
    //            templateUrl: "templates/posts/add-post.html",
    //            controller: "postUploadController"
    //        }
    //    }
    //})

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
    ////.state("app.map.local", {
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
    //.state('camera', {
    //    url: '/camera',
    //    templateUrl: 'templates/camera.html',
    //    //controller: 'CameraController'
    //})

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
    //$urlRouterProvider.otherwise('/shop-home');
  })
;
