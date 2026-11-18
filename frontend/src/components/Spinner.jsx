// src/components/Spinner.jsx — КРУТЯЩИЙСЯ ИНДИКАТОР.
// Два вида:
//   <Spinner />        — большой, с подписью "Загрузка..." (окно загрузки, место таблицы);
//   <Spinner small />  — маленький кружок без подписи (внутри кнопки).

export default function Spinner({ small = false }) {
  if (small) {
    return <span className="spinner-small" role="status" aria-label="Загрузка" />;
  }

  return (
    <>
      <div className="spinner" />
      <span>Загрузка...</span>
    </>
  );
}
