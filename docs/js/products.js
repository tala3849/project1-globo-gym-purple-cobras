/*  js for services */

function createProductsVis(){
	console.log("Starting the products vis")
	console.log(pageData.products)


    var width = 600; // Width of our visualization
    var height = 600; // Height of our visualization
    var xOffset = 60; // Space for y-axis labels
    var yOffset = 150; // Space for x-axis labels
    var margin = 20; // Margin around visualization
    var vals = ['x', 'y']; // List of data attributes
    var xVal = vals[0]; // Value to plot on x-axis
    var yVal = vals[1]; // Value to plot on y-axis
    var transDur = 100; // Transition time in ms

    var zayoOrange = '#f58233'
    var zayoTeal = '#005d77'

    var length = 12;
    var data = pageData.products.slice(0,length);
    data.forEach(function(d,idx){
        d.product = d["Product Group"];
        d.idx = idx;
        d.count = +d["Count"];
        console.log(idx, d.product, d.count)
    });

    // Define scales that convert from the data domain to screen coordinates
    // This will define scales that convert values
    // from our data domain (.domain([min data value, max data value])
    // into screen coordinates (.range([min pixel value, max pixel value])).
    // Using linear scales maps the data directly to the pixel values using
    // pixel_val = c * data_val, where c is a constant computed by d3.

    // var xScale = d3.scale.linear()
    //                 .domain([0, data.length])
    //                 .range([xOffset + margin, w - margin]);
    var xScale = d3.scale.ordinal()
            .rangeRoundBands([xOffset + margin, width - margin],.1)
            .domain(data.map(function(d) { return d.product; }));

    var yScale = d3.scale.linear()
                    .domain([0, d3.max(data, function(d) { return parseFloat(d.count); })+1])
                    .range([height - yOffset - margin, margin]);

    // Next, we will create an SVG element to contain our visualization.
    var svg = d3.select("#barchart").append("svg:svg")
                                    .attr("width", width+30)
                                    .attr("height", height);


    // Build axes! (These are kind of annoying, actually...)
    // Specify the axis scale and general position
    var xAxis = d3.svg.axis()
    				  // .attr("id","xaxis")
                      .scale(xScale)
                      .orient("bottom")
                      // .ticks(5);

    // Add a graphics element to hold the axis we created above (xAxis)
    // var xAxisG = svg.append('g')
    //                 .attr('class', 'axis')
    //                 .attr('transform', 'translate(0, ' + (h - yOffset) + ')')
    //                 .call(xAxis);

    var xAxisG = svg.append('g')
                    .attr('class', 'axis')
                    .attr("transform", "translate(0," + (height-yOffset) + ")")
                    .call(xAxis)
				  .selectAll("text")
				    .attr("y", 10)
				    .attr("x", 9)
				    .attr("dy", ".35em")
				    .attr("transform", "rotate(45)")
				    .style("text-anchor", "start");

    // Add a label that shows the user what that axis represents
    var xLabel = svg.append("text")
                    .attr('class', 'label')
                    .attr('x', (width)/2 + 2*margin)
                    .attr('y', height - margin/2)
                    .text("Product")

    // Repeat for the y-axis
    var yAxis = d3.svg.axis()
                      .scale(yScale)
                      .orient("left")
                      .ticks(5);

    var yAxisG = svg.append('g')
                    .attr('class', 'axis')
                    .attr('transform', 'translate(' + xOffset + ', 0)')
                    .call(yAxis);

    var yLabel = svg.append("text")
                    .attr('class', 'label')
                    .attr('x', xOffset/2)
                    .attr('y', height/2)
                    .text("Count");

    // Now, we will start actually building our scatterplot!
    var bar = svg.selectAll('.rect') // Select elements
                .data(data);        // Bind data to elements

    // bar.enter().append('svg:rect'); // Create new elements if needed

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return "<span style='color:"+zayoOrange+"'>"+d.product+"</span>";
        })

    svg.call(tip);

    // Update our selection
    // bar
    //     .attr('class', 'rect') // Give it a class
    //     .attr('height', function(d) { return h-yScale(d.count)-yOffset-margin; })   // y-coordinate
    //     // .attr('width', function(d){return 20})
    //     .attr('x', function(d){ return xScale(d.idx) })
    //     .attr('y', function(d){ return yScale(d.count)})
    //     .append('svg:title') // tooltip
    //     .text(function(d) { return "(x val="+d.product+")"});
    bar.enter().append("rect")
      .attr("class", "rect")
      .attr("x", function(d) { return xScale(d.product); })
      .attr("y", function(d) { return yScale(d.count); })
      .attr("height", function(d) { return height-yScale(d.count)-yOffset-margin; })
      .attr("width", xScale.rangeBand());
	    // .style("fill", function(d) { return color(d.name); });

    // Prettier tooltip
    bar.on('mouseover', function(d){
        tip.show(d);
        this.style = "fill:"+zayoTeal;
    })
    bar.on('mouseout', function(d){
        tip.hide(d);
        this.style = "fill:"+zayoOrange;
    });



}
