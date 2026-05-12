import { Link } from 'react-router-dom';

export default function CategoryCard({ category }) {
  return (
    <Link to={`/gallery/${category.slug}`} className="category-card">
      <div className="category-card-content">
        <span className="category-card-emoji">{category.emoji}</span>
        <span className="category-card-name">{category.name}</span>
      </div>
    </Link>
  );
}
