// ALL TEMPLATES USED IN THE APPLICATION

// Set the template settings to be {{ }} style
_.templateSettings = {
  interpolate : /\{\{(.+?)\}\}/g
};

// Object to hold all of the templates
templates = {};
 
// Creates a panel for a crawl on the home page, with placeholder divs for the content (list of bars, map) to be inserted into
// Object passed to the template must be structured as follows:
//  id: A unique id for the crawl
//  title: title of the crawl
//  date: date of the crawl in the desired format
//  updateDate: date that the crawl was last updated in the desired format
//  mapURL: a URL for a Google static map depicting the crawl 
templates.homepageCrawlPanel = [
	'<div class="panel panel-default" id="#{{ id }}-crawl-panel">',
	'	<div class="panel-heading">',
	'		<button type="button" class="btn btn-xs btn-info" data-toggle="collapse" data-target="#{{ id }}-crawl-panel-content"><span class="glyphicon glyphicon-search"></span></button>',
	'		<strong>{{ title }}</strong>, {{ date }} <span class="text-muted">(last updated on {{ updateDate }})</span>',
	'		<div class="pull-right">',
	'			<button type="button" class="btn btn-xs btn-primary editCrawl" name="{{ id }}"><span class="glyphicon glyphicon-pencil"></span> Edit</button>',
	'			<button type="button" class="btn btn-xs btn-default copyCrawl name="{{ id }}"><span class="glyphicon glyphicon-repeat"></span> Copy</button>',
  	'			<button type="button" class="btn btn-xs btn-default emailCrawl name="{{ id }}"><span class="glyphicon glyphicon-envelope"></span> Email</button>',
	'			<button type="button" class="btn btn-xs btn-default printCrawl name="{{ id }}"><span class="glyphicon glyphicon-print"></span> Print</button>',
	'			<button type="button" class="btn btn-xs btn-danger deleteCrawl name="{{ id }}"><span class="glyphicon glyphicon-trash"></span> Delete</button>',
	'		</div>',
	'		<div class="clearfix">',
	'		</div>',
	'	</div>',
	'	<div id="{{ id }}-crawl-panel-content" class="panel-collapse collapse">',
	'		<div class="panel-body">',
	'			<div class="row">',
	'				<div id="{{ id }}-crawl-panel-list" class="col-md-6" style="height:300px; overflow-y:auto;">',
	'				</div>',	
	'				<div class="col-md-6 crawl-map">',
	'					<div align="center"><img src="{{ mapURL }}"></div>',
	'				</div>',
	'			</div>',
	'		</div>',
	'	</div>',
	'</div>',
].join("\n");


// Creates a well for a single bar within a crawl on the home page
// Object passed to the template must be structured as follows:
//  num: The number of the bar on the crawl
//  name: The name of the bar
//  category: The category of the bar
//  rating: A number from 0-10 representing the rating of the bar
//  price: An integer from 1 to 4 representing the price of the bar
//  location: An object representing the location of the bar, with the following structure:
//    address: street address
//    city: city
//    state: state
//    postalCode: postal code 
templates.homepageCrawlPanelBar = [
	'<p>',
	'	<div class="well well-sm">',
	'		<div class="media">',
	'			<span class="pull-left"><h4><span class="label label-primary">{{ num }}</span></h4></span>',
	'			<div class="media-body">',
	'				<strong>{{ name }}</strong> ({{ category }}) <span class="label label-info">{{ rating }}</span> <span class="label label-success">{{ price }}</span>',
	'				<br><span class="text-muted">{{ location.address }}, {{ location.city }}, {{ location.state }} {{ location.postalCode }}</span>',
	'			</div>',
	'		</div>',
	'	</div>',
	'</p>',
].join("\n");

// Creates the text indicating how far the walk is from one bar to the next
// Object passed to the template must be structured as follows:
//  minutes: The number of the minutes of the walk 
templates.homepageCrawlPanelWalkTime = [
	'<p class="text-muted">&nbsp; &nbsp; {{ minutes }} min walk to...</p>'
].join("\n");