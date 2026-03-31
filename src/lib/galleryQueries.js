import { supabase } from './supabaseClient';

// ─── Public Queries ───────────────────────────────────────

export async function getLatestGalleryItems(limit = 8) {
  const { data, error } = await supabase
    .from('gallery_items')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function getFeaturedGalleryItems(limit = 6) {
  const { data, error } = await supabase
    .from('gallery_items')
    .select('*')
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function getGalleryItemsByCategory(category, limit = 50) {
  const { data, error } = await supabase
    .from('gallery_items')
    .select('*')
    .eq('is_active', true)
    .eq('category', category)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function getAllActiveGalleryItems(limit = 50) {
  const { data, error } = await supabase
    .from('gallery_items')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function getGalleryItemByCode(code) {
  const { data, error } = await supabase
    .from('gallery_items')
    .select('*')
    .eq('code', code)
    .single();

  if (error) throw error;
  return data;
}

export async function getGalleryItemBySlug(slug) {
  const { data, error } = await supabase
    .from('gallery_items')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data;
}

export async function getRelatedGalleryItems(category, excludeId, limit = 4) {
  const { data, error } = await supabase
    .from('gallery_items')
    .select('*')
    .eq('is_active', true)
    .eq('category', category)
    .neq('id', excludeId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

// ─── Admin Queries ────────────────────────────────────────

export async function getAllGalleryItems() {
  const { data, error } = await supabase
    .from('gallery_items')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createGalleryItem(itemData) {
  const { data, error } = await supabase
    .from('gallery_items')
    .insert([itemData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateGalleryItem(id, updates) {
  const { data, error } = await supabase
    .from('gallery_items')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteGalleryItem(id) {
  const { error } = await supabase
    .from('gallery_items')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
}

export async function toggleItemVisibility(id, isActive) {
  return updateGalleryItem(id, { is_active: isActive });
}

export async function toggleItemFeatured(id, isFeatured) {
  return updateGalleryItem(id, { is_featured: isFeatured });
}

export async function getGalleryStats() {
  const { data: all, error: e1 } = await supabase
    .from('gallery_items')
    .select('id, is_active, is_featured, created_at');

  if (e1) throw e1;

  return {
    total: all.length,
    active: all.filter(i => i.is_active).length,
    featured: all.filter(i => i.is_featured).length,
    inactive: all.filter(i => !i.is_active).length,
    newest: all.length > 0 ? all.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0] : null,
  };
}
