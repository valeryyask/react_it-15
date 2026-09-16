import { useProperties } from '../context/PropertyContext';

export default function PropertyCard({ property }) {
  const { setSelectedProperty, deleteProperty } = useProperties();

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        {/* Изображение */}
        <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <span className="absolute top-2 left-2 px-2 py-0.5 text-xs bg-white/90 font-medium text-gray-700 rounded-sm shadow-xs">
            {property.type}
          </span>
        </div>

        {/* Контент карточки */}
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-gray-900 text-base leading-snug line-clamp-1">
            {property.title}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-1">
            📍 {property.location}
          </p>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
            <span>Площадь:</span>
            <span className="font-medium text-gray-900">{property.area} м²</span>
          </div>
        </div>
      </div>

      {/* Футер карточки */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <span className="text-base font-bold text-gray-900">
          ${property.price.toLocaleString('en-US')}
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedProperty(property)}
            className="px-2.5 py-1 text-xs font-medium border border-gray-300 rounded-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Просмотр
          </button>
          <button
            type="button"
            onClick={() => {
              if (window.confirm(`Удалить объект "${property.title}"?`)) {
                deleteProperty(property.id);
              }
            }}
            className="px-2 py-1 text-xs font-medium border border-red-200 rounded-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
