const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the inventory item model
const InventoryItem = sequelize.define('inventories', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

// Sync the model with the database
(async () => {
    try {
        await sequelize.sync(); // Sync all defined models
        console.log('Models synchronized successfully');
    } catch (error) {
        console.error('Error synchronizing models:', error);
    }
})();

module.exports = InventoryItem;
