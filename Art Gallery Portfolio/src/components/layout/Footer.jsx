import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../config/constants';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <img src="/Logo.png" alt="Art Gallery LK Logo" style={{ height: '48px', objectFit: 'contain' }} />
              <h3 style={{ margin: 0 }}>Art <span>Gallery</span> LK</h3>
            </div>
            <p>Studio And Art Designers — Premium photo frames crafted with elegance. Browse our exclusive collection and find the perfect frame for your cherished memories.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><a href="/#about">About Us</a></li>
              <li><a href="/#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Categories</h4>
            <ul>
              {CATEGORIES.slice(0, 5).map(cat => (
                <li key={cat.slug}>
                  <Link to={`/gallery/${cat.slug}`}>{cat.name} Frames</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Art Gallery LK. All rights reserved.</span>
          <span>Studio And Art Designers</span>
        </div>
      </div>
    </footer>
  );
}
