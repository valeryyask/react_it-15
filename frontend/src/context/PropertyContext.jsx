import { createContext, useContext, useState, useMemo } from 'react';
import {
  loadProperties,
  saveProperties,
  resetPropertiesStorage
} from '../data/mockProperties';

const PropertyContext = createContext(null);

export function PropertyProvider({ children }) {
  const [properties, setProperties] = useState(() => loadProperties());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [sortConfig, setSortConfig] = useState({ field: null, direction: 'asc' });
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAddProperty = (propertyData) => {
    const nextCodeNumber = properties.length + 101;
    const rawPrice = Number(propertyData.price) || 0;
    const rawArea = Number(propertyData.area) || 0;
    const tatamiCount = Math.round(rawArea / 1.65);

    const newProperty = {
      id: `prop-${Date.now()}`,
      code: propertyData.code || `TYO-${nextCodeNumber}`,
      title: propertyData.title.trim(),
      japaneseTitle: propertyData.japaneseTitle?.trim() || '新着 物件',
      subtitle: propertyData.subtitle?.trim() || `${propertyData.type || 'Residence'} in ${propertyData.location || 'Japan'}`,
      type: propertyData.type || 'Machiya',
      location: propertyData.location?.trim() || 'Tokyo',
      prefecture: propertyData.location?.split(',')[0] || 'Tokyo',
      price: rawPrice,
      priceFormatted: `¥${rawPrice.toLocaleString('en-US')}`,
      approxUsd: `$${Math.round(rawPrice / 150).toLocaleString('en-US')}`,
      area: rawArea,
      tatami: `${tatamiCount} 畳`,
      rooms: propertyData.rooms || '2LDK',
      yearBuilt: Number(propertyData.yearBuilt) || new Date().getFullYear(),
      status: propertyData.status || 'Available',
      imageUrl:
        propertyData.imageUrl?.trim() ||
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      description: propertyData.description?.trim() || 'A thoughtfully designed minimalist living space emphasizing natural light and natural materials.',
      features: Array.isArray(propertyData.features) && propertyData.features.length > 0
        ? propertyData.features
        : ['Natural Cedar Accents', 'Sliding Shoji Screens', 'Minimalist Lighting'],
      agent: propertyData.agent || 'Kenjiro Sato (佐藤 健次郎)'
    };

    const updated = [newProperty, ...properties];
    setProperties(updated);
    saveProperties(updated);
    showToast(`Added "${newProperty.title}" to listings`);
    return newProperty;
  };

  const handleDeleteProperty = (id) => {
    const itemToDelete = properties.find((p) => p.id === id);
    const updated = properties.filter((p) => p.id !== id);
    setProperties(updated);
    saveProperties(updated);
    if (selectedProperty && selectedProperty.id === id) {
      setSelectedProperty(null);
    }
    showToast(`Removed "${itemToDelete?.title || 'property'}" from listings`);
  };

  const handleResetDefaults = () => {
    const defaults = resetPropertiesStorage();
    setProperties(defaults);
    setSearchQuery('');
    setFilterType('All');
    setSortConfig({ field: null, direction: 'asc' });
    setSelectedProperty(null);
    showToast('Reset listings to initial 6 properties');
  };

  const toggleSort = (field) => {
    setSortConfig((prev) => {
      if (prev.field === field) {
        if (prev.direction === 'asc') return { field, direction: 'desc' };
        return { field: null, direction: 'asc' };
      }
      return { field, direction: 'asc' };
    });
  };

  const propertyTypes = useMemo(() => {
    const types = new Set(properties.map((p) => p.type));
    return ['All', ...Array.from(types)];
  }, [properties]);

  const filteredAndSortedProperties = useMemo(() => {
    let result = [...properties];

    // Filter by type
    if (filterType !== 'All') {
      result = result.filter((p) => p.type.toLowerCase() === filterType.toLowerCase());
    }

    // Search query (title, location, code, japaneseTitle)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.japaneseTitle.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortConfig.field) {
      result.sort((a, b) => {
        let valA = a[sortConfig.field];
        let valB = b[sortConfig.field];

        if (typeof valA === 'string') {
          valA = valA.toLowerCase();
          valB = valB.toLowerCase();
        }

        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [properties, filterType, searchQuery, sortConfig]);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        filteredProperties: filteredAndSortedProperties,
        propertyTypes,
        searchQuery,
        setSearchQuery,
        filterType,
        setFilterType,
        sortConfig,
        toggleSort,
        selectedProperty,
        setSelectedProperty,
        isAddModalOpen,
        setIsAddModalOpen,
        addProperty: handleAddProperty,
        deleteProperty: handleDeleteProperty,
        resetDefaults: handleResetDefaults,
        toastMessage
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperties() {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
}
