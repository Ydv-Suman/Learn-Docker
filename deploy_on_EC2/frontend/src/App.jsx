import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newItem, setNewItem] = useState({ name: '', description: '' })
  const [status, setStatus] = useState('')

  const API_URL = '/api'

  useEffect(() => {
    fetchItems()
    checkHealth()
  }, [])

  const checkHealth = async () => {
    try {
      const response = await fetch(`${API_URL}/health`)
      const data = await response.json()
      setStatus(data.status)
    } catch (err) {
      setStatus('unhealthy')
    }
  }

  const fetchItems = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/items`)
      if (!response.ok) throw new Error('Failed to fetch items')
      const data = await response.json()
      setItems(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      })
      if (!response.ok) throw new Error('Failed to create item')
      const data = await response.json()
      setItems([...items, data])
      setNewItem({ name: '', description: '' })
      setError(null)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/items/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete item')
      setItems(items.filter(item => item.id !== id))
      setError(null)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="app">
      <header>
        <h1>FastAPI + React App</h1>
        <div className="status">
          <span className={`status-indicator ${status}`}></span>
          <span>Backend Status: {status || 'checking...'}</span>
        </div>
      </header>

      <main>
        <section className="form-section">
          <h2>Add New Item</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Item name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            />
            <button type="submit">Add Item</button>
          </form>
        </section>

        {error && <div className="error">Error: {error}</div>}

        <section className="items-section">
          <h2>Items List</h2>
          {loading ? (
            <div className="loading">Loading items...</div>
          ) : items.length === 0 ? (
            <div className="empty">No items yet. Add one above!</div>
          ) : (
            <div className="items-list">
              {items.map((item) => (
                <div key={item.id} className="item-card">
                  <div className="item-content">
                    <h3>{item.name}</h3>
                    <p>{item.description || 'No description'}</p>
                    <span className="item-id">ID: {item.id}</span>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
