function render_list(videos, div){
    //reset container
    div.innerHTML = '';
    videos.forEach(video =>{ 
        //console.log('item', video);
        div.innerHTML +=render(video);
      });
}
//render one row
function render(video){
    return '<tr>'+
    '<td>'+video['index']+'</td>'+
     '<td>'+video['id']+'</td>'+
     '<th scope="row"><a target="_blank" href="https://www.youtube.com/watch?v='+video['id']+'">'+video['title']+'</a></th>'+
     '<td>'+format_date(video['date'])+'</td>'+
     '<td>'+format_number(video['viewCount'])+'</td>'+
  '</tr>';
  }

function render_no_result(){
    return '<tr><td colspan="5">No matching results found!</td></tr>';
}
