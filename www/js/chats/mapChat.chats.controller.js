/**
 * Created by yxia on 10/9/15.
 */

angular.module('mapChat.chats')
    .controller('ChatsController', function ($scope, $ionicModal, Auth, fbUsernameService) {

        $ionicModal.fromTemplateUrl("templates/chats/chat-modal.html", {
            scope: $scope,
            //animation: "slide-left-right"
        }).then(function (n) {
            $scope.chat_modal = n;

        });

        $scope.showChatModal = function () {

            $scope.chat_modal.show()

        };


    });
