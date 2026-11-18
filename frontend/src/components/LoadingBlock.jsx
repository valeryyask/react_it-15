// src/components/LoadingBlock.jsx — ЛОКАЛЬНЫЙ СПИННЕР ПОВЕРХ БЛОКА.
// Оборачивает часть страницы и, пока loading === true, рисует над ней полупрозрачный слой.

import Spinner from "./Spinner";

export default function LoadingBlock({ loading, children }) {
  return (
    <div className="loading-block" aria-busy={loading}>
      {children}
      {loading && (
        <div className="overlay overlay-local" role="status">
          <Spinner />
        </div>
      )}
    </div>
  );
}
