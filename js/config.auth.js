'use strict';

angular.module('grabApp')
    .config(function ($authProvider, $windowProvider) {
        var $window = $windowProvider.$get();

        $authProvider.configure({
            apiUrl: '/api/v1',
            emailRegistrationPath: '/client',
            emailSignInPath: '/user/login',
            signOutUrl: '/user/logout',
            tokenValidationPath: '/user/validate-token',
            passwordResetPath: '/user/recovery',
            confirmationSuccessUrl: $window.location.origin + '#/login/signin',
            storage: {
                persistData: function (key, val) {
                    switch ($window.localStorage.getItem('tokenStorage')) {
                        case 'sessionStorage':
                            return $window.sessionStorage.setItem(key, JSON.stringify(val));
                        default:
                            return $window.localStorage.setItem(key, JSON.stringify(val));
                    }
                },
                retrieveData: function (key) {
                    switch ($window.localStorage.getItem('tokenStorage')) {
                        case 'sessionStorage':
                            return JSON.parse($window.sessionStorage.getItem(key));
                        default:
                            return JSON.parse($window.localStorage.getItem(key));
                    }
                },
                deleteData: function (key) {
                    switch ($window.localStorage.getItem('tokenStorage')) {
                        case 'sessionStorage':
                            return $window.sessionStorage.removeItem(key);
                        default:
                            return $window.localStorage.removeItem(key);
                    }
                }
            },
            tokenFormat: {
                "access-token": "{{ token }}"
            }
        });
    });

