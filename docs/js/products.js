/*  js for services */

function createProductsVis(){
	console.log("Starting the products vis")
	console.log(pageData.products)


    var w = 600; // Width of our visualization
    var h = 400; // Height of our visualization
    var xOffset = 60; // Space for x-axis labels
    var yOffset = 40; // Space for y-axis labels
    var margin = 10; // Margin around visualization
    var vals = ['x', 'y']; // List of data attributes
    var xVal = vals[0]; // Value to plot on x-axis
    var yVal = vals[1]; // Value to plot on y-axis
    var transDur = 100; // Transition time in ms

    var zayoOrange = '#f58233'
    var zayoTeal = '#005d77'


    var data = pageData.products;
    data.forEach(function(d,idx){
    	// console.log(d["Product Group"], d["Count"])
        d.product = d["Product Group"];
        d.idx = idx;
        d.y = +d["Count"];
        console.log(idx, d.product, d.y)
    });

    // Define scales that convert from the data domain to screen coordinates
    // This will define scales that convert values
    // from our data domain (.domain([min data value, max data value]) 
    // into screen coordinates (.range([min pixel value, max pixel value])).
    // Using linear scales maps the data directly to the pixel values using
    // pixel_val = c * data_val, where c is a constant computed by d3.
    var xScale = d3.scale.linear()
                    .domain([0, data.length])
                    .range([xOffset + margin, w - margin]);
    
    var yScale = d3.scale.linear()
                    .domain([0, d3.max(data, function(d) { return parseFloat(d.y); })+1])
                    .range([h - yOffset - margin, margin]);
    
    // Next, we will create an SVG element to contain our visualization.
    var svg = d3.select("#barchart").append("svg:svg")
                                    .attr("width", w)
                                    .attr("height", h);
    

    // Build axes! (These are kind of annoying, actually...)
    // Specify the axis scale and general position
    var xAxis = d3.svg.axis()
                      .scale(xScale)
                      .orient("bottom")
                      .ticks(5);
    
    // Add a graphics element to hold the axis we created above (xAxis)
    var xAxisG = svg.append('g')
                    .attr('class', 'axis')
                    .attr('transform', 'translate(0, ' + (h - yOffset) + ')')
                    .call(xAxis);
    
    // Add a label that shows the user what that axis represents
    var xLabel = svg.append("text")
                    .attr('class', 'label')
                    .attr('x', (w)/2 + 2*margin)
                    .attr('y', h - margin/2)
                    .text("Product");
    
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
                    .attr('y', h/2)
                    .text("Count");

    // Now, we will start actually building our scatterplot!
    var bar = svg.selectAll('.rect') // Select elements
                .data(data);        // Bind data to elements

    bar.enter().append('svg:rect'); // Create new elements if needed

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return "<span style='color:"+zayoOrange+"'>"+d.product+"</span>";
        })

    svg.call(tip);

    // Update our selection
    bar
        .attr('class', 'rect') // Give it a class
        .attr('height', function(d) { return h-yScale(d.y)-yOffset-margin; })   // y-coordinate
        // .attr('width', function(d){return 20})
        .attr('x', function(d){ return xScale(d.idx) })
        .attr('y', function(d){ return yScale(d.y)})
        .append('svg:title') // tooltip
        .text(function(d) { return "(x val="+d.product+")"});            

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
