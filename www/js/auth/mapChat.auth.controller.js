/**
 * Created by yxia on 9/25/15.
 */
angular.module('mapChat.auth')
    //Controllers for welcome page, login page and sign up page.
    .controller("AuthController", function ($scope,
                                            $ionicPopup,
                                            $ionicLoading,
                                            $timeout,
                                            $state,
                                            Auth,
                                            fbUsernameService) {

        console.log('Auth Controller loadded!');
        var loginPopup = {}, singupPopup = {}, forgetPasswordPopup = {};

        $scope.user = {};
        $scope.showLogIn = function () {
            loginPopup = $ionicPopup.show({
                cssClass: "popup-outer auth-view",
                templateUrl: 'templates/auth/login.html',
                scope: $scope,
                title: "Sign In",
                buttons: [{text: "", type: "close-popup ion-ios-close-outline"}]
            })
        };

        $scope.showSignUp = function () {
            singupPopup = $ionicPopup.show({
                cssClass: "popup-outer auth-view",
                templateUrl: "templates/auth/signup.html",
                scope: $scope,
                title: "Create Account",
                buttons: [{text: "", type: "close-popup ion-ios-close-outline"}]
            })
        };

        $scope.showForgotPassword = function () {
            loginPopup.close();
            $timeout(function () {
                forgetPasswordPopup = $ionicPopup.show({
                    cssClass: "popup-outer auth-view",
                    templateUrl: "templates/auth/forgot-password.html",
                    scope: $scope,
                    title: "Reset your password",
                    buttons: [{text: "", type: "close-popup ion-ios-close-outline"}]
                })
            }, 0)
        };

        $scope.doLogIn = function (email, password) {
            $ionicLoading.show({
                template: '<ion-spinner icon="ios"></ion-spinner><p style="margin: 5px 0 0 0;">Logging in...</p>',
                duration: 1e3
            });

            Auth.$authWithPassword({email: email, password: password}, {rememberMe: true})
                .then(function (/* user */) {
                    loginPopup.close();
                    $state.go("app.map.local");
                }, function (error) {
                    switch (error.code) {
                        case "INVALID_EMAIL":
                            $scope.loginError = 'invalid email!';
                            break;
                        default:
                            $scope.loginError = 'unable to log in this time';
                    }
                });
        };

        $scope.doSignUp = function (email, password, username) {
            $ionicLoading.show({
                template: '<ion-spinner icon="ios"></ion-spinner><p style="margin: 5px 0 0 0;">Creating account...</p>',
                duration: 1e3
            });

            Auth.$createUser({email: email, password: password}).then(function () {
                return Auth.$authWithPassword({
                    email: email,
                    password: password
                });
            }).then(function (user) {
                fbUsernameService.saveUserName(Auth, username);
                singupPopup.close();
                console.log(user);
                //$scope.singUpAuthData = authData;
                $state.go("app.map.local");
            }).catch(function (error) {
                $scope.signUpError = error;
            });

        };

        $scope.requestNewPassword = function () {
            forgetPasswordPopup.close();
            console.log("requesting new password")
        };

        $scope.facebookSignIn = function () {
            console.log("doing facebbok sign in")
        };
        $scope.googleSignIn = function () {
            console.log("doing google sign in")
        };
        $scope.twitterSignIn = function () {
            console.log("doing twitter sign in")
        }
    });
