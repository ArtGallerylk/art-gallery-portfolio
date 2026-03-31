import { useState, useEffect } from 'react';
import { getFeaturedGalleryItems } from '../../lib/galleryQueries';
import GalleryGrid from '../gallery/GalleryGrid';

export default function FeaturedSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      try {
        const data = await getFeaturedGalleryItems(6);
        setItems(data);
      } catch (err) {
        console.error('Failed to fetch featured items:', err);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  if (!loading && items.length === 0) return null;

  return (
    <section className="section">
      <div className="container">
        <div className="section-title">
          <h2>Featured Collection</h2>
          <p className="section-subtitle">Hand-picked premium designs</p>
        </div>
        <GalleryGrid items={items} loading={loading} />
      </div>
    </section>
  );
}
