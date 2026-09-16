import { useState } from 'react';
import { useProperties } from '../context/PropertyContext';

export default function PropertyCard({ property }) {
  const { setSelectedProperty, deleteProperty } = useProperties();
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Available':
        return (
          <span className="px-2 py-0.5 text-[10px] font-medium tracking-widest uppercase bg-white/95 text-[var(--color-take)] border border-[var(--color-take)]/30 backdrop-blur-xs">
            Available
          </span>
        );
      case 'Reserved':
        return (
          <span className="px-2 py-0.5 text-[10px] font-medium tracking-widest uppercase bg-white/95 text-[var(--color-mist)] border border-stone-300 backdrop-blur-xs">
            Reserved
          </span>
        );
      case 'Under Offer':
        return (
          <span className="px-2 py-0.5 text-[10px] font-medium tracking-widest uppercase bg-white/95 text-[var(--color-ki)] border border-[var(--color-ki)]/30 backdrop-blur-xs">
            Under Offer
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <article
      onClick={() => setSelectedProperty(property)}
      className="group bg-white border border-stone-300/70 hover:border-stone-400/80 transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Visual Image Banner */}
      <div>
        <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase bg-[var(--color-sumi)] text-[var(--color-washi)]">
              {property.code}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            {getStatusBadge(property.status)}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          {/* Category & Location */}
          <div className="flex items-center justify-between text-[11px] text-[var(--color-mist)] tracking-widest uppercase mb-1.5">
            <span>{property.type}</span>
            <span className="font-light">{property.prefecture}</span>
          </div>

          {/* Title & Japanese counterpart */}
          <div className="mb-2">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-base font-medium text-[var(--color-sumi)] tracking-wide group-hover:text-[var(--color-take)] transition-colors line-clamp-1">
                {property.title}
              </h3>
              <span className="text-xs text-stone-400 font-light flex-shrink-0">
                {property.japaneseTitle}
              </span>
            </div>
            <p className="text-xs text-[var(--color-mist)] line-clamp-2 mt-1 leading-relaxed">
              {property.subtitle}
            </p>
          </div>

          {/* Specs Bar */}
          <div className="pt-3 border-t border-stone-100 grid grid-cols-3 gap-2 text-center text-xs text-stone-600 my-3">
            <div className="p-1 bg-[#FAF8F5]">
              <span className="block text-[10px] text-stone-400 uppercase tracking-wider">Area</span>
              <span className="font-medium text-[var(--color-sumi)]">{property.area} m²</span>
            </div>
            <div className="p-1 bg-[#FAF8F5]">
              <span className="block text-[10px] text-stone-400 uppercase tracking-wider">Tatami</span>
              <span className="font-medium text-[var(--color-sumi)]">{property.tatami}</span>
            </div>
            <div className="p-1 bg-[#FAF8F5]">
              <span className="block text-[10px] text-stone-400 uppercase tracking-wider">Layout</span>
              <span className="font-medium text-[var(--color-sumi)]">{property.rooms}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer: Price & Actions */}
      <div className="px-5 pb-5 pt-3 border-t border-stone-100 flex items-center justify-between">
        <div>
          <div className="text-base font-medium text-[var(--color-sumi)] tracking-tight">
            {property.priceFormatted}
          </div>
          <div className="text-[10px] text-[var(--color-mist)]">
            approx. {property.approxUsd}
          </div>
        </div>

        {confirmingDelete ? (
          <div
            className="flex items-center gap-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => deleteProperty(property.id)}
              className="px-2.5 py-1 text-[10px] bg-red-600 text-white uppercase tracking-wider hover:bg-red-700"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={() => setConfirmingDelete(false)}
              className="px-2 py-1 text-[10px] border border-stone-300 text-stone-600 uppercase tracking-wider"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProperty(property);
              }}
              className="px-3 py-1.5 text-xs uppercase tracking-widest border border-stone-300 text-[var(--color-sumi)] hover:bg-[var(--color-sumi)] hover:text-[var(--color-washi)] hover:border-[var(--color-sumi)] transition-colors cursor-pointer"
            >
              Details
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setConfirmingDelete(true);
              }}
              className="p-1.5 text-stone-300 hover:text-red-500 transition-colors cursor-pointer"
              title="Delete property"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
