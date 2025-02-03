const {DataTypes} = require('sequelize')
const sequelize = require('../db')

const ClassBooking = sequelize.define('class_booking', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    status: {
        type: DataTypes.ENUM("Зарезервировано", "Посещено", "Отклонено"),
        allowNull: false
    },
    paymentStatus: {
        type: DataTypes.ENUM("Оплачено", "В ожидании", "Отменено"),
        allowNull: false
    }
})

module.exports = ClassBooking