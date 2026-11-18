// src/store/propertiesSlice.js — СЛАЙС ОБЪЕКТОВ НЕДВИЖИМОСТИ (таблица).
//
// Форма state:
//   items          — массив объектов недвижимости (простые объекты)
//   status         — состояние ЗАГРУЗКИ списка: "idle" | "loading" | "succeeded" | "failed"
//   error          — текст ошибки загрузки списка или null
//   isAdding       — идёт ли сейчас добавление (спиннер на кнопке "Добавить")
//   deletingIds    — id объектов, которые удаляются прямо сейчас (спиннер на кнопке "Удалить" в нужной строке)
//   operationError — ошибка добавления/удаления или null

import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit"; // createSelector — мемоизированные селекторы
import { propertyService } from "../services/PropertyService"; // заглушка с данными
import { delay } from "../utils/delay";

// ---------- ASYNC THUNK'и ----------
// Каждый createAsyncThunk создаёт три action'а: <имя>/pending, <имя>/fulfilled, <имя>/rejected.
// К ним привязаны спиннеры: pending — крутится, fulfilled — показали результат, rejected — показали ошибку.

// Загрузка списка (вызывается при открытии страницы с таблицей)
export const fetchProperties = createAsyncThunk(
  "properties/fetch",
  async () => {
    await delay(900); // имитация загрузки
    // Экземпляры класса Property -> простые объекты ({ ...item }),
    // потому что в Redux-хранилище должны лежать только сериализуемые данные
    return propertyService.all().map((item) => ({ ...item }));
  },
  {
    // condition — "предохранитель": если загрузка уже идёт, второй запрос не отправляем
    condition: (_, { getState }) => getState().properties.status !== "loading",
  },
);

// Добавление объекта недвижимости
export const addProperty = createAsyncThunk(
  "properties/add",
  async (data, { rejectWithValue }) => {
    await delay(500);
    if (!data.title || !data.title.trim()) {
      return rejectWithValue("Введите название объекта");
    }
    if (data.price < 0 || data.area < 0) {
      return rejectWithValue("Цена и площадь не могут быть отрицательными");
    }
    const created = propertyService.add({ ...data, title: data.title.trim() }); // сервис назначает id
    return { ...created }; // простой объект -> попадёт в action.payload
  },
);

// Удаление объекта недвижимости по id
export const deleteProperty = createAsyncThunk(
  "properties/delete",
  async (id, { rejectWithValue }) => {
    await delay(500);
    const removed = propertyService.delete(id); // true, если запись была
    if (!removed) {
      return rejectWithValue("Объект недвижимости не найден");
    }
    return id; // в payload кладём id, чтобы слайс знал, что убрать из items
  },
);

// ---------- СЛАЙС ----------
const propertiesSlice = createSlice({
  name: "properties",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    isAdding: false,
    deletingIds: [],
    operationError: null,
  },

  // Обычные (синхронные) редьюсеры не нужны — вся логика в extraReducers
  reducers: {},

  extraReducers: (builder) => {
    builder
      // ----- загрузка списка -----
      .addCase(fetchProperties.pending, (state) => {
        state.status = "loading"; // запрос пошёл -> на месте таблицы крутится спиннер
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.status = "succeeded"; // успех -> вместо спиннера показывается таблица
        state.items = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.status = "failed"; // ошибка -> вместо таблицы показывается ошибка
        state.error = action.payload ?? action.error.message;
      })

      // ----- добавление -----
      .addCase(addProperty.pending, (state) => {
        state.isAdding = true; // спиннер на кнопке "Добавить"
        state.operationError = null;
      })
      .addCase(addProperty.fulfilled, (state, action) => {
        state.isAdding = false;
        state.items.push(action.payload); // push разрешён благодаря Immer
      })
      .addCase(addProperty.rejected, (state, action) => {
        state.isAdding = false;
        state.operationError = action.payload ?? action.error.message;
      })

      // ----- удаление -----
      // action.meta.arg — id удаляемой записи
      .addCase(deleteProperty.pending, (state, action) => {
        state.deletingIds.push(action.meta.arg); // спиннер на кнопке этой строки
        state.operationError = null;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.deletingIds = state.deletingIds.filter(
          (id) => id !== action.meta.arg,
        );
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.deletingIds = state.deletingIds.filter(
          (id) => id !== action.meta.arg,
        );
        state.operationError = action.payload ?? action.error.message;
      });
  },
});

export default propertiesSlice.reducer;

// ---------- СЕЛЕКТОРЫ ----------
export const selectProperties = (state) => state.properties.items;
export const selectPropertiesStatus = (state) => state.properties.status;
export const selectPropertiesError = (state) => state.properties.error;
export const selectIsAddingProperty = (state) => state.properties.isAdding;
export const selectDeletingPropertyIds = (state) => state.properties.deletingIds;
export const selectPropertiesOperationError = (state) =>
  state.properties.operationError;

// Порог высокой цены для аналитики
export const HIGH_PRICE_LIMIT = 200000;

// МЕМОИЗИРОВАННЫЙ селектор: сводка по недвижимости.
// Пересчёт происходит только когда ссылка items реально изменилась.
export const selectPropertiesStats = createSelector(
  [selectProperties],
  (items) => {
    let totalArea = 0;
    let totalValue = 0;
    let highPriceCount = 0;
    for (const item of items) {
      totalArea += Number(item.area) || 0;
      totalValue += Number(item.price) || 0;
      if (item.price >= HIGH_PRICE_LIMIT) highPriceCount += 1;
    }
    return {
      count: items.length,
      totalArea,
      totalValue: Math.round(totalValue),
      highPriceCount,
    };
  },
);

// Мемоизированный селектор С ПАРАМЕТРОМ: удаляется ли объект прямо сейчас
export const selectIsPropertyDeleting = createSelector(
  [selectDeletingPropertyIds, (state, id) => id],
  (deletingIds, id) => deletingIds.includes(id),
);
