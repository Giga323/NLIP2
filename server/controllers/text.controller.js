const express = require('express')
const pdf = require('pdf-parse')
const recognizeDocLang = require('../models/recognizeDocLang')

class TextController {

    async post(req, res) {
        const method = req.query.method
        const file = req.file

        console.log(req, method, file)

        if (!file) {
            return res.status(400).send('No file')
        }

        const filecontent = await pdf(file.buffer)
        
        const language = await recognizeDocLang.recognizeDocLang(filecontent.text, method)

        res.send(language)
    }
}

module.exports = new TextController()