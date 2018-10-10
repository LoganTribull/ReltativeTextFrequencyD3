function removePunctuation(text){
  let noPunctuation= text.replace(/[^\w\s]|_/g, "")
  let collapsedWhiteSpace = noPunctuation.replace(/\s+/g, " ")
  return collapsedWhiteSpace
}
