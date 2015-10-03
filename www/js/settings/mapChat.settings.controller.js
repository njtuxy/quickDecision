/**
 * Created by yxia on 10/2/15.
 */
angular.module('mapChat.settings')

    .controller("SettingsController", function ($scope, $ionicModal) {

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

        $scope.showTerms = function () {
            $scope.terms_of_service_modal.show()
        };

        $scope.showPrivacyPolicy = function () {
            $scope.privacy_policy_modal.show()
        }
    });
