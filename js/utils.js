// Miscellaneous utility functions
// Given a string representation of a date d in format from, returns a string representation of d in format to
// If d is empty, returns an empty string
var reformatDate = function(d, from, to) {
	if (d == "") { 
		return "";
	} else if (d == "today") {
		return moment().format(to);
	} else {
		return moment(d, from).format(to);
	}
};

// Returns string s repeated n number of times
var rept = function(s, n) {
	var result = "";
	
	for (var i=1; i<=n; i++) {
		result = result + s;
	}
	
	return result;
};

// Adds a method to numbers to convert from degrees to radians
Number.prototype.toRad = function() {
    return this * Math.PI / 180;
};

// Estimate the walking time in minutes from two places given longitute and latitude
var calcWalkingTime = function(lat1,lon1,lat2,lon2) {
	var R = 6371; // km radius of Earth
	var dLat = (lat2-lat1).toRad();
	var dLon = (lon2-lon1).toRad();
	var lat1 = lat1.toRad();
	var lat2 = lat2.toRad();
	
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var distance = R * c;
	
	var time = distance/4.5*60; //mins
	
	return time;
};

// Parameters : array of IDs to sort, whether to sort by price or rating or by distance
// for distance, always ID of comparing it to
// {key, value} , possible key values: price, rating, distance. value: -1 for decreasing, 1 for increasing
// when desire to compare the distance, will pass in ID of the last bar want distance from
// return array of sorted IDs
function sortIDs(IDs, searchBy){
	// Get details of all IDs inside of the array and store them in another array
	console.log(IDs);
	var detailedData = getDetailedArray(IDs);
	// for(var i=0; i<IDs.length;i++){
	// 	deleteData(IDs[i], 'bars');
	// }
	var sortedArray = new Array();
	console.log(detailedData);
	if(searchBy.price){
		console.log('in here');
		if(searchBy.price < 0){
			detailedData.sort(function(a,b) { return b.price - a.price });
		}
		else{
			detailedData.sort(function(a,b) { return a.price - b.price});
		} 
	}
	else if(searchBy.rating){
		if(searchBy.rating < 0){
			detailedData.sort(function(a,b) { return b.rating - a.rating});
		}
		else{
			detailedData.sort(function(a,b) { return a.rating - b.rating});
		}
	}
	else if(searchBy.distance){
		//console.log(":::::::::::::::::::", searchBy.distance);
		console.log(IDs);
		IDs.sort(function(a,b) { return walkingTime(getDetails(a), getDetails(searchBy.distance)) - walkingTime(getDetails(b), getDetails(searchBy.distance)); });
		return IDs;
		//var startingPoint = searchBy.distance;
		//var distanceArray = getWalkingDistances(IDs, startingPoint);
		//distanceArray.sort(function(a,b) { return a.distance - b.distance});
	}
	else{
		alert("wrong search criteria!");
	}
	// parse results
	for(var i=0; i<detailedData.length;i++){
		sortedArray[i] = detailedData[i].id;
	}
	console.log(sortedArray);
	return sortedArray;
}

// Returns an array with the detailed data
function getDetailedArray(IDs){
	var detailedData = new Array();
	for(var i=0; i< IDs.length; i++){
		detailedData[i] = store.get(IDs[i]);
	}
	return detailedData;
}

// Returns array of walking distance form last point and IDs of venues
function getWalkingDistances(IDs , firstDest){
	var detailedData = new Array();
	var lat1 = (store.get(IDs[firstDest])).location.lat;
	var lng1 = (store.get(IDs[firstDest])).location.lng;
	for(var i=0; i< IDs.length; i++){
		var lat2 = (store.get(IDs[i])).location.lat;
		var lon2 = (store.get(IDs[i])).location.lat;
		var walkingDistance = calcWalkingTime(lat1,lon1,lat2,lon2);
		detailedData[i] = {'id': store.get(IDs[i]).id, 'distance': walkingDistance} ;
	}
	return detailedData;
}