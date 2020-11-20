
const express = require('express')
const bodyParser = require('body-parser')
const appRoute = require('./src/routes')

const app = express()

app.use(bodyParser.json())

//load application routes
app.use('/api', appRoute)

module.exports = app