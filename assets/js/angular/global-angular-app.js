'use strict';

angular.module('frwkAngularModule', [
        'ngRoute',
        'frwkAngularModule.controllers'
    ])
    .config(['$locationProvider', '$routeProvider',
        function($locationProvider, $routeProvider) {
            //Obtener el menu que se mostrara al usuario
            var objCurrentApp = $Global.fn.getApp();
            var listMenuOptions = _frwkGetConfigFile("menuOptions");
            
            //Agregar todas las rutas de angular disponibles
            for (var i = 0; i < listMenuOptions.length; i++) {
                var objMenu = listMenuOptions[i];
                if(objMenu.type == "menu-page"){
                    $routeProvider.when('/' + objCurrentApp.key + objMenu.path, {
                        templateUrl: objMenu.linkedPage
                    });

                    console.log('Adding "#/' + objCurrentApp.key + objMenu.path + " => " + objMenu.linkedPage);
                }
            }
            
            $routeProvider.when('/admin/menu-option', {
                templateUrl:'modules/menu-option/menu-option.html'
            });
            
            //Agregar default route
            $routeProvider.when('/', {
                redirectTo: '/' + objCurrentApp.key
            });
            
            //Si no encuentra nada
            $routeProvider.otherwise({
                redirectTo: 'pages/page-404'
            });
            
        }
    ]);

var app = angular.module('frwkAngularModule.controllers', []);
app.run(function($templateCache, $rootScope) {
    $rootScope.$Global = $Global;
    
    //Add template cache of menus
    var menuOptions = _frwkGetConfigFile("menuOptions");
    menuOptions.forEach(objMenu => {
        if(objMenu.type == "menu-html" || objMenu.type == "only-html"){
            var idTemplate = "template-menu-options-" + objMenu.id + ".html";
            var htmlTemplate = "";
            
            if (objMenu.css){
                htmlTemplate += '<style rel="stylesheet" type="text/css">\n' + objMenu.css + '\n</style>\n';
            }
            
            if(objMenu.html){
                htmlTemplate += objMenu.html;
            }
            
            if (objMenu.js){
                htmlTemplate += '\n<script type="text/javascript">\n' + objMenu.js + '\n</script>';
            }
            
            console.log("Template " + idTemplate + " Loaded!");
            $templateCache.put(idTemplate, htmlTemplate);    
        }

    });
    
});

app.controller('MainCtrl', function($location, $scope, $rootScope, $timeout) {

    console.log($Global);

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

        
        setTimeout(function() {
            // NProgress End
            NProgress.done();
        }, 500);
        
        $('body').removeClass('cui-page-loading-state');
    });

});

// app.directive('script', function() {
//     return {
//         restrict: 'E',
//         scope: false,
//         link: function(scope, elem, attr) {
//             if (attr.type === 'text/javascript-lazy') {
//                 var code = elem.text();
//                 var f = new Function(code);
//                 f();
//             }
//         }
//     };
// });

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