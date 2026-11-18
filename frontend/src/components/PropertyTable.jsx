// src/components/PropertyTable.jsx — СТРОКИ ТАБЛИЦЫ объектов недвижимости.
// Презентационный компонент: рисует переданный список. Кнопка удаления —
// отдельный компонент DeletePropertyButton со спиннером.

import DeletePropertyButton from "./DeletePropertyButton";

export default function PropertyTable({ properties }) {
  return (
    <>
      {properties.map((item) => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.title}</td>
          <td>{item.type}</td>
          <td>{item.location}</td>
          <td>{item.area} м²</td>
          <td>${Number(item.price).toLocaleString()}</td>
          <td>
            <DeletePropertyButton id={item.id} />
          </td>
        </tr>
      ))}
    </>
  );
}
