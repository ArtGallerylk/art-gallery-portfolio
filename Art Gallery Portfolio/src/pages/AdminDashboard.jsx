import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllGalleryItems, toggleItemVisibility, toggleItemFeatured, deleteGalleryItem, getGalleryStats } from '../lib/galleryQueries';
import { getCategoryName } from '../config/constants';
import { deleteGalleryImage } from '../lib/storageHelpers';

export default function AdminDashboard() {
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, featured: 0, inactive: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await getAllGalleryItems();
      setItems(data);
      const appStats = await getGalleryStats();
      setStats(appStats);
    } catch (err) {
      console.error('Failed to fetch items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleToggleActive = async (id, currentVal) => {
    try {
      await toggleItemVisibility(id, !currentVal);
      fetchItems();
    } catch (err) {
      console.error('Failed to toggle visibility:', err);
      alert('Error changing visibility');
    }
  };

  const handleToggleFeatured = async (id, currentVal) => {
    try {
      await toggleItemFeatured(id, !currentVal);
      fetchItems();
    } catch (err) {
      console.error('Failed to toggle featured:', err);
      alert('Error changing featured status');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try {
      const item = items.find(i => i.id === deleteId);
      if (item && item.storage_path) {
        await deleteGalleryImage(item.storage_path);
      }
      await deleteGalleryItem(deleteId);
      setDeleteId(null);
      fetchItems();
    } catch (err) {
      console.error('Failed to delete item:', err);
      alert('Error deleting item');
    }
  };

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase()) || 
    item.code.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="admin-page-header">
        <h2>Dashboard</h2>
        <p>Manage your gallery portfolio and view statistics.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-value">{stats.total}</div>
          <div className="stat-card-label">Total Items</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-value" style={{color: 'var(--color-success)'}}>{stats.active}</div>
          <div className="stat-card-label">Active (Visible)</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-value" style={{color: 'var(--color-warning)'}}>{stats.featured}</div>
          <div className="stat-card-label">Featured</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-value" style={{color: 'var(--color-gray-400)'}}>{stats.inactive}</div>
          <div className="stat-card-label">Hidden</div>
        </div>
      </div>

      <div className="admin-table-wrap">
        <div className="admin-table-header">
          <input 
            type="text" 
            placeholder="Search code, title, category..." 
            className="admin-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link to="/admin/upload" className="btn btn-primary btn-sm">
            + New Item
          </Link>
        </div>

        {loading ? (
          <div className="loading-screen" style={{ minHeight: '200px' }}>
            <div className="spinner"></div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="empty-state" style={{ padding: '2rem' }}>
            <p>No items found.</p>
          </div>
        ) : (
          <div className="admin-items-list">
            <div className="admin-item-row" style={{ fontWeight: 600, background: 'var(--color-gray-50)', color: 'var(--color-gray-600)', fontSize: '0.85rem', textTransform: 'uppercase' }}>
              <div>Image</div>
              <div>Details</div>
              <div>Category</div>
              <div>Visible</div>
              <div>Featured</div>
              <div style={{ textAlign: 'right' }}>Actions</div>
            </div>
            
            {filteredItems.map(item => (
              <div key={item.id} className="admin-item-row">
                <img src={item.image_url} alt={item.title} className="admin-item-thumb" />
                <div className="admin-item-info">
                  <h4>{item.title}</h4>
                  <span>{item.code}</span>
                </div>
                <div>
                  <span className="gallery-card-category" style={{ fontSize: '0.7rem' }}>
                    {getCategoryName(item.category)}
                  </span>
                </div>
                <div>
                  <label className="toggle">
                    <input 
                      type="checkbox" 
                      checked={item.is_active} 
                      onChange={() => handleToggleActive(item.id, item.is_active)} 
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div>
                  <label className="toggle">
                    <input 
                      type="checkbox" 
                      checked={item.is_featured} 
                      onChange={() => handleToggleFeatured(item.id, item.is_featured)} 
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="admin-item-actions" style={{ justifyContent: 'flex-end' }}>
                  <button 
                    className="btn btn-outline btn-sm"
                    style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}
                    onClick={() => navigate(`/admin/edit/${item.id}`)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-danger btn-sm"
                    style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}
                    onClick={() => setDeleteId(item.id)}
                  >
                    Del
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {deleteId && (
        <div className="dialog-overlay">
          <div className="dialog-card">
            <h3>Delete Item?</h3>
            <p>Are you sure you want to permanently delete this item? This will also remove the image from storage. This action cannot be undone.</p>
            <div className="dialog-actions">
              <button 
                className="btn btn-outline" 
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-danger" 
                onClick={handleDeleteConfirm}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
