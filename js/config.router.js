'use strict';

/**
 * Config for the router
 */
angular.module('grabApp')
    .config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'JS_REQUIRES',
        function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, jsRequires) {
            app.controller = $controllerProvider.register;
            app.directive = $compileProvider.directive;
            app.filter = $filterProvider.register;
            app.factory = $provide.factory;
            app.service = $provide.service;
            app.constant = $provide.constant;
            app.value = $provide.value;

            $ocLazyLoadProvider.config({
                debug: false,
                events: true,
                modules: jsRequires.modules
            });

            $stateProvider
                .state('login', {
                    url: '/login',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>',
                    abstract: true
                })
                .state('login.signin', {
                    url: '/signin',
                    title: 'Sign in',
                    templateUrl: 'assets/views/login_login.html',
                    resolve: loadSequence('signInCtrl')
                })
                .state('login.forgot', {
                    url: '/forgot',
                    title: 'Forgot Password',
                    templateUrl: 'assets/views/login_forgot.html',
                    resolve: loadSequence('forgotPasswordCtrl')
                })
                .state('login.reset', {
                    url: '/reset-password/:reset',
                    title: 'Forgot Password',
                    templateUrl: 'assets/views/login_reset_password.html',
                    resolve: loadSequence('resetPasswordCtrl')
                })
                .state('login.registration', {
                    url: '/registration',
                    title: 'Registration',
                    templateUrl: 'assets/views/login_registration.html',
                    resolve: loadSequence('registrationCtrl')
                })
                .state('login.introduction', {
                    url: '/introduction',
                    title: 'Introduction',
                    templateUrl: 'assets/views/login_introduction.html',
                    resolve: authResolver()
                })
                // Default
                .state('app', {
                    url: '/app',
                    templateUrl: 'assets/views/app.html',
                    abstract: true,
                    resolve: _.assign(authResolver(), loadSequence('modernizr', 'ngAside', 'oitozero.ngSweetAlert'))
                })
                // Grabee
                .state('app.grabee', {
                    url: '/grabee',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>',
                    abstract: true,
                    resolve: permissionResolver('grabee')
                })
                .state('app.grabee.dashboard', {
                    url: '/dashboard',
                    templateUrl: 'assets/views/grabee.html',
                    title: 'Dashboard',
                    ncyBreadcrumb: {
                        label: 'Dashboard'
                    },
                    resolve: permissionResolver('grabee')
                })
                .state('app.grabee.grabber', {
                    url: '/grabber/:id',
                    templateUrl: 'assets/views/grabee_grabber.html',
                    title: 'Grabber',
                    ncyBreadcrumb: {
                        label: 'Grabber'
                    },
                    resolve: loadSequence('grabeeGrabberProfileCtrl')
                })
                .state('app.grabee.grabs', {
                    url: '/grabs',
                    templateUrl: 'assets/views/grabee_grabs.html',
                    title: 'Grabs',
                    ncyBreadcrumb: {
                        label: 'Grabs'
                    },
                    resolve: loadSequence('grabeeGrabsCtrl')
                })
                // Grabber
                .state('app.grabber', {
                    url: '/grabber',
                    template: '<div ui-view class="fade-in-up"></div>',
                    abstract: true,
                    resolve: permissionResolver('grabber')
                })
                .state('app.grabber.dashboard', {
                    url: '/dashboard',
                    templateUrl: 'assets/views/grabber.html',
                    title: 'Grabber Dashboard',
                    ncyBreadcrumb: {
                        label: 'Grabber Dashboard'
                    },
                    resolve: _.assign(permissionResolver('grabber'), loadSequence('chartjs', 'tc.chartjs', 'jquery-sparkline', 'grabData', 'grabberDashboardCtrl'))
                })
                .state('app.grabber.grabs', {
                    url: '/grabs',
                    templateUrl: 'assets/views/grabber_grabs.html',
                    resolve: loadSequence('grabData', 'grabberGrabsCtrl'),
                    title: 'Grabber Grabs',
                    ncyBreadcrumb: {
                        label: 'Grabber Grabs'
                    }
                })
                .state('app.grabber.bids', {
                    url: '/bids',
                    templateUrl: 'assets/views/grabber_bids.html',
                    title: 'Grabber Bids',
                    ncyBreadcrumb: {
                        label: 'Grabber Bids'
                    },
                    resolve: loadSequence('grabberBidsCtrl')
                })
                // Grab
                .state('app.grab', {
                    url: '/grab',
                    templateUrl: 'assets/views/grab_abstract.html',
                    abstract: true,
                    ncyBreadcrumb: {
                        label: 'Grabee Grab'
                    },
                    resolve: loadSequence('grabAbstractCtrl')
                })
                // Create
                .state('app.grab.create_grab', {
                    url: '/create_grab',
                    templateUrl: 'assets/views/grab_create_grab.html',
                    title: 'Request Grab',
                    ncyBreadcrumb: {
                        label: 'Request Grab'
                    },
                    resolve: _.assign(permissionResolver('grabee'), loadSequence('grabData', 'createGrabCtrl'))
                })
                .state('app.grab.create_container', {
                    url: '/create_container',
                    templateUrl: 'assets/views/grab_create_container.html',
                    title: 'Request Container',
                    ncyBreadcrumb: {
                        label: 'Request Container'
                    },
                    resolve: _.assign(permissionResolver('grabee'), loadSequence('grabData', 'createGrabCtrl'))
                })
                .state('app.grab.create_pickup', {
                    url: '/create_pickup',
                    templateUrl: 'assets/views/grab_create_pickup.html',
                    title: 'Request Pickup',
                    ncyBreadcrumb: {
                        label: 'Request Pickup'
                    },
                    resolve: _.assign(permissionResolver('grabee'), loadSequence('grabData', 'createGrabCtrl'))
                })
                // Update
                .state('app.grab.update_grab', {
                    url: '/update_grab/:grabId',
                    templateUrl: 'assets/views/grab_update_grab.html',
                    title: 'Update Grab',
                    ncyBreadcrumb: {
                        label: 'Update Grab'
                    },
                    resolve: _.assign(permissionResolver('grabee'), loadSequence('grabData', 'updateGrabCtrl'))
                })
                .state('app.grab.update_container', {
                    url: '/update_container/:grabId',
                    templateUrl: 'assets/views/grab_update_container.html',
                    title: 'Update Container',
                    ncyBreadcrumb: {
                        label: 'Update Container'
                    },
                    resolve: _.assign(permissionResolver('grabee'), loadSequence('grabData', 'updateGrabCtrl'))
                })
                .state('app.grab.update_pickup', {
                    url: '/update_pickup/:grabId',
                    templateUrl: 'assets/views/grab_update_pickup.html',
                    title: 'Request Pickup',
                    ncyBreadcrumb: {
                        label: 'Update Pickup'
                    },
                    resolve: _.assign(permissionResolver('grabee'), loadSequence('grabData', 'updateGrabCtrl'))
                })
                // Published
                .state('app.grab.published', {
                    url: '/published/:grabId',
                    templateUrl: 'assets/views/grab_published.html',
                    title: 'Grab Published',
                    ncyBreadcrumb: {
                        label: 'Grab Published'
                    },
                    resolve: _.assign(permissionResolver('grabee'), loadSequence('grabData', 'viewGrabCtrl'))
                })
                .state('app.grab.bid', {
                    url: '/:grabId/bid',
                    templateUrl: 'assets/views/grab_bid.html',
                    title: 'Grab Bid',
                    ncyBreadcrumb: {
                        label: 'Grab Bid'
                    },
                    resolve: _.assign(permissionResolver('grabber'), loadSequence('grabData', 'grabBidCtrl'))
                })
                // Scheduled
                .state('app.grab.scheduled', {
                    url: '/scheduled/:grabId',
                    templateUrl: 'assets/views/grab_scheduled.html',
                    title: 'Grab',
                    ncyBreadcrumb: {
                        label: 'Grab'
                    },
                    resolve: loadSequence('grabScheduledCtrl')
                })
                // Completed
                .state('app.grab.completed', {
                    url: '/completed/:grabId',
                    templateUrl: 'assets/views/grab_completed.html',
                    title: 'Grab Completed',
                    ncyBreadcrumb: {
                        label: 'Grab Completed'
                    },
                    resolve: _.assign(permissionResolver('grabee'), loadSequence('grabCompletedCtrl'))
                })
                .state('app.grab.delivered', {
                    url: '/delivered/:grabId',
                    templateUrl: 'assets/views/grab_delivered.html',
                    title: 'Grab Delivered',
                    ncyBreadcrumb: {
                        label: 'Grab Delivered'
                    },
                    resolve: _.assign(permissionResolver('grabber'), loadSequence('grabData', 'grabDeliveredCtrl'))
                })
                // Grabee Settings
                .state('app.settings', {
                    url: '/settings',
                    template: '<div ui-view class="fade-in-up"></div>',
                    abstract: true,
                    title: 'Grabee Settings',
                    ncyBreadcrumb: {
                        label: 'Grabee Settings'
                    },
                    resolve: authResolver()
                })
                .state('app.settings.password', {
                    url: '/password',
                    templateUrl: 'assets/views/settings_password.html',
                    title: 'Settings Update Password',
                    ncyBreadcrumb: {
                        label: 'Settings Update Password'
                    }
                })
                .state('app.settings.profile', {
                    url: '/profile',
                    templateUrl: 'assets/views/settings_profile.html',
                    title: 'Settings Profile',
                    ncyBreadcrumb: {
                        label: 'Settings Profile'
                    },
                    resolve: loadSequence('settingsProfileCtrl')
                })
                .state('app.settings.payments', {
                    url: '/payments',
                    templateUrl: 'assets/views/settings_payments.html',
                    title: 'Settings Payments',
                    ncyBreadcrumb: {
                        label: 'Settings Payments'
                    },
                    resolve: _.assign(permissionResolver('grabee'), loadSequence('grabeeSettingsPaymentsCtrl'))
                })
                .state('app.settings.payment', {
                    url: '/payment',
                    templateUrl: 'assets/views/settings_payments_payment.html',
                    title: 'Settings Payment',
                    ncyBreadcrumb: {
                        label: 'Settings Payment'
                    }
                })
                .state('app.settings.billing', {
                    url: '/billing',
                    templateUrl: 'assets/views/settings_billing.html',
                    title: 'Settings Billing',
                    ncyBreadcrumb: {
                        label: 'Settings Billing'
                    },
                    resolve: loadSequence('settingsBillingCtrl')
                })
                .state('app.settings.alerts', {
                    url: '/alerts',
                    templateUrl: 'assets/views/settings_alerts.html',
                    title: 'Settings Alerts',
                    ncyBreadcrumb: {
                        label: 'Settings Alerts'
                    },
                    resolve: loadSequence('settingsAlertsCtrl')
                })
                .state('app.settings.grabber_profile', {
                    url: '/grabber-profile',
                    templateUrl: 'assets/views/settings_grabber_profile.html',
                    title: 'Settings Grabber Profile',
                    ncyBreadcrumb: {
                        label: 'Settings Grabber Profile'
                    },
                    resolve: _.assign(permissionResolver('grabber'), loadSequence('grabData', 'grabberSettingsProfileCtrl'))
                })
                .state('app.settings.grabber_payment', {
                    url: '/grabberpayment',
                    templateUrl: 'assets/views/settings_grabber_payment.html',
                    title: 'Settings Grabber Payment',
                    ncyBreadcrumb: {
                        label: 'Settings Grabber Payment'
                    }
                })
                // Calendar routes
                .state('app.calendar', {
                    url: '/calendar',
                    templateUrl: 'assets/views/calendar.html',
                    title: 'Calendar',
                    ncyBreadcrumb: {
                        label: 'Calendar'
                    },
                    resolve: loadSequence('calendarCtrl')
                })
                // Error
                .state('error', {
                    url: '/error',
                    template: '<div ui-view class="fade-in-up"></div>'
                })
                .state('error.404', {
                    url: '/404',
                    templateUrl: 'assets/views/utility_404.html'
                })
                .state('error.500', {
                    url: '/500',
                    templateUrl: 'assets/views/utility_500.html'
                });

            $urlRouterProvider.otherwise('/login/signin');

            function authResolver() {
                return {
                    auth: ['$auth', function ($auth) {
                        return $auth.validateUser();
                    }]
                }
            }

            function permissionResolver(role) {
                return {
                    permission: ['$q', 'auth', function ($q, auth) {
                        var deferred = $q.defer();
                        (role === auth.user.role) ? deferred.resolve() : deferred.reject({reason: 'no permission'});
                        return deferred.promise;
                    }]
                }
            }

            // Generates a resolve object previously configured in constant.JS_REQUIRES (config.constant.js)
            function loadSequence() {
                var _args = arguments;
                return {
                    deps: ['$ocLazyLoad', '$q',
                        function ($ocLL, $q) {
                            var promise = $q.when(1);
                            for (var i = 0, len = _args.length; i < len; i++) {
                                promise = promiseThen(_args[i]);
                            }
                            return promise;

                            function promiseThen(_arg) {
                                if (typeof _arg == 'function')
                                    return promise.then(_arg);
                                else
                                    return promise.then(function () {
                                        var nowLoad = requiredData(_arg);
                                        if (!nowLoad)
                                            return $.error('Route resolve: Bad resource name [' + _arg + ']');
                                        return $ocLL.load(nowLoad);
                                    });
                            }

                            function requiredData(name) {
                                if (jsRequires.modules)
                                    for (var m in jsRequires.modules)
                                        if (jsRequires.modules[m].name && jsRequires.modules[m].name === name)
                                            return jsRequires.modules[m];
                                return jsRequires.scripts && jsRequires.scripts[name];
                            }
                        }]
                };
            }
        }]);

angular.module('grabApp')
    .run(['$rootScope', '$state', 'Facebook', 'cfpLoadingBar',
        function ($rootScope, $state, Facebook, cfpLoadingBar) {
            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                switch (error.reason) {
                    case 'unauthorized':
                        $state.go('login.signin');
                        break;
                    case 'no permission':
                        switch ($rootScope.user.user.role) {
                            case 'grabee':
                                $state.go('app.grabee.dashboard');
                                break;
                            case 'grabber':
                                $state.go('app.grabber.dashboard');
                                break;
                        }
                        break;
                }

                cfpLoadingBar.complete();
            });

            $rootScope.$on('auth:login-success', function (ev, user) {
                switch (user.user.role) {
                    case 'grabee':
                        $state.go('app.grabee.dashboard');
                        break;
                    case 'grabber':
                        $state.go('app.grabber.dashboard');
                        break;
                }
            });

            $rootScope.$on('auth:logout-success', function () {
                Facebook.getLoginStatus(function (response) {
                    if (response.status == 'connected') {
                        Facebook.logout();
                    }
                });

                $state.go('login.signin');
            });
        }]);
