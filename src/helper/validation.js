//Validation to check for missing tags
const validateTags = (tags)=>{
    if(!tags){
        throw new Error("tags parameter is missing")
    }
    return tags.split(",")
}

//validation to check for valid sortBy value
const validateSortBy = (sortBy)=>{
    if(sortBy && ["id", "reads", "likes", "popularity"].indexOf(sortBy) === -1){
        throw new Error("sortBy has an invalid value")
    }
    return sortBy
}

//validation to check for a valid direction value
const validateDirection = (direction)=>{
    if(direction && ["asc", "desc"].indexOf(direction) === -1){
        throw new Error("direction has an invalid value")
    }
    return direction
}

const validatePostRequest = (body)=>{
    const {tags, sortBy, direction} = body
    return {
        tags: validateTags(tags),
        sortBy: validateSortBy(sortBy),
        direction: validateDirection(direction)
    }
}

module.exports = {
    validatePostRequest,
    validateDirection,
    validateSortBy,
    validateTags,
}