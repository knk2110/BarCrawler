// TO DO
// UPDATE DATE IS NOT UPDATED

/////////////////// OBJECT MODEL ///////////////////
/*
 * A crawl object is structured as follows:
 * crawl = {
 * 	title: 'title',
 *  date: '9-Dec-13' or empty string,
 *  updatedDate: '9-Dec-13' or empty string,
 *  zip: 10010
 * 	barIds: [array of bar ids]
 *  mapURL: url of a map depicting the crawl (updated dynamically)
 * }
 * 
 * A bar object is structured as follows:
 * bar = {
 * 	id: 'uniqueId',
 * 	name: 'name',
 *  category: 'Sports Bar',
 *  rating: 9.2 or empty string,
 * 	price: 2 or empty string,
 *  location: {
 * 		address: '101 Road St.',
 * 		city:'New York',
 * 		state:'NY',
 * 		postalCode:'10010',
 * 		lat: 40.7484,
 * 		lng: -73.9587 	
 *  }
 * }
 */

// Given a crawl object and bar Id, returns true if the bar is on the crawl
var isBarOnCrawl = function(crawl, barId) {
	return _.indexOf(crawl.barIds, barId) != -1;
};

// Given a crawl object, a bar Id, and optional index, add the bar to the crawl at the end by default or at the specified index
// If the barId is already on the crawl, does nothing
var addBarToCrawl = function(crawl, barId, i) {
	if (i === undefined) { i = crawl.barIds.length; }
	if (!isBarOnCrawl(crawl, barId)) { crawl.barIds.splice(i, 0, barId); }
};

// Given a crawl object and a bar Id, deletes the barId from the crawl
// If the barId is not on the crawl, does nothing.
var deleteBarFromCrawl = function(crawl, barId) {
	crawl.barIds = _.without(crawl.barIds, barId );  
};

// Given a crawl object a bar Id, and an increment value, move the bar on the crawl toward the beginning (negative value) or toward the end (positive value) that many places
// If the barId is not on the crawl, does nothing.  If value is not specified, does nothing
var moveBarOnCrawl = function(crawl, barId, inc) {
	var i = _.indexOf(crawl.barIds, barId);		// Current index
	
	if (i>=0) {
		var j = Math.max(0, Math.min(crawl.barIds.length-1, i+inc));	// New index
		deleteBarFromCrawl(crawl, barId);
		addBarToCrawl(crawl, barId, j);	
	}  
};

// Given two bar objects, returns the walking time between them to the nearest minute
var walkingTime = function(bar1, bar2) {
	return Math.round(calcWalkingTime(bar1.location.lat, bar1.location.lng, bar2.location.lat, bar2.location.lng));
};


/////////////////// DATE FORMATS ///////////////////
var dateFormats = {
	sort: "X",				// When sorting dates, use a UNIX timestamp
	form: "YYYY-MM-DD",		// Format required when reading or writing date to a date input field
	store: "D-MMM-YY"		// Format used for display
};


/////////////////// VARIABLES ///////////////////
var currentCrawl;		// object for the crawl currently being edited on the edit screen
var currentCrawlId;		// id of the crawl currently being edited on the edit screen
var searchResults;		// current search results, which is an array of bar ids

/////////////////// TEMPLATE COMPILATION ///////////////////
var mainPageStructure = _.template(templates.mainPageStructure);
var mainPageCrawlPanel = _.template(templates.mainPageCrawlPanel);
var mainPageCrawlPanelBar = _.template(templates.mainPageCrawlPanelBar);
var mainPageCrawlPanelWalkTime = _.template(templates.mainPageCrawlPanelWalkTime);

var editPageStructure = _.template(templates.editPageStructure);
var editPageSearchPanelBar = _.template(templates.editPageSearchPanelBar);
var editPageCrawlPanelBar = _.template(templates.editPageCrawlPanelBar);
var editPageCrawlPanelWalkTime = _.template(templates.editPageCrawlPanelWalkTime);
var editPageCrawlPanelMap = _.template(templates.editPageCrawlPanelMap); 



/////////////////// MAIN PAGE ///////////////////
// Given a crawl object, adds it to the list shown on the main page
var addCrawlToMainPage = function(crawlId) {
	var crawl = getDetails(crawlId);
	
	var insertBar = function(barId, i, barIds) {
		var bar = getDetails(barId);
		
		bar.num = i+1;
		console.log(barId,i+1);
		console.log(bar);
		$('#' + crawlId + '-crawl-panel-list').append(mainPageCrawlPanelBar(bar));
		
		if (i < barIds.length-1) {
			var nextBar = getDetails(barIds[i+1]);
			$('#' + crawlId + '-crawl-panel-list').append(mainPageCrawlPanelWalkTime({minutes: walkingTime(bar,nextBar) }));	
		}
	};
	
	// For each bar id in the crawl, add its lat and lng to an array of locations in order to build the map URL 
	var locations = [];
	_.each(crawl.barIds, function(barId, i) { var bar = getDetails(barId); locations[i] = { lat: bar.location.lat, lng: bar.location.lng }; } );
	crawl.mapURL = buildMapURL({height:300, width:300, locations:locations});
	
	// Set up the panel holding the crawl, including the map.  Then for each bar, insert it
	crawl.id = crawlId;
	console.log(crawl);
	$('#pageContent').append(mainPageCrawlPanel(crawl));
	_.each(crawl.barIds, insertBar);
}; 

// Adds event listeners used by buttons on the main page
var addMainPageEventListeners = function() {
	// We have a listener for each class of buttons on the panel for each crawl
	// If the button is pressed, event.target.name contains the crawl id.  However, if the icon is pressed, we need to go to the parent, the button, to get the name
	var getId = function(target) {
		return target.name ? target.name : target.parentElement.name;
	};
	
	// When the newCrawlForm is submitted, we must pull the data from the form, store it as a new temporary crawl, and then show the edit page 
	$('#newCrawlForm').on('submit',
		function(event) {
			event.preventDefault();
			
			// Pull the formData into an object of key/value pairs for each item on the form
			var formData = $('#newCrawlForm').serializeArray();
			var data = {};
			_.each(formData, function(obj) { data[obj.name] = obj.value; });
			
			// Construct a shell crawl object based on the form data			
			var crawl = { 
				title: data.title,
				date: reformatDate(data.date, dateFormats.form, dateFormats.store),
				updateDate: reformatDate(data.date, dateFormats.form, dateFormats.store),
				zip: data.zip,
				barIds: []
			};
			
			// Save the crawl and obtain an id
			var id = saveData(crawl, 'crawl');
			
			// Show the edit page with the shell crawl that was created
			showEditPage(id);
		}
	);
	
	$('.editCrawl').on('click', function(event) { showEditPage(getId(event.target)); });
	$('.copyCrawl').on('click', function(event) { console.log("COPY " + getId(event.target)); });
	$('.emailCrawl').on('click', function(event) { console.log("EMAIL " + getId(event.target)); });
	$('.printCrawl').on('click', function(event) { console.log("PRINT " + getId(event.target)); });
	$('.deleteCrawl').on('click', function(event) { console.log("DELETE " + getId(event.target)); });	
};

// Shows the main page
var showMainPage = function() {
	$('#body').html('');							// Clear the page of all content
	$('#body').append(mainPageStructure());			// Add the basic struture of the main page
	
	// Obtain an array of ids of the crawls that exist
	var crawlIds = getAllIDs('crawl');
	
	// If the crawls do not exist, show an instruction to the user.  Otherwise, add each crawl to the page
	if (typeof crawlIds === 'undefined') {
		$('#pageContent').append("<P>You don't have any bar crawls yet.  Type <strong>Add New Crawl</strong> to create one.");
	} else {
		_.each(crawlIds, addCrawlToMainPage);				// Add the crawls
	};
	
	addMainPageEventListeners();					// Add the button handlers
};


/////////////////// EDIT PAGE ///////////////////
// Populates the form at the top of the edit page with the current crawl's name and date
var populateEditPageHeader = function() {
	$('#crawlFormTitle').val(currentCrawl.title);
	$('#crawlFormDate').val(reformatDate(currentCrawl.date, dateFormats.store, dateFormats.form));
};

// Displays the current crawl on the right side of the edit page
var refreshCrawlOnEditPage = function() {
	// If the current crawl does not have any bars, show an instruction message and add a map with the current zip code
	// Otherwise, add the bars to the bars panel	
	if ( currentCrawl.barIds.length == 0 ) {
		$('#barsList').html("<div class=\"well\">You haven't added any bars to this crawl yet.  Use the search form on the left to find bars you'd like to add.</div>");
		$('#crawlMap').html(editPageCrawlPanelMap({mapURL: buildMapURL({height:300, width:300, zipcode:currentCrawl.zip})}));	
	} else {
		// Clear the area
		$('#barsList').html('');
		
		var insertBar = function(barId, i, barIds) {
			var bar = getDetails(barId);
			bar.num = i+1;
			$('#barsList').append(editPageCrawlPanelBar(bar));
			
			if (i < barIds.length-1) {
				var nextBar = getDetails(barIds[i+1]);
				$('#barsList').append(editPageCrawlPanelWalkTime({minutes: walkingTime(bar, nextBar) }));	
			}
		};
		
		// For each bar id in the crawl, add its lat and lng to an array of locations in order to build the map URL 
		var locations = [];
		_.each(currentCrawl.barIds, function(barId, i) { var bar = getDetails(barId); locations[i] = { lat: bar.location.lat, lng: bar.location.lng }; } );
		$('#crawlMap').html(editPageCrawlPanelMap({mapURL: buildMapURL({height:300, width:300, locations:locations})}));
		
		// Insert each bar into the panel
		_.each(currentCrawl.barIds, insertBar);
		
		// We have a listener for each class of buttons on the panel for each bar
		// If the button is pressed, event.target.name contains the bar id.  However, if the icon is pressed, we need to go to the parent, the button, to get the name
		var getId = function(target) {
			return target.name ? target.name : target.parentElement.name;
		};
		
		// Add listeners for the buttons
		$('.barUp').on('click', function(event) { moveBarOnCrawl(currentCrawl, getId(event.target), -1); refreshCrawlOnEditPage(); });
		$('.barDown').on('click', function(event) { moveBarOnCrawl(currentCrawl, getId(event.target), 1); refreshCrawlOnEditPage(); });
		$('.barDelete').on('click', function(event) { deleteBarFromCrawl(currentCrawl, getId(event.target)); searchResults.push(getId(event.target)); refreshCrawlOnEditPage(); refreshSearchResultsOnEditPage(); });	
	}
};

var refreshSearchResultsOnEditPage = function() {
	// Clear the area
	$('#searchResults').html('');
	
	// Add each bar in the search results to the panel
	_.each(searchResults,
		function(barId) {
			var bar = getDetails(barId);
			
			// If there is already a bar on the crawl, include distance information to be shown in the search panel
			if (currentCrawl.barIds.length > 0) {
				bar.distanceInfo = {
					minutes: walkingTime(bar, getDetails(currentCrawl.barIds[currentCrawl.barIds.length-1])),
					num: currentCrawl.barIds.length
				};
			}
			
			$('#searchResults').append(editPageSearchPanelBar(bar));
		}
	);
	
	// We have a listener for each class of buttons on the search results for each bar
	// If the button is pressed, event.target.name contains the bar id.  However, if the icon is pressed, we need to go to the parent, the button, to get the name
	var getId = function(target) {
		return target.name ? target.name : target.parentElement.name;
	};
	
	$('.barAdd').on('click',
		function(event) {
			barId = getId(event.target);
			searchResults = _.without(searchResults, barId );
			addBarToCrawl(currentCrawl, barId);
			refreshCrawlOnEditPage();
			refreshSearchResultsOnEditPage();
		}
	);
	$('.barInfo').on('click', function(event) { console.log("Info ", getId(event.target)); });	
};

// Adds event listeners used by buttons on the main page
var addEditPageEventListeners = function() {
	$('#crawlFormHome').on('click', function(event) { showMainPage(); });
	$('#crawlFormSave').on('click', function(event) { saveData(currentCrawl, 'crawl', currentCrawlId); });
	
	// When the barSearchForm is submitted, we must pull the data from the form, call the API, disable the form, show a loading indicator 
	$('#barSearchForm').on('submit',
		function(event) {
			event.preventDefault();
			
			// Read the data from the form and format it into an object to pass to search_venue
			var formData = $('#barSearchForm').serializeArray();
			var params = {};
			_.each(formData, function(obj) { params[obj.name] = obj.value; });
			
			search_venue(params,
				function(results) { 
					// Re-enable the form
					$('#barSearchForm>fieldset').attr('disabled', false);
					
					// Store the search results
					searchResults = [];
					_.each(results, function(bar, i) { searchResults[i] = bar.id; saveData(bar, "bar", bar.id); } );
					
					// Refresh the search results
					refreshSearchResultsOnEditPage();
				}
			);
			
			// Disable the form while the search is running
			$('#barSearchForm>fieldset').attr('disabled', true);		
		}
	);	
};

// Shows the edit page for a given crawl id
var showEditPage = function(id) {
	currentCrawl = getDetails(id);
	currentCrawlId = id;
	searchResults = [];
	
	$('#body').html('');						// Clear the page of all content
	$('#body').append(editPageStructure());		// Add the basic structure of the main page
	populateEditPageHeader();					// Fill out the form on the top of the edit page
	refreshCrawlOnEditPage();					// Add the crawls
	addEditPageEventListeners();				// Add the button handlers
	
	if (currentCrawl.barIds.length == 0) {
		$('#barSearchFormZip').val(currentCrawl.zip);
		$('#barSearchForm').submit();
	}
	
};

/////////////////// APPLICATION START ///////////////////
showMainPage();