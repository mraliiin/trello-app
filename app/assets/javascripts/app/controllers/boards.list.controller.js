(function() {
    'use strict';

    angular.module('trelloApp')
        .controller('BoardsListController', boardsListController)

    boardsListController.$inject = ['$scope', '$state', '$rootScope', 'BoardService', 'LIBRARY', '$mdDialog'];

    function boardsListController($scope, $state, $rootScope, BoardService, LIBRARY, $mdDialog) {
        $scope.user = LIBRARY.get_current_user();

        $scope.boards = BoardService.list().then(function(response) {
            $scope.boards = response;
        });

        $scope.board = {
            name: ''
        };

        $scope.addBoard = function() {
            if (!$scope.user) return false;
            $scope.board.user_id = $scope.user.id;
            BoardService.create($scope.board).then(function(response) {
                $state.reload();
            });
        };

        $scope.gotoBoard = function(boardId) {
            $state.go("board", { "id": boardId });
        };

        $scope.removeBoard = function(board) {
            var confirm = $mdDialog.confirm()
                  .title('Would you like to delete ' + board.name + ' ?')
                  .ok('Yes')
                  .cancel('Cancel');

            $mdDialog.show(confirm).then(function() {
                BoardService.remove(board.id).then(function() {
                    $scope.boards.splice($scope.boards.indexOf(board), 1);
                });
            }, function() {});
        }
    }
})();
