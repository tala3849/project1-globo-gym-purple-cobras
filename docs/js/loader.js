/*  Load scripts here  */


/* This is the main page run time, because as it loads the documents,
   it must call individual visualizations
*/

var load = function(config){
  this.dir = config.dir

  this.d3.csv(dir+'/Buildings.csv',function(data){

  })
}

loadData({dir: 'data/'})
