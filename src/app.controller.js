angular.module('myApp').controller('MainController', function ($scope) {
  $scope.currentNavItem = 'student';
  $scope.resetPage = function () {
    $scope.currentNavItem = 'student';
  };
});
