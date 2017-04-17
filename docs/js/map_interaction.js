/* Map interaction */

var min_cost = 0;
var max_cost = 1000000

function toggleMapLayerVis(layerID){
  map.setLayoutProperty( layerID,'visibility',
  ( map.getLayoutProperty(layerID,'visibility')=='visible'? 'none' : 'visible') )
}

var oppSettings = {
  opp_1:0,
  opp_2:0,
  opp_3:0,
  opp_4:0,
  opp_5:0,
  opp_lost:0
}

var oppComparisons = {
  opp_1:'>=',
  opp_2:'>=',
  opp_3:'>=',
  opp_4:'>=',
  opp_5:'>=',
  opp_lost:'>='
}

var MapFilters = function(){

  this.filters = []
  this.revFilterOn = false;

  this.updateFilter = function(comp,prop,val){
    var new_filters = [];
    //If there are no filters, then add this filter
    if (!this.filters.length){
      this.filters.push([comp,prop,val])
      return;
    }
    //If this filter does not already exist, then add this filter
    if (this.filters.map(function(x){return [x[0], x[1]].toString()}).indexOf( [comp, prop].toString() ) < 0){
      this.filters.push([comp,prop,val])
      return
    }
    //Iterate over all of the filters, find this filter, and update it, preserving the other filters
    this.filters.forEach(function(filter){
      if(filter[0]==comp && filter[1]==prop){
        new_filters.push([comp,prop,val])
      }else{
        new_filters.push(filter)
      }
    })
    this.filters = new_filters
  }

  this.getFilters = function(){
    var oppFilters = []
    Object.keys(oppSettings).forEach(function(key){
      oppFilters.push([oppComparisons[key],key,oppSettings[key]])
    })

    var prodFilters = []
    Object.keys(prodSettings).forEach(function(key){
      prodFilters.push([prodComparisons[key],key,prodSettings[key]])
    })


    var filters = ['all'].concat(this.filters)
    filters.push(['any'].concat(oppFilters))
    filters.push(['any'].concat(prodFilters))

    return filters
  }
}

var mapFilters = new MapFilters()

function updateFiltersOnAllLayers(){
  // console.log(mapFilters.getFilters())
  // mapSetFilter
  map.setFilter('on-network',  mapFilters.getFilters())
  map.setFilter('off-network', mapFilters.getFilters())
  // activeMapLayers.forEach(function(layerID){
  //   map.setFilter(layerID, mapFilters.getFilters())
  // })
}

function clearMapRevFilter(){
  if(mapFilters.revFilterOn){
    var new_filters = [];
    mapFilters.filters.forEach(function(filter){
      if(!(filter[1]==="b_rev")){
        new_filters.push(filter)
      }
    })
    // console.log(new_filters)
    mapFilters.filters = new_filters
    mapFilters.revFilterOn = false;
    updateFiltersOnAllLayers()
  }
}

function mapRevFilter(min,max){

  mapFilters.revFilterOn = true;

  mapFilters.updateFilter('>=','b_rev',min)
  mapFilters.updateFilter('<=','b_rev',max)

  updateFiltersOnAllLayers();
}

//Opporutnity Filtering

var oppFiltering = false;
function toggleAllOpportunity(){
  oppFiltering = !oppFiltering
  if(oppFiltering){
    //opportunity filtering is enabled.
    document.getElementById('opp-1').checked = 'checked';
    oppSettings['opp_1'] = 1;
    oppComparisons['opp_1'] = ">="
    document.getElementById('opp-2').checked = 'checked';
    oppSettings['opp_2'] = 1;
    oppComparisons['opp_2'] = ">="
    document.getElementById('opp-3').checked = 'checked';
    oppSettings['opp_3'] = 1;
    oppComparisons['opp_3'] = ">="
    document.getElementById('opp-4').checked = 'checked';
    oppSettings['opp_4'] = 1;
    oppComparisons['opp_4'] = ">="
    document.getElementById('opp-5').checked = 'checked';
    oppSettings['opp_5'] = 1;
    oppComparisons['opp_5'] = ">="
    document.getElementById('opp-lost').checked = 'checked';
    oppSettings['opp_lost'] = 1;
    oppComparisons['opp_lost'] = ">="
  }else{
    document.getElementById('opp-1').checked = null;
    oppSettings['opp_1'] = 0
    oppComparisons['opp_1'] = ">="
    document.getElementById('opp-2').checked = null;
    oppSettings['opp_2'] = 0
    oppComparisons['opp_2'] = ">="
    document.getElementById('opp-3').checked = null;
    oppSettings['opp_3'] = 0
    oppComparisons['opp_3'] = ">="
    document.getElementById('opp-4').checked = null;
    oppSettings['opp_4'] = 0
    oppComparisons['opp_4'] = ">="
    document.getElementById('opp-5').checked = null;
    oppSettings['opp_5'] = 0
    oppComparisons['opp_5'] = ">="
    document.getElementById('opp-lost').checked = null;
    oppSettings['opp_lost'] = 0
    oppComparisons['opp_lost'] = ">="
  }
  updateFiltersOnAllLayers();
}

function toggleOpportunity(opp_level){

  //If oppFiltering is on and these opps are being turned off, then we need to update it:
  if(oppFiltering){
    //If this setting is active, make it inactive
    if(oppSettings[opp_level]>0){
      oppComparisons[opp_level] = '<'
      oppSettings[opp_level] = 0 //There is no such thing, so it will go away
    }else if(oppSettings[opp_level]==0){
      //It was inactive, so let's make it active
      oppComparisons[opp_level] = '>='
      oppSettings[opp_level] = 1
    }
  }else{
    //Opp filtering was NOT on, so we need to turn it on, but ONLY with this level.
    Object.keys(oppSettings).forEach(function(key){
      if(key!=opp_level){
        oppComparisons[key]  = "<"
      }else{
        oppSettings[opp_level] = 1
        oppComparisons[opp_level] = '>='
      }
    })
    //For all of the other ones, turn it off!
    //And turn on oppFiltering
    oppFiltering = true;
    document.getElementById('opp-0').checked = 'checked';
  }

  //If we have turned off all opportunity filters, then we need to kick it back on:
  var sum = 0;
  Object.keys(oppSettings).forEach(function(key){
    sum+= oppSettings[key]
  })
  if(sum==0){
    console.log("Resetting")
    oppFiltering = false
    Object.keys(oppSettings).forEach(function(key){
      oppSettings[key] = 0
      oppComparisons[key] = '>='
    })
    document.getElementById('opp-0').checked = null;
  }
  updateFiltersOnAllLayers()
}



/*

    Product Filtering

*/

//Products are:
var prodSettings = {
 'Dark Fiber - Metro':0,
 'Ethernet':0,
 'IP Services':0,
 'SONET':0,
 'FTT - Dark Fiber':0,
 'ISP':0,
 'Managed WAN-LAN':0,
 'FTT - Ethernet':0,
 'Dark Fiber - Long Haul':0,
 'FTT - Small Cell':0,
 'Wavelengths - Long Haul':0,
 'Wavelengths - Metro':0,
 'zColo':0
}

var prodComparisons = {
  'Dark Fiber - Metro':'>=',
  'Ethernet':'>=',
  'IP Services':'>=',
  'SONET':'>=',
  'FTT - Dark Fiber':'>=',
  'ISP':'>=',
  'Managed WAN-LAN':'>=',
  'FTT - Ethernet':'>=',
  'Dark Fiber - Long Haul':'>=',
  'FTT - Small Cell':'>=',
  'Wavelengths - Long Haul':'>=',
  'Wavelengths - Metro':'>=',
  'zColo':'>='
}

var prodFiltering = false;
function toggleAllProducts(){
  prodFiltering = !prodFiltering
  if(prodFiltering){
    //product filtering is enabled.
    document.getElementById('Dark Fiber - Metro').checked = 'checked';
    prodSettings['Dark Fiber - Metro'] = 1;
    prodComparisons['Dark Fiber - Metro'] = ">="
    document.getElementById('Ethernet').checked = 'checked';
    prodSettings['Ethernet'] = 1;
    prodComparisons['Ethernet'] = ">="
    document.getElementById('IP Services').checked = 'checked';
    prodSettings['IP Services'] = 1;
    prodComparisons['IP Services'] = ">="
    document.getElementById('SONET').checked = 'checked';
    prodSettings['SONET'] = 1;
    prodComparisons['SONET'] = ">="
    document.getElementById('FTT - Dark Fiber').checked = 'checked';
    prodSettings['FTT - Dark Fiber'] = 1;
    prodComparisons['FTT - Dark Fiber'] = ">="
    document.getElementById('ISP').checked = 'checked';
    prodSettings['ISP'] = 1; prodComparisons['ISP'] = ">="
  }else{
    document.getElementById('Dark Fiber - Metro').checked = null;
    prodSettings['Dark Fiber - Metro'] = 0
    prodComparisons['Dark Fiber - Metro'] = ">="
    document.getElementById('Ethernet').checked = null;
    prodSettings['Ethernet'] = 0
    prodComparisons['Ethernet'] = ">="
    document.getElementById('IP Services').checked = null;
    prodSettings['IP Services'] = 0
    prodComparisons['IP Services'] = ">="
    document.getElementById('SONET').checked = null;
    prodSettings['SONET'] = 0
    prodComparisons['SONET'] = ">="
    document.getElementById('FTT - Dark Fiber').checked = null;
    prodSettings['FTT - Dark Fiber'] = 0
    prodComparisons['FTT - Dark Fiber'] = ">="
    document.getElementById('ISP').checked = null;
    prodSettings['ISP'] = 0
    prodComparisons['ISP'] = ">="
  }
  updateFiltersOnAllLayers();
}

function toggleProduct(product){
  console.log(product)

  //If oppFiltering is on and these opps are being turned off, then we need to update it:
  if(prodFiltering){
    //If this setting is active, make it inactive
    if(prodSettings[product]>0){
      prodComparisons[product] = '<'
      prodSettings[product] = 0 //There is no such thing, so it will go away

      document.getElementById('bar-'+product).style = "fill:"+zayoOrange;

    }else if(prodSettings[product]==0){
      //It was inactive, so let's make it active
      prodComparisons[product] = '>='
      prodSettings[product] = 1
    }
  }else{
    //Opp filtering was NOT on, so we need to turn it on, but ONLY with this level.
    Object.keys(prodSettings).forEach(function(key){
      if(key!=product){
        prodComparisons[key]  = "<"
      }else{
        prodSettings[product] = 1
        prodComparisons[product] = '>='
      }
    })
    //For all of the other ones, turn it off!
    //And turn on oppFiltering
    prodFiltering = true;
    document.getElementById('prod-0').checked = 'checked';
  }

  //If we have turned off all opportunity filters, then we need to kick it back on:
  var sum = 0;
  Object.keys(prodSettings).forEach(function(key){
    sum+= prodSettings[key]
  })
  if(sum==0){
    console.log("Resetting")
    prodFiltering = false
    Object.keys(prodSettings).forEach(function(key){
      prodSettings[key] = 0
      prodComparisons[key] = '>='
    })
    document.getElementById('prod-0').checked = null;
  }
  updateFiltersOnAllLayers()
}


var wait = setInterval(function(){
  if(map.loaded()){
    document.getElementById('max_cost').addEventListener("change", function(e){
      max_cost = Math.exp(Number(e.target.value));
      document.getElementById('max_cost_val').innerHTML = '$' + makeBigNumbersPretty(max_cost)

      mapFilters.updateFilter('<=','cost',max_cost)
      updateFiltersOnAllLayers()
    });
    console.log("map loaded, clearing interaction pause")
    clearInterval(wait)
    document.getElementById('blocker-sub').style="display:none;"
    document.getElementById('blocker').style="display:none;"
  }else{
    console.log('waiting on map to load interaction')
  }
},1000)
