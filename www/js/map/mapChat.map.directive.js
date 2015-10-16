/**
 * Created by yxia on 10/14/15.
 */

angular.module('mapChat.map')

  .directive('messageInput', function ($timeout, $cordovaKeyboard) {
    return {
      restrict: 'C',
      scope: {
        'returnClose': '=',
        'onReturn': '&',
        'onFocus': '&',
        'onBlur': '&'
      },
      link: function (scope, element, attr) {

        element.bind('focus', function (e) {
          if (scope.onFocus) {
            console.log("##########################################################################################3");
            console.log('focus down event');
            console.log("##########################################################################################4");

            $timeout(function () {
              scope.onFocus();
            });
          }
        });

        element.bind('blur', function (e) {
          if (scope.onBlur) {
            console.log("##########################################################################################3");
            console.log('blur down event');
            console.log("##########################################################################################4");
            $timeout(function () {
              scope.onBlur();
              cordova.plugins.Keyboard.close();
            });
          }
        });

        element.bind('keydown', function (e) {
          if (e.which == 13) {
            console.log("##########################################################################################1");
            console.log('key down event');
            console.log("##########################################################################################2");
            if (scope.returnClose) {
              element[0].blur();
            }
            if (scope.onReturn) {
              $timeout(function () {
                scope.onReturn();
                cordova.plugins.Keyboard.close();

              });
            }
          }
        });
      }
    }
  });

//.directive('input', function ($timeout) {
//    return {
//        restrict: 'E',
//        scope: {
//            'returnClose': '=',
//            'onReturn': '&'
//        },
//        link: function (scope, element, attr) {
//            element.bind('keydown', function (e) {
//                if (e.which == 13) {
//                    if (scope.returnClose) {
//                        console.log('return-close true: closing keyboard');
//                        element[0].blur();
//                    }
//                    if (scope.onReturn) {
//                        console.log('on-return set: executing');
//                        $timeout(function () {
//                            scope.onReturn();
//                        });
//                    }
//                }
//            });
//        }
//    }
//});
