import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/admin/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="admin-layout">
      {/* Admin Sidebar */}
      <aside className="admin-sidebar">
        <div style={{ marginBottom: '2rem', padding: '0 1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <img src="/Logo.png" alt="Art Gallery LK Logo" style={{ height: '40px', objectFit: 'contain' }} />
            <h3 style={{ color: 'var(--color-white)', fontSize: '1.2rem', margin: 0 }}>
              Art <span style={{ color: 'var(--color-gold)' }}>Gallery</span>
            </h3>
          </div>
          <p style={{ color: 'var(--color-gray-500)', fontSize: '0.8rem' }}>
            {user?.email}
          </p>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <NavLink to="/admin" end className="admin-sidebar-link">
            <span>📊</span> Dashboard
          </NavLink>
          <NavLink to="/admin/upload" className="admin-sidebar-link">
            <span>➕</span> Add New Item
          </NavLink>
        </nav>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', marginTop: 'auto' }}>
          <Link to="/" className="admin-sidebar-link" target="_blank">
            <span>🌐</span> View Website
          </Link>
          <button onClick={handleLogout} className="admin-sidebar-link" style={{ width: '100%', textAlign: 'left', border: 'none', background: 'none' }}>
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
