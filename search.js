// Your use of the YouTube API must comply with the Terms of Service:
// https://developers.google.com/youtube/terms
// Called automatically when JavaScript client library is loaded.

//CONSTANT VARIABLES
const PART = "snippet";
const MAX_RESULTS = 10;
const API_KEY = "AIzaSyA3kt3hajtVT7PaBoIQczEyyM0WP0T1e4c";
//const API_KEY = "----";
const TPL = 'tpl/list_item.html';
//-------

//----Utility----

//display number with comma
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

  // Use the JavaScript client library to create a search.list() API call.
  var request = gapi.client.youtube.search.list({
    part: PART,
    q: encodeURIComponent(query).replace(/%20/g, "+"),
    type: "video",
    // order: order,
    maxResults: MAX_RESULTS
  });
  //reset result
  document.getElementById("errors").innerHTML = '';
  document.getElementById("list_result").innerHTML = '';
  // Send the request to the API server, call the onSearchResponse function when the data is returned
  request.execute(onSearchResponse);
}

// Triggered by this line: request.execute(onSearchResponse);
function onSearchResponse(response) {
  console.log(response.result);
  let video_ids = [];
  if ('error' in response) {
    document.getElementById("errors").innerHTML ="Error: "+response.error.code+ " " + response.error.message;
    return;
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
        document.getElementById("errors").innerHTML = "Error: "+response.error.code+ " " + response.error.message;
        return
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

function sortTable(n, type="string") {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc"; 
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 1; i < (rows.length - 1); i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /*check if the two rows should switch place,
        based on the direction, asc or desc:*/
        if(type == 'string'){
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                  //if so, mark as a switch and break the loop:
                  shouldSwitch= true;
                  break;
                }
              } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                  //if so, mark as a switch and break the loop:
                  shouldSwitch = true;
                  break;
                }
              }
        }
        if(type == 'number'){
            if (dir == "asc") {
                if (Number(x.innerHTML) > Number(y.innerHTML)) {
                  //if so, mark as a switch and break the loop:
                  shouldSwitch= true;
                  break;
                }
              } else if (dir == "desc") {
                if (Number(x.innerHTML) < Number(y.innerHTML)) {
                  //if so, mark as a switch and break the loop:
                  shouldSwitch = true;
                  break;
                }
              }
        }
        
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        //Each time a switch is done, increase this count by 1:
        switchcount ++;      
      } else {
        /*If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again.*/
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
