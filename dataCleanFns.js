function removePunctuation(text){
  let noPunctuation= text.replace(/[^\w\s]|_/g, "")
  let collapsedWhiteSpace = noPunctuation.replace(/\s+/g, " ")
  return collapsedWhiteSpace
}

function tokenize(text, dontInclude){
  let preFilteredTokens = text.split(" ")
  return preFilteredTokens.filter(token => !dontInclude.includes(token) )
}

function cleanTextInput(text, wordsToRemove = []){
  const stopWords = ["the", "it", "he", "she"]
  let remove = wordsToRemove.concat(stopWords)
  let cleanedText = removePunctuation(text)
  return tokenize(cleanedText, remove)
}

function getWordFrequency (words){
  let wordFrequencies = {}
  words.forEach(word => {
    if(wordFrequencies[word] === undefined) wordFrequencies[word] = 1
    else wordFrequencies[word]++
  })

  return wordFrequencies
}

function wordFrequencyDictToArray(wordFrequencies){
  const wordFrequencyData = Object.keys(wordFrequencies).map(k => (
    {word:k,
     frequency:wordFrequencies[k]
    }
  )
)
return wordFrequencyData
}
