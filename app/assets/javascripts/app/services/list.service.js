(function(){
    'use strict';

    angular.module('trelloApp')
        .factory('ListService', function($q, $http) {
            return {
                create: create,
                get: get,
                remove: remove,
                list: list,
                save_position: save_position,
            };

            // PRIVATE
            function _handleError(error) {}

            function save_position(board_id, list_id, position) {
                var deferred = $q.defer();

                $http({
                    url: '/api/boards/' + board_id +'/lists/' + list_id + '/position',
                    method: "POST",
                    data: {
                        list: {
                            'board_id': board_id,
                            'list_id': list_id,
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

            function create(list) {
                var deferred = $q.defer();

                $http({
                    url: '/api/boards/' + list.board_id +'/lists/',
                    method: "POST",
                    data: {
                        list: list
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
                    url: '/api/boards/' + boardId +'/lists/' + id,
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
                    url: '/api/lists/' + id,
                    method: "DELETE",
                }).then(function(response) {
                    deferred.resolve(response.data);

                }, function(response) {
                    _handleError(response);
                });

                return deferred.promise;
            };

            function list(board_id) {
                var deferred = $q.defer();

                $http({
                    url: '/api/boards/' + board_id +'/lists/',
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
