// src/components/AddPropertyForm.jsx — ОПЕРАЦИЯ ДОБАВЛЕНИЯ объекта недвижимости.
// Строка таблицы с полями ввода. Сама диспатчит addProperty;
// спиннер крутится на кнопке "Добавить", пока выполняется запрос.

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProperty, selectIsAddingProperty } from "../store/propertiesSlice";
import LoadingButton from "./LoadingButton";

export default function AddPropertyForm() {
  const dispatch = useDispatch();
  const isAdding = useSelector(selectIsAddingProperty);

  const [title, setTitle] = useState("");
  const [type, setType] = useState("Квартира");
  const [location, setLocation] = useState("");
  const [area, setArea] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = () => {
    dispatch(
      addProperty({
        title,
        type,
        location,
        area: Number(area) || 0,
        price: Number(price) || 0,
      }),
    )
      .unwrap()
      .then(() => {
        setTitle("");
        setType("Квартира");
        setLocation("");
        setArea("");
        setPrice("");
      })
      .catch(() => {});
  };

  return (
    <tr className="add-row">
      <td></td>
      <td>
        <input
          placeholder="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </td>
      <td>
        <input
          placeholder="Тип (Дом, Квартира...)"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
      </td>
      <td>
        <input
          placeholder="Локация"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </td>
      <td>
        <input
          type="number"
          placeholder="Площадь, м²"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
      </td>
      <td>
        <input
          type="number"
          placeholder="Цена, $"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </td>
      <td>
        <LoadingButton
          className="btn btn-primary"
          loading={isAdding}
          onClick={handleSubmit}
        >
          Добавить
        </LoadingButton>
      </td>
    </tr>
  );
}
