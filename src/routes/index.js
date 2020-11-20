const express = require('express')
const postRoutes = require('../modules/posts/routes')
const app = express()

app.route("/ping").get((req,res)=>{
    try {
        return res.status(200).send({"success":true})
    } catch (error) {
        return res.status(400).send({"error":error.message})
    }
})

app.use('/posts',postRoutes)
module.exports = app