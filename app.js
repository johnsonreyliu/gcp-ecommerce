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
var mysql = require('mysql');
var Autocomplete = require('autocomplete');
const Knex = require('knex');
const crypto = require('crypto');

var Chance = require('chance');
// Instantiate Chance so it can be used
var chance = new Chance();


//connect to db
const knex = connect();
generateInsert();


// app.use(express.static('public'));
app.use(bodyParser.json());

//allows cors
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/autocomplete-jquery.html');
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

//// connect to mysql on google cloud

app.enable('trust proxy');

function connect() {
  //use local
  if (process.env.SQL_USER == null) {
    console.log('using local settings for db');
    const config = {
      host: '35.196.35.232',
      user: 'root',
      password: '',
      database: 'products'
    };

    // Connect to the database
    const knex = Knex({
      client: 'mysql',
      connection: config
    });

    console.log('connecting to knex');
    // console.log(knex);
    // return knex;
    return knex.select('*')
      .from('products')
      .then((results) => {
        console.log(results);
      });


  }
  else {
    console.log('using google sql credentials');
    const config = {
      user: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD,
      database: process.env.SQL_DATABASE
    };
    if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
      config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
    }

    // Connect to the database
    const knex = Knex({
      client: 'mysql',
      connection: config
    });

    console.log('connecting to knex');
    // console.log(knex);
    // return knex;
    return knex.select('*')
      .from('products')
      .then((results) => {
        console.log(results);
      });
  }

}

/////////////

var itemsFromBestBuy = require("./public/products.json");
var itemsArray = [];

for (var i = 0; i < itemsFromBestBuy.length; i++) {
  if (itemsFromBestBuy[i].name != null) {
    itemsArray.push(itemsFromBestBuy[i].name);
  }
}
// console.log(itemsArray);
console.log(itemsArray.length);

setTimeout(function () {
  var autocomplete = Autocomplete.connectAutocomplete();

  // Initialize the autocomplete object and define a 
  // callback to populate it with data
  autocomplete.initialize(function (onReady) {
    onReady(itemsArray);
  });

}, 2000);

app.post('/search', function (req, res) {
  console.log('calling /search');
  console.log(req.body.query);
  // console.log(req.query.key);

  console.log('using google sql credentials in search');
  const config = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE
  };
  if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
    config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
  }

  // Connect to the database
  const knex = Knex({
    client: 'mysql',
    connection: config
  });

  // select * from `users` where `columnName` like '%rowlikeme%'
  return knex('productAutoComplete')
  .where('productName', 'like', '%' + req.body.query + '%')
  .select('productName')
  .then((results) => {
    console.log(results);
    res.send(JSON.stringify(results));
  });

  // return knex.select('productName')
  //   .from('productAutoComplete')
  //   // .where('productName like "%' + req.body.query + '%"')
  //   .where("productName like '%App%'")
  //   .then((results) => {
  //     console.log(results);
  //     res.send(JSON.stringify(results));
  //   });


  // connection.query('SELECT productName from productAutoComplete where productName like "%' + req.query.key + '%"',
  //   function (err, rows, fields) {
  //     if (err) throw err;
  //     var data = [];
  //     for (i = 0; i < rows.length; i++) {
  //       data.push(rows[i].productName);
  //     }
  //     res.end(JSON.stringify(data));
  //   });
});

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


function generateInsert(){

  console.log('running generate insert for mysql script');
  const config = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE
  };
  if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
    config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
  }

  // Connect to the database
  const knex = Knex({
    client: 'mysql',
    connection: config
  });

  var index = 3;

  // var a = "INSERT INTO productAutoComplete (productID, productName) VALUES (3 ,'Academy')(4 ,'Collison')(5 ,'Banana')(6 ,'Banana')(7 ,'Banana')(8 ,'Banana');"

  // Use Chance here.
  var my_random_string = chance.first();

  // Returns [1] in "mysql", "sqlite", "oracle"; [] in "postgresql" unless the 'returning' parameter is set.
  // Outputs:
  // insert into `books` (`title`) values ('Slaughterhouse Five')
  knex('productAutoComplete').insert({productID: index}, {productName: my_random_string});
}


// [END app]
