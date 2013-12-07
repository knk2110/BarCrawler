// Gets all objects from storage
// returns copy of array containing all objects
function getAllIDs(key){
	// array of bar crawls
	var data = store.get(key);
	// cloned object
	console.log(data);
	return JSON.parse(JSON.stringify(data));
}

// Get details of object stored at that key
// Returns copy of that object from storage by key
function getDetails(key){
	var details = store.get(key);
	console.log("object here dude!" + details);
	return JSON.parse(JSON.stringify(details));
}

// Save object by key
// Takes in key
// Returns the key of the stored crawl
function saveData(data, type, key){
	if(key){
		store.set(key, dataß);
		return key;
	}
	else{
		// create id for bar crawl
		var time = new Date().getTime();
		// create md5 of string
		var keyString = time + Math.random();
		store.set(keyString, data);
		// Add key to key array
		var keyArray = store.get(type);
		if(keyArray){
			keyArray.push(keyString);
		}
		else{
			keyArray = [keyString];
		}
		store.set(type, keyArray);
		return keyString;
	}
}

// Delete object
// Returns true if successfully deleted object
// Returns false if wrong key or no key given and couldn't remove object
function deleteData(key, type){
	console.log(store.get(key));
	if(store.get(key)){
		// delete key 
		store.remove(key);
		var keyArray = store.get(type);
		// Find and remove item from an array
		var i = keyArray.indexOf(key);
		console.log(i);
		if(i != -1) {
			keyArray.splice(i, 1);
		}
		return true;
	}
	else{
		return false;
	}
}

