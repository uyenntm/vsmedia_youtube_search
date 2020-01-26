function sortTable(VIDEOS,col, type="string") {
  //  console.log('Sort:');
  //  console.log(VIDEOS[0][col],VIDEOS[1][col],VIDEOS[0][col]>VIDEOS[1][col] );
   let sort_type = getTypeSort(VIDEOS,col);
   console.log('sort_type',sort_type)
   VIDEOS.sort(compareValues(col,sort_type));
  render_list(VIDEOS,document.getElementById("list_result"));
  // console.log('After Sort:');
  // console.log(VIDEOS, col);
  }

  function getTypeSort(videos,col){
    if(videos.length >=3){
      //isASC = true;
      if(videos[0][col]<videos[1][col] && videos[1][col]< videos[2][col]){  
        return 'desc';
      }
      else {
        return 'asc';
      }
    }
    else{
      //isASC = true;
      if(videos[0][col]<videos[1][col] ){  
        return 'desc';
      }
      else {
        return 'asc';
      }
    }
  }

  function compareValues(key, order = 'asc') {
    
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
      console.log('compare order:', order);
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }