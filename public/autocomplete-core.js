var app = angular.module('gcpECommerceApp', ['ngMaterial', 'ngAnimate', 'ngAria'])

app.controller('GCPECommerceAppController', function ($scope, $http) {

    var gcpController = this;
    // gcpController.DBSearchResult = "DB Autocomplete results here";
    // gcpController.DBSearchResult = [{"name": "Duracell"}, {"name": "Duracell3"}]


    gcpController.doAutoCompleteFromDB = function () {

      var buttonText = document.getElementById("autocomplete-db").value;

      $http.post("/search", { "query": buttonText }, { headers: { 'Content-Type': 'application/json' } })
        .then(function (response) {
          console.log(response.data);
          gcpController.DBSearchResult = response.data;
          // return response;
        });

      console.log('clicked ' + buttonText);
      // console.log(jsonObject);
    },

    gcpController.passSearch = function () {

      var buttonText = document.getElementById("autocomplete-tags").value;

      $http.post("/autocomplete", { "search": buttonText }, { headers: { 'Content-Type': 'application/json' } })
        .then(function (response) {
          console.log(response.data);
          gcpController.searchResult = response.data;
          // return response;
        });

      console.log('clicked ' + buttonText);
      // console.log(jsonObject);
    }
  });

  // app.config(function ($routeProvider, $locationProvider) {
  //   $routeProvider
  //     .when("/", {
  //       templateUrl: "index.html",
  //       controller: 'GCPECommerceAppController'
  //     })
  //     .otherwise({
  //       redirectTo: '/'
  //     });
  // });