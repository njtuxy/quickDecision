/**
 * Created by yxia on 9/30/15.
 */
angular.module('mapChat.profile')
    .service("PostService", function ($http) {
        this.getUserPosts = function (user_id) {
            return $http.get("testdata.json").success(function (data) {
                var n = _.filter(data.posts, function (post) {
                    return post.userId == user_id
                });
            });
        };
    });

