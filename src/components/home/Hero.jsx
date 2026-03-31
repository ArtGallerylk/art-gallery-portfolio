import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg"></div>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>Exquisite <span>Photo Frames</span> for Every Moment</h1>
        <p className="hero-tagline">Studio And Art Designers — Crafting memories with elegance</p>
        <div className="hero-buttons">
          <Link to="/gallery" className="btn btn-primary btn-lg">
            Explore Gallery
          </Link>
          <a href="#contact" className="btn btn-outline btn-lg" style={{borderColor:'#fff', color:'#fff'}}>
            Contact Us
          </a>
        </div>
      </div>
      <div className="hero-scroll-indicator">
        <span></span>
      </div>
    </section>
  );
}
