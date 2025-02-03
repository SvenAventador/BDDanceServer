const authService = require('../services/auth');
const {
    badRequest,
    unauthorized,
    internal
} = require("../errors/handler");
const Validation = require("../validations/validation");

/**
 * Класс для работы с авторизацией.
 * Содержит методы для регистрации, входа, проверки состояния авторизации и выхода.
 */
class Auth {
    /**
     * Регистрация нового пользователя.
     * @param {Object} req - Запрос клиента.
     * @param {Object} res - Ответ сервера.
     * @param {Function} next - Функция для передачи управления следующему middleware.
     */
    async registration(req, res, next) {
        try {
            const userData = req.body
            const token = await authService.registerUser(userData)
            res.status(201).json({token})
        } catch (error) {
            next(badRequest(error.message));
        }
    }

    /**
     * Вход пользователя в систему.
     * @param {Object} req - Запрос клиента.
     * @param {Object} res - Ответ сервера.
     * @param {Function} next - Функция для передачи управления следующему middleware.
     */
    async login(req, res, next) {
        try {
            const userData = req.body
            const token = await authService.loginUser(userData)
            res.status(201).json({token})
        } catch (error) {
            next(badRequest(error.message));
        }
    }

    /**
     * Проверка состояния авторизации пользователя.
     * @param {Object} req - Запрос клиента.
     * @param {Object} res - Ответ сервера.
     * @param {Function} next - Функция для передачи управления следующему middleware.
     */
    async check(req, res, next) {
        return res.json({
            token: Validation.generate_jwt(
                req.user.id,
                req.user.email,
                req.user.role,
                req.user.fullName,
                req.user.phone
            )
        })
    }

    /**
     * Выход пользователя из системы (удаление сессии или токена).
     * @param {Object} req - Запрос клиента.
     * @param {Object} res - Ответ сервера.
     * @param {Function} next - Функция для передачи управления следующему middleware.
     */
    async logout(req, res, next) {
        const token = req.headers.authorization
        if (!token)
            return next(unauthorized("Пользователь не авторизован!"))

        try {
            return res.json({message: "Вы успешно вышли из системы!"})
        } catch (error) {
            return next(internal(`Непредвиденная ошибка: ${error}`))
        }
    }
}

module.exports = new Auth();