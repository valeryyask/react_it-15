import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteProperty } from '../features/properties/propertiesSlice';

export default function PropertyTable({ properties, onEdit, onView }) {
  const dispatch = useDispatch();
  const [deletingId, setDeletingId] = useState(null);

  if (!properties || properties.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-12 text-center text-gray-500">
        <p className="text-base font-medium">Ничего не найдено</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase">
              <th className="py-3 px-4">Название</th>
              <th className="py-3 px-4">Тип</th>
              <th className="py-3 px-4 text-right">Цена</th>
              <th className="py-3 px-4 text-right">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {properties.map((prop) => (
              <tr key={prop.id} className="hover:bg-gray-50">
                <td className="py-3 px-4">{prop.title}</td>
                <td className="py-3 px-4">{prop.type}</td>
                <td className="py-3 px-4 text-right">${prop.price.toLocaleString()}</td>
                <td className="py-3 px-4 text-right flex justify-end items-center gap-3">
                  <button onClick={() => onView(prop)} className="text-blue-600 hover:text-blue-800 font-medium text-sm">Просмотр</button>
                  <button onClick={() => onEdit(prop)} className="text-blue-600 hover:text-blue-800 font-medium text-sm">Изменить</button>
                  {deletingId === prop.id ? (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 text-sm">Удалить?</span>
                      <button onClick={() => dispatch(deleteProperty(prop.id))} className="text-red-600 font-bold hover:text-red-800 text-sm">Да</button>
                      <button onClick={() => setDeletingId(null)} className="text-gray-500 hover:text-gray-700 text-sm">Нет</button>
                    </div>
                  ) : (
                    <button onClick={() => setDeletingId(prop.id)} className="text-red-600 hover:text-red-800 font-medium text-sm">Удалить</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
