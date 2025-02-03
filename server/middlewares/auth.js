const ErrorHandler = require('../errors/handler')
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        return next();
    }

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(ErrorHandler.unauthorized('Отсутствует заголовок Authorization!'))
        }

        const token = authHeader.split(' ')[1]
        if (!token)
            return next(ErrorHandler.unauthorized('Токен не найден в заголовке Authorization!'))

        req.user = jwt.verify(token, process.env.SECRET_KEY)
        next()
    } catch (error) {
        console.error("Ошибка авторизации:", error)
        return next(ErrorHandler.unauthorized('Неверный или истекший токен!'))
    }
}
