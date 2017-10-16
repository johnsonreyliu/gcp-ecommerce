angular.module('gcpECommerceApp', [])

  .controller('GCPECommerceAppController', function ($scope, $http) {

    var gcpController = this;

    // $(document).ready(function () {
    //   console.log('typeahead ready');
    //   $('input.typeahead').typeahead({
    //     name: 'typeahead',
    //     // remote: '/search?key=%QUERY',
    //     source: function (query, syncResults, asyncResults) {
    //       $.post('/search?q=' + query, function (data) {
    //         asyncResults(data);
    //       });
    //     },
    //     limit: 10
    //   });
    // });

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
  })