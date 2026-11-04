import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProperty } from '../features/properties/propertiesSlice';
import { Modal } from './ui/Modal';

export default function AddPropertyModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ title: '', type: 'Квартира', location: '', area: '', price: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProperty({
      id: `prop-${Date.now()}`,
      ...formData,
      area: Number(formData.area),
      price: Number(formData.price)
    }));
    onClose();
    setFormData({ title: '', type: 'Квартира', location: '', area: '', price: '' });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Добавить объект">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" placeholder="Название" required
          className="w-full p-2 border rounded"
          value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
        />
        <input 
          type="number" placeholder="Площадь" required
          className="w-full p-2 border rounded"
          value={formData.area} onChange={(e) => setFormData({...formData, area: e.target.value})}
        />
        <input 
          type="number" placeholder="Цена" required
          className="w-full p-2 border rounded"
          value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})}
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Добавить</button>
      </form>
    </Modal>
  );
}
