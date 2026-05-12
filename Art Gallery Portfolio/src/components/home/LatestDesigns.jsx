import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLatestGalleryItems } from '../../lib/galleryQueries';
import GalleryGrid from '../gallery/GalleryGrid';
import { LATEST_ITEMS_COUNT } from '../../config/constants';

export default function LatestDesigns() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      try {
        const data = await getLatestGalleryItems(LATEST_ITEMS_COUNT);
        setItems(data);
      } catch (err) {
        console.error('Failed to fetch latest items:', err);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  return (
    <section className="section" style={{ background: '#fff' }}>
      <div className="container">
        <div className="section-title">
          <h2>Latest Designs</h2>
          <p className="section-subtitle">Freshly added photo frame samples — newest first</p>
        </div>
        <GalleryGrid items={items} loading={loading} />
        {items.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/gallery" className="btn btn-secondary">
              View All Designs →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
