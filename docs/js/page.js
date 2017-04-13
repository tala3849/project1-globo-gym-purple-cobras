console.log("Page Loaded")

/*
  General Page functions should go here
*/

function toggleVis(btn, id){
  document.getElementById(id).style.display = (document.getElementById(id).style.display=='block')? 'none' : 'block'
  document.getElementById(btn).className = (document.getElementById(btn).className=='btn')? 'btn btn--stroke' : 'btn';
}

var DataObject = function(config){
  this.dir = config.dir

  this.load = function(){
    d3.csv(dir+'/ZayoHackathonData_Buildings.csv',function(data){
      console.log('loaded buildings')
    })
  })
}
