import { Link } from 'react-router-dom';
import { generateWhatsAppUrl } from '../../lib/whatsappHelpers';
import { getCategoryName } from '../../config/constants';

export default function GalleryCard({ item }) {
  return (
    <div className="gallery-card">
      {item.is_featured && <span className="badge-featured">★ Featured</span>}
      <Link to={`/item/${item.code}`}>
        <div className="gallery-card-image">
          <img
            src={item.image_url}
            alt={item.title}
            loading="lazy"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" fill="%23f0f0f0"><rect width="400" height="500"/><text x="50%" y="50%" text-anchor="middle" fill="%23999" font-size="16">Image</text></svg>';
            }}
          />
          <div className="gallery-card-overlay">
            <div className="gallery-card-actions">
              <span className="btn btn-sm btn-primary">View Details</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="gallery-card-body">
        <div className="gallery-card-code">{item.code}</div>
        <Link to={`/item/${item.code}`}>
          <h3 className="gallery-card-title">{item.title}</h3>
        </Link>
        <span className="gallery-card-category">{getCategoryName(item.category)}</span>
      </div>
      <div className="gallery-card-footer">
        <a
          href={generateWhatsAppUrl(item)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sm btn-whatsapp"
        >
          💬 Inquire
        </a>
        <Link to={`/item/${item.code}`} className="btn btn-sm btn-outline">
          View
        </Link>
      </div>
    </div>
  );
}
