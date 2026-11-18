// src/store/index.js — ХРАНИЛИЩЕ (store) Redux. Одно на всё приложение.

import { configureStore } from "@reduxjs/toolkit"; // configureStore — создаёт store с настройками по умолчанию
import authReducer from "./authSlice"; // редьюсер авторизации
import propertiesReducer from "./propertiesSlice"; // редьюсер недвижимости
import agentsReducer from "./agentsSlice"; // редьюсер риелторов (вторая форма на TanStack Table)

export const store = configureStore({
  reducer: {
    auth: authReducer, // state.auth — пользователь, статус, ошибка
    properties: propertiesReducer, // state.properties — список недвижимости, статус, ошибка
    agents: agentsReducer, // state.agents — риелторы, статус, ошибка
  },
});
