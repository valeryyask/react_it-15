import { createPortal } from 'react-dom';

export function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">Закрыть</button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}
