import GalleryCard from './GalleryCard';

export default function GalleryGrid({ items, loading }) {
  if (loading) {
    return (
      <div className="gallery-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton skeleton-card-image"></div>
            <div className="skeleton-card-body">
              <div className="skeleton skeleton-line short"></div>
              <div className="skeleton skeleton-line medium"></div>
              <div className="skeleton skeleton-line short"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🖼️</div>
        <h3>No items found</h3>
        <p>Check back soon for new designs!</p>
      </div>
    );
  }

  return (
    <div className="gallery-grid">
      {items.map(item => (
        <GalleryCard key={item.id} item={item} />
      ))}
    </div>
  );
}
