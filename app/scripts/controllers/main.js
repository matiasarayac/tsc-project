'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('MainCtrl', function($scope, $position, DTOptionsBuilder, $http, $timeout) {

    $scope.dtOptions = DTOptionsBuilder.newOptions()
      .withPaginationType('full_numbers')
      .withDisplayLength(10)
      .withOption('order', [1, 'desc'])

    $scope.automatic = true;

    // Humedad
    function getHumedad() {
      $http({
        method: 'GET',
        url: 'http://prototype.cparra.me/api/humidities.json'
      }).then(function successCallback(response) {
        console.log(response.data);
        $scope.humedad = response.data;
          // this callback will be called asynchronously
          // when the response is available
      }, function errorCallback(response) {
        console.log(response);
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    }

    // Regado
    function getRegado() {
      $http({
        method: 'GET',
        url: 'http://prototype.cparra.me/api/irrigations.json'
      }).then(function successCallback(response) {
        console.log(response.data);
        $scope.regado = response.data;
        // this callback will be called asynchronously
        // when the response is available
      }, function errorCallback(response) {
        console.log(response);
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    }

    // Function to replicate setInterval using $timeout service.
    function intervalFunction() {
      $timeout(function() {
        if($scope.automatic){
          getHumedad();
          getRegado();
        }
        intervalFunction();
      }, 10000) //10s
    };

    $scope.changeAutomatic = function(){
      if($scope.automatic){
        $scope.automatic = false;
      } else {
        $scope.automatic = true;
      }
    }

    getHumedad();
    getRegado();
    intervalFunction();

  });
