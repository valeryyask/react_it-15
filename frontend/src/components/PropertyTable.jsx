import { useState } from 'react';
import { useProperties } from '../context/PropertyContext';

export default function PropertyTable() {
  const {
    filteredProperties,
    sortConfig,
    toggleSort,
    setSelectedProperty,
    setEditingProperty,
    deleteProperty
  } = useProperties();

  const [deletingId, setDeletingId] = useState(null);

  const getSortIndicator = (field) => {
    if (sortConfig.field !== field) return <span className="text-gray-300 ml-1">↕</span>;
    return (
      <span className="text-blue-600 font-bold ml-1">
        {sortConfig.direction === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  if (filteredProperties.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-12 text-center text-gray-500">
        <p className="text-base font-medium">Ничего не найдено</p>
        <p className="text-sm mt-1 text-gray-400">Попробуйте изменить параметры поиска или фильтра</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
              {/* Название */}
              <th
                onClick={() => toggleSort('title')}
                className="py-3 px-4 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                Название {getSortIndicator('title')}
              </th>

              {/* Тип */}
              <th className="py-3 px-4">Тип</th>

              {/* Локация */}
              <th className="py-3 px-4">Локация</th>

              {/* Площадь */}
              <th
                onClick={() => toggleSort('area')}
                className="py-3 px-4 cursor-pointer hover:bg-gray-100 transition-colors text-right"
              >
                Площадь (м²) {getSortIndicator('area')}
              </th>

              {/* Цена */}
              <th
                onClick={() => toggleSort('price')}
                className="py-3 px-4 cursor-pointer hover:bg-gray-100 transition-colors text-right"
              >
                Цена ($) {getSortIndicator('price')}
              </th>

              {/* Действия */}
              <th className="py-3 px-4 text-right">Действия</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
            {filteredProperties.map((prop) => {
              const isDeleting = deletingId === prop.id;

              return (
                <tr key={prop.id} className="hover:bg-gray-50 transition-colors">
                  {/* Название с фото */}
                  <td className="py-3 px-4 font-medium text-gray-900">
                    <div className="flex items-center gap-3">
                      <img
                        src={prop.imageUrl}
                        alt={prop.title}
                        className="w-10 h-10 object-cover rounded-sm border border-gray-200 shrink-0"
                      />
                      <span>{prop.title}</span>
                    </div>
                  </td>

                  {/* Тип */}
                  <td className="py-3 px-4 text-gray-600">
                    <span className="inline-block px-2 py-0.5 text-xs bg-gray-100 rounded-sm border border-gray-200">
                      {prop.type}
                    </span>
                  </td>

                  {/* Локация */}
                  <td className="py-3 px-4 text-gray-600">{prop.location}</td>

                  {/* Площадь */}
                  <td className="py-3 px-4 text-right font-medium">{prop.area} м²</td>

                  {/* Цена */}
                  <td className="py-3 px-4 text-right font-semibold text-gray-900">
                    ${prop.price.toLocaleString('en-US')}
                  </td>

                  {/* Действия */}
                  <td className="py-3 px-4 text-right">
                    {isDeleting ? (
                      <div className="inline-flex items-center gap-2">
                        <span className="text-xs text-red-600 font-medium">Удалить?</span>
                        <button
                          type="button"
                          onClick={() => {
                            deleteProperty(prop.id);
                            setDeletingId(null);
                          }}
                          className="px-2 py-1 text-xs bg-red-600 text-white rounded-sm hover:bg-red-700 transition-colors cursor-pointer"
                        >
                          Да
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingId(null)}
                          className="px-2 py-1 text-xs border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          Нет
                        </button>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedProperty(prop)}
                          className="px-2.5 py-1 text-xs font-medium border border-gray-300 rounded-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          Просмотр
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingProperty(prop)}
                          className="px-2.5 py-1 text-xs font-medium border border-blue-200 rounded-sm text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                        >
                          Изменить
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingId(prop.id)}
                          className="px-2.5 py-1 text-xs font-medium border border-red-200 rounded-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Удалить строку"
                        >
                          Удалить
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

      {/* Футер таблицы */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex items-center justify-between">
        <span>Всего отображается: {filteredProperties.length}</span>
        <span>Кликните по заголовку для сортировки</span>
      </div>
    </div>
  );
}
