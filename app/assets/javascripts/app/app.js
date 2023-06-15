(function() {
    'use strict';

    angular.module('trelloApp', [
            'Devise',
            'ui.bootstrap',
            'ui.router',
            'templates',
            'ngCookies',
            'ngAnimate',
            'ngMaterial',
            'ui.sortable'
        ])
        .config(configOptions)
        .factory('errorsRequestInterceptor', function($q) {
            return {
                'responseError': function(rejection) {
                    if (rejection.data && rejection.data.error) {
                        toastr.error(rejection.data.error);

                    } else if (rejection.data.errors) {
                        angular.forEach(rejection.data.errors, function(error, key) {
                            if (error.length) toastr.error(error[0], key);
                        });
                    }

                    return $q.reject(rejection);
                }
            };
        });

    // CONFIG
    configOptions.$inject = ['$stateProvider', '$httpProvider', '$mdThemingProvider', '$urlRouterProvider', '$locationProvider'];

    function configOptions($stateProvider, $httpProvider, $mdThemingProvider, $urlRouterProvider, $locationProvider) {
        $httpProvider.interceptors.push('errorsRequestInterceptor');

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/views/boards-list.html',
                controller: 'BoardsListController',
                onEnter: ['$state', 'Auth', function($state, Auth) {
                    Auth.currentUser().then(function(user) {}, function(error) {
                        $state.go('login');
                    });
                }]
            })
            .state('board', {
                url: '/boards/:id',
                templateUrl: 'app/views/board-show.html',
                controller: 'BoardShowController',
                onEnter: ['$state', 'Auth', function($state, Auth) {
                    Auth.currentUser().then(function(user) {}, function(error) {
                        $state.go('login');
                    });
                }],
                resolve: {
                    board: ['BoardService', '$stateParams', function(BoardService, $stateParams) {
                        return BoardService.get($stateParams.id);
                    }],
                    lists: function() {
                        return [];
                    },
                }
            })
            .state('register', {
                url: '/register',
                templateUrl: 'app/views/register.html',
                controller: 'AuthenticateController',
                onEnter: ['$state', 'Auth', function($state, Auth) {
                    Auth.currentUser().then(function(user) {
                        $state.go('home');
                    }, function(error) {});
                }]
            })
            .state('login', {
                url: '/login',
                templateUrl: 'app/views/login.html',
                controller: 'AuthenticateController',
                onEnter: ['$state', 'Auth', function($state, Auth) {
                    Auth.currentUser().then(function(user) {
                        $state.go('home');
                    }, function(error) {});
                }]
            });

        $urlRouterProvider.otherwise('/');

        // Primary Theme
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('red');

    };
})();
