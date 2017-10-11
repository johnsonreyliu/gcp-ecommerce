/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// [START app]
const express = require('express');
const app = express();
var path = require('path');
var autocomplete = require('autocompleter');
var bodyParser = require('body-parser');


// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname + '/public/autocomplete-jquery.html'));
// });

app.use(express.static('public'));

app.use(bodyParser.json());

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

/////////////
var Autocomplete = require('autocomplete');

// var VEGETABLES = ['arugula', 'beet', 'broccoli', 'cauliflower', 'corn', 'cabbage', 'carrot'];
var itemsFromBestBuy = require("./public/products.json");
var itemsArray = [];

for (var i = 0; i < itemsFromBestBuy.length; i++) {
  if (itemsFromBestBuy[i].name != null) {
    itemsArray.push(itemsFromBestBuy[i].name);
  }
}
console.log(itemsArray);
console.log(itemsArray.length);

setTimeout(function () {
  var autocomplete = Autocomplete.connectAutocomplete();

  // Initialize the autocomplete object and define a 
  // callback to populate it with data
  autocomplete.initialize(function (onReady) {
    onReady(itemsArray);
  });


}, 2000);

// POST method route
app.post('/autocomplete', function (req, res) {
  var autocomplete = Autocomplete.connectAutocomplete();
  
    // Initialize the autocomplete object and define a 
    // callback to populate it with data
    autocomplete.initialize(function (onReady) {
      onReady(itemsArray);
    });

  console.log('sent a request');
  console.log(req.body.search);

  var matches = autocomplete.search(req.body.search);
  console.log(matches);

  res.send(matches);
});


// [END app]
