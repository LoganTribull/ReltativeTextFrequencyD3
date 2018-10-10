// basic parameters
const svgWidth = 500
const svgHeight = 500
const svgPadding = 50

// basic chart with default data
activeData= data.filter(d => d.ratio !== null)
activeWords = data.map(d=>d.word)
let inactiveData = []

//svg select and style and preparing axis group tags
var svg = d3.select("svg")
          .attr("width", svgWidth + svgPadding)
          .attr("height", svgHeight + svgPadding)
          .style("border", "1px solid blue")

    svg
      .append("text")
      .attr("x", "50")
      .attr("y", "50")
      .text('hey')

    svg
          .append("g")
          .attr("transform", "translate(0, " + (svgHeight) + ")")
          .attr("class", "xaxis")

// x, y, scale and axis waiting on new domain
var xScale = d3.scalePoint()
               .range([0, svgWidth])

var yScale = d3.scaleLinear()
               .range([svgHeight, 0])

var xAxis = d3.axisBottom(xScale)
var yAxis = d3.axisLeft(yScale)
d3.select("#new-text-btn")
  .attr("color", "blue")
  .on("click", updateForNewComparison)


// make chart and fill words with default data
draw(activeData)
fillWords(activeData, true)




function draw(data){

  //bestow domain onto x and y scale
  xScale.domain(activeData.map(d=>d.word))
  yScale.domain(d3.extent(activeData, d=>d.ratio))


  // add in the axis
  svg.select(".xaxis").transition().duration(300)
     .call(d3.axisBottom(xScale))

  //join bars to new active data
  var bars = svg.selectAll("rect").data(activeData, d=> d.word)

  //update section
  bars
    .transition()
    .duration(300)
      .attr("x", d=>xScale(d.word))
      .attr("width", "10")
      .attr("y", d=> yScale(d.ratio))
      .attr("height", d=>svgHeight - yScale(d.ratio))

  //enter section
  bars
      .enter()
      .append("rect")
        .transition()
        .duration(300)
          .attr("x", d=>xScale(d.word))
          .attr("width", "10")
          .attr("y", d=> yScale(d.ratio))
          .attr("height", d=> svgHeight - yScale(d.ratio))

  //exit section
  bars.exit().remove().transition().duration(300)
}

function fillWords(data, active){
  const listId= active ? "#active-word-list":"#inactive-word-list"
  const toggleFn = active? inactivateWord:activateWord
  let wordList = d3.select(listId)
    .selectAll("button")
    .data(data, d=>d.word)

  // remove unactivated words
  wordList.exit().remove()


  // append entered words
  wordList
    .enter()
    .append("button")
    .text(d=>d.word)
    .on("click", toggleFn)
}


function inactivateWord(event){
  const removeWord = event.word
  inactiveData.push(...activeData.filter(d=>d.word===removeWord))
  activeData = activeData.filter(d => d.word !== removeWord)
  draw(activeData)
  fillWords(activeData, true)
  fillWords(inactiveData, false)
}

function activateWord(event){
  const removeWord = event.word
  activeData.push(...inactiveData.filter(d=>d.word===removeWord))
  inactiveData= inactiveData.filter(d => d.word !== removeWord)
  draw(activeData)
  fillWords(activeData, true)
  fillWords(inactiveData, false)
}

function updateForNewComparison(event){
  let text1 = d3.select("#text1").property("value")
  let text2 = d3.select("#text2").property("value")
  let text1Freq = getDataFromString(text1)
  let text2Freq = getDataFromString(text2)
  let relativeFrequency = mergeFrequencyDicts(text1Freq, text2Freq)
  activeData = wordFrequencyDictToArray(relativeFrequency)
  inactiveData = []
  draw(activeData)
  fillWords(activeData, true)
  fillWords(inactiveData, false)
}
