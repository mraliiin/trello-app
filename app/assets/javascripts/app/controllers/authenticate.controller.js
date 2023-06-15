(function() {
    'use strict';

    angular.module('trelloApp')
        .controller('AuthenticateController', authenticateController)

    authenticateController.$inject = ['$scope', '$state', 'Auth'];

    function authenticateController($scope, $state, Auth) {
        var config = {
            headers: {
                'X-HTTP-Method-Override': 'POST'
            }
        };

        $scope.register = function() {
            Auth.register($scope.user, config).then(function() {
                $state.go('home');
            }, function(error) {});
        };

        $scope.login = function() {
            Auth.login($scope.user, config).then(function() {
                $state.go('home');
            }, function(error) {});
        };
    }
})();
