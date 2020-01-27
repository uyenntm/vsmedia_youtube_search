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
     '<th scope="row">'+video['title']+'</th>'+
     '<td>'+video['date']+'</td>'+
     '<td>'+video['viewCount']+'</td>'+
  '</tr>';
  }