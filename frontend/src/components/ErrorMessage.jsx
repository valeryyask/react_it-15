// src/components/ErrorMessage.jsx — БЛОК С ТЕКСТОМ ОШИБКИ.
// Рисуется внутри страницы, поэтому спиннер его не перекрывает.
// Если message пустой — ничего не показывает.

export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <p className="error" role="alert">
      {message}
    </p>
  );
}
