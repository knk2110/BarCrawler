// ALL TEMPLATES USED IN THE APPLICATION

// Set the template settings to be {{= =}} style
_.templateSettings = {
  evaluate: /\{\{(.+?)\}\}/g,
  interpolate: /\{\{=(.+?)=\}\}/g
};

// Object to hold all of the templates
templates = {};


// HTML for the structure of the main page 
templates.mainPageStructure = [
	'    <div>',
	'		<h1>Your Bar Crawls</h1>',
	'	</div>',
	'	<div id="pageContent" class="col-md-8">',
	'		<P></P>',
	'		<P>',
	'			<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#newCrawlModal"><span class="glyphicon glyphicon-plus"></span> Add New Crawl</button>',
	'		</P>',
	'	</div>',
	'	<div class="modal fade" id="newCrawlModal" role="dialog">',
	'		<div class="modal-dialog">',
	'			<div class="modal-content">',
	'				<div class="modal-header">',
	'					<button type="button" class="close" data-dismiss="modal">&times;</button>',
	'					<h4 class="modal-title" id="myModalLabel">Enter Some Details About Your New Crawl</h4>',
	'				</div>',
	'				<div class="modal-body">',
	'					<p>*required</p>',
	'					<p>',
	'						<form role="form" id="newCrawlForm">',
	'							<fieldset class="form-inline">',
	'								<div class="form-group">',
	'									<label for="newCrawlFormTitle">Crawl Name</label>',
	'									<input type="text" class="form-control" id="newCrawlFormTitle" name="title" size="5" placeholder="Enter a name" autofocus>',
	'								</div>',
	'								<div class="form-group">',
	'									<label for="newCrawlFormDate">Date</label>',
	'									<input type="date" class="form-control" id="newCrawlFormDate" name="date">',
	'								</div>',
	'								<div class="form-group">',
	'									<label for="newCrawlFormZip">Near*</label>',
	'									<input type="text" required class="form-control" id="newCrawlFormZip" name="zip" size="5" maxlength="5" pattern="[0-9][0-9][0-9][0-9][0-9]" placeholder="zip">',
	'								</div>',
	'							</fieldset>',
	'							<br>',
	'							<fieldset class="form-inline">',
	'								<div class="form-group">',
	'									<label for="newCrawlFormType">Type of Bar</label>',
	'									<select class="form-control" id="newCrawlFormType" name="category">',
	'										<option value="4d4b7105d754a06376d81259"></option>',
	'										<option value="4bf58dd8d48988d116941735">Bar</option>',
	'										<option value="4bf58dd8d48988d117941735">Beer Garden</option>',
	'										<option value="50327c8591d4c4b30a586d5d">Brewery</option>',
	'										<option value="4bf58dd8d48988d11e941735">Cocktail Bar</option>',
	'										<option value="4bf58dd8d48988d118941735">Dive Bar</option>',
	'										<option value="4bf58dd8d48988d1d8941735">Gay Bar</option>',
	'										<option value="4bf58dd8d48988d119941735">Hookah Bar</option>',
	'										<option value="4bf58dd8d48988d1d5941735">Hotel Bar</option>',
	'										<option value="4bf58dd8d48988d120941735">Karaoke Bar</option>',
	'										<option value="4bf58dd8d48988d121941735">Lounge</option>',
	'										<option value="4bf58dd8d48988d11f941735">Nightclub</option>',
	'										<option value="4bf58dd8d48988d11b941735">Pub</option>',
	'										<option value="4bf58dd8d48988d11c941735">Sake Bar</option>',
	'										<option value="4bf58dd8d48988d1d4941735">Speakeasy</option>',
	'										<option value="4bf58dd8d48988d11d941735">Sports Bar</option>',
	'										<option value="4bf58dd8d48988d1d6941735">Strip Club</option>',
	'										<option value="4bf58dd8d48988d122941735">Whiskey Bar</option>',
	'										<option value="4bf58dd8d48988d123941735">Wine Bar</option>',
	'										<option value="4bf58dd8d48988d11a941735">Other</option>',
	'									</select>',
	'								</div>',
	'								<div class="form-group">',
	'									<label for="newCrawlFormRating">Rating</label>',
	'									<input type="number" class="form-control" min="0" max="10" width="2" id="newCrawlFormRating" name="rating" placeholder="0-10">',
	'								</div>',
	'								<div class="form-group">',
	'									<label for="newCrawlFormPrice">Price</label>',
	'									<select class="form-control" id="newCrawlFormPrice" name="price">',
	'										<option value=""></option>',
	'										<option value="1">$</option>',
	'										<option value="2">$$</option>',
	'										<option value="3">$$$</option>',
	'										<option value="4">$$$$</option>',
	'									</select>',
	'								</div>',
	'							</fieldset>',
	'							<br>',
	'							<fieldset class="form-inline">',
	'								<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>',
	'								<input type="submit" class="btn btn-primary" value="Add">',
	'							</fieldset>',
	'						</form>',
	'					</p>',
	'				</div>',
	'			</div>',
	'		</div>',
	'	</div>',
].join("\n");
 
// Creates a panel for a crawl on the home page, with placeholder divs for the content (list of bars, map) to be inserted into
// Object passed to the template must be structured as follows:
//  id: A unique id for the crawl
//  title: title of the crawl
//  date: date of the crawl in the desired format
//  updateDate: date that the crawl was last updated in the desired format
//  mapURL: a URL for a Google static map depicting the crawl 
templates.mainPageCrawlPanel = [
	'<div class="panel panel-default" id="#{{= id =}}-crawl-panel">',
	'	<div class="panel-heading">',
	'		<button type="button" class="btn btn-xs btn-default" data-toggle="collapse" data-target="#{{= id =}}-crawl-panel-content"><span class="glyphicon glyphicon-search"></span></button>',
	'		<strong>{{= title =}}</strong>, {{= date =}} <span class="text-muted">(last updated on {{= updateDate =}})</span>',
	'		<div class="pull-right">',
	'			<button type="button" class="btn btn-xs btn-primary editCrawl" name="{{= id =}}"><span class="glyphicon glyphicon-pencil"></span> Edit</button>',
	'			<button type="button" class="btn btn-xs btn-default copyCrawl" name="{{= id =}}"><span class="glyphicon glyphicon-repeat"></span> Copy</button>',
  	'			<button type="button" class="btn btn-xs btn-default emailCrawl" name="{{= id =}}"><span class="glyphicon glyphicon-envelope"></span> Email</button>',
	'			<button type="button" class="btn btn-xs btn-default printCrawl" name="{{= id =}}"><span class="glyphicon glyphicon-print"></span> Print</button>',
	'			<button type="button" class="btn btn-xs btn-danger deleteCrawl" name="{{= id =}}"><span class="glyphicon glyphicon-trash"></span> Delete</button>',
	'		</div>',
	'		<div class="clearfix">',
	'		</div>',
	'	</div>',
	'	<div id="{{= id =}}-crawl-panel-content" class="panel-collapse collapse">',
	'		<div class="panel-body">',
	'			<div class="row">',
	'				<div id="{{= id =}}-crawl-panel-list" class="col-md-6" style="height:350px; overflow-y:auto;">',
	'				</div>',	
	'				<div class="col-md-6">',
	'					<div align="center"><img src="{{= mapURL =}}"></div>',
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
templates.mainPageCrawlPanelBar = [
	'	<div class="well well-sm">',
	'		<div class="media">',
	'			<span class="pull-left"><h4><span class="label label-warning">{{= num =}}</span></h4></span>',
	'			<div class="media-body">',
	'				<strong>{{= name =}}</strong> ({{= category =}}) <span class="label label-info">{{= rating =}}</span> <span class="label label-success">{{= rept("$",price) =}}</span>',
	'				<br><span class="text-muted">{{= location.address =}}, {{= location.city =}}, {{= location.state =}} {{= location.postalCode =}}</span>',
	'			</div>',
	'		</div>',
	'	</div>',
].join("\n");

// Creates the text indicating how far the walk is from one bar to the next
// Object passed to the template must be structured as follows:
//  minutes: The number of the minutes of the walk 
templates.mainPageCrawlPanelWalkTime = [
	'<span class="text-muted">&nbsp; &nbsp; {{= minutes =}} min walk to...</span><br><br>'
].join("\n");

// HTML for the structure of the edit page 
templates.editPageStructure = [
  	'	<p>',
	'    	<form role="form" id="crawlForm">',
	'			<fieldset class="form-inline">',
	'				<div class="form-group">',
	'					<input type="text" class="form-control" id="crawlFormTitle" name="title" size="25" placeholder="Enter a name">',
	'				</div>',
	'				<div class="form-group">',
	'					<input type="date" class="form-control" id="crawlFormDate" name="date">',
	'				</div>',
	'				<button type="button" class="btn btn-primary" id="crawlFormHome"><span class="glyphicon glyphicon-home"></span> Home</button>',
	'				<button type="button" class="btn btn-primary" id="crawlFormSave"><span class="glyphicon glyphicon-floppy-disk"></span> Save</button>',
	'				<button type="button" class="btn btn-default" id="crawlFormEmail"><span class="glyphicon glyphicon-envelope"></span> Email</button>',
	'				<button type="button" class="btn btn-default" id="crawlFormPrint"><span class="glyphicon glyphicon-print"></span> Print</button>',
	'				<button type="button" class="btn btn-danger" id="crawlFormDelete"><span class="glyphicon glyphicon-trash"></span> Delete</button>',									
	'			</fieldset>',
	'		</form>',
	'	</p>',
	'	<p>',
	'		<div class="row">',
	'			<div class="col-md-4">',
	'				<div class="panel panel-default">',
	'					<div class="panel-heading">',
	'						Search',
	'					</div>',
	'					<div class="panel-body">',
	'						<form role="form" id="barSearchForm">',
	'							<fieldset class="form-inline">',
	'								<div class="form-group">',
	'									<label for="barSearchFormName">Bar Name</label>',
	'									<input type="text" class="form-control" id="barSearchFormName" name="barName" size="10">',
	'								</div>',
	'								<div class="form-group">',
	'									<label for="barSearchFormType">Type of Bars</label>',
	'									<select class="form-control" id="barSearchFormType" name="categoryId">',
	'										<option value="4d4b7105d754a06376d81259"></option>',
	'										<option value="4bf58dd8d48988d116941735">Bar</option>',
	'										<option value="4bf58dd8d48988d117941735">Beer Garden</option>',
	'										<option value="50327c8591d4c4b30a586d5d">Brewery</option>',
	'										<option value="4bf58dd8d48988d11e941735">Cocktail Bar</option>',
	'										<option value="4bf58dd8d48988d118941735">Dive Bar</option>',
	'										<option value="4bf58dd8d48988d1d8941735">Gay Bar</option>',
	'										<option value="4bf58dd8d48988d119941735">Hookah Bar</option>',
	'										<option value="4bf58dd8d48988d1d5941735">Hotel Bar</option>',
	'										<option value="4bf58dd8d48988d120941735">Karaoke Bar</option>',
	'										<option value="4bf58dd8d48988d121941735">Lounge</option>',
	'										<option value="4bf58dd8d48988d11f941735">Nightclub</option>',
	'										<option value="4bf58dd8d48988d11b941735">Pub</option>',
	'										<option value="4bf58dd8d48988d11c941735">Sake Bar</option>',
	'										<option value="4bf58dd8d48988d1d4941735">Speakeasy</option>',
	'										<option value="4bf58dd8d48988d11d941735">Sports Bar</option>',
	'										<option value="4bf58dd8d48988d1d6941735">Strip Club</option>',
	'										<option value="4bf58dd8d48988d122941735">Whiskey Bar</option>',
	'										<option value="4bf58dd8d48988d123941735">Wine Bar</option>',
	'										<option value="4bf58dd8d48988d11a941735">Other</option>',
	'									</select>',
	'								</div>',
	'							</fieldset>',
	'							<br>',
	'							<fieldset class="form-inline">',
	'								<div class="form-group">',
	'									<label for="barSearchFormZip">Near</label>',
	'									<input type="text" class="form-control" id="barSearchFormZip" name="zip" size="5" maxlength="5" pattern="[0-9][0-9][0-9][0-9][0-9]" placeholder="zip">',
	'								</div>',
	'								<div class="form-group">',
	'									<label for="barSearchFormRating">Rating</label>',
	'									<input type="number" class="form-control" min="0" max="10" width="2" id="barSearchFormRating" name="rating" placeholder="0-10">',
	'								</div>',
	'								<div class="form-group">',
	'									<label for="barSearchFormPrice">Price</label>',
	'									<select class="form-control" id="barSearchFormPrice" name="price">',
	'										<option value=""></option>',
	'										<option value="1">$</option>',
	'										<option value="2">$$</option>',
	'										<option value="3">$$$</option>',
	'										<option value="4">$$$$</option>',
	'									</select>',
	'								</div>',
	'							</fieldset>',
	'							<br>',
	'							<fieldset class="form-inline">',
	'								<input type="submit" class="btn btn-primary" id="crawlFormSearch" value="Search">',
	'							</fieldset>',
	'						</form>',
	'						<hr>',
	'						<form class="form-horizontal" role="form">',
	'							<div class="form-group">',
	'								<label for="barSearchFormSort" name="sort" class="col-md-2 control-label">Sort</label>',
	'								<div class="col-md-5">',
	'									<select class="form-control" id="barSearchFormSort">',
	'										<option value=""></option>',
	'										<option value="distance">Distance from (3)</option>',
	'										<option value="price">Price</option>',
	'										<option value="rating">Rating</option>',
	'									</select>',
	'								</div>',
	'							</div>',
	'						</form>',
	'						<div id="searchResults" style="height:400px; overflow-y:auto;">',
	'						</div>',
	'					</div>',
	'				</div>',
	'			</div>',
	'			<div class="col-md-7">',
	'				<div class="panel panel-default">',
	'					<div class="panel-heading">',
	'						Your Crawl',
	'					</div>',
	'					<div class="panel-body">',
	'						<div class="row">',
	'							<div id="barsList" class="col-md-6" style="height:682px; overflow-y:auto;">',
	'							</div>',
	'							<div class="col-md-6" id="crawlMap">',
	'							</div>',
	'						</div>',
	'					</div>',
	'				</div>',
	'			</div>',		
	'		</div>',
	'	</p>',
].join("\n");

// Creates a well for a single bar on the edit crawl page in the search area
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
//  distanceInfo: An object representing the distance from the last bar on the crawl, with the following structure:
//    minutes: the number of minutes walk
//    num: the number of the bar that the walk is from 
templates.editPageSearchPanelBar = [
	'	<div class="well well-sm">',
	'		<div class="media">',
	'			<span class="pull-right">',
	'				<button type="button" class="btn btn-xs btn-primary barAdd" name="{{= id =}}"><span class="glyphicon glyphicon-plus"></span> Add</button>',
	'				<button type="button" class="btn btn-xs btn-default barInfo" name="{{= id =}}"><span class="glyphicon glyphicon-info-sign"></span> Info</button>',
	'			</span>',
	'			<div class="media-body">',
	'				<strong>{{= name =}}</strong> ({{= category =}}) <span class="label label-info">{{= rating =}}</span> <span class="label label-success">{{= rept("$",price) =}}</span> <span class="text-muted">',
	'				<br><span class="text-muted">{{= location.address =}}, {{= location.city =}}, {{= location.state =}} {{= location.postalCode =}}</span>',
	'				{{ if (typeof distanceInfo !== "undefined") { }} <br> {{= distanceInfo.minutes =}} min walk from <span class="label label-warning">{{= distanceInfo.num =}} </span> {{ } }} </span>', 	
	'			</div>',
	'		</div>',
	'	</div>',
].join("\n");

// Creates a well for a single bar on the edit crawl page in the crawl info area
// Object passed to the template must be structured as follows:
//  num: The number of the bar on the crawl
//  id: Unique id of the bar
//  name: The name of the bar
//  category: The category of the bar
//  rating: A number from 0-10 representing the rating of the bar
//  price: An integer from 1 to 4 representing the price of the bar
//  location: An object representing the location of the bar, with the following structure:
//    address: street address
//    city: city
//    state: state
//    postalCode: postal code 
templates.editPageCrawlPanelBar = [
	'	<div class="well well-sm">',
	'		<div class="media">',
	'			<span class="pull-left">',
	'				<h4><span class="label label-warning">{{= num =}}</span></h4>',
	'			</span>',
	'			<span class="pull-right">',
	'				<button type="button" class="btn btn-xs btn-default barUp" name="{{= id =}}"><span class="glyphicon glyphicon-arrow-up"></span></button>',
	'				<button type="button" class="btn btn-xs btn-default barDown" name="{{= id =}}"><span class="glyphicon glyphicon-arrow-down"></span></button>',
	'				<button type="button" class="btn btn-xs btn-danger barDelete" name="{{= id =}}"><span class="glyphicon glyphicon-trash"></span></button>',
	'			</span>',
	'			<div class="media-body">',
	'				<strong>{{= name =}}</strong> ({{= category =}}) <span class="label label-info">{{= rating =}}</span> <span class="label label-success">{{= rept("$",price) =}}</span> <span class="text-muted">',
	'				<br><span class="text-muted">{{= location.address =}}, {{= location.city =}}, {{= location.state =}} {{= location.postalCode =}}</span>',
	'			</div>',
	'		</div>',
	'	</div>',
].join("\n");

// Creates the text indicating how far the walk is from one bar to the next
// Object passed to the template must be structured as follows:
//  minutes: The number of the minutes of the walk 
templates.editPageCrawlPanelWalkTime = [
	'<span class="text-muted">&nbsp; &nbsp; {{= minutes =}} min walk to...</span><br><br>'
].join("\n");

// Creates the link to a map depicting the crawl
// Object passed to the template must be structured as follows:
//  mapURL: a URL for the map 
templates.editPageCrawlPanelMap = [
	'<div align="center"><img src="{{= mapURL =}}"></div>'
].join("\n");