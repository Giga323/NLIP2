const fs = require('fs')
const shortWordsMethod = require('./short-words-training-method')
const alphabetMethod = require('./alphabet-training-method')
const ROOT_DIRECTORY = `./training-texts`

const readDir = (language) => {
    return fs.readdirSync(`${ROOT_DIRECTORY}/${language}`)
}

const readFiles = (files, language) => {
    return files.map((filename) => {
        return fs.readFileSync(`${ROOT_DIRECTORY}/${language}/${filename}`)
    }).join(' ')
}

const writeFile = (filename, data) => {
    const jsonData = JSON.stringify(data)
    fs.writeFileSync(filename, jsonData)
}

const main = () => {
    const enFiles = readDir('en')
    const ruFiles = readDir('ru')

    const contentEnFiles = readFiles(enFiles, 'en')
    const contentRuFiles = readFiles(ruFiles, 'ru')

    const shortWordsMethodOccurrencesEn = shortWordsMethod.shortWordsTrainingMethod(contentEnFiles)
    const shortWordsMethodOccurrencesRu = shortWordsMethod.shortWordsTrainingMethod(contentRuFiles)

    const alphabetMethodOccurrencesEn = alphabetMethod.alphabetTrainingMethod(contentEnFiles)
    const alphabetMethodOccurrencesRu = alphabetMethod.alphabetTrainingMethod(contentRuFiles)

    console.log(alphabetMethodOccurrencesEn, alphabetMethodOccurrencesRu)

    const LSI = {
        shortWordsMethodEn: shortWordsMethodOccurrencesEn,
        shortWordsMethodRu: shortWordsMethodOccurrencesRu,
        alphabetMethodEn: alphabetMethodOccurrencesEn,
        alphabetMethodRu: alphabetMethodOccurrencesRu
    }

    writeFile('LSI_data.json', LSI)
}

main()