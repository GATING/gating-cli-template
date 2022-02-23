const express = require('express')
const initMock = require('./index')
const app = express()
initMock(app)

app.listen(8080)
