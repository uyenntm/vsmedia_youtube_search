// Your use of the YouTube API must comply with the Terms of Service:
// https://developers.google.com/youtube/terms
// Called automatically when JavaScript client library is loaded.

// Called when the search button is clicked in the html code
function search(VIDEOS) {
         console.log(VIDEOS); 
         render_list(VIDEOS,document.getElementById("list_result"));
        //  VIDEOS.forEach(video =>{ 
        //    //console.log('item', video);
        //   document.getElementById("list_result").innerHTML +=renderResult(video);
        //  });
}




