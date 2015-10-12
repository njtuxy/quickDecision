/**
 * Created by yxia on 10/2/15.
 */
angular.module('mapChat.settings')

    .controller("SettingsController", function ($scope, $ionicModal, Auth, fbUsernameService) {

        $scope.logout = function () {
            Auth.$unauth();
            //authTrackerService.setAuth(false);
            console.log('logged out!')
        };


        $ionicModal.fromTemplateUrl("templates/settings/change-user-name.html", {
            scope: $scope,
            animation: "slide-left-right"
        }).then(function (n) {
            $scope.change_user_name_modal = n;

            $scope.updateUserName = function (username) {
                fbUsernameService.saveUserName(username);
                $scope.change_user_name_modal.hide();
            };

        });


        $ionicModal.fromTemplateUrl("templates/settings/terms-of-service.html", {
            scope: $scope,
            animation: "slide-in-up"
        }).then(function (n) {
            $scope.terms_of_service_modal = n
        });

        $ionicModal.fromTemplateUrl("templates/settings/privacy-policy.html", {
            scope: $scope,
            animation: "slide-in-up"
        }).then(function (n) {
            $scope.privacy_policy_modal = n
        });


        $scope.showChangeUserName = function () {
            fbUsernameService.getUserName().then(function (userName) {
                $scope.currentUserName = userName;
            });

            $scope.change_user_name_modal.show()
        };

        $scope.showTerms = function () {
            $scope.terms_of_service_modal.show()
        };

        $scope.showPrivacyPolicy = function () {
            $scope.privacy_policy_modal.show()
        };
    });
