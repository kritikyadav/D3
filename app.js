/*D3 js is mainly used to bind the data and automaticaly update it and use data as per requirement and create pychart, table, bargraph, etc... */
/*SVG used to use data to provider css like using x and y axis */
/*D3.js Scale used  */


const DUMMY_DATA = [
    {id: 'd1', value: 10, region: 'USA'},
    {id: 'd2', value: 11, region: 'India'},
    {id: 'd3', value: 12, region: 'Chaina'},
    {id: 'd4', value: 6, region: 'Germany'},
];

// get data in div.
d3.select('div') //select all div
    .selectAll('p') //select all p on page
    .data(DUMMY_DATA) //take data
    .enter() // add data
    .append('p') // add data to p
    .text(dta => dta.region)  // shows this


const xScale = d3
    .scaleBand()
    .domain(DUMMY_DATA.map((datapoint) => datapoint.region))
    .rangeRound([0, 200])
    .padding(0.1);

const yScale = d3
    .scaleLinear()
    .domain([0, 15])
    .range([200, 0]);

const container = d3
    .select('svg')
    .classed('container', true) // used to attach class 

const bars = container 
.selectAll('.bar')
.data(DUMMY_DATA)
.enter()
.append('rect')
.classed('bar',true)
.attr('width', xScale.bandwidth())
.attr('height',(data) => 200 - yScale(data.value))
.attr('x' , data => xScale(data.region))
.attr('y' , data => yScale(data.value));

// to remove 2 bars from last after 2 seconds.

setTimeout(() => {
    bars.data(DUMMY_DATA.slice(0,2)).exit().remove();
}, 2000);


const countryData = {
    items:['China', 'India', 'USA'], 
    addItem(item){
        this.items.push(item);
    },
    removeItem(index){
        this.items.splice(index, 1);
    },
    updateItem(index, newItem){
        this.items[index]= newItem;
    }
};

d3.select('ul')
    .selectAll('li')
    .data(countryData.items, data => data)
    .enter()
    .append('li')
    .text(data => data);

setTimeout(() => {
    countryData.addItem('Germany');
    d3.select('ul')
        .selectAll('li')
        .data(countryData.items, data => data) 
        .enter()
        .append('li')
        .classed('added', true)
        .text(data => data);
}, 2000);


setTimeout(() => {
    countryData.removeItem(0);
    d3.select('ul')
        .selectAll('li')
        .data(countryData.items, data => data)
        .exit()
        .classed('redundant', true);
        
}, 4000);

setTimeout(() => {
    countryData.updateItem(1,'Russia');
    d3.select('ul')
        .selectAll('li')
        .data(countryData.items, data => data)
        .exit()
        .classed('updated', true)
        .text('Russia');
}, 6000);

