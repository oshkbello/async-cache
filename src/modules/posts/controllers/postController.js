const postService = require('../services/postService')
const validator = require('../../../helper/validation')

const postController = {}

//this method that handles request from the routes.
postController.getPosts = async (req, res, next) => {
    try {
        const validatedData = validator.validatePostRequest(req.query)
        const posts = await postService.getPosts(validatedData)
        return res.status(200).send({"posts":posts})
    } catch (error) {
        console.log((error))
        return res.status(400).send({"error":error.message})
    }
}

module.exports = postController