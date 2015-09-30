/**
 * Created by yxia on 8/6/15.
 */
angular.module('qd.services', [])

    //.factory('Camera', ['$q', function ($q) {
    //    return {
    //        getPicture: function (options) {
    //            var q = $q.defer();
    //            navigator.camera.getPicture(function (result) {
    //                // Do any magic you need
    //                q.resolve(result);
    //            }, function (err) {
    //                q.reject(err);
    //            }, options);
    //
    //            return q.promise;
    //        }
    //    }
    //}])

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

    //.service("ShopService", function ($http, _) {
    //    this.getProducts = function () {
    //        var testdata = {};
    //        $http.get("testdata.json").success(function (data) {
    //            testdata = data;
    //        });
    //        return testdata;
    //    };
    //
    //    this.getProduct = function (product_name) {
    //        return $http.get("testdata.json").success(function (data) {
    //            var n = _.find(data.products, function (e) {
    //                return e._id == product_name
    //            });
    //        });
    //    };
    //
    //})


//.service("PostService", ["$http", "$q", function (e, n) {
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
//}])


