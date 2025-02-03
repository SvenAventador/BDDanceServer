const bcrypt = require('bcrypt')
const {User} = require('../database')
const Validation = require("../validations/validation");

async function registerUser(userData) {
    const {
        email,
        password,
        role = "USER"
    } = userData

    if (!Validation.isEmail(email))
        throw new Error("Пожалуйста, укажите корректную почту!")

    if (!Validation.isPassword(password))
        throw new Error("Пожалуйста, укажите корректный пароль! Длина пароля должа составлять минимум 8 символов.")

    const existingUser = await User.findOne({where: { email }})
    if (existingUser)
        throw new Error("Пользователь с такой почтой уже существует!")

    const user = await User.create({
        email,
        password: await bcrypt.hash(password, 10),
        role
    })

    return Validation.generate_jwt(
        user.id,
        user.email,
        user.role
    )
}

async function loginUser(userData) {
    const {
        email,
        password
    } = userData

    if (!Validation.isEmail(email))
        throw new Error("Пожалуйста, укажите корректную почту!")

    if (!Validation.isPassword(password))
        throw new Error("Пожалуйста, укажите корректный пароль! Длина пароля должа составлять минимум 8 символов.")

    const existingUser = await User.findOne({where: { email }})
    if (!existingUser)
        throw new Error("Пользователя с такой почтой не существует!")

    if (!bcrypt.compareSync(password, existingUser.password))
        throw new Error("Введенные пароли не существуют!")

    return Validation.generate_jwt(
        existingUser.id,
        existingUser.email,
        existingUser.role,
        existingUser.fullName,
        existingUser.phone,
    )
}

module.exports = {
    registerUser,
    loginUser
}