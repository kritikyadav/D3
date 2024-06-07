var linedata = [
    [1, 1], [12, 20], [24, 36], [32, 50],
    [40, 70], [50, 100], [55, 106],
    [65, 123], [73, 130], [78, 134],
    [83, 136], [89, 138], [100, 140]
];

var svgWidth = 500, svgHeight = 400;

var svg = d3.select('svg.line-chart')
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
    .data(linedata)
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
    .datum(linedata)
    .attr("class", "line")
    .attr("transform", "translate(" + 100 + "," + 100 + ")")
    .attr("d", line)
    .style("fill", "none")
    .style("stroke", "#CC0000")
    .style("stroke-width", "2");


//--------------------- doughnut chart ---------------------

var data = [
    { name: "Alex", percentage: 20.70 },
    { name: "Shelly", percentage: 30.92 },
    { name: "Clark", percentage: 15.42 },
    { name: "Matt", percentage: 13.65 },
    { name: "Jolene", percentage: 19.31 }
];

var svgWidth = 500, svgHeight = 400, radius = Math.min(svgWidth, svgHeight) / 2;

var svg = d3.select('svg.doughnut-chart')
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .style('background-color', 'lightblue')
    ;

var g = svg.append('g')
    .attr('transform', 'translate(' + radius + ',' + radius + ')');

svg.append('text')
    .attr('x', svgWidth - 90)
    .attr('y', 50)
    .attr('text-anchor', 'middle')
    .style('font-family', 'Helvetica')
    .style('font-size', 20)
    .text('Doughnut Chart');

var color = d3.scaleOrdinal()
    .range(d3.schemeCategory10)
    ;

var pie = d3.pie()
    .value(function (d) { return d.percentage; })
    ;

var arc = g.selectAll('arc')
    .data(pie(data))
    .enter()
    .append('g')
    ;

var path = d3.arc()
    .outerRadius(radius)
    .innerRadius(radius / 2)
    ;

arc.append('path')
    .attr('d', path)
    .attr('fill', function (d) {
        return color(d.data.percentage);
    })
    ;

var label = d3.arc()
    .outerRadius(radius)
    .innerRadius(radius / 2)
    ;

arc.append("text")
    .attr("transform", function (d) {
        return "translate(" + label.centroid(d) + ")";
    })
    .text(function (d) { return d.data.name; })
    .style("font-family", "arial")
    .style("font-size", 12)
    ;



// --------------Pie chart with data same as above ----------------------

var svgWidth = 500, svgHeight = 400, radius = Math.min(svgWidth, svgHeight) / 2;

var svg = d3.select('svg.pie-chart')
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .style('background-color', 'lightblue')
    ;

var g = svg.append('g')
    .attr('transform', 'translate(' + radius + ',' + radius + ')');

svg.append('text')
    .attr('x', svgWidth - 90)
    .attr('y', 50)
    .attr('text-anchor', 'middle')
    .style('font-family', 'Helvetica')
    .style('font-size', 20)
    .text('Pie Chart');


var color = d3.scaleOrdinal()
    .range(d3.schemeCategory10)
    ;

var pie = d3.pie()
    .value(function (d) { return d.percentage; })
    ;

var arc = g.selectAll('arc')
    .data(pie(data))
    .enter()
    .append('g')
    ;

// for a dougnut chart provide innerRadius = anything greater then 0
var path = d3.arc()
    .outerRadius(radius)
    .innerRadius(0)
    ;

arc.append('path')
    .attr('d', path)
    .attr('fill', function (d) {
        return color(d.data.percentage);
    })
    ;

// If dougnut chart then innerRadius > 0 for label also
var label = d3.arc()
    .outerRadius(radius)
    .innerRadius(0);

arc.append("text")
    .attr("transform", function (d) {
        return "translate(" + label.centroid(d) + ")";
    })
    .text(function (d) { return d.data.name; })
    .style("font-family", "arial")
    .style("font-size", 12)
    ;

// ----------------bar chart-----------------------

var dataset1 = [33, 57, 84, 21, 60]

var svgWidth = 500, svgHeight = 400;

var svg = d3.select('svg.bar-chart')
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .style('background-color', 'lightblue'),
    margin = 200,
    width = svg.attr("width") - margin,  //300
    height = svg.attr("height") - margin //200
    ;

var xScale = d3.scaleBand().range([0, width]).padding(0.5),
    yScale = d3.scaleLinear().range([height, 0]);

svg.append('text')
    .attr('x', width / 2 + 100)
    .attr('y', 100)
    .attr('text-anchor', 'middle')
    .style('font-family', 'Helvetica')
    .style('font-size', 20)
    .text('Bar Chart');

var g = svg.append("g")
    .attr("transform", "translate(" + 100 + "," + 100 + ")");


xScale.domain(dataset1);
yScale.domain([0, 100]);

g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale).tickFormat(function (d) {
        return "sale: " + d;
    })
    );

g.append("g")
    .call(d3.axisLeft(yScale).tickFormat(function (d) {
        return "$" + d;
    }).ticks(4));

g.selectAll(".bar")
    .data(dataset1)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function (d) { return xScale(d); })
    .attr("y", function (d) { return yScale(d); })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) { return height - yScale(d); })
    .attr('fill', 'green')
    ;

var text = svg.selectAll('bar.text')
    .data(dataset1)
    .enter()
    .append('text')
    .text(function (d) { return '$'+d; })
    .attr('x', function (d, i) { return width - 170 + 54 * i; })
    .attr('y', function (d, i) { return  yScale(d) + 115; })
    .attr('fill', 'white');