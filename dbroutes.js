var MongoClient = require('mongodb').MongoClient
var assert = require('assert');

var url = 'mongodb://localhost:27017/contactapp';

var fetchData = function() {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		console.log("Connected to server");
		var dbHandler = db;


		var collection = db.collection('contactlist');
	  	// Find some documents 
	  	collection.find({}).toArray(function(err, docs) {
	    assert.equal(err, null);
	    //assert.equal(2, docs.length);
	    console.log("Found the following records");
	    console.dir(docs);
	    return docs;
	    db.close();
		});
	});
}

