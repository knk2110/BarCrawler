// Miscellaneous utility functions

// Returns string s repeated n number of times
var rept = function(s, n) {
	var result = "";
	
	for (var i=1; i<=n; i++) {
		result = result + s;
	}
	
	return result;
};
