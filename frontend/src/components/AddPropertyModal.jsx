import { useState, useEffect } from 'react';
import { useProperties } from '../context/PropertyContext';

const PRESET_IMAGES = [
  {
    label: 'Cedar Villa',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Machiya Courtyard',
    url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Wabi-Sabi Loft',
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Kyoto Tea House',
    url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80'
  }
];

export default function AddPropertyModal() {
  const { isAddModalOpen, setIsAddModalOpen, addProperty } = useProperties();

  const [formData, setFormData] = useState({
    title: '',
    japaneseTitle: '',
    subtitle: '',
    type: 'Machiya',
    location: '',
    price: '',
    area: '',
    rooms: '3LDK',
    yearBuilt: new Date().getFullYear(),
    status: 'Available',
    imageUrl: PRESET_IMAGES[0].url,
    description: '',
    featuresString: 'Sliding Shoji Screens, Hinoki Cypress Accents, Private Garden'
  });

  const [error, setError] = useState('');

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsAddModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsAddModalOpen]);

  if (!isAddModalOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError('Please provide a property title.');
      return;
    }
    if (!formData.location.trim()) {
      setError('Please provide a location (e.g. Tokyo, Shibuya).');
      return;
    }
    if (!formData.price || Number(formData.price) <= 0) {
      setError('Please enter a valid acquisition price in JPY.');
      return;
    }
    if (!formData.area || Number(formData.area) <= 0) {
      setError('Please enter a valid floor area in m².');
      return;
    }

    const featuresList = formData.featuresString
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    addProperty({
      ...formData,
      features: featuresList.length > 0 ? featuresList : ['Japanese Architecture', 'Minimalist Design']
    });

    setIsAddModalOpen(false);
    // Reset form
    setFormData({
      title: '',
      japaneseTitle: '',
      subtitle: '',
      type: 'Machiya',
      location: '',
      price: '',
      area: '',
      rooms: '3LDK',
      yearBuilt: new Date().getFullYear(),
      status: 'Available',
      imageUrl: PRESET_IMAGES[0].url,
      description: '',
      featuresString: 'Sliding Shoji Screens, Hinoki Cypress Accents, Private Garden'
    });
    setError('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[var(--color-sumi)]/60 backdrop-blur-xs transition-opacity"
      onClick={() => setIsAddModalOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[var(--color-washi)] border border-stone-300 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-300/80 flex items-center justify-between bg-[#FAF8F5]">
          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-mist)] block">
              Portfolio Addition • 新規登録
            </span>
            <h2 className="text-xl font-light tracking-wide text-[var(--color-sumi)]">
              Register New Real Estate Listing
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(false)}
            className="w-8 h-8 flex items-center justify-center border border-stone-300 text-stone-600 hover:bg-[var(--color-sumi)] hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mx-6 mt-6 p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <span>⚠</span>
            <span>{error}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {/* Row 1: Title & Japanese Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[var(--color-mist)] mb-1">
                Property Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Kamakura Bamboo Residence"
                className="w-full px-3 py-2 text-xs bg-white border border-stone-300 focus:outline-none focus:border-[var(--color-sumi)] text-[var(--color-sumi)]"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[var(--color-mist)] mb-1">
                Japanese Counterpart / 漢字 (Optional)
              </label>
              <input
                type="text"
                name="japaneseTitle"
                value={formData.japaneseTitle}
                onChange={handleChange}
                placeholder="e.g. 鎌倉 竹林の庵"
                className="w-full px-3 py-2 text-xs bg-white border border-stone-300 focus:outline-none focus:border-[var(--color-sumi)] text-[var(--color-sumi)]"
              />
            </div>
          </div>

          {/* Row 2: Subtitle / Concept */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[var(--color-mist)] mb-1">
              Short Architectural Subtitle
            </label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="e.g. Single-story cedar pavilion with enclosed rock garden"
              className="w-full px-3 py-2 text-xs bg-white border border-stone-300 focus:outline-none focus:border-[var(--color-sumi)] text-[var(--color-sumi)]"
            />
          </div>

          {/* Row 3: Type, Status, Rooms */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[var(--color-mist)] mb-1">
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-white border border-stone-300 focus:outline-none focus:border-[var(--color-sumi)] text-[var(--color-sumi)]"
              >
                <option value="Machiya">Machiya (町家)</option>
                <option value="Villa">Villa (別荘)</option>
                <option value="Traditional House">Traditional House (日本家屋)</option>
                <option value="Loft / Apartment">Loft / Studio (アトリエ)</option>
                <option value="Penthouse">Penthouse (テラス)</option>
                <option value="Cottage">Cottage (離れ)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[var(--color-mist)] mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-white border border-stone-300 focus:outline-none focus:border-[var(--color-sumi)] text-[var(--color-sumi)]"
              >
                <option value="Available">Available</option>
                <option value="Reserved">Reserved</option>
                <option value="Under Offer">Under Offer</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[var(--color-mist)] mb-1">
                Layout / Rooms
              </label>
              <input
                type="text"
                name="rooms"
                value={formData.rooms}
                onChange={handleChange}
                placeholder="e.g. 3LDK"
                className="w-full px-3 py-2 text-xs bg-white border border-stone-300 focus:outline-none focus:border-[var(--color-sumi)] text-[var(--color-sumi)]"
              />
            </div>
          </div>

          {/* Row 4: Location, Price, Area, Year */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-[11px] uppercase tracking-wider text-[var(--color-mist)] mb-1">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Kyoto, Higashiyama"
                className="w-full px-3 py-2 text-xs bg-white border border-stone-300 focus:outline-none focus:border-[var(--color-sumi)] text-[var(--color-sumi)]"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[var(--color-mist)] mb-1">
                Price (JPY) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 75000000"
                className="w-full px-3 py-2 text-xs bg-white border border-stone-300 focus:outline-none focus:border-[var(--color-sumi)] text-[var(--color-sumi)]"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[var(--color-mist)] mb-1">
                Area (m²) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="e.g. 118"
                className="w-full px-3 py-2 text-xs bg-white border border-stone-300 focus:outline-none focus:border-[var(--color-sumi)] text-[var(--color-sumi)]"
                required
              />
            </div>
          </div>

          {/* Preset Image Chooser */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[var(--color-mist)] mb-1.5">
              Select Architecture Photography (or provide custom URL below)
            </label>
            <div className="grid grid-cols-4 gap-2 mb-2">
              {PRESET_IMAGES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, imageUrl: preset.url }))}
                  className={`relative aspect-[4/3] border overflow-hidden transition-all ${
                    formData.imageUrl === preset.url
                      ? 'border-[var(--color-take)] ring-2 ring-[var(--color-take)]/40'
                      : 'border-stone-300 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={preset.url}
                    alt={preset.label}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] py-0.5 text-center truncate">
                    {preset.label}
                  </span>
                </button>
              ))}
            </div>

            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full px-3 py-2 text-xs bg-white border border-stone-300 focus:outline-none focus:border-[var(--color-sumi)] text-[var(--color-sumi)]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[var(--color-mist)] mb-1">
              Architectural Concept & Spatial Narrative (間)
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe materials (cedar, plaster, stone), natural light quality, and courtyard orientation..."
              className="w-full px-3 py-2 text-xs bg-white border border-stone-300 focus:outline-none focus:border-[var(--color-sumi)] text-[var(--color-sumi)] leading-relaxed"
            />
          </div>

          {/* Features string */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[var(--color-mist)] mb-1">
              Craftsmanship & Features (comma-separated)
            </label>
            <input
              type="text"
              name="featuresString"
              value={formData.featuresString}
              onChange={handleChange}
              placeholder="e.g. Hinoki soaking tub, Moss garden, Engawa deck"
              className="w-full px-3 py-2 text-xs bg-white border border-stone-300 focus:outline-none focus:border-[var(--color-sumi)] text-[var(--color-sumi)]"
            />
          </div>

          {/* Modal Actions */}
          <div className="border-t border-stone-300/80 pt-5 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-5 py-2 text-xs uppercase tracking-widest border border-stone-300 text-stone-600 hover:border-stone-400 hover:text-[var(--color-sumi)] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-xs uppercase tracking-widest bg-[var(--color-sumi)] text-[var(--color-washi)] hover:bg-[var(--color-take)] transition-colors cursor-pointer"
            >
              Publish Property Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
