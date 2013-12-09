// Miscellaneous utility functions
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
	if(searchBy.price){
		if(searchBy.price < 0){
			IDs.sort(function(a,b) { return getDetails(b).price - getDetails(a).price; });
		}
		else{
			IDs.sort(function(a,b) { return getDetails(a).price - getDetails(b).price; });
		} 
	}
	else if(searchBy.rating){
		if(searchBy.rating < 0){
			IDs.sort(function(a,b) { return getDetails(b).rating - getDetails(a).rating; });
		}
		else{
			IDs.sort(function(a,b) { return getDetails(a).rating - getDetails(b).rating; });
		}
	}
	else if(searchBy.distance){
		IDs.sort(function(a,b) { return walkingTime(getDetails(a), getDetails(searchBy.distance)) - walkingTime(getDetails(b), getDetails(searchBy.distance)); });
	}

	return IDs;
}