(function() {
    'use strict';

    angular.module('trelloApp')
        .controller('CardsController', createCardController);

    createCardController.$inject = ['$scope', '$mdDialog', 'CardService', 'list'];

    function createCardController($scope, $mdDialog, CardService, list) {
        $scope.card = {
            title: ''
        };

        $scope.createCard = function() {
            var card = {
                title: $scope.card.title,
                list_id: list.id,
            };

            CardService.create(card).then(function(newCard) {
                list.cards.push(newCard);
                $mdDialog.hide();
            })
        };


        // $scope.updateCard = function() {
        //     list.cards.$save(card)
        //         .then(function() {
        //             $mdToast.show($mdToast.simple().position('bottom right').content('Card Updates: ' + $scope.card.name));
        //             $mdDialog.hide()
        //         });
        // };
    }
})();
