import { useEffect } from 'react';
import { useProperties } from '../context/PropertyContext';

export default function PropertyDetailModal() {
  const { selectedProperty, setSelectedProperty } = useProperties();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProperty(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedProperty]);

  if (!selectedProperty) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[var(--color-sumi)]/60 backdrop-blur-xs transition-opacity duration-300"
      onClick={() => setSelectedProperty(null)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[var(--color-washi)] border border-stone-300 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setSelectedProperty(null)}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center bg-white/90 border border-stone-300 text-stone-700 hover:bg-[var(--color-sumi)] hover:text-white hover:border-[var(--color-sumi)] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] w-full bg-stone-200 overflow-hidden">
          <img
            src={selectedProperty.imageUrl}
            alt={selectedProperty.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-mono tracking-widest uppercase bg-[var(--color-sumi)] text-[var(--color-washi)]">
              {selectedProperty.code}
            </span>
            <span className="px-3 py-1 text-xs tracking-widest uppercase bg-white/95 text-[var(--color-sumi)] border border-stone-300">
              {selectedProperty.type}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Title and Japanese Counterpart */}
          <div>
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <h2 className="text-2xl sm:text-3xl font-light tracking-wide text-[var(--color-sumi)]">
                {selectedProperty.title}
              </h2>
              <span className="text-xl font-light text-stone-400">
                {selectedProperty.japaneseTitle}
              </span>
            </div>
            <p className="text-sm text-[var(--color-mist)] mt-1 tracking-wide">
              {selectedProperty.subtitle}
            </p>
          </div>

          {/* Price & Status Highlight Bar */}
          <div className="p-4 bg-white border border-stone-200/80 flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[var(--color-mist)] block">
                Acquisition Price / 価格
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-semibold tracking-tight text-[var(--color-sumi)]">
                  {selectedProperty.priceFormatted}
                </span>
                <span className="text-xs text-[var(--color-mist)]">
                  approx. {selectedProperty.approxUsd}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] uppercase tracking-widest text-[var(--color-mist)] block mb-1">
                Status
              </span>
              <span className="inline-block px-3 py-1 text-xs uppercase tracking-widest font-medium border border-stone-300 bg-[#FAF8F5] text-[var(--color-sumi)]">
                {selectedProperty.status}
              </span>
            </div>
          </div>

          {/* Key Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-white border border-stone-200/80">
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-mist)] block">
                Living Area
              </span>
              <span className="text-base font-medium text-[var(--color-sumi)] mt-0.5 block">
                {selectedProperty.area} m²
              </span>
              <span className="text-[10px] text-stone-400">{selectedProperty.tatami}</span>
            </div>

            <div className="p-3 bg-white border border-stone-200/80">
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-mist)] block">
                Floorplan
              </span>
              <span className="text-base font-medium text-[var(--color-sumi)] mt-0.5 block">
                {selectedProperty.rooms}
              </span>
              <span className="text-[10px] text-stone-400">Layout</span>
            </div>

            <div className="p-3 bg-white border border-stone-200/80">
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-mist)] block">
                Year Built
              </span>
              <span className="text-base font-medium text-[var(--color-sumi)] mt-0.5 block">
                {selectedProperty.yearBuilt}
              </span>
              <span className="text-[10px] text-stone-400">Constructed</span>
            </div>

            <div className="p-3 bg-white border border-stone-200/80">
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-mist)] block">
                Location
              </span>
              <span className="text-xs font-medium text-[var(--color-sumi)] mt-1 block truncate">
                {selectedProperty.prefecture}
              </span>
              <span className="text-[10px] text-stone-400 truncate block">Japan</span>
            </div>
          </div>

          {/* Architectural Description */}
          <div className="border-t border-stone-200/80 pt-5">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[var(--color-mist)] mb-2 font-medium">
              Architectural Concept & Spatial Harmony (間)
            </h4>
            <p className="text-sm text-stone-700 leading-relaxed font-light">
              {selectedProperty.description}
            </p>
          </div>

          {/* Architectural Features */}
          {selectedProperty.features && selectedProperty.features.length > 0 && (
            <div className="border-t border-stone-200/80 pt-5">
              <h4 className="text-xs uppercase tracking-[0.2em] text-[var(--color-mist)] mb-3 font-medium">
                Distinctive Features & Craftsmanship
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedProperty.features.map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-xs text-stone-600 bg-white px-3 py-2 border border-stone-200/60"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-take)] flex-shrink-0"></span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Agent Information & Modal Actions */}
          <div className="border-t border-stone-200/80 pt-5 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-none bg-[var(--color-sumi)] text-[var(--color-washi)] flex items-center justify-center text-xs font-light tracking-widest">
                担当
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[var(--color-mist)] block">
                  Listing Specialist
                </span>
                <span className="text-xs font-medium text-[var(--color-sumi)]">
                  {selectedProperty.agent || 'Kenjiro Sato (佐藤 健次郎)'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSelectedProperty(null)}
                className="px-5 py-2.5 text-xs uppercase tracking-widest border border-stone-300 text-stone-600 hover:border-stone-400 hover:text-[var(--color-sumi)] transition-colors cursor-pointer"
              >
                Close View
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`Inquiry sent to ${selectedProperty.agent} for property ${selectedProperty.code}!`);
                  setSelectedProperty(null);
                }}
                className="px-5 py-2.5 text-xs uppercase tracking-widest bg-[var(--color-sumi)] text-[var(--color-washi)] hover:bg-[var(--color-take)] transition-colors cursor-pointer"
              >
                Schedule Private Viewing
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
