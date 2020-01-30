// imports
const express = require('express');
const bodyParser= require('body-parser');
const mongodb = require('mongodb');
const session = require('express-session');
const pug = require('pug');


// constants
var sdb;
const dbname = '7rajchel';
const host = '127.0.0.1'; // 172.20.44.25 - pascal
// const url = 'mongodb://7rajchel:pass7rajchel@' + host + '/' + dbname;
const url = 'mongodb://tomray@' + host + '/' + dbname;
const app = express();
const port = 4107;


// config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
   secret: 'some-secret',
   resave: true,
   saveUninitialized: true
}));

// Authentication and Authorization Middleware
var auth = function(req, res, next) {
   if (req.session && req.session.user === "admin" && req.session.admin)
     return next();
   else
     return res.status(401).send("Zaloguj się aby to zobaczyć.");
 };

// start server
app.listen(port,function() {
   console.log('listening on ' + port);
})


// routes
app.get('/style.css', function(req,res) {
   res.sendFile(__dirname + '/style.css');
})

app.get('/favicon.ico', function(req,res) {
   res.sendFile(__dirname + '/favicon.ico');
})

app.get('/ajax.js', function(req,res) {
   res.sendFile(__dirname + '/ajax.js');
})

app.get('/local_storage.js', function(req,res) {
   res.sendFile(__dirname + '/local_storage.js');
})

app.get('/', function(req,res) {
   result = pug.renderFile('templates/documentation.pug');
   res.status(200).send(result);
})

app.get('/analytics', auth, function(req,res) {
   var data;
   result = pug.renderFile('templates/analytics.pug');
   res.status(200).send(result);
})

app.get('/analytics_data', auth, function(req,res) {
   var cursor = sdb.collection('survey').find().toArray(function(err, db_results) {
      if (err) return console.log(err);
      res.status(200).send(db_results);
   })
})

app.get('/login', function(req,res) {
   result = pug.renderFile('templates/login.pug');
   res.status(200).send(result);
})

app.post('/login', function(req,res) {
   console.log(req.body);
   if (!req.body.username || !req.body.pass) {
      res.status(401).send("login failed");
   } else if(req.body.username === "admin" && req.body.pass === "1234") {
      // set session
      req.session.user = "admin";
      req.session.admin = true;

      // connect to server database
      mongodb.MongoClient.connect(url, function(err, client) {
         if (err) return console.log(err)
         sdb = client.db(dbname);
         console.log('Connect OK');
      })

      // sync client and server database
      // TODO

      res.status(200).send("login successful");
   } else {
      res.status(401).send("login failed");
   }
})

app.get('/logout', function(req,res) {
   req.session.destroy();
   console.log("logout successful");
   result = pug.renderFile('templates/documentation.pug');
   res.status(200).send(result);
})

app.get('/survey', function(req,res) {
   result = pug.renderFile('templates/survey.pug');
   res.status(200).send(result);
})


// CREATE
app.post('/survey', function( req,res ) {
   console.log(req.body);
   if(req.session.admin){
      // online
      sdb.collection('survey').insertOne(req.body,function(err,result) {
         if (err) return console.log(err);
         console.log('Rekord dodany do bazy');
         res.end('{"inserted record":"' + result.insertedCount + '"}');
      })
   } else {
      // offline
      res.status(401).send("Zaloguj się aby to wysłać.");
   }
})


// READ ALL
app.get('/survey_results', function(req, res) {
   if(req.session.admin){
      // online
      var cursor = sdb.collection('survey').find().toArray(function(err, db_results) {
         if (err) return console.log(err);
         console.log(db_results);
         result = pug.renderFile('templates/survey_results.pug', {db_results});
         res.status(200).send(result);
      })
   } else {
      res.status(401).send("Zaloguj się aby to zobaczyć.");
   }
})

app.get('/survey_results_offline', function(req, res) {
   if(!req.session.admin){
      result = pug.renderFile('templates/survey_results_offline.pug');
      res.status(200).send(result);
   }else {
      res.status(401).send("Wyloguj się aby zobaczyć wyniki offline.");
   }
})