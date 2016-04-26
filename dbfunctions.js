module.exports = {
	insertDocument : function(db, collection, data, callback) {
		db.collection(collection).insertOne( data, function(err, result) {
			if (err) {console.error(err);}
			
			console.log("Inserted a document into the esp1 collection.");
			callback();
		});
	},

	findShit : function(db, collection, query, callback) {
	   	var cursor = db.collection(collection).find(query);
	   	cursor.each(function(err, doc) {
			if (err) {console.error(err);}
	    	if (doc !== null) {
	        	console.dir(doc);
	        	return doc;
	    	} else {
	        	callback();
	      	}
	   });
	}
};
