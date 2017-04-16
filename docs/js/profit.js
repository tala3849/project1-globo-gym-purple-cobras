/*  js for services */

function createProfitVis(){
	console.log("Starting the profit scatterplot vis")
	console.log(pageData.products)


    var width = 600; // Width of our visualization
    var height = 500; // Height of our visualization
    var xOffset = 60; // Space for y-axis labels
    var yOffset = 150; // Space for x-axis labels
    var margin = 5; // Margin around visualization
    // var transDur = 100; // Transition time in ms

    var zayoOrange = '#f58233'
    var zayoTeal = '#005d77'


        var unlog = function(d) {
            if (d>0){
                return "$"+Math.pow(10,d).toFixed(2)
            }
            else if(d==0){
                return '$0.00';
            }
            else {
                return "-$"+Math.pow(10,-d).toFixed(2)
            }
        }


    var data = pageData.profit;
    data.forEach(function(d,idx){
        d.buildingId = d["Building ID"];
        d.idx = idx;
        if (+d['profit']>1){
            d.profit = Math.log10(+d['profit']);
        }
        else if(+d['profit']<1 && +d['profit']>=0){
            d.profit = 0;
        }
        else { //if(+d['profit']<0)
            d.profit = -Math.log10(-1* +d['profit']);
        }
        // d.profit = +d["profit"];
        console.log(idx, d.buildingId, d.profit)
    });




    // Define scales that convert from the data domain to screen coordinates
    // This will define scales that convert values
    // from our data domain (.domain([min data value, max data value])
    // into screen coordinates (.range([min pixel value, max pixel value])).
    // Using linear scales maps the data directly to the pixel values using
    // pixel_val = c * data_val, where c is a constant computed by d3.

    var xScale = d3.scale.linear()
                    .domain([0, d3.max(data, function(d) { return parseFloat(d.idx); })+1])
                    .range([xOffset + margin, width - margin]);

    // var yScale = d3.scale.log()
    //                 .domain([0.0001, d3.max(data, function(d) { return parseFloat(d.profit); })+1])
    //                 .range([height - yOffset - margin, margin]);

    var yScale = d3.scale.linear()
                    .domain([d3.min(data, function(d) { return parseFloat(d.profit); })-1,
                             d3.max(data, function(d) { return parseFloat(d.profit); })+1])
                    .range([height - yOffset - margin, margin]);

    console.log("yscale 10",yScale(10))


    // Next, we will create an SVG element to contain our visualization.
    var svg = d3.select("#scatterplot").append("svg:svg")
                                    .attr("width", width)
                                    .attr("height", height)
                                    .attr("id","scattersvg");


    // Build axes!
    // Specify the axis scale and general position
    var xAxis = d3.svg.axis()
                      .scale(xScale)
                      .orient("bottom")
                      // .ticks(5);

    // Add a graphics element to hold the axis we created above (xAxis)
    var xAxisG = svg.append('g')
                    .attr('class', 'axis')
				    .attr('id','xaxis-scatter')
                    .attr("transform", "translate(0," + (height-yOffset) + ")")
                    .call(xAxis)

    // Add a label that shows the user what that axis represents
    var xLabel = svg.append("text")
                    .attr('class', 'label')
                    .attr('x', (width)/2 + 2*margin)
                    .attr('y', height-yOffset+d3.select('#xaxis-scatter').node().getBoundingClientRect().height+10) //puts axis label below individual labels
                    .text("Buildings")

    // Repeat for the y-axis
    var yAxis = d3.svg.axis()
                      .scale(yScale)
                      .orient("left")
                      .ticks(8)
                      .tickFormat(function(d) { return unlog(d).slice(0,-3)
                        // if (d>0){
                        //     return "$"+Math.pow(10,d)
                        // }
                        // else if(d==0){
                        //     return 0;
                        // }
                        // else {
                        //     return "$-"+Math.pow(10,-d)
                        // }
                    })

    var yAxisG = svg.append('g')
                    .attr('class', 'axis')
                    .attr('transform', 'translate(' + xOffset + ', 0)')
                    .call(yAxis);

    var yLabel = svg.append("text")
                    .attr('class', 'label')
                    .attr('x', -(height-yOffset)/2)
                    .attr('y', 10)
				    // .attr("dy", ".35em")
				    .attr("transform", "rotate(270)")
				    .style("text-anchor", "start")
                    .text("Profit");

    // Now, we will start actually building our scatterplot!
    var point = svg.selectAll('.point') // Select elements
                .data(data);        // Bind data to elements





    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return "<span style='color:white'>"+d.buildingId+"</br>Profit = "+(unlog(d.profit))+"</span>";
        })

    svg.call(tip);

    point.enter().append("circle")
        .attr("class", "point")
        .attr('cx', function(d) { return xScale(d.idx); })    // x-coordinate
        .attr('cy', function(d) {
                // console.log("profit",yScale(d.profit));
                return yScale(d.profit); })    // y-coordinate
        .attr('r',4)

    // Prettier tooltip
    point.on('mouseover', function(d){
        tip.show(d);
        this.style = "fill:"+zayoTeal;
    })
    point.on('mouseout', function(d){
        tip.hide(d);
        this.style = "fill:"+zayoOrange;
    });


}
