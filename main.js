'use strict';

var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

const g_constants = require('./constants');

var credentials = {
  key: privateKey, 
  cert: certificate
};

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type', 'Access-Control-Allow-Origin');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// your express configuration here

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(g_constants.my_port);
httpsServer.listen(g_constants.my_portSSL);

app.use(express.static('site'));

require('./reqHandler.js').handle(app);

process.on('uncaughtException', function (err) {
  console.error(err.stack);
  console.log("Node NOT Exiting...");
});

//scp -r ./site/ test@3s3s.org:/home/test/multicoins.org/
//git checkout gh-pages
//git checkout master site
//npm version 1.0.10
//npm login
//npm publish