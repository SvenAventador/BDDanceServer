/**
 * Класс для обработки ошибок с HTTP-статусами.
 */
class ErrorHandler extends Error {
    /**
     * Создает экземпляр ошибки с заданным статусом и сообщением.
     * @param {number} status - HTTP-статус ошибки.
     * @param {string} message - Описание ошибки.
     */
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }

    /**
     * Создает ошибку `400 Bad Request`.
     * @param {string} message - Описание ошибки.
     * @returns {ErrorHandler} Экземпляр ошибки.
     */
    static badRequest(message) {
        return new ErrorHandler(400, message)
    }

    /**
     * Создает ошибку `401 Unauthorized`.
     * @param {string} message - Описание ошибки.
     * @returns {ErrorHandler} Экземпляр ошибки.
     */
    static unauthorized(message) {
        return new ErrorHandler(401, message)
    }

    /**
     * Создает ошибку `403 Forbidden`.
     * @param {string} message - Описание ошибки.
     * @returns {ErrorHandler} Экземпляр ошибки.
     */
    static forbidden(message) {
        return new ErrorHandler(403, message)
    }

    /**
     * Создает ошибку `404 Not Found`.
     * @param {string} message - Описание ошибки.
     * @returns {ErrorHandler} Экземпляр ошибки.
     */
    static notFound(message) {
        return new ErrorHandler(404, message)
    }

    /**
     * Создает ошибку `409 Conflict`.
     * @param {string} message - Описание ошибки.
     * @returns {ErrorHandler} Экземпляр ошибки.
     */
    static conflict(message) {
        return new ErrorHandler(409, message)
    }

    /**
     * Создает ошибку `500 Internal Server Error`.
     * @param {string} message - Описание ошибки.
     * @returns {ErrorHandler} Экземпляр ошибки.
     */
    static internal(message) {
        return new ErrorHandler(500, message)
    }
}

module.exports = ErrorHandler