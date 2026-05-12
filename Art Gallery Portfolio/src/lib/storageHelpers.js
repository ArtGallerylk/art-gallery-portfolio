import { supabase } from './supabaseClient';

export async function uploadGalleryImage(file, category) {
  const timestamp = Date.now();
  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const storagePath = `${category}/${timestamp}_${cleanName}`;

  const { data, error } = await supabase.storage
    .from('art-gallery-samples')
    .upload(storagePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  const publicUrl = getPublicImageUrl(data.path);
  return { storagePath: data.path, publicUrl };
}

export function getPublicImageUrl(storagePath) {
  const { data } = supabase.storage
    .from('art-gallery-samples')
    .getPublicUrl(storagePath);
  return data.publicUrl;
}

export async function deleteGalleryImage(storagePath) {
  if (!storagePath) return;
  const { error } = await supabase.storage
    .from('art-gallery-samples')
    .remove([storagePath]);
  if (error) throw error;
  return true;
}
