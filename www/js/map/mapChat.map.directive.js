/**
 * Created by yxia on 10/14/15.
 */

angular.module('mapChat.map')
    .directive('input', function ($timeout) {
        return {
            restrict: 'E',
            scope: {
                'returnClose': '=',
                'onReturn': '&'
            },
            link: function (scope, element, attr) {
                element.bind('keydown', function (e) {
                    if (e.which == 13) {
                        if (scope.returnClose) {
                            console.log('return-close true: closing keyboard');
                            element[0].blur();
                        }
                        if (scope.onReturn) {
                            console.log('on-return set: executing');
                            $timeout(function () {
                                scope.onReturn();
                            });
                        }
                    }
                });
            }
        }
    });