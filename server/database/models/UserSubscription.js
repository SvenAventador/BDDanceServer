const {DataTypes} = require('sequelize')
const sequelize = require('../db')

const UserSubscription  = sequelize.define('user_subscription ', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    classCount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
})

module.exports = UserSubscription