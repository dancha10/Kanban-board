const jwt = require("jsonwebtoken");

module.exports = function (request, response, next) {
    try {
        const token = request.headers.authorization.split(' ')[1]
        if (!token) response.status(401).json({message: 'Пользователь не авторизирован'})

        request.user = jwt.verify(token, 'Bruh')
        next()
    } catch (e) {
        return next(response.status(401).json({message: 'Пользователь не авторизирован'}))
    }
}