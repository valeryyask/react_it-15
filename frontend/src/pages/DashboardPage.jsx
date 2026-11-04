import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProperties, resetProperties } from '../features/properties/propertiesSlice';
import Header from '../components/Header';
import PropertyTable from '../components/PropertyTable';
import PropertyCard from '../components/PropertyCard';
import PropertyDetailModal from '../components/PropertyDetailModal';
import AddPropertyModal from '../components/AddPropertyModal';
import EditPropertyModal from '../components/EditPropertyModal';
import { Spinner } from '../components/ui/Spinner';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { items: properties, loading } = useSelector((state) => state.properties);
  
  const [viewMode, setViewMode] = useState('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('Все');
  
  // Состояние модалок
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editProp, setEditProp] = useState(null);
  const [detailProp, setDetailProp] = useState(null);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  const propertyTypes = ['Все', ...new Set(properties.map((p) => p.type))];

  const filteredProperties = properties.filter((p) => {
    const matchesType = filterType === 'Все' || p.type.toLowerCase() === filterType.toLowerCase();
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Каталог объектов</h1>
          <div className="flex items-center gap-2">
            <button onClick={() => dispatch(resetProperties())} className="px-3 py-2 text-xs font-medium border border-gray-300 rounded-md bg-white hover:bg-gray-100 cursor-pointer">Сбросить</button>
            <button onClick={() => setIsAddOpen(true)} className="px-4 py-2 text-xs font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer">+ Добавить</button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Поиск..." className="w-full p-2 border rounded" />
            <div className="flex gap-2 mt-2">
                {propertyTypes.map(type => (
                    <button key={type} onClick={() => setFilterType(type)} className={`px-3 py-1 text-xs rounded-full ${filterType === type ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>
                        {type}
                    </button>
                ))}
            </div>
        </div>

        <div>
          {viewMode === 'table' ? (
            <PropertyTable properties={filteredProperties} onEdit={setEditProp} onView={setDetailProp} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProperties.map((prop) => (
                <div key={prop.id}>
                    <PropertyCard property={prop} />
                    <button onClick={() => setDetailProp(prop)} className="text-xs text-blue-600">Просмотр</button>
                    <button onClick={() => setEditProp(prop)} className="text-xs text-blue-600 ml-2">Изменить</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <AddPropertyModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
      <EditPropertyModal isOpen={!!editProp} onClose={() => setEditProp(null)} property={editProp} />
      <PropertyDetailModal isOpen={!!detailProp} onClose={() => setDetailProp(null)} property={detailProp} />
    </div>
  );
}
