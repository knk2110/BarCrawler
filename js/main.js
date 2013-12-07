


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


var itineraries = {
	id4234234234234: {
		id: 'id4234234234234', 
		title: 'Crawl 1',
		date: '13-Dec-13',
		updateDate: '1-Dec-13',
		barIds: ['id234234234234234', 'id234234234234235', 'id234234234234236']
	},
	
	id4234234234235: {
		id: 'id4234234234235',
		title: 'Crawl Title',
		date: '13-Dec-13',
		updateDate: '1-Dec-13',
		barIds: ['id234234234234235', 'id234234234234236', 'id234234234234234']
	}	
};

var bars = {
	id234234234234234: {
		id: '234234234234234',
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
		id: '234234234234235',
		name: 'Awesome Bar 2',
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
		id: '234234234234236',
		name: 'Awesome Bar 3',
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


/////////////////// BAR METHODS ///////////////////
// Given two bar objects, returns the walking time between them to the nearest minute
var walkingTime = function(bar1, bar2) {
	return Math.round(calcWalkingTime(bar1.location.lat, bar1.location.lng, bar2.location.lat, bar2.location.lng));
};


/////////////////// MAIN PAGE ///////////////////
// Given an itinerary object, adds it to the list shown on the main page
var addItineraryToMainPage = function(itinerary) {
	var locations = [];
		
	var addBarToItinerary = function(barId, i, barIds) {
		bars[barId].num = i+1;
		$('#' + itinerary.id + '-crawl-panel-list').append(mainPageCrawlPanelBar(bars[barId]));
		
		if (i < barIds.length-1) {
			$('#' + itinerary.id + '-crawl-panel-list').append(mainPageCrawlPanelWalkTime({minutes: walkingTime(bars[barIds[i]],bars[barIds[i+1]]) }));	
		}
	};
	
	_.each(itinerary.barIds, function(barId, i) { locations[i] = { lat: bars[barId].location.lat, lng: bars[barId].location.lng }; } );
	itinerary.mapURL = buildMapURL({height:300, width:300, locations:locations});
	$('#pageContent').append(mainPageCrawlPanel(itinerary));
	
	_.each(itinerary.barIds, addBarToItinerary);
}; 

// Adds event listeners used by buttons on the main page
var addMainPageEventListeners = function() {
	// We have a listener for each class of buttons on the panel for each crawl
	// If the button is pressed, event.target.name contains the itinerary id.  However, if the icon is pressed, we need to go to the parent, the button, to get the name
	var getId = function(target) {
		return target.name ? target.name : target.parentElement.name;
	};
	 
	$('#addCrawl').on('click', function() { showEditPage('id4234234234234'); });
	$('.editCrawl').on('click', function(event) { showEditPage(getId(event.target)); });
	$('.copyCrawl').on('click', function(event) { console.log("COPY " + getId(event.target)); });
	$('.emailCrawl').on('click', function(event) { console.log("EMAIL " + getId(event.target)); });
	$('.printCrawl').on('click', function(event) { console.log("PRINT " + getId(event.target)); });
	$('.deleteCrawl').on('click', function(event) { console.log("DELETE " + getId(event.target)); });	
};

// Shows the main page
var showMainPage = function() {
	$('#body').html('');	// Clear the page of all content
	$('#body').append(mainPageStructure());		// Add the basic struture of the main page
	_.each(itineraries, addItineraryToMainPage);	// Add the crawls
	addMainPageEventListeners();	// Add the button handlers
};


/////////////////// EDIT PAGE ///////////////////
// Given an itinerary object, displays it on the right side of the edit page
var showItineraryOnEditPage = function(itinerary) {	
	var locations = [];
	
	var addBarToItinerary = function(barId, i, barIds) {
		bars[barId].num = i+1;
		$('#barsList').append(editPageCrawlPanelBar(bars[barId]));
		
		if (i < barIds.length-1) {
			$('#barsList').append(editPageCrawlPanelWalkTime({minutes: walkingTime(bars[barIds[i]],bars[barIds[i+1]]) }));	
		}
	};
	
	$('#barsList').html('');
	_.each(itinerary.barIds, function(barId, i) { locations[i] = { lat: bars[barId].location.lat, lng: bars[barId].location.lng }; } );
	$('#crawlMap').html(editPageCrawlPanelMap({mapURL: buildMapURL({height:300, width:300, locations:locations})}));
	_.each(itinerary.barIds, addBarToItinerary);
};

// Adds event listeners used by buttons on the main page
var addEditPageEventListeners = function() {
	// We have a listener for each class of buttons on the panel for each bar
	// If the button is pressed, event.target.name contains the bar id.  However, if the icon is pressed, we need to go to the parent, the button, to get the name
	var getId = function(target) {
		return target.name ? target.name : target.parentElement.name;
	};
	
	$('#crawlFormHome').on('click', function(event) { showMainPage(); });
	$('.barUp').on('click', function(event) { console.log("UP " + getId(event.target)); });
	$('.barDown').on('click', function(event) { console.log("DOWN " + getId(event.target)); });
	$('.barDelete').on('click', function(event) { console.log("DELETE " + getId(event.target)); });	
};

// Shows the edit page for a given itinerary id
var showEditPage = function(id) {
	$('#body').html('');	// Clear the page of all content
	$('#body').append(editPageStructure());		// Add the basic struture of the main page
	showItineraryOnEditPage(itineraries[id]);	// Add the crawls
	addEditPageEventListeners();	// Add the button handlers
};

showMainPage();