const svgWidth = 500
const svgHeight = 500
const svgPadding = 50
activeData= data.filter(d => d.ratio !== null)
inactiveData = []

inactivateWord= event => {
  inactiveData.push(...activeData.filter(d=>d.word === event.word))
  activeData = activeData.filter(d => d.word !== event.word)
  activeWordList
    .data(activeData, d=>d.word)
    .exit()
    .remove()
    .enter()
    .append("button")
    .text(d=>d.word)
    .on("click", inactivateWord)

  bars
    .data(activeData)
    .exit()
    .remove()
}

var svg = d3.select("svg")
          .attr("width", svgWidth + svgPadding)
          .attr("height", svgHeight + svgPadding)
          .style("border", "1px solid blue")

var activeWordList = d3.select("#active-word-list").
selectAll("button").
data(activeData, d=>d.word)
.enter()
.append("button")
.text(d=>d.word)
.on("click", inactivateWord)


var inactiveWordList = d3.select("#active-word-list").selectAll("button").data(inactiveData, d=>d.word)

var xScale = d3.scalePoint()
              .domain(activeData.map(d=>d.word))
              .range([0, svgWidth])

var yScale = d3.scaleLinear()
              .domain(d3.extent(activeData, d=>d.ratio))
              .range([0, svgHeight])

// Filter data for null values

var bars = svg
  .selectAll("rect")
  .data(activeData, d=>d.word)
    .enter()
    .append("rect")
      .attr("x", d => xScale(d.word))
      .attr("y", d => svgHeight - yScale(d.ratio))
      .attr("width", "10")
      .attr("height", d => yScale(d.ratio))
      .attr("fill", "blue")
