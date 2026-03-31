export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '94760926150';
export const BRAND_NAME = import.meta.env.VITE_BRAND_NAME || 'Art Gallery LK';

export const CATEGORIES = [
  { name: 'Wedding', slug: 'wedding', emoji: '💍', description: 'Elegant wedding photo frames' },
  { name: 'Birthday', slug: 'birthday', emoji: '🎂', description: 'Celebrate special birthdays' },
  { name: 'Couple', slug: 'couple', emoji: '💑', description: 'Romantic couple frames' },
  { name: 'Baby', slug: 'baby', emoji: '👶', description: 'Precious baby memories' },
  { name: 'Family', slug: 'family', emoji: '👨‍👩‍👧‍👦', description: 'Beautiful family portraits' },
  { name: 'Gift', slug: 'gift', emoji: '🎁', description: 'Perfect gift frames' },
  { name: 'Custom', slug: 'custom', emoji: '🎨', description: 'Custom designed frames' },
];

export const CATEGORY_SLUGS = CATEGORIES.map(c => c.slug);

export const ITEMS_PER_PAGE = 12;
export const LATEST_ITEMS_COUNT = 8;
export const FEATURED_ITEMS_COUNT = 6;
export const RELATED_ITEMS_COUNT = 4;

export const getCategoryBySlug = (slug) => CATEGORIES.find(c => c.slug === slug);
export const getCategoryName = (slug) => getCategoryBySlug(slug)?.name || slug;
