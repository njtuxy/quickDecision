/**
 * Created by yxia on 9/30/15.
 */
angular.module('mapChat.profile')

    .controller("ProfileCtrl",
    function ($scope,
              $stateParams,
              PostService,
              $ionicHistory,
              $state,
              $ionicScrollDelegate,
              $http,
              _) {

        $http.get("testdata.json").success(function (data) {
            $scope.user = data.users[3];

            $scope.posts = _.filter(data.posts, function (post) {
                return post.userId == 8
            });

            $scope.myProfile = true;
        });


        $scope.$on("$ionicView.afterEnter", function () {
            $ionicScrollDelegate.$getByHandle("profile-scroll").resize()
        });

        //var a = $stateParams.userId;
        //var a = 3;
        //$scope.myProfile = $scope.loggedUser._id == a;
        //$scope.posts = [];
        //$scope.likes = [];
        //$scope.user = {};
        //
        //$http.get("testdata.json").success(function (data) {
        //});
        
        $scope.OpenSettings = function () {
            $state.go('app.profile.settings');
        }
    })

    .controller("SettingsCtrl", function ($scope, $ionicModal) {

        console.log('Setting Controller loadded');

        $ionicModal.fromTemplateUrl("templates/profile/terms-of-service.html", {
            scope: $scope,
            animation: "slide-in-up"
        }).then(function (n) {
            $scope.terms_of_service_modal = n
        });

        $ionicModal.fromTemplateUrl("templates/profile/privacy-policy.html", {
            scope: $scope,
            animation: "slide-in-up"
        }).then(function (n) {
            $scope.privacy_policy_modal = n
        });

        $scope.showTerms = function () {
            $scope.terms_of_service_modal.show()
        };

        $scope.showPrivacyPolicy = function () {
            $scope.privacy_policy_modal.show()
        }
    });
