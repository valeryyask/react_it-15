// src/components/LoadingOverlay.jsx — ГЛОБАЛЬНОЕ ОКНО ЗАГРУЗКИ (спиннер на весь экран).
// Показывается при входе и регистрации (пока state.auth.status === "loading").

import { useSelector } from "react-redux";
import { selectIsLoading } from "../store/selectors";
import Spinner from "./Spinner";

export default function LoadingOverlay() {
  const isLoading = useSelector(selectIsLoading);

  if (!isLoading) return null;

  return (
    <div className="overlay overlay-fixed" role="status" aria-live="polite">
      <Spinner />
    </div>
  );
}
