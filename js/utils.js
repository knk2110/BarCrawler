// Miscellaneous utility functions
// Given a string representation of a date d in format from, returns a string representation of d in format to
// If d is empty, returns an empty string
var reformatDate = function(d, from, to) {
	if (d == "") { 
		return "";
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