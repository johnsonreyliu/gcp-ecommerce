View app at: 
https://gcp-johnson-interview.appspot.com/


`gcloud commands`
gcloud app deploy
gcloud app browse
gcloud app logs tail -s default

gcloud beta sql connect gcp-autocomplete-mysql --user=root2

`mysql commands`
use mysql;
show tables;

CREATE TABLE productsBestBuyLong (name VARCHAR(200));
INSERT INTO productAutoComplete (productID, productName) VALUES (1 ,'Apple');
INSERT INTO productAutoComplete (productID, productName) VALUES (2 ,'Banana');

INSERT INTO productsBestBuy (name) VALUES ('Nike Metcon');


INSERT INTO productAutoComplete (productID, productName) VALUES (4,'Larry'),(5,'Eula'),(6,'Austin'),(7,'Zachary'),(8,'Adeline'),(9,'Floyd'),(10,'Sylvia'),(11,'Loretta'),(12,'Helen'),(13,'Kyle'),(14,'Glenn'),(15,'Mitchell'),(16,'Chad'),(17,'Franklin'),(18,'Max'),(19,'Adeline'),(20,'Mabelle'),(21,'Glen'),(22,'Bertha'),(23,'Jack'),(24,'Mina'),(25,'Kate'),(26,'David'),(27,'Gregory'),(28,'Harold'),(29,'Christina'),(30,'Franklin'),(31,'Douglas'),(32,'Keith'),(33,'Eula'),(34,'Garrett'),(35,'Susie'),(36,'Derrick'),(37,'Bertie'),(38,'Wesley'),(39,'Adam'),(40,'Wayne'),(41,'Julia'),(42,'Hettie'),(43,'Lily'),(44,'Fannie'),(45,'Wayne'),(46,'Nathan'),(47,'Leon'),(48,'Elva'),(49,'Eva'),(50,'Jeff'),(51,'Rosie'),(52,'Nora'),(53,'Rosalie'),(54,'Tommy'),(55,'Fannie'),(56,'Jay'),(57,'Arthur'),(58,'Stephen'),(59,'Adrian'),(60,'Stella'),(61,'Mayme'),(62,'Lucile'),(63,'Devin'),(64,'Antonio'),(65,'Rhoda'),(66,'Alexander'),(67,'Walter'),(68,'Barbara'),(69,'Ellen'),(70,'Eula'),(71,'Justin'),(72,'Beulah'),(73,'Florence'),(74,'Clayton'),(75,'Steve'),(76,'Edward'),(77,'Johnny'),(78,'Owen'),(79,'Dollie'),(80,'Lee'),(81,'Danny'),(82,'Ryan'),(83,'Chester'),(84,'Jack'),(85,'Blanche'),(86,'Laura'),(87,'Hester'),(88,'Lenora'),(89,'Kathryn'),(90,'Ruth'),(91,'Alex'),(92,'Andre'),(93,'Allen'),(94,'Amanda'),(95,'Theresa'),(96,'William'),(97,'Hettie'),(98,'Augusta'),(99,'Derrick');

INSERT INTO products (name) VALUES ('Banana');
select * from products;
select productName from productAutoComplete where productName like '%A%';

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
