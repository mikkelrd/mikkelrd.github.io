var ng = angular.module('mainApp').controller('mainCtrl', function($scope, mainServ){
  $scope.test = function () {
    mainServ.getRecent();
  };
});