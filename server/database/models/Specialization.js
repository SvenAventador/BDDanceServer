const {DataTypes} = require('sequelize')
const sequelize = require('../db')
const Trainer = require("./Trainer")

const Specialization = sequelize.define('specialization', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})

Specialization.hasMany(Trainer)
Trainer.belongsTo(Specialization)

module.exports = Specialization