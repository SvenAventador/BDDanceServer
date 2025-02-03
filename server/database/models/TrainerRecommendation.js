const {DataTypes} = require('sequelize')
const sequelize = require('../db')

const TrainerRecommendation  = sequelize.define('trainer_recommendation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    recommendation: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

module.exports = TrainerRecommendation