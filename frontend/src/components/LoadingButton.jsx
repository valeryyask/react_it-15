// src/components/LoadingButton.jsx — КНОПКА СО СПИННЕРОМ.
// Пока loading === true: внутри кнопки крутится маленький спиннер, а кнопка заблокирована.

import Spinner from "./Spinner";

export default function LoadingButton({
  loading = false,
  disabled,
  children,
  ...rest
}) {
  return (
    <button
      type="button"
      disabled={loading || disabled}
      aria-busy={loading}
      {...rest}
    >
      {loading && <Spinner small />}
      {children}
    </button>
  );
}
