(function() {
    'use strict';

    angular.module('trelloApp')
        .controller('BoardShowController', boardShowController);

    boardShowController.$inject = ['$scope', '$rootScope', 'BoardService', 'ListService', 'CardService', 'LIBRARY', 'board', '$mdDialog', 'lists'];

    function boardShowController($scope, $rootScope, BoardService, ListService, CardService, LIBRARY, board, $mdDialog, lists) {
        if (!board) return;

        $scope.board = board;
        $scope.user = LIBRARY.get_current_user();

        // Load list for current board
        ListService.list(board.id).then(function(response) {
            $scope.lists = response.lists;
            angular.forEach($scope.lists, function(l) {
                if (!l.cards) l.cards = [];
            })
        });

        // SORT CARDS
        $scope.sortableOptions = {
            placeholder: "card",
            connectWith: ".cards-list"
        };

        $scope.updateCardPosition = function(e, ui) {
            var card = ui.item.sortable.model;
            var newListCards = ui.item.sortable.droptargetModel || [];

            // New position
            var position = ui.item.sortable.dropindex;

            // Get new list of this card
            if (!ui.item.sortable.droptarget) return;

            var newListId = ui.item.sortable.droptarget[0].getAttribute('id');
            if (position >= 0 && newListId) {
                CardService.save_position(newListId, card.id, position);
            }
        }

        // SORT LISTS
        $scope.onListOrderChange = function(list, newPosition) {
            ListService.save_position($scope.board.id, list.id, newPosition);
        }

        $scope.addList = function() {
            var list = {
                name: $scope.list.name,
                user_id: $scope.user.id,
                board_id: $scope.board.id,
            };

            ListService.create(list).then(function(newList) {
                lists.push(newList);
                $mdDialog.hide();
            });
        };

        $scope.createListDialog = function(list, $event) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'app/views/create-list.html',
                controller: 'BoardShowController',
                locals: {
                    board: $scope.board,
                    lists: $scope.lists,
                    user: $scope.user,
                }
            });
        };

        $scope.createCardDialog = function(selectedList) {
            selectedList.cards = selectedList.cards || [];
            $mdDialog.show({
                templateUrl: 'app/views/create-card.html',
                controller: 'CardsController',
                locals: {
                    list: selectedList,
                }
            });
        };

        $scope.editCardDialog = function(list, card, $event) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'app/views/edit-card.html',
                controller: 'EditCardCtrl',
                locals: {
                    card: card,
                    list: list,
                    lists: $scope.lists
                }
            });
        };

        $scope.editBoardDialog = function($event) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'app/views/edit-board.html',
                controller: 'EditBoardCtrl',
                locals: {
                    board: $scope.board
                }
            });
        };

        $scope.removeList = function(list) {
            var confirm = $mdDialog.confirm()
                  .title('Would you like to delete ' + list.name + ' ?')
                  .ok('Yes')
                  .cancel('Cancel');

            $mdDialog.show(confirm).then(function() {
                ListService.remove(list.id).then(function() {
                    $scope.lists.splice($scope.lists.indexOf(list), 1);
                })
            }, function() {});
        }

        $scope.removeCard = function(list, card) {
            var confirm = $mdDialog.confirm()
                  .title('Would you like to delete ' + card.title + ' ?')
                  .ok('Yes')
                  .cancel('Cancel');

            $mdDialog.show(confirm).then(function() {
                CardService.remove(card.id).then(function() {
                    if (list.cards) list.cards.splice(list.cards.indexOf(card), 1);
                })
            }, function() {});
        }
    }
})();
