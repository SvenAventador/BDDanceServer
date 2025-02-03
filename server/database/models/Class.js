const {DataTypes} = require('sequelize')
const sequelize = require('../db')
const Schedule = require('../models/Schedule')

const Class = sequelize.define('class', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    maxParticipant: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    level: {
        type: DataTypes.ENUM("Начинающий", "Средний", "Продвинутый"),
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

Class.hasMany(Schedule)
Schedule.belongsTo(Class)

module.exports = Class