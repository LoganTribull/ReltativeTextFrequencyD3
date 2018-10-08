const svgWidth = 500
const svgHeight = 500
const svgPadding = 50

var svg = d3.select("svg")
          .attr("width", svgWidth)
          .attr("height", svgHeight)
          .style("border", "1px solid blue")

var activeWordList = d3.select("#active-word-list")

// Filter data for null values

removeWord = event => {
  console.log(event)
}

data = data.filter(d => d.ratio !== null)

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
      .attr("x", "100")
      .attr("y", "100")
      .attr("width", "100")
      .attr("height", "200")
      .attr("fill", "blue")
