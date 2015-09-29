/**
 * Created by yxia on 9/25/15.
 */
angular.module('mapChat.auth')
    //Controllers for welcome page, login page and sign up page.
    .controller("AuthController", function ($scope,
                                            $ionicPopup,
                                            $ionicLoading,
                                            $timeout,
                                            $firebaseAuth,
                                            $location,
                                            $rootScope,
                                            $state) {

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

            var fbAuth = $firebaseAuth($rootScope.fb);

            fbAuth.$authWithPassword({
                email: email,
                password: password
            }).then(function (authData) {
                loginPopup.close();
                $state.go("app.global.local");
            }).catch(function (error) {
                switch (error.code) {
                    case "INVALID_EMAIL":
                        $scope.error = 'invalid email!';
                        break;
                    default:
                        $scope.error = 'unable to log in this time';
                }
                $scope.loginError = true;
            });

        };

        $scope.doSignUp = function (email, password) {
            singupPopup.close();
            $ionicLoading.show({
                template: '<ion-spinner icon="ios"></ion-spinner><p style="margin: 5px 0 0 0;">Creating account...</p>',
                duration: 1e3
            });

            var fbAuth = $firebaseAuth($rootScope.fb);
            fbAuth.$createUser({email: email, password: password}).then(function () {
                return fbAuth.$authWithPassword({
                    email: email,
                    password: password
                });
            }).then(function (authData) {
                $scope.singUpAuthData = authData;
                console.log("signed up!!")
                $location.path("/contents");
            }).catch(function (error) {
                console.error("ERROR " + error);
                $scope.debugMsg1 = error;
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
    })
