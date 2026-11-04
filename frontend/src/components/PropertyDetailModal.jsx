import { Modal } from './ui/Modal';

export default function PropertyDetailModal({ property, isOpen, onClose }) {
  if (!property) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={property.title}>
      <div className="space-y-4">
        <img src={property.imageUrl} alt={property.title} className="w-full h-48 object-cover rounded" />
        <p>Тип: {property.type}</p>
        <p>Локация: {property.location}</p>
        <p>Площадь: {property.area} м²</p>
        <p className="font-bold text-lg">${property.price.toLocaleString()}</p>
      </div>
    </Modal>
  );
}