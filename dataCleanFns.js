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
  // debugger
  // words.forEach(word => wordFrequencies[word] = wordFrequencies[word]/words.length)


  return wordFrequencies
}

function wordFrequencyDictToArray(wordFrequencies){
  const wordFrequencyData = Object.keys(wordFrequencies).map(k => (
    {word:k,
     ratio:wordFrequencies[k]
    }
  )
)
return wordFrequencyData
}

function getDataFromString(string, wordsToRemove){
  let cleanedText = cleanTextInput(string, wordsToRemove)
  let data = getWordFrequency(cleanedText)
  return data
}


function mergeFrequencyDicts(dict1, dict2){
  // first what words are in both articles
  dict1Keys = Object.keys(dict1)
  relativeFrequency = {}
  dict1Keys.forEach(key => {
    if(key in dict2){
      relativeFrequency[key] = dict1[key]/dict2[key]
    }
  })

  return relativeFrequency
}
