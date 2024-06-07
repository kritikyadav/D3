var data = [
    [1, 1], [12, 20], [24, 36], [32, 50], 
    [40, 70], [50, 100],[55, 106], 
    [65, 123], [73, 130], [78, 134], 
    [83, 136], [89, 138], [100, 140]
];

var svgWidth = 500, svgHeight = 400;

var svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .style('background-color', 'lightblue'),
    // first given actual size of svg then provided margin for data insertion
    margin = 200,
    width = svg.attr("width") - margin,  //300
    height = svg.attr("height") - margin //200
    ;

// now we will give the psudo width and height for data
var xScale = d3.scaleLinear().domain([0, 100]).range([0, width]),
    yScale = d3.scaleLinear().domain([0, 200]).range([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + 100 + "," + 100 + ")");

// Title
svg.append('text')
    .attr('x', width / 2 + 100)
    .attr('y', 100)
    .attr('text-anchor', 'middle')
    .style('font-family', 'Helvetica')
    .style('font-size', 20)
    .text('Line Chart');

// X label
svg.append('text')
    .attr('x', width / 2 + 100)
    .attr('y', height - 10 + 150)
    .attr('text-anchor', 'middle')
    .style('font-family', 'Helvetica')
    .style('font-size', 12)
    .text('Independant');

// Y label
svg.append('text')
    .attr('text-anchor', 'middle')
    .attr('transform', 'translate(60,' + height + ')rotate(-90)')
    .style('font-family', 'Helvetica')
    .style('font-size', 12)
    .text('Dependant');

g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));

g.append("g")
    .call(d3.axisLeft(yScale));

svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return xScale(d[0]); })
    .attr("cy", function (d) { return yScale(d[1]); })
    .attr("r", 3)
    .attr("transform", "translate(" + 100 + "," + 100 + ")")
    .style("fill", "#CC0000");
       
var line = d3.line()
    .x(function (d) { return xScale(d[0]); })
    .y(function (d) { return yScale(d[1]); })
    .curve(d3.curveMonotoneX)

svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("transform", "translate(" + 100 + "," + 100 + ")")
    .attr("d", line)
    .style("fill", "none")
    .style("stroke", "#CC0000")
    .style("stroke-width", "2");