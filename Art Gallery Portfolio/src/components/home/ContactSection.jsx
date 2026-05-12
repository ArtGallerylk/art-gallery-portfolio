import { getGeneralWhatsAppUrl } from '../../lib/whatsappHelpers';

export default function ContactSection() {
  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="section-title">
          <h2>Get In Touch</h2>
          <p className="section-subtitle">Have a question or want to place an order? Reach out to us!</p>
        </div>
        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-card-icon">💬</div>
            <h4>WhatsApp</h4>
            <p>Message us directly for quick responses and orders</p>
            <br />
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              Chat Now
            </a>
          </div>
          <div className="contact-card">
            <div className="contact-card-icon">📍</div>
            <h4>Visit Us</h4>
            <p>Art Gallery LK</p>
            <p>Studio And Art Designers</p>
          </div>
          <div className="contact-card">
            <div className="contact-card-icon">🕐</div>
            <h4>Working Hours</h4>
            <p>Monday — Saturday</p>
            <p>9:00 AM — 6:00 PM</p>
          </div>
        </div>
      </div>
    </section>
  );
}
