(function() {
    'use strict';

    angular.module('trelloApp')
        .controller('BoardEditController', boardEditController);

    boardEditController.$inject = ['$scope', 'board', '$mdToast', '$mdDialog', 'BoardService', '$state'];

    function boardEditController($scope, board, $mdToast, $mdDialog, BoardService, $state) {
        $scope.board = board;

        $scope.updateBoard = function() {
            BoardService.save($scope.board)
                .then(function() {
                    toastr.success("Success", 'Updated Board: ' + board.title);
                    $mdDialog.hide();
                });
        };
    }
})();
