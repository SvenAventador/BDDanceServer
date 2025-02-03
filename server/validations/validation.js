const jwt = require('jsonwebtoken')

/**
 * Класс для валидации различных типов данных.
 */
class Validation {

    /**
     * Проверяет, является ли переданное значение строкой.
     * @param {any} value - Значение для проверки.
     * @returns {boolean} `true`, если переданное значение является строкой, иначе `false`.
     */
    static isString(value) {
        return typeof value === "string"
    }

    /**
     * Проверяет, является ли переданное значение пустой строкой.
     * @param {any} value - Значение для проверки.
     * @returns {boolean} `true`, если переданное значение пустая строка, иначе `false`.
     */
    static isEmpty(value) {
        return value.trim() === ''
    }

    /**
     * Проверяет, является ли переданное значение объектом.
     * @param {any} value - Значение для проверки.
     * @returns {boolean} `true`, если переданное значение является объектом, иначе `false`.
     */
    static isObject(value) {
        return typeof value === "object" && value !== null
    }

    /**
     * Проверяет, является ли переданный объект пустым.
     * @param {object} value - Объект для проверки.
     * @returns {boolean} `true`, если объект пуст, иначе `false`.
     */
    static isEmptyObject(value) {
        return Object.keys(value).length === 0
    }

    /**
     * Проверяет, является ли переданное значение числом.
     * @param {any} value - Значение для проверки.
     * @returns {boolean} `true`, если переданное значение является числом, иначе `false`.
     */
    static isNumber(value) {
        return typeof value === "number" && !isNaN(value)
    }

    /**
     * Проверяет, является ли переданное значение корректным email-адресом.
     * @param {string} value - Email для проверки.
     * @returns {boolean} `true`, если переданное значение соответствует формату email, иначе `false`.
     */
    static isEmail(value) {
        const regex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        return regex.test(value)
    }

    /**
     * Проверяет, является ли переданный пароль допустимой длины.
     * @param {string} value - Пароль для проверки.
     * @returns {boolean} `true`, если длина пароля не менее 8 символов, иначе `false`.
     */
    static isPassword(value) {
        return value.length >= 8
    }

    /**
     * Проверяет, является ли переданное значение корректным номером телефона.
     * @param {string} phone - Номер телефона для проверки.
     * @returns {boolean} `true`, если переданное значение соответствует формату телефонного номера, иначе `false`.
     */
    static isPhone(phone) {
        const regex = /^(\+7|8)?\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/

        return this.isString(phone) && !this.isEmpty(phone) && regex.test(phone)
    }

    /**
     * Проверяет, является ли переданная строка датой в формате `YYYY-MM-DD`.
     * @param {string} value - Дата для проверки.
     * @returns {boolean} `true`, если переданное значение соответствует формату даты, иначе `false`.
     */
    static isDate(value) {
        if (typeof value !== 'string') {
            return false
        }

        const dateRegex = /^\d{4}-\d{2}-\d{2}$/
        return dateRegex.test(value)
    }

    /**
     * Проверяет, является ли переданная строка временем в формате `HH:mm`.
     * @param {string} value - Время для проверки.
     * @returns {boolean} `true`, если переданное значение соответствует формату времени, иначе `false`.
     */
    static isTime(value) {
        if (typeof value !== 'string') {
            return false;
        }

        const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/
        return timeRegex.test(value)
    }

    /**
     * Генерирует JWT-токен с переданными данными.
     * @param {number} id - ID пользователя.
     * @param {string} email - Почта пользователя.
     * @param {string|null} [phone=null] - Номер телефона пользователя (опционально).
     * @param {string|null} [fullName=null] - Полное имя пользователя (опционально).
     * @param {string} role - Роль пользователя.
     * @returns {string} Сгенерированный JWT-токен.
     */
    static generate_jwt(
        id,
        email,
        fullName = null,
        phone = null,
        role
    ) {
        const payload = {
            id,
            email,
            fullName,
            phone,
            role
        }

        return jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '24h'
        })
    }
}

module.exports = Validation