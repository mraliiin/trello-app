(function() {
    'use strict';

    angular.module('trelloApp')
        .factory('CardService', function($q, $http) {
            return {
                create: create,
                get: get,
                remove: remove,
                list: list,
                save_position: save_position,
            };

            // PRIVATE
            function _handleError(error) {
            }

            function create(card) {
                var deferred = $q.defer();

                $http({
                    url: '/api/lists/' + card.list_id + '/cards/',
                    method: "POST",
                    data: {
                        card: card
                    }
                }).then(function(response) {
                    deferred.resolve(response.data);

                }, function(response) {
                    _handleError(response);
                });

                return deferred.promise;
            };

            function get(boardId, id) {
                var deferred = $q.defer();

                $http({
                    url: '/api/lists/' + boardId + '/cards/' + id,
                    method: "GET",
                }).then(function(response) {
                    deferred.resolve(response.data);

                }, function(response) {
                    _handleError(response);
                });

                return deferred.promise;
            };

            function remove(id) {
                var deferred = $q.defer();

                $http({
                    url: '/api/cards/' + id,
                    method: "DELETE",
                }).then(function(response) {
                    deferred.resolve(response.data);

                }, function(response) {
                    _handleError(response);
                });

                return deferred.promise;
            };

            function list(list_id) {
                var deferred = $q.defer();

                $http({
                    url: '/api/lists/' + list_id + '/cards/',
                    method: "GET",
                }).then(function(response) {
                    deferred.resolve(response.data);

                }, function(response) {
                    _handleError(response);
                });

                return deferred.promise;
            };

            function save_position(list_id, card_id, position) {
                var deferred = $q.defer();

                $http({
                    url: '/api/lists/' + list_id + '/cards/' + card_id + '/position',
                    method: "POST",
                    data: {
                        card: {
                            'list_id': list_id,
                            'card_id': card_id,
                            'position': position,
                        }
                    }
                }).then(function(response) {
                    deferred.resolve(response.data);

                }, function(response) {
                    _handleError(response);
                });

                return deferred.promise;
            };
        });

}());
