const {DataTypes} = require('sequelize')
const sequelize = require('../db')

const UserLevel = sequelize.define('user_level', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    suggestedLevel: {
        type: DataTypes.ENUM("Начинающий", "Средний", "Продвинутый"),
        allowNull: false
    }
})

module.exports = UserLevel
