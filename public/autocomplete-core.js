angular.module('gcpECommerceApp', [])

.controller('GCPECommerceAppController', function($scope, $http) {

  var gcpController = this;

gcpController.passSearch = function(){

  var buttonText = document.getElementById("autocomplete-tags").value;
  
  $http.post("/autocomplete", {"search": buttonText}, {headers: {'Content-Type': 'application/json'} })
  .then(function (response) {
      console.log(response.data);
      return response;
  });


  // xhttp.open("POST", "/autocomplete", true);
  // // xhttp.setRequestHeader("Content-type", "application/json");
  // xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  // var jsonObject = {"search": buttonText};

  // xhttp.send(JSON.stringify(jsonObject));

  console.log('clicked ' + buttonText);
  // console.log(jsonObject);
}
})