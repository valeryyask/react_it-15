// src/components/StatsBar.jsx — ПОЛОСА КАРТОЧЕК СО СВОДКОЙ.
// Показывает список пар "подпись — значение".
// Переиспользуется на страницах недвижимости и риелторов.

export default function StatsBar({ items }) {
  return (
    <div className="stats">
      {items.map((item) => (
        <div className="stat" key={item.label}>
          <div className="stat-value">{item.value}</div>
          <div className="stat-label">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
