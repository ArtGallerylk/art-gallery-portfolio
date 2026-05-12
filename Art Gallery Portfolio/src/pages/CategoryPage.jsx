import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getGalleryItemsByCategory } from '../lib/galleryQueries';
import { getCategoryBySlug } from '../config/constants';
import GalleryGrid from '../components/gallery/GalleryGrid';

export default function CategoryPage() {
  const { category } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const catInfo = getCategoryBySlug(category);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const data = await getGalleryItemsByCategory(category);
        setItems(data);
      } catch (err) {
        console.error('Failed to fetch category items:', err);
      } finally {
        setLoading(false);
      }
    }
    if (category) fetch();
  }, [category]);

  return (
    <main>
      <div className="page-header">
        <div className="container">
          <h1>{catInfo ? `${catInfo.emoji} ${catInfo.name} Frames` : 'Category'}</h1>
          <p>{catInfo?.description || 'Browse our collection'}</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div style={{ marginBottom: '1.5rem' }}>
            <Link to="/gallery" className="btn btn-outline btn-sm">← Back to Gallery</Link>
          </div>
          <GalleryGrid items={items} loading={loading} />
        </div>
      </section>
    </main>
  );
}
