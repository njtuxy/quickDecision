///**
// * Created by yxia on 8/21/15.
// */
//angular.module("underscore", []).factory("_", function () {
//    return window._
//}),
//
//    angular.module("your_app_name", ["ionic", "your_app_name.tracking", "your_app_name.common.directives", "your_app_name.app.controllers", "your_app_name.auth.controllers", "your_app_name.app.services", "your_app_name.views", "underscore", "angularMoment"]).config(["$ionicConfigProvider", function (e) {
//    ionic.Platform.isAndroid() && e.scrolling.jsScrolling(!1)
//}]).run(["$ionicPlatform", "$rootScope", "$ionicHistory", function (e, n, t) {
//    e.ready(function () {
//        window.cordova && window.cordova.plugins.Keyboard && cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0), window.StatusBar && StatusBar.styleDefault()
//    })
//}]).config(["$stateProvider", "$urlRouterProvider", function (e, n) {
//    e.state("app", {
//        url: "/app",
//        "abstract": !0,
//        templateUrl: "views/app/side-menu.html",
//        controller: "AppCtrl"
//    }).state("app.feed", {
//        url: "/feed",
//        views: {menuContent: {templateUrl: "views/app/feed.html", controller: "FeedCtrl"}}
//    }).state("app.profile", {
//        "abstract": !0,
//        url: "/profile/:userId",
//        views: {menuContent: {templateUrl: "views/app/profile/profile.html", controller: "ProfileCtrl"}}
//    }).state("app.profile.posts", {
//        url: "/posts",
//        views: {profileContent: {templateUrl: "views/app/profile/profile.posts.html"}}
//    }).state("app.profile.likes", {
//        url: "/likes",
//        views: {profileContent: {templateUrl: "views/app/profile/profile.likes.html"}}
//    }).state("app.settings", {
//        url: "/settings",
//        views: {menuContent: {templateUrl: "views/app/profile/settings.html", controller: "SettingsCtrl"}}
//    }).state("app.shop", {
//        url: "/shop",
//        "abstract": !0,
//        views: {menuContent: {templateUrl: "views/app/shop/shop.html"}}
//    }).state("app.shop.home", {
//        url: "/",
//        views: {"shop-home": {templateUrl: "views/app/shop/shop-home.html", controller: "ShopCtrl"}}
//    }).state("app.shop.popular", {
//        url: "/popular",
//        views: {"shop-popular": {templateUrl: "views/app/shop/shop-popular.html", controller: "ShopCtrl"}}
//    }).state("app.shop.sale", {
//        url: "/sale",
//        views: {"shop-sale": {templateUrl: "views/app/shop/shop-sale.html", controller: "ShopCtrl"}}
//    }).state("app.cart", {
//        url: "/cart",
//        views: {menuContent: {templateUrl: "views/app/shop/cart.html", controller: "ShoppingCartCtrl"}}
//    }).state("app.shipping-address", {
//        url: "/shipping-address",
//        views: {menuContent: {templateUrl: "views/app/shop/shipping-address.html", controller: "CheckoutCtrl"}}
//    }).state("app.checkout", {
//        url: "/checkout",
//        views: {menuContent: {templateUrl: "views/app/shop/checkout.html", controller: "CheckoutCtrl"}}
//    }).state("app.product-detail", {
//        url: "/product/:productId",
//        views: {menuContent: {templateUrl: "views/app/shop/product-detail.html", controller: "ProductCtrl"}}
//    }).state("facebook-sign-in", {
//        url: "/facebook-sign-in",
//        templateUrl: "views/auth/facebook-sign-in.html",
//        controller: "WelcomeCtrl"
//    }).state("dont-have-facebook", {
//        url: "/dont-have-facebook",
//        templateUrl: "views/auth/dont-have-facebook.html",
//        controller: "WelcomeCtrl"
//    }).state("create-account", {
//        url: "/create-account",
//        templateUrl: "views/auth/create-account.html",
//        controller: "CreateAccountCtrl"
//    }).state("welcome-back", {
//        url: "/welcome-back",
//        templateUrl: "views/auth/welcome-back.html",
//        controller: "WelcomeBackCtrl"
//    }), n.otherwise("/facebook-sign-in")
//
//
//}]),
//
//
//    angular.module("your_app_name.common.directives", []).directive("multiBg", ["_", function (e) {
//    return {
//        scope: {multiBg: "=", interval: "=", helperClass: "@"},
//        controller: ["$scope", "$element", "$attrs", function (n, t, o) {
//            n.loaded = !1;
//            var i = this;
//            this.animateBg = function () {
//                n.$apply(function () {
//                    n.loaded = !0, t.css({"background-image": "url(" + n.bg_img + ")"})
//                })
//            }, this.setBackground = function (e) {
//                n.bg_img = e
//            }, e.isUndefined(n.multiBg) || i.setBackground(e.isArray(n.multiBg) && n.multiBg.length > 1 && !e.isUndefined(n.interval) && e.isNumber(n.interval) ? n.multiBg[0] : n.multiBg[0])
//        }],
//        templateUrl: "views/common/multi-bg.html",
//        restrict: "A",
//        replace: !0,
//        transclude: !0
//    }
//}]).directive("bg", function () {
//    return {
//        restrict: "A", require: "^multiBg", scope: {ngSrc: "@"}, link: function (e, n, t, o) {
//            n.on("load", function () {
//                o.animateBg()
//            })
//        }
//    }
//}).directive("showHideContainer", function () {
//    return {
//        scope: {}, controller: ["$scope", "$element", "$attrs", function (e, n, t) {
//            e.show = !1, e.toggleType = function (n) {
//                n.stopPropagation(), n.preventDefault(), e.show = !e.show, e.$broadcast("toggle-type", e.show)
//            }
//        }], templateUrl: "views/common/show-hide-password.html", restrict: "A", replace: !1, transclude: !0
//    }
//}).directive("showHideInput", function () {
//    return {
//        scope: {}, link: function (e, n, t) {
//            e.$on("toggle-type", function (e, t) {
//                {
//                    var o = n[0];
//                    o.getAttribute("type")
//                }
//                t || o.setAttribute("type", "password"), t && o.setAttribute("type", "text")
//            })
//        }, require: "^showHideContainer", restrict: "A", replace: !1, transclude: !1
//    }
//}).directive("preImg", function () {
//    return {
//        restrict: "E", transclude: !0, scope: {ratio: "@", helperClass: "@"}, controller: ["$scope", function (e) {
//            e.loaded = !1, this.hideSpinner = function () {
//                e.$apply(function () {
//                    e.loaded = !0
//                })
//            }
//        }], templateUrl: "views/common/pre-img.html"
//    }
//}).directive("spinnerOnLoad", function () {
//    return {
//        restrict: "A", require: "^preImg", scope: {ngSrc: "@"}, link: function (e, n, t, o) {
//            n.on("load", function () {
//                o.hideSpinner()
//            })
//        }
//    }
//}),
//
//
//    angular.module("your_app_name.auth.controllers", []).controller("WelcomeCtrl", ["$scope", "$state", "$ionicModal", function (e, n, t) {
//    e.bgs = ["img/welcome-bg.jpeg"], e.facebookSignIn = function () {
//        console.log("doing facebbok sign in"), n.go("app.feed")
//    }, t.fromTemplateUrl("views/app/legal/privacy-policy.html", {
//        scope: e,
//        animation: "slide-in-up"
//    }).then(function (n) {
//        e.privacy_policy_modal = n
//    }), t.fromTemplateUrl("views/app/legal/terms-of-service.html", {
//        scope: e,
//        animation: "slide-in-up"
//    }).then(function (n) {
//        e.terms_of_service_modal = n
//    }), e.showPrivacyPolicy = function () {
//        e.privacy_policy_modal.show()
//    }, e.showTerms = function () {
//        e.terms_of_service_modal.show()
//    }
//}]).controller("CreateAccountCtrl", ["$scope", "$state", function (e, n) {
//    e.doSignUp = function () {
//        console.log("doing sign up"), n.go("app.feed")
//    }
//}]).controller("WelcomeBackCtrl", ["$scope", "$state", "$ionicModal", function (e, n, t) {
//    e.doLogIn = function () {
//        console.log("doing log in"), n.go("app.feed")
//    }, t.fromTemplateUrl("views/auth/forgot-password.html", {scope: e, animation: "slide-in-up"}).then(function (n) {
//        e.forgot_password_modal = n
//    }), e.showForgotPassword = function () {
//        e.forgot_password_modal.show()
//    }, e.requestNewPassword = function () {
//        console.log("requesting new password")
//    }
//}]).controller("ForgotPasswordCtrl", ["$scope", function (e) {
//}]),
//
//
//    angular.module("your_app_name.app.controllers", []).controller("AppCtrl", ["$scope", "AuthService", function (e, n) {
//    var t = {
//        about: "Design Lead of Project Fi. Love adventures, green tea, and the color pink.",
//        name: "Brynn Evans",
//        picture: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
//        _id: 0,
//        followers: 345,
//        following: 58
//    };
//    n.saveUser(t), e.loggedUser = t
//}]).controller("ProfileCtrl", ["$scope", "$stateParams", "PostService", "$ionicHistory", "$state", "$ionicScrollDelegate", function (e, n, t, o, i, s) {
//    e.$on("$ionicView.afterEnter", function () {
//        s.$getByHandle("profile-scroll").resize()
//    });
//    var a = n.userId;
//    e.myProfile = e.loggedUser._id == a, e.posts = [], e.likes = [], e.user = {}, t.getUserPosts(a).then(function (n) {
//        e.posts = n
//    }), t.getUserDetails(a).then(function (n) {
//        e.user = n
//    }), t.getUserLikes(a).then(function (n) {
//        e.likes = n
//    }), e.getUserLikes = function (e) {
//        o.currentView(o.backView()), o.nextViewOptions({disableAnimate: !0}), i.go("app.profile.likes", {userId: e})
//    }, e.getUserPosts = function (e) {
//        o.currentView(o.backView()), o.nextViewOptions({disableAnimate: !0}), i.go("app.profile.posts", {userId: e})
//    }
//}]).controller("ProductCtrl", ["$scope", "$stateParams", "ShopService", "$ionicPopup", "$ionicLoading", function (e, n, t, o, i) {
//    var s = n.productId;
//    t.getProduct(s).then(function (n) {
//        e.product = n
//    }), e.showAddToCartPopup = function (n) {
//        e.data = {}, e.data.product = n, e.data.productOption = 1, e.data.productQuantity = 1;
//        var s = o.show({
//            cssClass: "add-to-cart-popup",
//            templateUrl: "views/app/shop/partials/add-to-cart-popup.html",
//            title: "Add to Cart",
//            scope: e,
//            buttons: [{text: "", type: "close-popup ion-ios-close-outline"}, {
//                text: "Add to cart", onTap: function (n) {
//                    return e.data
//                }
//            }]
//        });
//        s.then(function (e) {
//            e ? (i.show({
//                template: '<ion-spinner icon="ios"></ion-spinner><p style="margin: 5px 0 0 0;">Adding to cart</p>',
//                duration: 1e3
//            }), t.addProductToCart(e.product), console.log("Item added to cart!", e)) : console.log("Popup closed")
//        })
//    }
//}]).controller("FeedCtrl", ["$scope", "PostService", function (e, n) {
//    e.posts = [], e.page = 1, e.totalPages = 1, e.doRefresh = function () {
//        n.getFeed(1).then(function (n) {
//            e.totalPages = n.totalPages, e.posts = n.posts, e.$broadcast("scroll.refreshComplete")
//        })
//    }, e.getNewData = function () {
//        e.$broadcast("scroll.refreshComplete")
//    }, e.loadMoreData = function () {
//        e.page += 1, n.getFeed(e.page).then(function (n) {
//            e.totalPages = n.totalPages, e.posts = e.posts.concat(n.posts), e.$broadcast("scroll.infiniteScrollComplete")
//        })
//    }, e.moreDataCanBeLoaded = function () {
//        return e.totalPages > e.page
//    }, e.doRefresh()
//}])
//
//
//.controller("ShoppingCartCtrl", ["$scope", "ShopService", "$ionicActionSheet", "_", function (e, n, t, o) {
//    e.products = n.getCartProducts(), e.removeProductFromCart = function (o) {
//        t.show({
//            destructiveText: "Remove from cart", cancelText: "Cancel", cancel: function () {
//                return !0
//            }, destructiveButtonClicked: function () {
//                return n.removeProductFromCart(o), e.products = n.getCartProducts(), !0
//            }
//        })
//    }, e.getSubtotal = function () {
//        return o.reduce(e.products, function (e, n) {
//            return e + n.price
//        }, 0)
//    }
//}])
//
//.controller("CheckoutCtrl", ["$scope", function (e) {
//}]).controller("SettingsCtrl", ["$scope", "$ionicModal", function (e, n) {
//    n.fromTemplateUrl("views/app/legal/terms-of-service.html", {scope: e, animation: "slide-in-up"}).then(function (n) {
//        e.terms_of_service_modal = n
//    }), n.fromTemplateUrl("views/app/legal/privacy-policy.html", {
//        scope: e,
//        animation: "slide-in-up"
//    }).then(function (n) {
//        e.privacy_policy_modal = n
//    }), e.showTerms = function () {
//        e.terms_of_service_modal.show()
//    }, e.showPrivacyPolicy = function () {
//        e.privacy_policy_modal.show()
//    }
//}]), angular.module("your_app_name.app.services", []).service("AuthService", function () {
//    this.saveUser = function (e) {
//        window.localStorage.your_app_name_user = JSON.stringify(e)
//    }, this.getLoggedUser = function () {
//        return window.localStorage.your_app_name_user ? JSON.parse(window.localStorage.your_app_name_user) : null
//    }
//}).service("PostService", ["$http", "$q", function (e, n) {
//    this.getUserDetails = function (t) {
//        var o = n.defer();
//        return e.get("database.json").success(function (e) {
//            var n = _.find(e.users, function (e) {
//                return e._id == t
//            });
//            o.resolve(n)
//        }), o.promise
//    }, this.getUserPosts = function (t) {
//        var o = n.defer();
//        return e.get("database.json").success(function (e) {
//            var n = _.filter(e.posts, function (e) {
//                return e.userId == t
//            }), i = _.sortBy(n, function (e) {
//                return new Date(e.date)
//            }), s = _.find(e.users, function (e) {
//                return e._id == t
//            }), a = _.each(i.reverse(), function (e) {
//                return e.user = s, e
//            });
//            o.resolve(a)
//        }), o.promise
//    }, this.getUserLikes = function (t) {
//        var o = n.defer();
//        return e.get("database.json").success(function (e) {
//            var n = e.posts.slice(0, 4), t = _.sortBy(n, function (e) {
//                return new Date(e.date)
//            }), i = _.each(t.reverse(), function (n) {
//                return n.user = _.find(e.users, function (e) {
//                    return e._id == n.userId
//                }), n
//            });
//            o.resolve(i)
//        }), o.promise
//    }, this.getFeed = function (t) {
//        var o = 5, i = o * (t - 1), s = 1, a = 1, l = n.defer();
//        return e.get("database.json").success(function (e) {
//            s = e.posts.length, a = s / o;
//            var n = _.sortBy(e.posts, function (e) {
//                return new Date(e.date)
//            }), t = n.slice(i, i + o), r = _.each(t.reverse(), function (n) {
//                return n.user = _.find(e.users, function (e) {
//                    return e._id == n.userId
//                }), n
//            });
//            l.resolve({posts: r, totalPages: a})
//        }), l.promise
//    }
//}]).
