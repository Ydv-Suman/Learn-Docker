const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = {
  // Get all items
  async getItems() {
    const response = await fetch(`${API_BASE_URL}/api/items`);
    if (!response.ok) {
      throw new Error('Failed to fetch items');
    }
    return response.json();
  },

  // Add a new item
  async addItem(item) {
    const response = await fetch(`${API_BASE_URL}/api/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error('Failed to add item');
    }
    return response.json();
  },

  // Delete an item
  async deleteItem(itemId) {
    const response = await fetch(`${API_BASE_URL}/api/items/${itemId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete item');
    }
  },
};

