// src/components/AsyncContent.jsx — "СПИННЕР -> РЕЗУЛЬТАТ ИЛИ ОШИБКА".
// Универсальная обёртка для данных, которые грузятся запросом:
//   status "idle" / "loading"  -> крутится спиннер;
//   status "succeeded"         -> показываем содержимое (таблицу);
//   status "failed"            -> ошибка и кнопка "Повторить".

import ErrorMessage from "./ErrorMessage";
import LoadingBlock from "./LoadingBlock";

export default function AsyncContent({ status, error, onRetry, children }) {
  if (status === "failed") {
    return (
      <div>
        <ErrorMessage message={error} />
        {onRetry && (
          <button type="button" className="btn btn-outline" onClick={onRetry}>
            Повторить загрузку
          </button>
        )}
      </div>
    );
  }

  if (status !== "succeeded") {
    return <LoadingBlock loading />;
  }

  return <>{children}</>;
}
