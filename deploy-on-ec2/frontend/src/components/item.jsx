import { useState, useEffect } from 'react';
import { api } from '../services/api';
import './Item.css';

function Item() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await api.getItems();
      setItems(data);
    } catch (err) {
      setError('Failed to load items. Make sure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Item name is required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const newItem = await api.addItem({
        name: name.trim(),
        description: description.trim() || null,
      });
      setItems([...items, newItem]);
      setName('');
      setDescription('');
    } catch (err) {
      setError('Failed to add item');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (!confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      await api.deleteItem(itemId);
      setItems(items.filter((item) => item.id !== itemId));
    } catch (err) {
      setError('Failed to delete item');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="item-container">
      <h1>Item Management</h1>

      {/* Add Item Form */}
      <div className="form-container">
        <h2>Add New Item</h2>
        <form onSubmit={handleAddItem}>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter item name"
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter item description (optional)"
              disabled={loading}
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Adding...' : 'Add Item'}
          </button>
        </form>
      </div>

      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      {/* Items List */}
      <div className="items-container">
        <h2>Items List</h2>
        {loading && items.length === 0 ? (
          <div className="loading">Loading items...</div>
        ) : items.length === 0 ? (
          <div className="no-items">No items found. Add your first item above!</div>
        ) : (
          <div className="items-list">
            {items.map((item) => (
              <div key={item.id} className="item-card">
                <div className="item-content">
                  <h3>{item.name}</h3>
                  {item.description && <p>{item.description}</p>}
                </div>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  disabled={loading}
                  className="btn-delete"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Item;

