// Your use of the YouTube API must comply with the Terms of Service:
// https://developers.google.com/youtube/terms
// Called automatically when JavaScript client library is loaded.

//CONSTANT VARIABLES
const PART = "snippet";
const MAX_RESULTS = 10;
const API_KEY = "AIzaSyA3kt3hajtVT7PaBoIQczEyyM0WP0T1e4c";
const TPL = 'tpl/list_item.html';
//-------

//----Utility----
// // If number is a single digit, prepend a '0'. Otherwise, return the number
//   //  as a string.
//   function padToTwoCharacters(number) {
//     if (number < 10) {
//       return '0' + number;
//     } else {
//       return number.toString();
//     }
//   }
// function formatDateString(date) {
//     var yyyy = date.getFullYear().toString();
//     var mm = padToTwoCharacters(date.getMonth() + 1);
//     var dd = padToTwoCharacters(date.getDate());

//     return yyyy + '-' + mm + '-' + dd;
//   }
//replace in template
function tplawesome(e, t) {
    res = e;
    for (var n = 0; n < t.length; n++) {
      res = res.replace(/\{\{(.*?)\}\}/g, function(e, r) {
        return t[n][r];
      });
    }
    return res;
  }

  //get file
function get_file(url, callback)
{
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET", url, true);
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            callback(xmlhttp.response);
        }
    }
    xmlhttp.send();
}
//render result list
function renderResult(index,id, title,date,viewCount ){
    return '<tr>'+
    '<td>'+index+'</td>'+
     '<td>'+id+'</td>'+
     '<th scope="row">'+title+'</th>'+
     '<td>'+date+'</td>'+
     '<td>'+viewCount+'</td>'+
 '</tr>';
}

//End Utility-----
function onClientLoad() {
  gapi.client.load("youtube", "v3", onYouTubeApiLoad);
}
// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
  gapi.client.setApiKey(API_KEY);
}

// Called when the search button is clicked in the html code
function search() {
  var query = document.getElementById("query").value;

//   var order = document.getElementById("order").value;
//   console.log("order:", order);
  // Use the JavaScript client library to create a search.list() API call.
  var request = gapi.client.youtube.search.list({
    part: PART,
    q: encodeURIComponent(query).replace(/%20/g, "+"),
    type: "video",
    // order: order,
    maxResults: MAX_RESULTS
  });
  //reset result
  document.getElementById("results").innerHTML = '';
  document.getElementById("list_result").innerHTML = '';
  // Send the request to the API server, call the onSearchResponse function when the data is returned
  request.execute(onSearchResponse);
}

// Triggered by this line: request.execute(onSearchResponse);
function onSearchResponse(response) {
  console.log(response.result);
  let video_ids = [];
  if ('error' in response) {
    document.getElementById("list_result").innerHTML =response.error.message;
  } 
  else{
    response.result.items.forEach(item => {
      
    // check no duplicate
    if(video_ids.indexOf(item.id.videoId)== -1){
        video_ids.push(item.id.videoId);
    }
      
    });
  }
  
  console.log("video_ids:",video_ids);
  
  //create another request with the ressource videos.list
  var request_list = gapi.client.youtube.videos.list({
    part: 'id,snippet,statistics',
    id: video_ids.join(',')
  });
  request_list.execute(function(response) {
    console.log(response);
    if ('error' in response) {
        document.getElementById("list_result").innerHTML =response.error.code + response.error.message;
      } 
      else{
            var i = 1;
            console.log("items:",response.result.items);
            response.result.items.forEach(item=>{
                //bind item data
                console.log("item:",i,  item);
                document.getElementById("list_result").innerHTML +=renderResult(i,item.id,item.snippet.title,item.snippet.publishedAt,item.statistics.viewCount);
                i ++;
            })
      }
  });
  
}
