// imports
const express = require('express');
const bodyParser= require('body-parser')
const mongodb = require('mongodb')


// constants
var db;
const dbname = '7rajchel';
const host = '172.20.44.25'; // 172.20.44.25
const url = 'mongodb://7rajchel:pass7rajchel@' + host + '/' + dbname;
const app = express();
const port = 4007;
const collection = 'notatki';


// config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
 
mongodb.MongoClient.connect(url, function(err, client) {
  if (err) return console.log(err)
  db = client.db(dbname);
  console.log('Connect OK');
})

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

app.get('/', function(req,res) {
   res.sendFile(__dirname + '/index.html');
})


// CREATE
app.post('/' + collection, function( req,res ) {
   console.log(req.body);
   db.collection(collection).insertOne(req.body,function(err,result) {
      if (err) return console.log(err);
      console.log('Rekord dodany do bazy');
      res.end('{"inserted record":"' + result.insertedCount + '"}');
   })
})

// READ
app.get('/' + collection, function(req, res) {
  var cursor = db.collection(collection).find().toArray(function(err, results) {
     if (err) return console.log(err);
     res.end(JSON.stringify(results));
     console.log(results);
  })
})

app.get('/' + collection + '/:kategoria', function(req,res) {
   console.log(req.params.id);
   db.collection(collection).findOne({_id: new mongodb.ObjectId(req.params.id)},function(err,result) {
       if (err) return console.log(err);
       res.end(JSON.stringify(result));
       console.log(result);
   })	   
})

// DELETE
app.delete('/' + collection + '/:kategoria',function(req, res) {
   console.log(req.params.id);
   db.collection(collection).deleteOne({_id: new mongodb.ObjectId(req.params.id)},function(err,result) {
      if (err) return console.log(err);
      console.log('Rekord usuniety z bazy - ' + req.params.id);
      res.end('"Documents deleted ":"1"}');
   })
})

// UPDATE
app.put('/' + collection + '/:kategoria',function(req,res) {
   console.log(req.params.id);
   console.log(req.body);
   data = req.body;
   db.collection(collection).updateOne({_id: new mongodb.ObjectId(req.params.id)},{ $set: data}, function(err,result) {
      if (err) return console.log(err);
      console.log('rekord poprawiony - ' + req.params.id);
      console.log(result.modifiedCount);
      console.log(result.matchedCount);
      res.end('"Document updated ":"' + result.modifiedCount + '"}');
  })	   
})