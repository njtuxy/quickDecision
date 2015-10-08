/**
 * Created by yxia on 9/30/15.
 */
angular.module('mapChat.mapMarkers')
    .controller('MarkerController',
    function ($scope, $ionicPopup, $timeout, fbMessageService, fbUsernameService, Auth, SweetAlert) {
        $scope.greet = function (user) {
            alert("Greet");
        };

        console.log("------start------")
        console.log($scope.userId);
        console.log("------end---------")


        //fbUsernameService.getUserNameByUid($scope.userId).then(
        //    function (userName) {
        //        console.log("------start------")
        //        console.log($scope.userId);
        //        console.log("------end---------")
        //        $scope.userName=userName;
        //    }
        //);


        $scope.test = function () {
            SweetAlert.swal({
                title: "Send Message to: " + $scope.userId,
                //text: "Write something interesting:",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: true,
                animation: "pop",
                //inputPlaceholder: "Greetings!",
                confirmButtonText: "Send"
            }, function (inputValue) {
                if (inputValue === false) return false;
                if (inputValue === "") {
                    //SweetAlert.swal.showInputError("You need to write something!");
                    console.log('nothing to sent');
                    return false
                }
                //console.log('I am text');
                fbMessageService.sendMessage(Auth, $scope.userId, inputValue);
                //SweetAlert.swal("Nice!", "You wrote: " + inputValue, "success");
            });
        };

        //Triggered on a button click, or some other target
        $scope.showPopup = function () {
            $scope.data = {};

            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                templateUrl: 'templates/ionicPopup/chatPopup.html',
                title: $scope.userId,
                subTitle: 'Send a message',
                scope: $scope,
                buttons: [
                    {text: 'Cancel'},
                    {
                        text: '<b>Send</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            if (!$scope.data.message) {
                                //don't allow the user to close unless he enters wifi password
                                e.preventDefault();
                            } else {
                                return $scope.data.message;
                            }
                        }
                    }
                ]
            });
            myPopup.then(function (res) {
                //console.log($scope.messageToBeSent);
                fbMessageService.sendMessage(Auth, $scope.userId, res);
                console.log('Tapped!' + $scope.userId, res);
            });

            $timeout(function () {
                myPopup.close(); //close the popup after 3 seconds for some reason
            }, 10000);
        };
    });
