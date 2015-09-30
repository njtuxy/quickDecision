/**
 * Created by yxia on 9/30/15.
 */
angular.module('general.helper')
    .directive("multiBg", function (_) {
        return {
            scope: {multiBg: "=", interval: "=", helperClass: "@"},
            controller: ["$scope", "$element", "$attrs", function (e, o, t) {
                e.loaded = !1;
                var s = this;
                this.animateBg = function () {
                    e.$apply(function () {
                        e.loaded = !0;
                        o.css({"background-image": "url(" + e.bg_img + ")"})
                    })
                };
                this.setBackground = function (n) {
                    e.bg_img = n
                };
                _.isUndefined(e.multiBg) || s.setBackground(_.isArray(e.multiBg) && e.multiBg.length > 1 && !_.isUndefined(e.interval) && _.isNumber(e.interval) ? e.multiBg[0] : e.multiBg[0])
            }],
            templateUrl: "templates/auth/multi-bg.html",
            restrict: "A",
            replace: !0,
            transclude: !0
        }
    })

    .directive("bg", function () {
        return {
            restrict: "A", require: "^multiBg", scope: {ngSrc: "@"}, link: function (n, e, o, t) {
                e.on("load", function () {
                    t.animateBg()
                })
            }
        }
    })

    .directive("showHideContainer", function () {
        return {
            scope: {},
            controller: ["$scope", "$element", "$attrs", function (n, e, o) {
                n.show = !1;
                n.toggleType = function (e) {
                    e.stopPropagation(), e.preventDefault();
                    n.show = !n.show;
                    n.$broadcast("toggle-type", n.show)
                }
            }],
            templateUrl: "templates/auth/show-hide-password.html",
            restrict: "A",
            replace: !1,
            transclude: !0
        }
    })

    .directive("showHideInput", function () {
        return {
            scope: {}, link: function (n, e, o) {
                n.$on("toggle-type", function (n, o) {
                    {
                        var t = e[0];
                        t.getAttribute("type")
                    }
                    o || t.setAttribute("type", "password");
                    o && t.setAttribute("type", "text")
                })
            }, require: "^showHideContainer", restrict: "A", replace: !1, transclude: !1
        }
    })

    .directive("preImg", function () {
        return {
            restrict: "E",
            transclude: !0,
            scope: {ratio: "@", helperClass: "@"},
            controller: ["$scope", function (e) {
                e.loaded = !1;
                this.hideSpinner = function () {
                    e.$apply(function () {
                        e.loaded = !0
                    })
                }
            }],
            templateUrl: "templates/general/pre-img.html"
        }
    }).
    directive("spinnerOnLoad", function () {
        return {
            restrict: "A", require: "^preImg", scope: {ngSrc: "@"}, link: function (e, n, t, o) {
                n.on("load", function () {
                    o.hideSpinner()
                })
            }
        }
    });