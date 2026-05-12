import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getGalleryItemByCode, getRelatedGalleryItems } from '../lib/galleryQueries';
import { generateWhatsAppUrl } from '../lib/whatsappHelpers';
import { getCategoryName } from '../config/constants';
import CopyButton from '../components/ui/CopyButton';
import Lightbox from '../components/ui/Lightbox';
import GalleryGrid from '../components/gallery/GalleryGrid';

export default function ItemDetail() {
  const { code } = useParams();
  const [item, setItem] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const data = await getGalleryItemByCode(code);
        setItem(data);
        if (data) {
          const rel = await getRelatedGalleryItems(data.category, data.id, 4);
          setRelated(rel);
        }
      } catch (err) {
        console.error('Failed to fetch item:', err);
      } finally {
        setLoading(false);
      }
    }
    if (code) fetch();
    window.scrollTo(0, 0);
  }, [code]);

  if (loading) {
    return (
      <div className="loading-screen" style={{ paddingTop: 'calc(var(--header-height) + 2rem)' }}>
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="loading-screen" style={{ paddingTop: 'calc(var(--header-height) + 2rem)' }}>
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3>Item not found</h3>
          <p>The item you're looking for doesn't exist or has been removed.</p>
          <br />
          <Link to="/gallery" className="btn btn-primary">Browse Gallery</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="item-detail">
      <div className="container">
        <div style={{ marginBottom: '1.5rem' }}>
          <Link to="/gallery" className="btn btn-outline btn-sm">← Back to Gallery</Link>
        </div>

        <div className="item-detail-grid">
          <div className="item-detail-image-wrap" onClick={() => setLightboxOpen(true)}>
            <img src={item.image_url} alt={item.title} />
          </div>

          <div className="item-detail-info">
            <div className="item-detail-code">
              {item.code}
              <CopyButton text={item.code} />
            </div>

            <h1 className="item-detail-title">{item.title}</h1>

            <Link to={`/gallery/${item.category}`} className="item-detail-category">
              {getCategoryName(item.category)} Frames
            </Link>

            {item.description && (
              <p className="item-detail-description">{item.description}</p>
            )}

            <div className="item-detail-actions">
              <a
                href={generateWhatsAppUrl(item)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                💬 Inquire on WhatsApp
              </a>
              <button
                className="btn btn-outline"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: item.title,
                      text: `Check out this frame: ${item.title} (${item.code})`,
                      url: window.location.href,
                    });
                  }
                }}
              >
                📤 Share
              </button>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section style={{ marginTop: '4rem' }}>
            <div className="section-title">
              <h2>Related Designs</h2>
            </div>
            <GalleryGrid items={related} loading={false} />
          </section>
        )}
      </div>

      {lightboxOpen && (
        <Lightbox
          src={item.image_url}
          alt={item.title}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </main>
  );
}
