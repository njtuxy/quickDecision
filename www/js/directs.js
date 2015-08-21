angular.module("qd.directives", [])
    .directive("multiBg", ["_", function (n) {
        return {
            scope: {multiBg: "=", interval: "=", helperClass: "@"},
            controller: ["$scope", "$element", "$attrs", function (e, o, t) {
                e.loaded = !1;
                var s = this;
                this.animateBg = function () {
                    e.$apply(function () {
                        e.loaded = !0, o.css({"background-image": "url(" + e.bg_img + ")"})
                    })
                }, this.setBackground = function (n) {
                    e.bg_img = n
                }, n.isUndefined(e.multiBg) || s.setBackground(n.isArray(e.multiBg) && e.multiBg.length > 1 && !n.isUndefined(e.interval) && n.isNumber(e.interval) ? e.multiBg[0] : e.multiBg[0])
            }],
            templateUrl: "templates/login/multi-bg.html",
            restrict: "A",
            replace: !0,
            transclude: !0
        }
    }])

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
                n.show = !1, n.toggleType = function (e) {
                    e.stopPropagation(), e.preventDefault(), n.show = !n.show, n.$broadcast("toggle-type", n.show)
                }
            }],
            templateUrl: "templates/login/show-hide-password.html",
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
                    o || t.setAttribute("type", "password"), o && t.setAttribute("type", "text")
                })
            }, require: "^showHideContainer", restrict: "A", replace: !1, transclude: !1
        }
    })