const NUMBER_OF_NEEDED_OCCURRENCE = 3
const NEEDED_WORD_LENGTH = 5

const transformFileContent = (filecontent) => {
    return filecontent.toLowerCase().replaceAll(/[^a-zA-Zа-яА-ЯёЁ ]/g, '').split(' ')
}

const transformWordsOccurrences = (wordOccurrencesObject, wordsQuantity) => {
    let wordOccurrences = Object.assign({}, wordOccurrencesObject)

    for (let key in wordOccurrences) {
        if (wordOccurrences[key] < NUMBER_OF_NEEDED_OCCURRENCE || key.length > NEEDED_WORD_LENGTH) {
            delete wordOccurrences[key]
        } else {
            wordOccurrences[key] = wordOccurrences[key] / wordsQuantity
        }
    }
    
    return wordOccurrences
}

const calculateWordsOccurrences = (words) => {
    let wordOccurrences = { }
    let wordsQuantity = words.length

    for (let word of words) {
        if (wordOccurrences[word]) {
            wordOccurrences[word]++
        } else {
            wordOccurrences[word] = 1
        }
    }

    const transformedWordOccurrences = transformWordsOccurrences(wordOccurrences, wordsQuantity)

    return transformedWordOccurrences
}

const shortWordsTrainingMethod = (filecontent) => {
    const words = transformFileContent(filecontent)

    const wordsOccurrences = calculateWordsOccurrences(words)

    return wordsOccurrences
}

module.exports.shortWordsTrainingMethod = shortWordsTrainingMethod