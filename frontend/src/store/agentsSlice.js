// src/store/agentsSlice.js — СЛАЙС АГЕНТОВ / РИЕЛТОРОВ (вторая форма, таблица на TanStack Table).
//
// Форма state:
//   items, status, error            — список и состояние его загрузки
//   isAdding, deletingIds           — спиннеры на кнопках "Добавить" / "Удалить"
//   operationError                  — ошибка добавления/удаления
//
// Список загружается НАСТОЯЩИМ асинхронным запросом fetch к публичному тестовому API
// (JSONPlaceholder). Добавление и удаление — thunk'и с имитацией задержки.

import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { delay } from "../utils/delay";

const AGENTS_URL = "https://jsonplaceholder.typicode.com/users"; // публичное тестовое API

// ---------- ASYNC THUNK'и ----------

// Загрузка списка по сети (настоящий fetch)
export const fetchAgents = createAsyncThunk(
  "agents/fetch",
  async (_, { rejectWithValue, signal }) => {
    try {
      const response = await fetch(AGENTS_URL, { signal });
      if (!response.ok) {
        return rejectWithValue(`Ошибка сервера: ${response.status}`);
      }
      const users = await response.json();
      return users.map((user) => ({
        id: user.id,
        name: user.name, // имя риелтора
        agency: user.company.name, // агентство / отдел
        city: user.address.city, // город
        phone: user.phone, // телефон
        email: user.email, // email
      }));
    } catch {
      return rejectWithValue(
        "Не удалось загрузить список агентов. Проверьте подключение к сети.",
      );
    }
  },
  {
    condition: (_, { getState }) => getState().agents.status !== "loading",
  },
);

// Добавление агента
export const addAgent = createAsyncThunk(
  "agents/add",
  async (data, { getState, rejectWithValue }) => {
    await delay(500);
    const name = data.name?.trim() || "";
    const city = data.city?.trim() || "";
    if (!name) return rejectWithValue("Введите имя риелтора");
    if (!city) return rejectWithValue("Введите город");

    const lastId = getState().agents.items.reduce(
      (maxId, item) => Math.max(maxId, Number(item.id) || 0),
      0,
    );
    return {
      id: lastId + 1,
      name,
      agency: data.agency?.trim() || "Независимый риелтор",
      city,
      phone: data.phone?.trim() || "—",
      email: data.email?.trim() || "—",
    };
  },
);

// Удаление агента по id
export const deleteAgent = createAsyncThunk(
  "agents/delete",
  async (id, { getState, rejectWithValue }) => {
    await delay(500);
    const exists = getState().agents.items.some((item) => item.id === id);
    if (!exists) return rejectWithValue("Агент не найден");
    return id;
  },
);

// ---------- СЛАЙС ----------
const agentsSlice = createSlice({
  name: "agents",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    isAdding: false,
    deletingIds: [],
    operationError: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // ----- загрузка списка -----
      .addCase(fetchAgents.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAgents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchAgents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message;
      })

      // ----- добавление -----
      .addCase(addAgent.pending, (state) => {
        state.isAdding = true;
        state.operationError = null;
      })
      .addCase(addAgent.fulfilled, (state, action) => {
        state.isAdding = false;
        state.items.push(action.payload);
      })
      .addCase(addAgent.rejected, (state, action) => {
        state.isAdding = false;
        state.operationError = action.payload ?? action.error.message;
      })

      // ----- удаление -----
      .addCase(deleteAgent.pending, (state, action) => {
        state.deletingIds.push(action.meta.arg);
        state.operationError = null;
      })
      .addCase(deleteAgent.fulfilled, (state, action) => {
        state.deletingIds = state.deletingIds.filter(
          (id) => id !== action.meta.arg,
        );
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteAgent.rejected, (state, action) => {
        state.deletingIds = state.deletingIds.filter(
          (id) => id !== action.meta.arg,
        );
        state.operationError = action.payload ?? action.error.message;
      });
  },
});

export default agentsSlice.reducer;

// ---------- СЕЛЕКТОРЫ ----------
export const selectAgents = (state) => state.agents.items;
export const selectAgentsStatus = (state) => state.agents.status;
export const selectAgentsError = (state) => state.agents.error;
export const selectIsAddingAgent = (state) => state.agents.isAdding;
export const selectDeletingAgentIds = (state) => state.agents.deletingIds;
export const selectAgentsOperationError = (state) =>
  state.agents.operationError;

// Мемоизированный селектор: сводка по риелторам
export const selectAgentsStats = createSelector(
  [selectAgents],
  (items) => ({
    count: items.length,
    cities: new Set(items.map((item) => item.city)).size,
  }),
);

// Мемоизированный селектор с параметром
export const selectIsAgentDeleting = createSelector(
  [selectDeletingAgentIds, (state, id) => id],
  (deletingIds, id) => deletingIds.includes(id),
);
