const express = require('express')
const posts = require('../controllers/postController')
const router = express()

router.route("/").get(posts.getPosts)


module.exports = router