import { CATEGORIES } from '../../config/constants';

export default function CategoryFilter({ selected, onSelect }) {
  return (
    <div className="category-filter">
      <button
        className={`category-pill ${!selected ? 'active' : ''}`}
        onClick={() => onSelect(null)}
      >
        All
      </button>
      {CATEGORIES.map(cat => (
        <button
          key={cat.slug}
          className={`category-pill ${selected === cat.slug ? 'active' : ''}`}
          onClick={() => onSelect(cat.slug)}
        >
          {cat.emoji} {cat.name}
        </button>
      ))}
    </div>
  );
}
