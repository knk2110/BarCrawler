//used for OAuth 
var clientID = "MSEKJ0U1BBTLQB4SKB0W0Y0YBS4SQ2D3TXLDJGXLM5QPPSMP";
var clientSecret = "P1ZIH1NK2SOG3G2QPJFTAEBJ2CKJD3TS3DHJAKMFTTUKHTIG";
var auth = "client_id="+clientID+"&client_secret="+clientSecret;


//This date string will be passed to search api url  
function getDateString()
{  
  var d = new Date();
  var year = d.getUTCFullYear();
  var month = d.getUTCMonth()+1;
  var day = d.getUTCDay()+1;
  var date="";
  if(day<10)
  {
     date = ""+year+""+month+"0"+day;
  }
  else
  {
     date = ""+year+""+month+""+day;
  }
  return date;
}

/*create an asynchronous function for getting details of each venue base on its unique id
When it's done, a callback will be generated to search_venue function to make an async call to the list of 
such venues
*/
function par_list(venues,index,callback)
{
  var para_item =function(callback)
        {
            
            get_venue_details(venues[index],function(item){

              if(item == null)
              {
                callback("error");
              }
              else
              {
                callback(null,item);
              }
            });
        };
  callback(para_item);
}

/*
Parameters: 1) an object which contains fields bar name/zip(required), categoryId(required), price and rating(optional)
2) a callback function ot receive the return object
Ouput: a list of venue objects each have fields:
name,id,category name, rating, price,url
location object(contains address,city,country,lat,lng,postalCode and state)
*/

function search_venue(inputs,callback){ 
  var config = {
    authUrl: 'https://foursquare.com/',
    apiUrl: 'https://api.foursquare.com/'
  };

  var zip = inputs.zip;
  var barName = inputs.barName; 
  var query="";

  if(zip!="" && barName!="")
  {
    query = "&query="+barName+"&near="+zip;
  }
  else if(zip=="" && barName!="")
  {
    query = "&query="+barName;
  }
  else
  {
    query = "&near="+zip;
  }

  var categoryId = inputs.categoryId;
  var rating = inputs.rating;
  var price = inputs.price;
  var venue_details=[];
  var venues=[];
  var url;

//when searching the venues, search only the ones within radius of 1000 meters
  if(typeof categoryId !="undefined")
  {

     url = config.apiUrl + 'v2/venues/search?'+query+'&categoryId='+categoryId+'&radius=1000&'+auth+'&v='+getDateString();
  }
  else
  {
     url = config.apiUrl + 'v2/venues/search?'+query+'&radius=1000&'+auth+'&v='+getDateString();
  }
 
  console.log(url);
  $.getJSON(url,
    function(data) {
      venues = data['response']['venues'];
      var p_venue=[];
      for (var i=0;i<venues.length;i++)
      {
        par_list(venues,i,function(item){
          p_venue[i] = item;
        });
      }

      async.parallel(p_venue,function(err,results)
      {
          venue_details = results;
          console.log(venue_details);
          var filtered_list;
          if(rating=="" && price =="")
          {
            filtered_list = parse_venue_object(venue_details);
          }
          else
          {
            filtered_list = venue_with_price_and_rating(venue_details,price,rating);
          }
          callback(filtered_list);
      });
    })
    .done(function() {
    console.log( "success" );
  })
  .fail(function() {
    console.log( "error" );
    empty =[];
    callback(empty);
  });
}

/*The compact object returned by search api does not have price or rating info of the venue. Therefore we have to 
make additioanl calls to get details from the venue
*/
function get_venue_details(venue,callback)
{
 
  var config = {
    authUrl: 'https://foursquare.com/',
    apiUrl: 'https://api.foursquare.com/'
  };
  var item;
  var venue_id = venue['id'];
     //$.ajaxSettings.async = false;
  $.getJSON(config.apiUrl + 'v2/venues/'+venue_id+'?'+auth+'&v='+getDateString())
    .done(function(data) {
      item = data['response']['venue'];
      callback(item);
    })
    .fail(function(error)
    {
      callback(null);
    });
  
}

/* Helper function to filter through the returned venues given the specifed price and rating
*/
function venue_with_price_and_rating(venues,price,rating)
{
  filtered_list=[];
  
  var isValid = function(param) {
  	return typeof param!='undefined' && param!="";
  }; 
  
  _.each(venues,
  	function(venue,i,venues) {
    	venue_price = venues[i]['price'];
    	venue_rating = venues[i]['rating'];
    	
    	if ( (!isValid(price) || (isValid(price) && (!isValid(venue_price) || venue_price.tier == price)))
    			&&
    		 (!isValid(rating) || (isValid(rating) && (!isValid(venue_rating) || venue_rating >= rating))) ) {
    			filtered_list.push(venues[i]);
    	}		  		
  	}
  );
  
  final_list = parse_venue_object(filtered_list);
  return final_list;
};

/* Helper function to filter through the venue object and only keep the necessary fields
Retrive the venue fields by:
     id,name,price,rating,category,location and url
*/
function parse_venue_object(venues)
{
  var venues_list=[];
  for (var i=0;i<venues.length;i++)
  {
    var venue_id = venues[i]['id'];
    var venue_name = venues[i]['name'];

    //not all vendors have prices information included, but the data object always a tag of price
    var venue_price = venues[i]['price'];
    if(typeof venue_price != "undefined")
    {
      venue_price = venues[i]['price']['tier'];

    } 
    else {
    	venue_price = "";	
    }
    var venue_rating = venues[i]['rating'];
    if(typeof venue_rating =="undefined")
    {
      venue_rating = "";
    }
    venue_url = venues[i]['url'];

    //some vendors don't have a specifed category and some have more than one category
    //find the first category that matches one of the ids within the bar sub-category
    var venue_categoryName;
    var venue_category = venues[i]['categories'];
    
      for (var j=0;j<venue_category.length;j++)
      {
        if(typeof venue_category[j]!="undefined")
        {
          var categoryId = venue_category[j].id;
          if(_.values(categories).indexOf(categoryId)!=-1)
          {
            venue_categoryName = venue_category[j].name;
          }
        }
      }
      if(typeof venue_categoryName == "undefined")
      {
        venue_categoryName = "Nightlife Spot";
      }
    
    var venue_location = venues[i]['location'];

    var venue_info=
    {
      id:venue_id,
      name:venue_name,
      price:venue_price,
      rating:venue_rating,
      category:venue_categoryName,
      location:venue_location,
      url:venue_url
    };
    venues_list.push(venue_info);
  }
  return venues_list;
}

