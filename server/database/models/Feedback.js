const {DataTypes} = require('sequelize')
const sequelize = require('../db')

const Feedback = sequelize.define('feedback', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true
    }
})

module.exports = Feedback