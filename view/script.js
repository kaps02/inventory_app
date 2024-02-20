// script.js

document.addEventListener('DOMContentLoaded', function () {
  fetchInventoryItems();
  // Add event listener for form submission
  document.getElementById('addItemForm').addEventListener('submit', async function (event) {
      event.preventDefault(); // Prevent the default form submission behavior
      const formData = new FormData(this);
      try {
          const response = await axios.post('/item', {
              name: formData.get('name'),
              description: formData.get('description'),
              price: formData.get('price'),
              quantity: formData.get('quantity')
          });
          if (response.status === 201) {
              fetchInventoryItems(); // Refresh the list after adding an item
              this.reset(); // Reset the form fields
          }
      } catch (error) {
          console.error('Error in script:',  error);
      }
  });
});

// Function to fetch inventory items and populate the list
async function fetchInventoryItems() {
  try {
      const response = await axios.get('/item');
      const inventoryItems = response.data;
      const inventoryList = document.getElementById('inventoryItems');
      inventoryList.innerHTML = ''; // Clear previous data

      // Add inventory items to the list
      inventoryItems.forEach(item => {
          const li = document.createElement('li');
          li.innerHTML = `
              <strong>${item.name}</strong> - ${item.description } -
              Price: ${item.price} - Quantity: ${item.quantity}
              <button onclick="editItem('${item.id}')">Edit</button>
              <button onclick="deleteItem('${item.id}')">Delete</button>
              <button onclick="buyItem('${item.id}', 1)">Buy 1</button>
              <button onclick="buyItem('${item.id}', 2)">Buy 2</button>
          `;
          inventoryList.appendChild(li);
      });
  } catch (error) {
      console.error('Error:', error);
  }
}

// Function to handle editing an inventory item
async function editItem(id) {
  const name = prompt('Enter new name:');
  const description = prompt('Enter new description:');
  const price = prompt('Enter new price:');
  const quantity = prompt('Enter new quantity:');
  try {
      const response = await axios.put(`/item/${id}`, { name, description, price, quantity });
      if (response.status === 200) {
          fetchInventoryItems(); // Refresh the list after editing an item
      }
  } catch (error) {
      console.error('Error:', error);
  }
}

// Function to handle deleting an inventory item
async function deleteItem(id) {
  if (!id) {
      console.error('Error: ID is undefined');
      return;
  }
  if (confirm('Are you sure you want to delete this item?')) {
      try {
          const response = await axios.delete(`/item/${id}`);
          if (response.status === 200) {
              fetchInventoryItems(); // Refresh the list after deleting an item
          }
      } catch (error) {
          console.error('Error:', error);
      }
  }
}

// Function to handle buying an inventory item
async function buyItem(id, quantity) {
  try {
      const response = await axios.put(`/buy/${id}`, { quantity });
      if (response.status === 200) {
          fetchInventoryItems(); // Refresh the list after buying an item
      }
  } catch (error) {
      console.error('Error:', error);
  }
}
