import { useState, useEffect } from 'react';
import { getAllActiveGalleryItems, getGalleryItemsByCategory } from '../lib/galleryQueries';
import GalleryGrid from '../components/gallery/GalleryGrid';
import CategoryFilter from '../components/gallery/CategoryFilter';

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const data = selectedCategory
          ? await getGalleryItemsByCategory(selectedCategory)
          : await getAllActiveGalleryItems();
        setItems(data);
      } catch (err) {
        console.error('Failed to fetch gallery:', err);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [selectedCategory]);

  return (
    <main>
      <div className="page-header">
        <div className="container">
          <h1>Our Gallery</h1>
          <p>Explore our complete collection of premium photo frames</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
          <GalleryGrid items={items} loading={loading} />
        </div>
      </section>
    </main>
  );
}
