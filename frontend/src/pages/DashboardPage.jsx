import { useState } from 'react';
import Header from '../components/Header';
import PropertyTable from '../components/PropertyTable';
import PropertyCard from '../components/PropertyCard';
import PropertyDetailModal from '../components/PropertyDetailModal';
import AddPropertyModal from '../components/AddPropertyModal';
import { useProperties } from '../context/PropertyContext';

export default function DashboardPage() {
  const {
    filteredProperties,
    propertyTypes,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    setIsAddModalOpen,
    resetDefaults
  } = useProperties();

  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {/* Шапка сайта */}
      <Header />

      {/* Основной контент */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        
        {/* Верхняя панель управления */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Каталог объектов недвижимости
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Управление данными в таблице и просмотр карточек объектов
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={resetDefaults}
              className="px-3 py-2 text-xs font-medium border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-100 transition-colors cursor-pointer"
              title="Восстановить начальные 6 объектов"
            >
              Сбросить данные
            </button>
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 text-xs font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
            >
              + Добавить объект
            </button>
          </div>
        </div>

        {/* Панель поиска, фильтрации и переключения вида */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Поле поиска */}
            <div className="relative flex-1 max-w-sm">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск по названию или локации..."
                className="w-full px-3 py-1.5 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Переключатель вида: Таблица / Карточки */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-md self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-white text-gray-900 shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Таблица
              </button>
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors cursor-pointer ${
                  viewMode === 'cards'
                    ? 'bg-white text-gray-900 shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Карточки
              </button>
            </div>
          </div>

          {/* Фильтры по типам недвижимости */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-1">
            <span className="text-xs text-gray-500 mr-1">Фильтр:</span>
            {propertyTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFilterType(type)}
                className={`px-2.5 py-1 text-xs rounded-full border transition-colors cursor-pointer whitespace-nowrap ${
                  filterType === type
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Отображение: Таблица или Карточки */}
        <div>
          {viewMode === 'table' ? (
            <PropertyTable />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Простой футер */}
      <footer className="mt-auto border-t border-gray-200 bg-white py-4 text-center text-xs text-gray-500">
        Лабораторная работа 1 • Агентство недвижимости
      </footer>

      {/* Модальные окна */}
      <PropertyDetailModal />
      <AddPropertyModal />
    </div>
  );
}
