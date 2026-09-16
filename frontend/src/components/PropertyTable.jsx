import { useState } from 'react';
import { useProperties } from '../context/PropertyContext';

export default function PropertyTable() {
  const {
    filteredProperties,
    sortConfig,
    toggleSort,
    setSelectedProperty,
    deleteProperty
  } = useProperties();

  const [deletingId, setDeletingId] = useState(null);

  const confirmDelete = (e, id) => {
    e.stopPropagation();
    deleteProperty(id);
    setDeletingId(null);
  };

  const cancelDelete = (e) => {
    e.stopPropagation();
    setDeletingId(null);
  };

  const promptDelete = (e, id) => {
    e.stopPropagation();
    setDeletingId(id);
  };

  const getSortIndicator = (field) => {
    if (sortConfig.field !== field) {
      return <span className="text-stone-300 ml-1">↕</span>;
    }
    return (
      <span className="text-[var(--color-take)] font-bold ml-1">
        {sortConfig.direction === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Available':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-medium tracking-wider uppercase bg-emerald-50 text-[var(--color-take)] border border-[var(--color-take)]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-take)]"></span>
            Available
          </span>
        );
      case 'Reserved':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-medium tracking-wider uppercase bg-stone-100 text-[var(--color-mist)] border border-stone-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-mist)]"></span>
            Reserved
          </span>
        );
      case 'Under Offer':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-medium tracking-wider uppercase bg-amber-50 text-[var(--color-ki)] border border-[var(--color-ki)]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-ki)]"></span>
            Under Offer
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 text-[11px] bg-stone-100 text-stone-700">
            {status}
          </span>
        );
    }
  };

  if (filteredProperties.length === 0) {
    return (
      <div className="bg-white border border-stone-300/70 p-16 text-center">
        <span className="text-3xl font-light text-stone-400 block mb-2">無</span>
        <p className="text-sm uppercase tracking-widest text-[var(--color-mist)] mb-1">
          No listings found
        </p>
        <p className="text-xs text-stone-400">
          Try clearing filters or search criteria to view properties.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-stone-300/70 shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-stone-200 bg-[#FAF8F5] text-[11px] tracking-[0.16em] uppercase text-[var(--color-mist)] select-none">
              
              {/* Code */}
              <th
                onClick={() => toggleSort('code')}
                className="py-3.5 px-4 font-normal cursor-pointer hover:text-[var(--color-sumi)] transition-colors w-24"
              >
                Code {getSortIndicator('code')}
              </th>

              {/* Property name */}
              <th
                onClick={() => toggleSort('title')}
                className="py-3.5 px-4 font-normal cursor-pointer hover:text-[var(--color-sumi)] transition-colors min-w-[240px]"
              >
                Property / 建築物 {getSortIndicator('title')}
              </th>

              {/* Type */}
              <th className="py-3.5 px-4 font-normal">
                Type
              </th>

              {/* Location */}
              <th className="py-3.5 px-4 font-normal">
                Location
              </th>

              {/* Area */}
              <th
                onClick={() => toggleSort('area')}
                className="py-3.5 px-4 font-normal cursor-pointer hover:text-[var(--color-sumi)] transition-colors text-right"
              >
                Area {getSortIndicator('area')}
              </th>

              {/* Price */}
              <th
                onClick={() => toggleSort('price')}
                className="py-3.5 px-4 font-normal cursor-pointer hover:text-[var(--color-sumi)] transition-colors text-right min-w-[140px]"
              >
                Price (JPY) {getSortIndicator('price')}
              </th>

              {/* Status */}
              <th className="py-3.5 px-4 font-normal text-center">
                Status
              </th>

              {/* Actions */}
              <th className="py-3.5 px-4 font-normal text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-stone-200/80 text-xs">
            {filteredProperties.map((prop) => {
              const isDeleting = deletingId === prop.id;

              return (
                <tr
                  key={prop.id}
                  onClick={() => setSelectedProperty(prop)}
                  className="hover:bg-[#FAF8F5]/80 transition-colors cursor-pointer group"
                >
                  {/* Code */}
                  <td className="py-4 px-4 font-mono text-[11px] text-stone-500 tracking-wider">
                    {prop.code}
                  </td>

                  {/* Property Name & Kanji */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={prop.imageUrl}
                        alt={prop.title}
                        className="w-11 h-11 object-cover border border-stone-200 flex-shrink-0"
                        loading="lazy"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[var(--color-sumi)] tracking-wide group-hover:text-[var(--color-take)] transition-colors">
                            {prop.title}
                          </span>
                          <span className="text-[10px] text-stone-400 font-light">
                            {prop.japaneseTitle}
                          </span>
                        </div>
                        <p className="text-[11px] text-[var(--color-mist)] line-clamp-1 mt-0.5">
                          {prop.subtitle}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="py-4 px-4 text-stone-600">
                    <span className="inline-block px-2 py-0.5 bg-stone-100 text-[11px] tracking-wide text-stone-600 border border-stone-200/60">
                      {prop.type}
                    </span>
                  </td>

                  {/* Location */}
                  <td className="py-4 px-4 text-stone-600">
                    <div>
                      <span>{prop.location}</span>
                      <span className="block text-[10px] text-stone-400">
                        {prop.rooms} • Built {prop.yearBuilt}
                      </span>
                    </div>
                  </td>

                  {/* Area */}
                  <td className="py-4 px-4 text-right">
                    <span className="font-medium text-[var(--color-sumi)]">
                      {prop.area} m²
                    </span>
                    <span className="block text-[10px] text-stone-400">
                      {prop.tatami}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="py-4 px-4 text-right">
                    <span className="font-medium text-[var(--color-sumi)] tracking-tight">
                      {prop.priceFormatted}
                    </span>
                    <span className="block text-[10px] text-stone-400">
                      {prop.approxUsd}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4 text-center">
                    {getStatusBadge(prop.status)}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 text-right">
                    {isDeleting ? (
                      <div className="inline-flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <span className="text-[10px] text-red-600 uppercase tracking-wider mr-1">
                          Delete?
                        </span>
                        <button
                          type="button"
                          onClick={(e) => confirmDelete(e, prop.id)}
                          className="px-2 py-1 text-[10px] bg-red-600 text-white tracking-widest uppercase hover:bg-red-700 transition-colors"
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={cancelDelete}
                          className="px-2 py-1 text-[10px] border border-stone-300 text-stone-600 tracking-widest uppercase hover:bg-stone-100 transition-colors"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProperty(prop);
                          }}
                          className="px-2.5 py-1 text-[11px] tracking-wider uppercase border border-stone-300 text-[var(--color-sumi)] hover:border-[var(--color-sumi)] hover:bg-[var(--color-sumi)] hover:text-[var(--color-washi)] transition-colors cursor-pointer"
                          title="View detailed architecture card"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          onClick={(e) => promptDelete(e, prop.id)}
                          className="px-2 py-1 text-[11px] tracking-wider text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                          title="Delete property row"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Table Footer */}
      <div className="p-3 border-t border-stone-200 bg-[#FAF8F5] flex items-center justify-between text-[11px] text-[var(--color-mist)] tracking-wider">
        <span>
          Showing {filteredProperties.length} of {filteredProperties.length} listings
        </span>
        <span className="hidden sm:inline text-stone-400 text-[10px]">
          Click any row to open full architectural card • Click column headers to sort
        </span>
      </div>
    </div>
  );
}
