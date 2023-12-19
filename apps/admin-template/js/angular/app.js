'use strict';

angular.module('cleanUI', [
        'ngRoute',
        'cleanUI.controllers'
    ])
    .config(['$locationProvider', '$routeProvider',
        function($locationProvider, $routeProvider) {

            /////////////////////////////////////////////////////////////
            // SYSTEM
            $routeProvider.when('/', {
                redirectTo: '/dashboards/alpha'
            });
            $routeProvider.otherwise({
                redirectTo: 'pages/page-404'
            });

            /////////////////////////////////////////////////////////////
            // Documentation
            $routeProvider.when('/documentation/index', {
                templateUrl: 'html/documentation/index.html'
            });

            /////////////////////////////////////////////////////////////
            // Dashboards
            $routeProvider.when('/dashboards/alpha', {
                templateUrl: 'html/dashboards/alpha.html'
            });

            $routeProvider.when('/dashboards/beta', {
                templateUrl: 'html/dashboards/beta.html'
            });

            /////////////////////////////////////////////////////////////
            // Apps
            $routeProvider.when('/apps/profile', {
                templateUrl: 'html/apps/profile.html'
            });

            $routeProvider.when('/apps/messaging', {
                templateUrl: 'html/apps/messaging.html'
            });

            $routeProvider.when('/apps/mail', {
                templateUrl: 'html/apps/mail.html'
            });

            $routeProvider.when('/apps/calendar', {
                templateUrl: 'html/apps/calendar.html'
            });

            $routeProvider.when('/apps/gallery', {
                templateUrl: 'html/apps/gallery.html'
            });

            /////////////////////////////////////////////////////////////
            // Ecommerce
            $routeProvider.when('/ecommerce/cart-checkout', {
                templateUrl: 'html/ecommerce/cart-checkout.html'
            });

            $routeProvider.when('/ecommerce/dashboard', {
                templateUrl: 'html/ecommerce/dashboard.html'
            });

            $routeProvider.when('/ecommerce/orders', {
                templateUrl: 'html/ecommerce/orders.html'
            });

            $routeProvider.when('/ecommerce/product-details', {
                templateUrl: 'html/ecommerce/product-details.html'
            });

            $routeProvider.when('/ecommerce/product-edit', {
                templateUrl: 'html/ecommerce/product-edit.html'
            });

            $routeProvider.when('/ecommerce/products-list', {
                templateUrl: 'html/ecommerce/products-list.html'
            });

            $routeProvider.when('/ecommerce/products-catalog', {
                templateUrl: 'html/ecommerce/products-catalog.html'
            });

            /////////////////////////////////////////////////////////////
            // Layout
            $routeProvider.when('/layout/grid', {
                templateUrl: 'html/layout/grid.html'
            });

            $routeProvider.when('/layout/panels', {
                templateUrl: 'html/layout/panels.html'
            });

            $routeProvider.when('/layout/sidebars', {
                templateUrl: 'html/layout/sidebars.html'
            });

            $routeProvider.when('/layout/utilities', {
                templateUrl: 'html/layout/utilities.html'
            });

            $routeProvider.when('/layout/typography', {
                templateUrl: 'html/layout/typography.html'
            });

            /////////////////////////////////////////////////////////////
            // Icons
            $routeProvider.when('/icons/fontawesome', {
                templateUrl: 'html/icons/fontawesome.html'
            });

            $routeProvider.when('/icons/icomoon-ultimate', {
                templateUrl: 'html/icons/icomoon-ultimate.html'
            });

            /////////////////////////////////////////////////////////////
            // Forms
            $routeProvider.when('/forms/autocomplete', {
                templateUrl: 'html/forms/autocomplete.html'
            });

            $routeProvider.when('/forms/basic-form-elements', {
                templateUrl: 'html/forms/basic-form-elements.html'
            });

            $routeProvider.when('/forms/buttons', {
                templateUrl: 'html/forms/buttons.html'
            });

            $routeProvider.when('/forms/checkboxes-radio', {
                templateUrl: 'html/forms/checkboxes-radio.html'
            });

            $routeProvider.when('/forms/dropdowns', {
                templateUrl: 'html/forms/dropdowns.html'
            });

            $routeProvider.when('/forms/extras', {
                templateUrl: 'html/forms/extras.html'
            });

            $routeProvider.when('/forms/form-wizard', {
                templateUrl: 'html/forms/form-wizard.html'
            });

            $routeProvider.when('/forms/form-validation', {
                templateUrl: 'html/forms/form-validation.html'
            });

            $routeProvider.when('/forms/input-mask', {
                templateUrl: 'html/forms/input-mask.html'
            });

            $routeProvider.when('/forms/file-uploads', {
                templateUrl: 'html/forms/file-uploads.html'
            });

            $routeProvider.when('/forms/selectboxes', {
                templateUrl: 'html/forms/selectboxes.html'
            });


            /////////////////////////////////////////////////////////////
            // Components
            $routeProvider.when('/components/badges-labels', {
                templateUrl: 'html/components/badges-labels.html'
            });

            $routeProvider.when('/components/calendar', {
                templateUrl: 'html/components/calendar.html'
            });

            $routeProvider.when('/components/carousel', {
                templateUrl: 'html/components/carousel.html'
            });

            $routeProvider.when('/components/collapse', {
                templateUrl: 'html/components/collapse.html'
            });

            $routeProvider.when('/components/date-picker', {
                templateUrl: 'html/components/date-picker.html'
            });

            $routeProvider.when('/components/media-players', {
                templateUrl: 'html/components/media-players.html'
            });

            $routeProvider.when('/components/modal', {
                templateUrl: 'html/components/modal.html'
            });

            $routeProvider.when('/components/nestable', {
                templateUrl: 'html/components/nestable.html'
            });

            $routeProvider.when('/components/notifications-alerts', {
                templateUrl: 'html/components/notifications-alerts.html'
            });

            $routeProvider.when('/components/pagination', {
                templateUrl: 'html/components/pagination.html'
            });

            $routeProvider.when('/components/loading-progress', {
                templateUrl: 'html/components/loading-progress.html'
            });

            $routeProvider.when('/components/progress-bars', {
                templateUrl: 'html/components/progress-bars.html'
            });

            $routeProvider.when('/components/slider', {
                templateUrl: 'html/components/slider.html'
            });

            $routeProvider.when('/components/steps', {
                templateUrl: 'html/components/steps.html'
            });

            $routeProvider.when('/components/breadcrumbs', {
                templateUrl: 'html/components/breadcrumbs.html'
            });

            $routeProvider.when('/components/tabs', {
                templateUrl: 'html/components/tabs.html'
            });

            $routeProvider.when('/components/text-editor', {
                templateUrl: 'html/components/text-editor.html'
            });

            $routeProvider.when('/components/mail-templates', {
                templateUrl: 'html/components/mail-templates.html'
            });

            $routeProvider.when('/components/tooltips-popovers', {
                templateUrl: 'html/components/tooltips-popovers.html'
            });

            /////////////////////////////////////////////////////////////
            // Tables
            $routeProvider.when('/tables/basic-tables', {
                templateUrl: 'html/tables/basic-tables.html'
            });

            $routeProvider.when('/tables/datatables', {
                templateUrl: 'html/tables/datatables.html'
            });

            $routeProvider.when('/tables/editable-tables', {
                templateUrl: 'html/tables/editable-tables.html'
            });

            /////////////////////////////////////////////////////////////
            // Charts
            $routeProvider.when('/charts/c3', {
                templateUrl: 'html/charts/c3.html'
            });

            $routeProvider.when('/charts/chartjs', {
                templateUrl: 'html/charts/chartjs.html'
            });

            $routeProvider.when('/charts/d3', {
                templateUrl: 'html/charts/d3.html'
            });

            $routeProvider.when('/charts/chartistjs', {
                templateUrl: 'html/charts/chartistjs.html'
            });

            $routeProvider.when('/charts/peity', {
                templateUrl: 'html/charts/peity.html'
            });


            /////////////////////////////////////////////////////////////
            // Pages
            $routeProvider.when('/pages/invoice', {
                templateUrl: 'html/pages/invoice.html'
            });

            $routeProvider.when('/pages/lockscreen', {
                templateUrl: 'html/pages/lockscreen.html',
                controller: 'lockscreenPageCtrl'
            });

            $routeProvider.when('/pages/login-alpha', {
                templateUrl: 'html/pages/login-alpha.html',
                controller: 'loginPageCtrl'
            });

            $routeProvider.when('/pages/login-beta', {
                templateUrl: 'html/pages/login-beta.html',
                controller: 'loginPageCtrl'
            });

            $routeProvider.when('/pages/login-omega', {
                templateUrl: 'html/pages/login-omega.html',
                controller: 'loginPageCtrl'
            });

            $routeProvider.when('/pages/page-404', {
                templateUrl: 'html/pages/page-404.html'
            });

            $routeProvider.when('/pages/page-500', {
                templateUrl: 'html/pages/page-500.html'
            });

            $routeProvider.when('/pages/pricing-tables', {
                templateUrl: 'html/pages/pricing-tables.html'
            });

            $routeProvider.when('/pages/register', {
                templateUrl: 'html/pages/register.html',
                controller: 'registerPageCtrl'
            });

        }
    ]);

var app = angular.module('cleanUI.controllers', []);

app.controller('MainCtrl', function($location, $scope, $rootScope, $timeout) {

    NProgress.configure({
        minimum: 0.2,
        trickleRate: 0.1,
        trickleSpeed: 200
    });

    $scope.$on('$routeChangeStart', function() {

        // NProgress Start
        $('body').addClass('cui-page-loading-state');
        NProgress.start();

    });

    $scope.$on('$routeChangeSuccess', function() {

        // Set to default (show) state left and top menu, remove single page classes
        $('body').removeClass('single-page single-page-inverse');
        $rootScope.hideLeftMenu = false;
        $rootScope.hideTopMenu = false;
        $rootScope.showFooter = true;

        // Firefox issue: scroll top when page load
        $('html, body').scrollTop(0);

        // Set active state menu after success change route
        $('.left-menu-list-active').removeClass('left-menu-list-active');
        $('nav.left-menu .left-menu-list-root .left-menu-link').each(function() {
            if ($(this).attr('href') == '#' + $location.path()) {
                $(this).closest('.left-menu-list-root > li').addClass('left-menu-list-active');
            }
        });

        // NProgress End
        //setTimeout(function() {
        NProgress.done();
        //}, 1000);
        $('body').removeClass('cui-page-loading-state');
    });

});

app.directive('leftMenu', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.on('click', '.left-menu-link', function() {

                if (!$(this).closest('.left-menu-list-submenu').length) {
                    $('.left-menu-list-opened > a + ul').slideUp(200, function() {
                        $('.left-menu-list-opened').removeClass('left-menu-list-opened');
                    });
                }

            });
        }
    };
});

app.factory('$exceptionHandler', ['$log', function($log) {
    return function myExceptionHandler(exception, cause) {
      //logErrorsToBackend(exception, cause);
      _logAngularError(exception, cause);
      $log.warn(exception, cause);
    };
}]);