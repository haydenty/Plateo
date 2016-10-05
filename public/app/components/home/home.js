plateoApp.controller('mainController', ['$scope', '$location', 'UserAuthFactory', function($scope, $location, UserAuthFactory) {
    var vm = $scope;
    vm.isActive = function (route) {
            return route === $location.path();
        };

    vm.logout = function () {
        UserAuthFactory.logout();
    };
}]);
