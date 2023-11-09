// Criação do módulo App (Angular)
// ngRoute é uma dependência que permite a implementação da funcionalidade roteamento
// Também facilita a configuração e o gerenciamento das rotas do aplicativo
let app = angular.module("App", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "pages/perfil.html"
        })
        .when("/controle", {
            templateUrl: "pages/controle.html"
        })
        .when("/informacoes", {
            templateUrl: "pages/informacoes.html"
        })
        
        

        .otherwise({redirectTo: "/"})
})
