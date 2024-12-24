const fs = require('fs');
const { API_KEY } = require('../../apiKey');
const FILE_PATH = './LSI_data.json'
const MIN_VALUE = 0.00000001

async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/papluca/xlm-roberta-base-language-detection",
		{
			headers: {
				Authorization: API_KEY,
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

const readDataModel = () => {
    const data = fs.readFileSync(FILE_PATH, 'utf-8')
    return JSON.parse(data)
}

const prepareToAlphabetMethod = (filecontent) => {
    return filecontent.toLowerCase().replaceAll(/[^a-zA-Zа-яА-ЯёЁ]/g, '').split('')
}

const prepareToShortWordsMethod = (filecontent) => {
    return filecontent.toLowerCase().replaceAll(/[^a-zA-Zа-яА-ЯёЁ ]/g, '').split(' ')
}

const calculateProbability = (preparedContent, dataModel) => {
    return preparedContent.reduce((probability, currentValue) => {
        if (dataModel[currentValue]) {
            return probability * dataModel[currentValue]
        } else {
            return probability * MIN_VALUE
        }
    }, 1)
}

const alphabetMethod = (filecontent, dataModel) => {
    const preparedContent = prepareToAlphabetMethod(filecontent)

    const probabilityOfRuContent = calculateProbability(preparedContent, dataModel['alphabetMethodRu'])
    const probabilityOfEnContent = calculateProbability(preparedContent, dataModel['alphabetMethodEn'])

    return (probabilityOfEnContent > probabilityOfRuContent) 
    ? {
        language: 'en',
        score: probabilityOfEnContent 
    }
    : {
        language: 'ru',
        score: probabilityOfRuContent
    }
}

const shortWordsMethod = (filecontent, dataModel) => {
    const preparedContent = prepareToShortWordsMethod(filecontent)

    const probabilityOfEnContent = calculateProbability(preparedContent, dataModel['shortWordsMethodEn'])
    const probabilityOfRuContent = calculateProbability(preparedContent, dataModel['shortWordsMethodRu'])

    return (probabilityOfEnContent > probabilityOfRuContent) 
    ? {
        language: 'en',
        score: probabilityOfEnContent 
    }
    : {
        language: 'ru',
        score: probabilityOfRuContent
    }
}

const recognizeDocLang = async (filecontent, method) => {
    let probabilityLang = { }
    const dataModel = readDataModel()

    if (method === 'alphabetMethod') {
        probabilityLang = alphabetMethod(filecontent, dataModel)
    }
    else if(method === 'shortWordsMethod') {
        probabilityLang = shortWordsMethod(filecontent, dataModel)
    } else if(method === 'neurolink') {
        const response = await query({"inputs": filecontent})

        probabilityLang = JSON.stringify(response[0].sort((a, b) => b.score - a.score)[0]);
        console.log(probabilityLang)
    } else {
        probabilityLang = {
            language: 'none',
            score: 'undefined'
        }
    }

    probabilityLang['filecontent'] = filecontent
    return probabilityLang
} 

module.exports.recognizeDocLang = recognizeDocLang