const express = require('express')
const TextController = require('../controllers/text.controller')
const textRouter = express.Router()
const multer = require('multer');
const upload = multer();

textRouter.post('/doc/post', upload.single('file'), TextController.post)

module.exports = textRouter