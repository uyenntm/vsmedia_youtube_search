// Your use of the YouTube API must comply with the Terms of Service:
// https://developers.google.com/youtube/terms
// Called automatically when JavaScript client library is loaded.

//CONSTANT VARIABLES
const PART = "snippet";
const MAX_RESULTS = 10;
const API_KEY = "AIzaSyA3kt3hajtVT7PaBoIQczEyyM0WP0T1e4c";
let VIDEOS = [];
//-------

function onClientLoad() {
  gapi.client.load("youtube", "v3", onYouTubeApiLoad);
}
// Called automatically when YouTube API interface is loaded
function onYouTubeApiLoad() {
  gapi.client.setApiKey(API_KEY);
}

// Called when the search button is clicked in the html code
function search() {
  var query = document.getElementById("query").value;

  // Use the JavaScript client library to create a search.list() API call.
  var request = gapi.client.youtube.search.list({
    part: PART,
    q: encodeURIComponent(query).replace(/%20/g, "+"),
    type: "video",
    maxResults: MAX_RESULTS
  });
  //reset result
  document.getElementById("errors").innerHTML = "";
  document.getElementById("list_result").innerHTML = "";
  VIDEOS = [];
  // Send the request to the API server, call the onSearchResponse function when the data is returned
  request.execute(onSearchResponse);
}

// Triggered by this line: request.execute(onSearchResponse);
function onSearchResponse(response) {
  console.log(response.result);
  let video_ids = [];
  //display errors
  if ("error" in response) {
    document.getElementById("errors").innerHTML =
      "Error: " + response.error.code + " " + response.error.message;
    return;
  } else {
    response.result.items.forEach(item => {
      // check no duplicate
      if (video_ids.indexOf(item.id.videoId) == -1) {
        video_ids.push(item.id.videoId);
      }
    });
  }

  //create another request with the ressource videos.list
  var request_list = gapi.client.youtube.videos.list({
    part: "id,snippet,statistics",
    id: video_ids.join(",")
  });
  console.log("video_list:",video_ids.length);
  //when No results found
  //show table
  showElement('myTable');
  if(video_ids.length == 0){
    document.getElementById("list_result").innerHTML = render_no_result();
  }
  //execute request_list
  request_list.execute(function(response) {
    //display errors
    if ("error" in response) {
      document.getElementById("errors").innerHTML =
        "Error: " + response.error.code + " " + response.error.message;
      return;
    } else {
      var i = 1;
      response.result.items.forEach(item => {
        // //bind item data
        let video = new Video(
          i,
          item.id,
          item.snippet.title,
          item.snippet.publishedAt,
          item.statistics.viewCount
        );
        VIDEOS.push(video);
        document.getElementById("list_result").innerHTML += render(video);
        i++;
      });
    }
  });
}
