View app at: 
https://gcp-johnson-interview.appspot.com/


`gcloud commands`
gcloud app deploy
gcloud app browse
gcloud app logs tail -s default

`mysql commands`
use mysql;
show tables;

CREATE TABLE products (name VARCHAR(20));
INSERT INTO productAutoComplete (productID, productName) VALUES (1 ,'Apple');
INSERT INTO products (name) VALUES ('Banana');
select * from products;

export SQL_USER=root
export SQL_PASSWORD=""
export SQL_DATABASE=products
export INSTANCE_CONNECTION_NAME=gcp-johnson-interview:us-east1:gcp-autocomplete-mysql

https://cloud.google.com/appengine/docs/flexible/nodejs/using-cloud-sql
https://codeforgeek.com/2014/09/ajax-search-box-using-node-mysql/


# Quickstart for Node.js in the App Engine Flexible Environment

This is the sample application for the
[Quickstart for Node.js in the App Engine Flexible Environment][tutorial]
tutorial found in the [Google App Engine Node.js Flexible Environment][appengine]
documentation.

* [Setup](#setup)
* [Running locally](#running-locally)
* [Deploying to App Engine](#deploying-to-app-engine)
* [Running the tests](#running-the-tests)

## Setup

Before you can run or deploy the sample, you need to do the following:

1.  Refer to the [appengine/README.md][readme] file for instructions on
    running and deploying.
1.  Install dependencies:

    With `npm`:

        npm install

    or with `yarn`:

        yarn install

## Running locally

With `npm`:

    npm start

or with `yarn`:

    yarn start

## Deploying to App Engine

With `npm`:

    npm run deploy

or with `yarn`:

    yarn run deploy

## Running the tests

See [Contributing][contributing].

[appengine]: https://cloud.google.com/appengine/docs/flexible/nodejs
[tutorial]: https://cloud.google.com/appengine/docs/flexible/nodejs/quickstart
[readme]: ../README.md
[contributing]: https://github.com/GoogleCloudPlatform/nodejs-docs-samples/blob/master/CONTRIBUTING.md
