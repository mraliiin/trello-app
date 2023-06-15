(function() {
    'use strict';

    angular.module('trelloApp')
        .factory('LIBRARY', library);

    library.$inject = ['$cookies'];

    function library($cookies) {

        function get_current_user() {
            var userString = $cookies.get("currentUser");
            return (userString) ? JSON.parse(userString) : null;
        }

        function set_current_user(user) {
            if (user) {
                $cookies.put("currentUser", JSON.stringify(user));
            } else {
                this.remove_user('currentUser');
            }
        }

        function remove_user() {
            $cookies.remove('currentUser');
        }

        return {
            set_current_user: set_current_user,
            get_current_user: get_current_user,
            remove_user: remove_user,
        };
    }
})();
