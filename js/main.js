/////////////////// DATE FORMATS ///////////////////
var dateFormats = {
	sort: "X",
	form: "YYYY-MM-D",
	store: "D-MMM-YY"	
};

/////////////////// TEMPLATE COMPILATION ///////////////////
var currentCrawl;		// Stores the id of the crawl currently being edited on the edit screen

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


var crawls = {
	id4234234234234: {
		id: 'id4234234234234', 
		title: 'Crawl 1',
		date: '12-Dec-13',
		updateDate: '12-Dec-13',
		barIds: ['id234234234234234', 'id234234234234235', 'id234234234234236']
	},
	
	id4234234234235: {
		id: 'id4234234234235',
		title: 'Crawl Title',
		date: '12-Dec-13',
		updateDate: '12-Dec-13',
		barIds: ['id234234234234235', 'id234234234234236', 'id234234234234234']
	}	
};

var bars = {
	id234234234234234: {
		id: 'id234234234234234',
		name: 'Awesome Bar',
		category: 'Sake Bar',
		rating: 9.2,
		price: 2,
		location: {
			address: '101 Road St.',
			city:'New York',
			state:'NY',
			postalCode:'10010',
			lat: 40.7484,
			lng: -73.9587
		}
	},
	id234234234234235: {
		id: 'id234234234234235',
		name: 'Supah Dupah Bar',
		category: 'Sake Bar',
		rating: 2.2,
		price: 1,
		location: {
			address: '101 Road St.',
			city:'New York',
			state:'NY',
			postalCode:'10010',
			lat: 40.7584,
			lng: -73.9687
		}
	},
	id234234234234236: {
		id: 'id234234234234236',
		name: 'Fantastic Bar',
		category: 'Sake Bar',
		rating: 7.2,
		price: 3,
		location: {
			address: '101 Road St.',
			city:'New York',
			state:'NY',
			postalCode:'10010',
			lat: 40.7384,
			lng: -73.9687
		}
	}
};


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

/////////////////// BAR METHODS ///////////////////
// Given two bar objects, returns the walking time between them to the nearest minute
var walkingTime = function(bar1, bar2) {
	return Math.round(calcWalkingTime(bar1.location.lat, bar1.location.lng, bar2.location.lat, bar2.location.lng));
};


/////////////////// MAIN PAGE ///////////////////
// Given a crawl object, adds it to the list shown on the main page
var addCrawlToMainPage = function(crawl) {
	var locations = [];
		
	var insertBar = function(barId, i, barIds) {
		bars[barId].num = i+1;
		$('#' + crawl.id + '-crawl-panel-list').append(mainPageCrawlPanelBar(bars[barId]));
		
		if (i < barIds.length-1) {
			$('#' + crawl.id + '-crawl-panel-list').append(mainPageCrawlPanelWalkTime({minutes: walkingTime(bars[barIds[i]],bars[barIds[i+1]]) }));	
		}
	};
	
	_.each(crawl.barIds, function(barId, i) { locations[i] = { lat: bars[barId].location.lat, lng: bars[barId].location.lng }; } );
	crawl.mapURL = buildMapURL({height:300, width:300, locations:locations});
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
			
			console.log($('#newCrawlForm').serializeArray());
			
			console.log("PULL DATA FROM FORM, CREATE crawl OBJECT, showEditPage");
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
	_.each(crawls, addCrawlToMainPage);	// Add the crawls
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
	var locations = [];
	
	var insertBar = function(barId, i, barIds) {
		bars[barId].num = i+1;
		$('#barsList').append(editPageCrawlPanelBar(bars[barId]));
		
		if (i < barIds.length-1) {
			$('#barsList').append(editPageCrawlPanelWalkTime({minutes: walkingTime(bars[barIds[i]],bars[barIds[i+1]]) }));	
		}
	};
	
	$('#barsList').html('');
	_.each(currentCrawl.barIds, function(barId, i) { locations[i] = { lat: bars[barId].location.lat, lng: bars[barId].location.lng }; } );
	$('#crawlMap').html(editPageCrawlPanelMap({mapURL: buildMapURL({height:300, width:300, locations:locations})}));
	_.each(currentCrawl.barIds, insertBar);
	
	// We have a listener for each class of buttons on the panel for each bar
	// If the button is pressed, event.target.name contains the bar id.  However, if the icon is pressed, we need to go to the parent, the button, to get the name
	var getId = function(target) {
		return target.name ? target.name : target.parentElement.name;
	};
	
	$('.barUp').on('click', function(event) { moveBarOnCrawl(currentCrawl, getId(event.target), -1); refreshCrawlOnEditPage(); });
	$('.barDown').on('click', function(event) { moveBarOnCrawl(currentCrawl, getId(event.target), 1); refreshCrawlOnEditPage(); });
	$('.barDelete').on('click', function(event) { deleteBarFromCrawl(currentCrawl, getId(event.target)); refreshCrawlOnEditPage(); });	
};

// Adds event listeners used by buttons on the main page
var addEditPageEventListeners = function() {
	$('#crawlFormHome').on('click', function(event) { showMainPage(); });
	
	// When the barSearchForm is submitted, we must pull the data from the form, call the API, disable the form, show a loading indicator 
	$('#barSearchForm').on('submit',
		function(event) {
			event.preventDefault();
			
			// Read the data from the form and format it into an object to pass to search_venue
			var formData = $('#barSearchForm').serializeArray();
			var params = {};
			_.each(formData, function(obj) { params[obj.name] = obj.value; });
			
			search_venue(params, function(results) { console.dir(results); $('#barSearchForm>fieldset').attr('disabled', false); });
			
			// Disable the form while the search is running
			$('#barSearchForm>fieldset').attr('disabled', true);		
		}
	);	
};

// Shows the edit page for a given crawl id
var showEditPage = function(id) {
	currentCrawl = crawls[id];
	
	$('#body').html('');						// Clear the page of all content
	$('#body').append(editPageStructure());		// Add the basic structure of the main page
	populateEditPageHeader();					// Fill out the form on the top of the edit page
	refreshCrawlOnEditPage();					// Add the crawls
	addEditPageEventListeners();				// Add the button handlers
};

/////////////////// APPLICATION START ///////////////////
showMainPage();
//showEditPage('id4234234234234');