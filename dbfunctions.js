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
	},

	newId : function(db, collection, callback){
		var newId = 0;
		var cursor =  db.collection(collection).find().sort({$natural:-1}).limit(1);
		cursor.each(function(err, doc) {
			if(err) {console.error(err);}
			if (doc !== null) {
				if(!doc.id){
					//console.log(1);
					newId = 1;
				} else {
					//console.log(doc.id + 1);
					newId = doc.id;
				}
			} else {
				callback();
			}
			
			console.log('newIdFunc1' + newId);
		});
	}
};
