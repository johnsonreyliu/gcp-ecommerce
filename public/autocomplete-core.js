angular.module('gcpECommerceApp', [])

.controller('GCPECommerceAppController', function($scope, $http) {

  var gcpController = this;

  // $(document).ready(function(){
  //   $('input.typeahead').typeahead({
  //   name: 'typeahead',
  //   remote: 'http://localhost:3000/search?key=%QUERY',
  //   limit: 10
  //   });
  //   });

gcpController.passSearch = function(){

  var buttonText = document.getElementById("autocomplete-tags").value;
  
  $http.post("/autocomplete", {"search": buttonText}, {headers: {'Content-Type': 'application/json'} })
  .then(function (response) {
      console.log(response.data);
      gcpController.searchResult = response.data;
      // return response;
  });

  console.log('clicked ' + buttonText);
  // console.log(jsonObject);
}
})