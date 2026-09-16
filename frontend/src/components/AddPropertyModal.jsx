import { useState, useEffect } from 'react';
import { useProperties } from '../context/PropertyContext';

export default function AddPropertyModal() {
  const { isAddModalOpen, setIsAddModalOpen, addProperty } = useProperties();

  const [title, setTitle] = useState('');
  const [type, setType] = useState('Квартира');
  const [location, setLocation] = useState('');
  const [area, setArea] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsAddModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsAddModalOpen]);

  if (!isAddModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Введите название объекта');
      return;
    }
    if (!location.trim()) {
      setError('Укажите локацию');
      return;
    }
    if (!area || Number(area) <= 0) {
      setError('Укажите корректную площадь в м²');
      return;
    }
    if (!price || Number(price) <= 0) {
      setError('Укажите корректную цену в USD');
      return;
    }

    addProperty({
      title: title.trim(),
      type,
      location: location.trim(),
      area: Number(area),
      price: Number(price)
    });

    // Очистка формы и закрытие
    setTitle('');
    setType('Квартира');
    setLocation('');
    setArea('');
    setPrice('');
    setError('');
    setIsAddModalOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={() => setIsAddModalOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Заголовок модалки */}
        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">
            Добавить новый объект
          </h2>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(false)}
            className="text-gray-400 hover:text-gray-600 text-lg leading-none cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Сообщение об ошибке */}
        {error && (
          <div className="mx-5 mt-4 p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm">
            {error}
          </div>
        )}

        {/* Форма добавления */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-sm">
          {/* Название */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Название объекта <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              placeholder="Например, Квартира в центре"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              required
            />
          </div>

          {/* Тип */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Тип недвижимости
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            >
              <option value="Квартира">Квартира</option>
              <option value="Дом">Дом</option>
              <option value="Коммерческая">Коммерческая</option>
              <option value="Апартаменты">Апартаменты</option>
              <option value="Пентхаус">Пентхаус</option>
            </select>
          </div>

          {/* Локация */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Локация (Город, район) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                if (error) setError('');
              }}
              placeholder="Например, Москва, Арбат"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              required
            />
          </div>

          {/* Площадь и Цена */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Площадь (м²) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={area}
                onChange={(e) => {
                  setArea(e.target.value);
                  if (error) setError('');
                }}
                placeholder="75"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Цена ($) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                  if (error) setError('');
                }}
                placeholder="150000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                required
              />
            </div>
          </div>

          {/* Кнопки формы */}
          <div className="pt-3 border-t border-gray-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
