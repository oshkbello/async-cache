const axios = require('axios')

//direct connection to the API used in the app
const baseUrl = "https://api.hatchways.io/"
const sendRequest = (
    endpoint,
    method = 'GET',
    data = false,
    contentType = 'application/json',
) => {
    return axios({
        url: `${baseUrl}${endpoint}`,
        method: method,
        data: data,
        headers: {
            Accept: 'application/json',
            'Content-type': contentType,
        },
    })
}

module.exports = sendRequest