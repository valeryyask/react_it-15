// src/pages/HomePage.jsx — СТРАНИЦА ПРОСМОТРА (таблица объектов недвижимости).
// Операции разнесены по компонентам:
//   1) HomePage (этот файл)    — ЗАГРУЗКА списка: fetchProperties при открытии страницы;
//   2) AddPropertyForm         — ДОБАВЛЕНИЕ: addProperty, спиннер на кнопке "Добавить";
//   3) DeletePropertyButton    — УДАЛЕНИЕ: deleteProperty, спиннер на кнопке "Удалить".

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProperties,
  selectProperties,
  selectPropertiesStatus,
  selectPropertiesError,
  selectPropertiesOperationError,
  selectPropertiesStats,
  HIGH_PRICE_LIMIT,
} from "../store/propertiesSlice";
import PropertyTable from "../components/PropertyTable";
import AddPropertyForm from "../components/AddPropertyForm";
import AsyncContent from "../components/AsyncContent";
import ErrorMessage from "../components/ErrorMessage";
import StatsBar from "../components/StatsBar";

export default function HomePage() {
  const dispatch = useDispatch();
  const properties = useSelector(selectProperties);
  const status = useSelector(selectPropertiesStatus);
  const error = useSelector(selectPropertiesError);
  const operationError = useSelector(selectPropertiesOperationError);
  const stats = useSelector(selectPropertiesStats);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProperties());
    }
  }, [status, dispatch]);

  return (
    <section className="page">
      <h2>Объекты недвижимости</h2>

      {/* Ошибка добавления/удаления */}
      <ErrorMessage message={operationError} />

      {/* Асинхронное содержимое: спиннер / таблица / ошибка */}
      <AsyncContent
        status={status}
        error={error}
        onRetry={() => dispatch(fetchProperties())}
      >
        {/* Сводка по объектам недвижимости */}
        <StatsBar
          items={[
            { label: "Всего объектов", value: stats.count },
            { label: "Общая площадь", value: `${stats.totalArea} м²` },
            {
              label: "Стоимость портфеля",
              value: `$${stats.totalValue.toLocaleString()}`,
            },
            {
              label: `Премиум (≥ $${HIGH_PRICE_LIMIT.toLocaleString()})`,
              value: stats.highPriceCount,
            },
          ]}
        />

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Тип</th>
              <th>Локация</th>
              <th>Площадь</th>
              <th>Цена</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <PropertyTable properties={properties} />
            <AddPropertyForm />
          </tbody>
        </table>
      </AsyncContent>
    </section>
  );
}
