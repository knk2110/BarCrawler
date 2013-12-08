// Gets all objects from storage
// returns copy of array containing all objects
function getAllIDs(type){
	// array of objects of that type
	var data = store.get(type);
	
	if (typeof data === 'undefined') {
		return undefined;
	} else {
		// return clone of the object
		return JSON.parse(JSON.stringify(data));	
	}
}

// Get details of object stored at that key
// Returns copy of that object from storage by key
function getDetails(key){
	var details = store.get(key);
	
	if (typeof details === 'undefined') {
		return undefined;
	} else {
		return JSON.parse(JSON.stringify(details));
	}
}

// Save object by key
// Takes in key
// Returns the key of the stored crawl
function saveData(data, type, key){
	if(key){
		store.set(key, data);
		return key;
	}
	else{
		// create id for bar crawl
		var time = new Date().getTime();
		// create md5 of string
		var keyString = "id" + time + Math.floor((Math.random()*999999999)+1);
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
	if(store.get(key)){
		// delete key 
		store.remove(key);
		
		// Find and remove item from an array
		var keyArray = store.get(type);
		keyArray = _.without(keyArray, key);
		store.set(type, keyArray);
		
		return true;
	}
	else{
		return false;
	}
}

/*
 * Copies the crawl whose id is provided as a parameter and stores it
 * with a new id. Returns the new id upon successful completion and -1
 * upon a failure
*/
function copyObject(id, type){
	var data = store.get(id);
	if (data){
		var copiedData = JSON.parse(JSON.stringify(data));
		var time = new Date().getTime();
		var newID = "id" + time + Math.floor((Math.random()*999999999)+1);
		store.set(newID, copiedData);
		
		//add new ID to list of IDs for that type
		var existingIDs = store.get(type);
		if (existingIDs){
			existingIDs.push(newID);
			store.set(type, existingIDs);
			return newID;
		}
		else{
			//if we are copying an existing ID, we should never get here--the list of IDs for that type of object must exist!
			return -1;
		}
	}
	else{
		return -1;
	}
}
