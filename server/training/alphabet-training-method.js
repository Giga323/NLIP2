const transformFileContent = (filecontent) => {
    return filecontent.toLowerCase().replaceAll(/[^a-zA-Zа-яА-ЯёЁ]/g, '').split('')
}

const calculateLetterOccurrences = (letters) => {
    let letterOccurrences = { }
    const lettersQuantity = letters.length

    letters.map((letter) => {
        if (letterOccurrences[letter]) {
            letterOccurrences[letter]++
        } else {
            letterOccurrences[letter] = 1
        }
    })

    for (const key in letterOccurrences) {
        letterOccurrences[key] = letterOccurrences[key] / lettersQuantity
    }

    return letterOccurrences
}

const alphabetTrainingMethod = (filecontent) => {
    const letters = transformFileContent(filecontent)

    const letterOccurrences = calculateLetterOccurrences(letters)

    return letterOccurrences
}

module.exports.alphabetTrainingMethod = alphabetTrainingMethod
