/**
 * Created by yxia on 8/6/15.
 */
angular.module('qd.services', [])

    .factory('Camera', ['$q', function ($q) {
        return {
            getPicture: function (options) {
                var q = $q.defer();
                navigator.camera.getPicture(function (result) {
                    // Do any magic you need
                    q.resolve(result);
                }, function (err) {
                    q.reject(err);
                }, options);

                return q.promise;
            }
        }
    }])

    .factory('Chats', function () {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var chats = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
        }, {
            id: 1,
            name: 'Max Lynx',
            lastText: 'Hey, it\'s me',
            face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
        }, {
            id: 2,
            name: 'Adam Bradleyson',
            lastText: 'I should buy a boat',
            face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
        }, {
            id: 3,
            name: 'Perry Governor',
            lastText: 'Look at my mukluks!',
            face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
        }, {
            id: 4,
            name: 'Mike Harrington',
            lastText: 'This is wicked good ice cream.',
            face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
        }];

        return {
            all: function () {
                return chats;
            },
            remove: function (chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function (chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    })

    .service("ShopService", function ($http) {
        this.getProducts = function () {
            var testdata = {};
            $http.get("testdata.json").success(function (data) {
                testdata = data;
            });
            return testdata;
        };

        this.getProduct = function (product_name) {
            return $http.get("testdata.json").success(function (data) {
                var n = _.find(data.products, function (e) {
                    return e._id == product_name
                });
            });

        };

        //this.addProductToCart = function (e) {
        //    var n = _.isUndefined(window.localStorage.ionTheme1_cart) ? [] : JSON.parse(window.localStorage.ionTheme1_cart), o = _.find(n, function (n) {
        //        return n._id == e._id
        //    });
        //    o || n.push(e), window.localStorage.ionTheme1_cart = JSON.stringify(n)
        //};
        //this.getCartProducts = function () {
        //    return JSON.parse(window.localStorage.ionTheme1_cart || "[]")
        //};
        //this.removeProductFromCart = function (e) {
        //    var n = JSON.parse(window.localStorage.ionTheme1_cart), o = _.reject(n, function (n) {
        //        return n._id == e._id
        //    });
        //    window.localStorage.ionTheme1_cart = JSON.stringify(o)
        //}

    });
    //


