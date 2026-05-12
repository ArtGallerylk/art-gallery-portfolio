import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createGalleryItem, updateGalleryItem, getGalleryItemByCode } from '../lib/galleryQueries';
import { uploadGalleryImage, getPublicImageUrl } from '../lib/storageHelpers';
import { CATEGORIES } from '../config/constants';
import { supabase } from '../lib/supabaseClient';

export default function AdminUpload() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    code: '',
    category: 'wedding',
    description: '',
    is_featured: false,
    is_active: true
  });
  
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (isEditMode) {
      async function fetchItem() {
        try {
          const { data, error } = await supabase
            .from('gallery_items')
            .select('*')
            .eq('id', id)
            .single();
            
          if (error) throw error;
          
          setFormData({
            title: data.title,
            code: data.code,
            category: data.category,
            description: data.description || '',
            is_featured: data.is_featured,
            is_active: data.is_active
          });
          setPreview(data.image_url);
        } catch (err) {
          console.error('Fetch error:', err);
          setError('Failed to load item for editing.');
        } finally {
          setFetching(false);
        }
      }
      fetchItem();
    }
  }, [id, isEditMode]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer?.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      handleFileSelected(droppedFile);
    }
  };

  const handleFileSelected = (selectedFile) => {
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB.');
      return;
    }
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (!isEditMode && !file) {
        throw new Error('Please select an image to upload.');
      }

      // Check unique code (if not edit mode, or if code changed)
      if (!isEditMode) {
        const { data: existingParams } = await supabase
          .from('gallery_items')
          .select('id')
          .eq('code', formData.code)
          .single();
          
        if (existingParams) {
          throw new Error(`Item code ${formData.code} already exists.`);
        }
      }

      let imageUrl = preview;
      let storagePath = null;

      if (file) {
        const uploadResult = await uploadGalleryImage(file, formData.category);
        imageUrl = uploadResult.publicUrl;
        storagePath = uploadResult.storagePath;
      }

      const itemData = {
        ...formData,
        slug: formData.code.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      };

      if (storagePath) {
        itemData.image_url = imageUrl;
        itemData.storage_path = storagePath;
      }

      if (isEditMode) {
        await updateGalleryItem(id, itemData);
        setSuccessMsg('Item updated successfully!');
        setTimeout(() => navigate('/admin'), 1500);
      } else {
        await createGalleryItem(itemData);
        setSuccessMsg('Item uploaded successfully!');
        
        // Reset form for next upload
        setFormData({
          title: '',
          code: '',
          category: formData.category, // Keep last selected category
          description: '',
          is_featured: false,
          is_active: true
        });
        setFile(null);
        setPreview('');
      }
    } catch (err) {
      console.error('Upload Error:', err);
      setError(err.message || 'An error occurred during save.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="loading-screen" style={{ minHeight: '60vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="admin-page-header">
        <h2>{isEditMode ? 'Edit Item' : 'Add New Item'}</h2>
        <p>{isEditMode ? 'Update gallery item details.' : 'Upload a new photo frame sample to your portfolio.'}</p>
      </div>

      {error && <div className="login-error" style={{ marginBottom: '1.5rem' }}>{error}</div>}
      {successMsg && <div className="toast success show">{successMsg}</div>}

      <div style={{ maxWidth: '900px', background: 'var(--color-white)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label className="form-label">Image Upload *</label>
            {!preview ? (
              <div 
                className="image-uploader"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="image-uploader-icon">🖼️</div>
                <p>Drag & drop your image here, or <strong>click to browse</strong></p>
                <p className="upload-hint">Supports JPG, PNG, WebP up to 5MB.</p>
                <p className="upload-hint" style={{ color: 'var(--color-gold)' }}>For best results, use a 4:5 aspect ratio.</p>
              </div>
            ) : (
              <div className="image-preview" style={{ display: 'block' }}>
                <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '400px' }} />
                <button 
                  type="button" 
                  className="image-preview-remove"
                  onClick={() => {
                    setFile(null);
                    setPreview('');
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  title="Remove image"
                >
                  ✕
                </button>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={(e) => e.target.files?.[0] && handleFileSelected(e.target.files[0])}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Title *</label>
              <input 
                type="text" 
                name="title"
                className="form-input"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="e.g. Elegant Gold Wedding Frame"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Item Code *</label>
              <input 
                type="text" 
                name="code"
                className="form-input"
                value={formData.code}
                onChange={handleInputChange}
                required
                disabled={isEditMode}
                placeholder="e.g. AG-101"
              />
              <small style={{ color: 'var(--color-gray-400)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                Must be unique. Customers will use this to inquire.
              </small>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select 
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', paddingTop: '2rem' }}>
              <label className="toggle" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', width: 'auto' }}>
                <input 
                  type="checkbox" 
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleInputChange}
                />
                <span className="toggle-slider"></span>
                <span style={{ marginLeft: '50px', whiteSpace: 'nowrap', fontSize: '0.9rem', fontWeight: 600 }}>Visible Publicly</span>
              </label>

              <label className="toggle" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', width: 'auto' }}>
                <input 
                  type="checkbox" 
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleInputChange}
                />
                <span className="toggle-slider"></span>
                <span style={{ marginLeft: '50px', whiteSpace: 'nowrap', fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-warning)' }}>Featured Item</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description (Optional)</label>
            <textarea 
              name="description"
              className="form-textarea"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Add details about dimensions, materials, or customization options..."
            ></textarea>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button 
              type="button" 
              className="btn btn-outline btn-lg"
              onClick={() => navigate('/admin')}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary btn-lg"
              disabled={loading || (!isEditMode && !file)}
              style={{ flex: 1 }}
            >
              {loading ? 'Saving...' : (isEditMode ? 'Update Item' : 'Publish to Gallery')}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
