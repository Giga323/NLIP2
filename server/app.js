const express = require('express')
const cors = require('cors')
const textRouter = require('./routers/text.router')
const app = express()
const PORT = process.env.port || 3000

app.use(cors())
app.use(express.json())
app.use('/', textRouter)

app.listen(PORT, () => {
    console.log(`server starts on port ${PORT}`)
})