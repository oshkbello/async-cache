const apiHelper = require('../../../helper/api')
const postService = {}
const cache = []

 //An async method that allows for concurrent requests to the api
const filteredPosts = async(tags, sortBy, direction) => {
	const promiseRequests = tags.map((tag) => {
		return apiHelper(`assessment/blog/posts?tag=${tag}`, 'GET')
	})

	//retrieving post data from the api one tag at a time
	const responses = await Promise.all(promiseRequests)
	const postResponses = responses.map((res) => {
		return res.data.posts
	})
	
	//create a collection of post, merges all post into a single collection and removes duplicate.
	//let posts = postResponses.flat().filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i)
	let postData = new Set(postResponses)
	let posts = [...postData]
	
	if (sortBy) {
		posts = posts.sort((a, b) => {
			if (direction === 'asc') return a[sortBy] - b[sortBy]
			return b[sortBy] - a[sortBy]
		})
	}
	return posts
}

/**  
 *  it first checks if there is an existing cache record for same request.
 *  if no previous cache entry an API call using the filteredPosts method, but if a record exist it uses the cache data
 *  and doesnt make any API calls 
 */
postService.getPosts = async ({ tags, sortBy = 'id', direction = 'asc' }) => {
	let cacheID = tags.join("") + sortBy + direction
	if (cache[cacheID]) return cache[cacheID]
	const posts = await filteredPosts(tags, sortBy, direction)
	cache[cacheID] = posts
	return posts
}

module.exports = postService