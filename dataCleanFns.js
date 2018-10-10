function removePunctuation(text){
  let noPunctuation= text.replace(/[^\w\s]|_/g, "")
  let collapsedWhiteSpace = noPunctuation.replace(/\s+/g, " ")
  return collapsedWhiteSpace
}

function tokenize(text, dontInclude){
  let preFilteredTokens = text.split(" ")
  return preFilteredTokens.filter(token => !dontInclude.includes(token) )
}
