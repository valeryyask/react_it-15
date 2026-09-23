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
  const [filterType, setFilterType] = useState('Все');
  const [sortConfig, setSortConfig] = useState({ field: null, direction: 'asc' });
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [editingProperty, setEditingProperty] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddProperty = (propertyData) => {
    const rawPrice = Number(propertyData.price) || 0;
    const rawArea = Number(propertyData.area) || 0;

    const newProperty = {
      id: `prop-${Date.now()}`,
      title: propertyData.title.trim(),
      type: propertyData.type || 'Квартира',
      location: propertyData.location.trim(),
      area: rawArea,
      price: rawPrice,
      imageUrl:
        propertyData.imageUrl?.trim() ||
        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'
    };

    const updated = [newProperty, ...properties];
    setProperties(updated);
    saveProperties(updated);
    return newProperty;
  };

  const handleUpdateProperty = (id, updatedData) => {
    const rawPrice = Number(updatedData.price) || 0;
    const rawArea = Number(updatedData.area) || 0;

    const updated = properties.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          title: updatedData.title.trim(),
          type: updatedData.type || p.type,
          location: updatedData.location.trim(),
          area: rawArea,
          price: rawPrice,
          imageUrl: updatedData.imageUrl?.trim() || p.imageUrl
        };
      }
      return p;
    });

    setProperties(updated);
    saveProperties(updated);

    if (selectedProperty && selectedProperty.id === id) {
      setSelectedProperty(updated.find((p) => p.id === id));
    }
    setEditingProperty(null);
  };

  const handleDeleteProperty = (id) => {
    const updated = properties.filter((p) => p.id !== id);
    setProperties(updated);
    saveProperties(updated);
    if (selectedProperty && selectedProperty.id === id) {
      setSelectedProperty(null);
    }
    if (editingProperty && editingProperty.id === id) {
      setEditingProperty(null);
    }
  };

  const handleResetDefaults = () => {
    const defaults = resetPropertiesStorage();
    setProperties(defaults);
    setSearchQuery('');
    setFilterType('Все');
    setSortConfig({ field: null, direction: 'asc' });
    setSelectedProperty(null);
    setEditingProperty(null);
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
    return ['Все', ...Array.from(types)];
  }, [properties]);

  const filteredAndSortedProperties = useMemo(() => {
    let result = [...properties];

    if (filterType !== 'Все') {
      result = result.filter((p) => p.type.toLowerCase() === filterType.toLowerCase());
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q)
      );
    }

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
        editingProperty,
        setEditingProperty,
        isAddModalOpen,
        setIsAddModalOpen,
        addProperty: handleAddProperty,
        updateProperty: handleUpdateProperty,
        deleteProperty: handleDeleteProperty,
        resetDefaults: handleResetDefaults
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
