const svgWidth = 500
const svgHeight = 500
const svgPadding = 50
data = data.filter(d => d.ratio !== null)

var svg = d3.select("svg")
          .attr("width", svgWidth + svgPadding)
          .attr("height", svgHeight + svgPadding)
          .style("border", "1px solid blue")

var activeWordList = d3.select("#active-word-list")

var xScale = d3.scalePoint()
              .domain(data.map(d=>d.word))
              .range([0, svgWidth])


// Filter data for null values

removeWord = event => {
  console.log(event)
}

activeWordList
            .selectAll("button")
            .data(data, d=>d.word)
            .enter()
            .append("button")
            .text(d=>d.word)
            .on("click", removeWord)

svg
  .selectAll("rect")
  .data(data, d=>d.word)
    .enter()
    .append("rect")
      .attr("x", d => xScale(d.word))
      .attr("y", "100")
      .attr("width", "10")
      .attr("height", "200")
      .attr("fill", "blue")
