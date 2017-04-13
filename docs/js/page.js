console.log("Page Loaded")

/*
  Page functions should go here
*/

function toggleVis(btn, id){
  document.getElementById(id).style.display = (document.getElementById(id).style.display=='block')? 'none' : 'block'
  document.getElementById(btn).className = (document.getElementById(btn).className=='btn')? 'btn btn--stroke' : 'btn';
}
