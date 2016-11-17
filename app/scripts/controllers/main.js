'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('MainCtrl', function($scope,$position, DTOptionsBuilder, $http) {

    $scope.dtOptions = DTOptionsBuilder.newOptions()
    .withPaginationType('full_numbers')
    .withDisplayLength(10)

    $scope.humedad = [];

    // Humedad
    $http({
      method: 'GET',
      url: 'http://prototype.cparra.me/api/humidities.json'
    }).then(function successCallback(response) {
      console.log(response.data);
      $scope.humedad = response.data;
      console.log(JSON.stringify($scope.humedad))
      // this callback will be called asynchronously
      // when the response is available
    }, function errorCallback(response) {
      console.log(response);
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

    // Regado
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

  });
