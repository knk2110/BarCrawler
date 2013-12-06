


// TEMPLATE COMPILATION
var homepageCrawlPanel = _.template(templates.homepageCrawlPanel);
var homepageCrawlPanelBar = _.template(templates.homepageCrawlPanelBar);
var homepageCrawlPanelWalkTime = _.template(templates.homepageCrawlPanelWalkTime);


// console.log(homepageCrawlPanel({id: 'test', title: 'My crawl', date: '13-Dec-13', updatedDate: '1-Dec-13', mapURL: 'http://maps.googleapis.com/maps/api/staticmap?size=300x300&maptype=roadmap&markers=color:blue%7Clabel:1%7C40.702147,-74.015794&markers=color:blue%7Clabel:2%7C40.711614,-74.012318&markers=color:red%7Ccolor:blue%7Clabel:3%7C40.718217,-73.998284&sensor=false'}));


// Given a full crawl, return HTML that can be added to the home page.  Requires looping through, adding to DOM, 

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
			lat: 47.113,
			lng: 47.111
		}
	},
	id234234234234235: {
		id: '234234234234234',
		name: 'Awesome Bar 2',
		category: 'Sake Bar',
		rating: 2.2,
		price: 1,
		location: {
			address: '101 Road St.',
			city:'New York',
			state:'NY',
			postalCode:'10010',
			lat: 47.113,
			lng: 47.111
		}
	},
	id234234234234236: {
		id: '234234234234234',
		name: 'Awesome Bar 3',
		category: 'Sake Bar',
		rating: 7.2,
		price: 3,
		location: {
			address: '101 Road St.',
			city:'New York',
			state:'NY',
			postalCode:'10010',
			lat: 47.113,
			lng: 47.111
		}
	}
};

var addItineraryToHomepage = function(itinerary) {
	itinerary.mapURL = "http://maps.googleapis.com/maps/api/staticmap?size=300x300&maptype=roadmap&markers=color:blue%7Clabel:1%7C40.702147,-74.015794&markers=color:blue%7Clabel:2%7C40.711614,-74.012318&markers=color:red%7Ccolor:blue%7Clabel:3%7C40.718217,-73.998284&sensor=false";
	$('#pageContent').append(homepageCrawlPanel(itinerary));
	
	var addBarToItinerary = function(barId, i) {
		bars[barId].num = i+1;
		$('#' + itinerary.id + '-crawl-panel-list').append(homepageCrawlPanelBar(bars[barId]));
	};
	
	_.each(itinerary.barIds, addBarToItinerary); 
};

_.each(itineraries, addItineraryToHomepage); 



// INTERFACE EVENTS
$('#newCrawlForm').on('submit', function() { console.log("PULL DATA FROM FORM!!"); $('#newCrawlModal').modal('hide'); });

$('.editCrawl').on('click', function(event) { console.dir(event.target); });