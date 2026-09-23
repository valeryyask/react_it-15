import { useProperties } from '../context/PropertyContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { setIsAddModalOpen, properties } = useProperties();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Логотип и название */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
            АН
          </div>
          <div>
            <span className="font-semibold text-gray-900 text-base block leading-tight">
              Агентство недвижимости
            </span>
            <span className="text-xs text-gray-500">
              Каталог объектов • Объектов: {properties.length}
            </span>
          </div>
        </div>

        {/* Правая часть: кнопки */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <span className="text-xs text-gray-500 hidden sm:inline">
                {user.name}
              </span>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="px-3 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>+</span>
                <span className="hidden sm:inline">Добавить объект</span>
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="px-3 py-2 text-sm font-medium border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="px-3 py-2 text-sm font-medium border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Войти
              </button>
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="px-3 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Регистрация
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
