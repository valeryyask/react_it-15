// src/components/DeleteButton.jsx — КНОПКА "УДАЛИТЬ" со спиннером.
// Переиспользуется для объектов недвижимости и для риелторов.

import LoadingButton from "./LoadingButton";

export default function DeleteButton({ loading, onClick }) {
  return (
    <LoadingButton
      className="btn btn-danger"
      loading={loading}
      onClick={onClick}
    >
      Удалить
    </LoadingButton>
  );
}
