// @TODO: YOUR CODE HERE!
d3.csv("assets/data/info.csv").then((data)=> {
    console.log(data)
    data.forEach((data)=> {
      data.age = +data.age;
      data.smokes = +data.smokes;
    });

var svgWidth = 1560;
var svgHeight = 900;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

// chart area minus margins
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Create x & y scale function
var xLinearScale = d3.scaleLinear()
  .domain([30, d3.max(data, d => d.age)])
  .range([0,width]);
    
var yLinearScale = d3.scaleLinear()
  .domain([8, d3.max(data, d => d.smokes)])
  .range([height, 0]);

// Create initial axis functions
var bottomxAxis = d3.axisBottom(xLinearScale);
var leftyAxis = d3.axisLeft(yLinearScale);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// append  axis
chartGroup.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(bottomxAxis);

  // append y axis
chartGroup.append("g")
    .call(leftyAxis);

// append initial circles
var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.age))
    .attr("cy", d => yLinearScale(d.smokes))
    .attr("r", 20)
    .attr("fill", "green")
    .attr("opacity", ".5");


var state = chartGroup.append("text")
    .style("text-anchor", "middle")
    .style("font", "bold")
    .style("font-size", "15px")
    .style("font-family", "Big Calson")
    .selectAll("tspan")
    .data(data)
    .enter()
    .append("tspan")
    .attr("x", function(data) {
        return xLinearScale(data.age);
      })
    .attr("y", function(data) {
        return yLinearScale(data.smokes);
      })
    .text(function(data) {
        return data.abbr
      }); 

    var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.abbr}<br>smokes: ${d.smokes}%<br>age: ${d.age}%`);
    });

  chartGroup.call(toolTip);

  circlesGroup.on("click", function(data) {
    toolTip.show(data, this);
  })
  state.on("click", function(data) {
    toolTip.show(data, this);
  });

  // Create axes labels
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Smoke");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("Age");
  }).catch(function(error) {
    console.log(error);
  });


