(function() {
    'use strict';

    angular
        .module('trelloApp')
        .directive('appNavbar', appNavbar);

    appNavbar.$inject = [];

    function appNavbar() {
        appNavbarDirectiveController.$inject = ['$scope', 'LIBRARY', 'Auth', '$state', '$timeout'];

        return {
            restrict: 'EA',
            scope: {},
            templateUrl: 'app/directives/navbar/template.html',
            controller: appNavbarDirectiveController,
            controllerAs: 'vm',
            bindToController: true
        };

        function appNavbarDirectiveController($scope, LIBRARY, Auth, $state, $timeout) {
            var vm = this;

            vm.signedIn = Auth.isAuthenticated;
            vm.logout = Auth.logout;

            Auth.currentUser().then(function(user) {
                LIBRARY.set_current_user(user);
                vm.currentUser = user;
            }, function(error) {});

            // Register
            $scope.$on('devise:new-registration', function(e, user) {
                $scope.user = user;
                LIBRARY.set_current_user(user);
                vm.currentUser = user;
            });

            // Login
            $scope.$on('devise:login', function(e, user) {
                LIBRARY.set_current_user(user);
                vm.currentUser = user;
            });

            // Logout
            $scope.$on('devise:logout', function(e, user) {
                delete vm.currentUser;
                LIBRARY.remove_user();
                $timeout(function() {
                    $state.go('login');
                }, 100);
            });
        }
    }
})();
