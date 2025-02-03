const {DataTypes} = require('sequelize')
const sequelize = require('../db')
const UserSubscription = require("./UserSubscription")

const Subscription  = sequelize.define('subscription', {
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
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    classCount: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

Subscription.hasMany(UserSubscription)
UserSubscription.belongsTo(Subscription)

module.exports = Subscription