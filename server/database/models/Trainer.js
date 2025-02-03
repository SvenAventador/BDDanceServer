const {DataTypes} = require('sequelize')
const sequelize = require('../db')
const Schedule = require('../models/Schedule')
const Feedback = require("./Feedback")
const Class = require("./Class")
const TrainerRecommendation = require("./TrainerRecommendation")

const Trainer = sequelize.define('trainer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    experience: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

Trainer.hasMany(Feedback)
Feedback.belongsTo(Trainer)

Trainer.hasMany(Class)
Class.belongsTo(Trainer)

Trainer.hasMany(TrainerRecommendation)
TrainerRecommendation.belongsTo(Trainer)

Trainer.hasMany(Schedule)
Schedule.belongsTo(Trainer)

module.exports = Trainer