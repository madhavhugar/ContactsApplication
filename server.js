var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient
var assert = require('assert');

var url = 'mongodb://localhost:27017/contactapp';

app.use(bodyParser.json())
app.use('/', express.static('public'));

app.get('/contactslist', function(req, res) {
	console.log(req.url);
	res.format({
		json : function() {
			MongoClient.connect(url, function(err, db) {
			assert.equal(null, err);
			console.log("Connected to server");

			var collection = db.collection('contactlist');
		  	// Find some documents 
		  	collection.find({}).toArray(function(err, docs) {
		    assert.equal(err, null);
		    console.log("Found the following records");
		    console.dir(docs);
		    db.close();
		    res.send(docs);
			});
	});
		}
	})
	
});

app.post('/insertContact', function(req,res) {
	console.log(JSON.stringify(req.body));
	
	MongoClient.connect(url, function(err, db) {
			assert.equal(null, err);
			var collection = db.collection('contactlist');
		  	// Find some documents 
		  	collection.insert(req.body, function(err, docs) {
		    assert.equal(err, null);
		    console.log("Inserted the contact");
		    db.close();
			});
		});
})


var server = app.listen(9000, function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('The server is listening at %s at port %s', host, port);
})