const ApiError = require('../exceptions/ApiError')
module.exports = function (error, request, response, next) {
    console.log(error)
    if (error instanceof ApiError) {
        return response.status(error.status).json({message: error.message, errors: error.error})
    }
    return response.status(500).json({message: 'ApiError'})
}