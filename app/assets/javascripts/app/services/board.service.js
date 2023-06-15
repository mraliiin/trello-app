(function() {
    'use strict';

    angular.module('trelloApp')
        .factory('BoardService', function($q, $http) {
            return {
                create: create,
                get: get,
                remove: remove,
                list: list,
            };

            // PRIVATE
            function _handleError(error) { }

            function create(board) {
                var deferred = $q.defer();

                $http({
                    url: '/api/boards',
                    method: "POST",
                    data: {
                        board: board
                    }
                }).then(function(response) {
                    deferred.resolve(response.data);

                }, function(response) {
                    _handleError(response);
                });

                return deferred.promise;
            };

            function get(boardId) {
                var deferred = $q.defer();

                $http({
                    url: '/api/boards/' + boardId,
                    method: "GET",
                }).then(function(response) {
                    deferred.resolve(response.data);

                }, function(response) {
                    _handleError(response);
                });

                return deferred.promise;
            };

            function remove(boardId) {
                var deferred = $q.defer();

                $http({
                    url: '/api/boards/' + boardId,
                    method: "DELETE",
                }).then(function(response) {
                    deferred.resolve(response.data);

                }, function(response) {
                    _handleError(response);
                });

                return deferred.promise;
            };

            function list() {
                var deferred = $q.defer();

                $http({
                    url: '/api/boards',
                    method: "GET",
                }).then(function(response) {
                    deferred.resolve(response.data);

                }, function(response) {
                    _handleError(response);
                });

                return deferred.promise;
            };
        });
})();
