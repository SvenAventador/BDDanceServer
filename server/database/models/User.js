const {DataTypes} = require('sequelize')
const sequelize = require('../db')
const Feedback = require("./Feedback")
const Trainer = require("./Trainer")
const UserLevel = require("./UserLevel")
const ClassBooking = require("./ClassBooking")
const TrainerRecommendation = require("./TrainerRecommendation")
const UserSubscription = require("./UserSubscription")

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    role: {
        type: DataTypes.ENUM("USER", "ADMIN", "TRAINER"),
        defaultValue: "USER"
    }
})

User.hasMany(Feedback)
Feedback.belongsTo(User)

User.hasMany(Trainer)
Trainer.belongsTo(User)

User.hasMany(UserLevel)
UserLevel.belongsTo(User)

User.hasMany(ClassBooking)
ClassBooking.belongsTo(User)

User.hasMany(TrainerRecommendation)
TrainerRecommendation.belongsTo(User)

User.hasMany(UserSubscription)
UserSubscription.belongsTo(User)

module.exports = User
