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

const Knex = require('knex');
const crypto = require('crypto');


// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname + '/public/autocomplete-jquery.html'));
// });

// app.use(express.static('public'));
app.use(bodyParser.json());

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

/////////////
// var connection = mysql.createConnection({
//   host: '35.196.35.232',
//   // host: 'gcp-johnson-interview:us-east1:gcp-autocomplete-mysql',
//   user: 'root',
//   password: '',
//   database: 'mysql'
// });
// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");

//   // var sql = "CREATE TABLE product (name VARCHAR(255))";

//   // con.query(sql, function (err, result) {
//   //   if (err) throw err;
//   //   console.log("Result: " + result);
//   // });
// });



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

app.get('/search', function (req, res) {
  connection.query('SELECT first_name from TABLE_NAME where first_name like "%' + req.query.key + '%"',
    function (err, rows, fields) {
      if (err) throw err;
      var data = [];
      for (i = 0; i < rows.length; i++) {
        data.push(rows[i].first_name);
      }
      res.end(JSON.stringify(data));
    });
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


//// connect to mysql on google cloud

app.enable('trust proxy');

const knex = connect();

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
      user: process.env.SQL_USER || "root",
      password: process.env.SQL_PASSWORD || "",
      database: process.env.SQL_DATABASE || "products"
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

/**
 * Insert a visit record into the database.
 *
 * @param {object} knex The Knex connection object.
 * @param {object} visit The visit record to insert.
 * @returns {Promise}
 */
function insertVisit(knex, visit) {
  return knex('visits').insert(visit);
}

/**
 * Retrieve the latest 10 visit records from the database.
 *
 * @param {object} knex The Knex connection object.
 * @returns {Promise}
 */
function getVisits(knex) {
  return knex.select('timestamp', 'userIp')
    .from('visits')
    .orderBy('timestamp', 'desc')
    .limit(10)
    .then((results) => {
      return results.map((visit) => `Time: ${visit.timestamp}, AddrHash: ${visit.userIp}`);
    });
}

app.get('/visit', (req, res, next) => {
  // Create a visit record to be stored in the database
  const visit = {
    timestamp: new Date(),
    // Store a hash of the visitor's ip address
    userIp: crypto.createHash('sha256').update(req.ip).digest('hex').substr(0, 7)
  };

  insertVisit(knex, visit)
    // Query the last 10 visits from the database.
    .then(() => getVisits(knex))
    .then((visits) => {
      res
        .status(200)
        .set('Content-Type', 'text/plain')
        .send(`Last 10 visits:\n${visits.join('\n')}`)
        .end();
    })
    .catch((err) => {
      next(err);
    });
});



// [END app]
