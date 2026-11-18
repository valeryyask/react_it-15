// src/store/selectors.js — СЕЛЕКТОРЫ общего назначения.

// Идёт ли сейчас авторизация/регистрация (спиннер на весь экран: LoadingOverlay).
// У таблиц спиннеры локальные и привязаны к своим действиям:
//   загрузка списка -> на месте таблицы (AsyncContent),
//   добавление / удаление -> прямо на кнопках (LoadingButton).
export const selectIsLoading = (state) => state.auth.status === "loading";
