const inventories = require('../models/model');
// Create item in inventory
exports.createItem = async (req, res) => {
  const { name, description, price, quantity } = req.body;

  // Check if required fields are provided
  if (!name || !price || !quantity) {
    return res.status(400).json({ message: 'Name, price, and quantity are required fields' });
  }

  try {
    const newItem = await inventories.create({ name, description, price, quantity });
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error in createItems' });
  }
};


// Get all items from inventory
exports.getItem = async (req, res) => {
  try {
    const inventoryItems = await inventories.findAll();
    res.status(200).json(inventoryItems);
  } catch (error) {
    console.log('error in getitem');
    res.status(500).json({ message: 'Internal server error in getitem' });
  }
};

// Edit item in inventory
exports.editItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { name, description, price, quantity } = req.body;
    const item = await inventories.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    item.name = name;
    item.description = description;
    item.price = price;
    item.quantity = quantity;
    await item.save();
    res.status(200).json({ message: 'Item updated successfully', item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete item from inventory
exports.deleteItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const item = await inventories.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    await item.destroy();
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.buyItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;
    const item = await inventories.findByPk(itemId);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    let quantityToBuy = 0;
    if (quantity === 1) {
      quantityToBuy = 1;
    } else if (quantity === 2) {
      quantityToBuy = 2;
    } else {
      console.log( quantityToBuy);
      return res.status(400).json({ message: 'Invalid quantity' }) ;
    }

    if (item.quantity < quantityToBuy) {
      

      return res.status(400).json({ message: 'Insufficient quantity' });
    }

    item.quantity -= quantityToBuy;
    await item.save();

    res.status(200).json({ message: 'Item bought successfully', item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
