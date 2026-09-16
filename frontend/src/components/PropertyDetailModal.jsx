import { useEffect } from 'react';
import { useProperties } from '../context/PropertyContext';

export default function PropertyDetailModal() {
  const { selectedProperty, setSelectedProperty } = useProperties();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedProperty(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedProperty]);

  if (!selectedProperty) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={() => setSelectedProperty(null)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Шапка модалки */}
        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900 truncate">
            {selectedProperty.title}
          </h2>
          <button
            type="button"
            onClick={() => setSelectedProperty(null)}
            className="text-gray-400 hover:text-gray-600 text-lg leading-none cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Фото */}
        <div className="aspect-[16/9] bg-gray-100 overflow-hidden">
          <img
            src={selectedProperty.imageUrl}
            alt={selectedProperty.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Характеристики */}
        <div className="p-5 space-y-3 text-sm">
          <div className="flex justify-between py-1.5 border-b border-gray-100">
            <span className="text-gray-500">Тип недвижимости:</span>
            <span className="font-medium text-gray-900">{selectedProperty.type}</span>
          </div>

          <div className="flex justify-between py-1.5 border-b border-gray-100">
            <span className="text-gray-500">Локация / Адрес:</span>
            <span className="font-medium text-gray-900">{selectedProperty.location}</span>
          </div>

          <div className="flex justify-between py-1.5 border-b border-gray-100">
            <span className="text-gray-500">Общая площадь:</span>
            <span className="font-medium text-gray-900">{selectedProperty.area} м²</span>
          </div>

          <div className="flex justify-between py-1.5 border-b border-gray-100">
            <span className="text-gray-500">Стоимость:</span>
            <span className="text-base font-bold text-blue-600">
              ${selectedProperty.price.toLocaleString('en-US')}
            </span>
          </div>
        </div>

        {/* Кнопка закрытия */}
        <div className="px-5 py-3 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            type="button"
            onClick={() => setSelectedProperty(null)}
            className="px-4 py-2 text-xs font-medium uppercase tracking-wider bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}
