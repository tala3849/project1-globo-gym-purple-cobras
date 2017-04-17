/*  js for services */

function createProductsVis(){
	console.log("Starting the products vis")
	// console.log(pageData.products)

    var width = 600; // Width of our visualization
    var height = 450; // Height of our visualization
    var xOffset = 60; // Space for y-axis labels
    var yOffset = 150; // Space for x-axis labels
    var margin = 5; // Margin around visualization
    var transDur = 100; // Transition time in ms
    var length = 13;
    var data = pageData.products.slice(0,length);
    data.forEach(function(d,idx){
        d.product = d["Product Group"];
        d.idx = idx;
        d.count = +d["Count"];
        // console.log(idx, d.product, d.count)
    });

    var xScale = d3.scale.ordinal()
            .rangeRoundBands([xOffset + margin, width - margin],.1)
            .domain(data.map(function(d) { return d.product; }));

    var yScale = d3.scale.linear()
                    .domain([0, d3.max(data, function(d) { return parseFloat(d.count); })+1])
                    .range([height - yOffset - margin, margin]);

    // Next, we will create an SVG element to contain our visualization.
    var svg = d3.select("#barchart").append("svg:svg")
                                    .attr("width", width)
                                    .attr("height", height)
                                    .attr("id","barchartsvg");


    // Build axes!
    // Specify the axis scale and general position
    var xAxis = d3.svg.axis()
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
				    .attr('id','xaxis')
                    .attr("transform", "translate(0," + (height-yOffset) + ")")
                    .call(xAxis)
				  .selectAll("text")
				    .attr("y", 10)
				    .attr("x", 9)
				    .attr("dy", ".35em")
				    .attr("transform", "rotate(45)")
				    .style("text-anchor", "start");
	// console.log("X axis width:",d3.select('#xaxis').node().getBoundingClientRect().width)

    // Update width of scatterplot to accommodate long rotated x-axis labels
    d3.select("#barchartsvg")
    		.attr("width", d3.select('#barchart').node().getBoundingClientRect().width)

    // Add a label that shows the user what that axis represents
    var xLabel = svg.append("text")
                    .attr('class', 'label')
                    .attr('x', (width)/2 + 2*margin)
                    .attr('y', height-yOffset+d3.select('#xaxis').node().getBoundingClientRect().height) //puts axis label below individual labels
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
                    .attr('x', -(height-yOffset)/2)
                    .attr('y', 10)
				    // .attr("dy", ".35em")
				    .attr("transform", "rotate(270)")
				    .style("text-anchor", "start")
                    .text("# Buildings");

    // Now, we will start actually building our scatterplot!
    var bar = svg.selectAll('.rect') // Select elements
                .data(data);        // Bind data to elements

    // bar.enter().append('svg:rect'); // Create new elements if needed

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return "<span style='color:white'>"+d.product+"</br>"+d.count+" buildings</span>";
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
			.attr("id", function(d) { return "bar-"+d.product; })
      .attr("height", function(d) { return height-yScale(d.count)-yOffset-margin; })
      .attr("width", xScale.rangeBand());
	    // .style("fill", function(d) { return color(d.name); });

    // Prettier tooltip
    bar.on('mouseover', function(d){
        tip.show(d);
        // this.style = "fill:"+zayoTeal;
				d3.select(this).style("cursor", "pointer")
    })

		bar.on('click',function(d){
			console.log(d)
			toggleProduct(d.product)
			if(prodSettings[d.product] > 0){
				document.getElementById(d.product).checked = 'checked';
				this.style = "fill:"+zayoTeal;
			}else{
				document.getElementById(d.product).checked = null;
				this.style = "fill:"+zayoOrange;
			}
			console.log(this)
		})

    bar.on('mouseout', function(d){
        tip.hide(d);
				d3.select(this).style("cursor", "default")
        // this.style = "fill:"+zayoOrange;
    });
}
