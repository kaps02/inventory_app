// routes/route.js
const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/controller');

// Routes
// Routes for inventory management
router.post('/item', inventoryController.createItem);
router.get('/item', inventoryController.getItem);
router.put('/buy/:itemId', inventoryController.buyItem);

router.put('/item/:itemId', inventoryController.editItem);
router.delete('/item/:itemId', inventoryController.deleteItem);

module.exports = router;
