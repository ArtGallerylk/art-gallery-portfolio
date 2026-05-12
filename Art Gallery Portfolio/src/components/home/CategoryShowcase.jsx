import { CATEGORIES } from '../../config/constants';
import CategoryCard from '../gallery/CategoryCard';

export default function CategoryShowcase() {
  return (
    <section className="section" id="categories">
      <div className="container">
        <div className="section-title">
          <h2>Browse by Category</h2>
          <p className="section-subtitle">Find the perfect frame for every occasion</p>
        </div>
        <div className="category-grid">
          {CATEGORIES.map(cat => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
