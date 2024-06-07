// for pie chart total percentage sum up to 100!
var data = [
    { name: "Alex", percentage: 20.70 },
    { name: "Shelly", percentage: 30.92 },
    { name: "Clark", percentage: 15.42 },
    { name: "Matt", percentage: 13.65 },
    { name: "Jolene", percentage: 19.31 }
];

var svgWidth = 500, svgHeight = 300, radius = Math.min(svgWidth, svgHeight) / 2;

var svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .style('background-color', 'lightblue')
    ;

var g = svg.append('g')
    .attr('transform', 'translate(' + radius + ',' + radius + ')');

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

// for a doughnut chart provide innerRadius = anything greater then 0
var path = d3.arc()
    .outerRadius(radius)
    .innerRadius(50)
    ;

arc.append('path')
    .attr('d', path)
    .attr('fill', function (d) {
        return color(d.data.percentage);
    })
    ;

var label = d3.arc()
    .outerRadius(radius)
    .innerRadius(50);

arc.append("text")
    .attr("transform", function (d) {
        return "translate(" + label.centroid(d) + ")";
    })
    .text(function (d) { return d.data.name; })
    .style("font-family", "arial")
    .style("font-size", 12)
    ;