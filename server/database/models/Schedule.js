const {DataTypes} = require('sequelize')
const sequelize = require('../db')
const ClassBooking = require("./ClassBooking")

const Schedule = sequelize.define('schedule', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dateAndTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    availableSlots: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
})

Schedule.hasMany(ClassBooking)
ClassBooking.belongsTo(Schedule)

module.exports = Schedule