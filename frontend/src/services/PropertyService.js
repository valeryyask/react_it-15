// src/services/PropertyService.js — СЕРВИС-ЗАГЛУШКА объектов недвижимости.
// Вместо настоящего сервера хранит данные в памяти и даёт методы all/get/add/delete
// (как в заглушке, требуемой в лабораторной работе).

import Property from "../models/Property"; // модель записи

export default class PropertyService {
  #properties; // #поле — ПРИВАТНОЕ (инкапсуляция): снаружи класса к нему обратиться нельзя

  constructor(initial = []) {
    // initial — начальный список (по умолчанию пустой)
    this.#properties = initial;
  }

  all() {
    // вернуть весь список
    return this.#properties;
  }

  get(id) {
    // найти одну запись по id
    return this.#properties.find((item) => item.id === id); // find вернёт элемент или undefined
  }

  add({ title, type, location, area, price }) {
    // добавить запись (деструктуризация объекта-аргумента)
    const newProperty = new Property(
      this.#nextId(),
      title,
      type || "Квартира",
      location || "Минск",
      Number(area) || 0,
      Number(price) || 0,
    ); // id генерируем сами
    this.#properties = [...this.#properties, newProperty]; // НОВЫЙ массив (копия + новый элемент)
    return newProperty; // возвращаем созданную запись
  }

  delete(id) {
    // удалить запись по id
    const lengthBefore = this.#properties.length; // запоминаем длину до удаления
    this.#properties = this.#properties.filter((item) => item.id !== id); // filter создаёт НОВЫЙ массив без этой записи
    return this.#properties.length !== lengthBefore; // true, если что-то реально удалили
  }

  #nextId() {
    // приватный метод: вычисляет следующий свободный id
    const lastId = this.#properties.reduce(
      // reduce сворачивает массив в одно значение
      (maxId, item) => Math.max(maxId, Number(item.id) || 0), // на каждом шаге берём максимум из текущего max и id элемента
      0, // начальное значение — 0 (если список пуст, первый id будет 1)
    );
    return lastId + 1;
  }
}

// Единственный экземпляр сервиса (синглтон) с начальными данными.
// Все страницы импортируют именно его, поэтому видят одни и те же данные.
export const propertyService = new PropertyService([
  new Property(1, "Квартира в Москве", "Квартира", "Москва, Пресненский р-н", 65, 180000),
  new Property(2, "Загородный дом", "Дом", "Московская обл., Истра", 180, 250000),
  new Property(3, "Офис в центре", "Коммерческая", "Санкт-Петербург, Центральный р-н", 95, 140000),
  new Property(4, "Студия у моря", "Апартаменты", "Сочи, Адлер", 38, 95000),
  new Property(5, "Коттедж с участком", "Дом", "Ленинградская обл., Выборг", 140, 190000),
  new Property(6, "Пентхаус с террасой", "Пентхаус", "Москва, Хамовники", 160, 420000),
]);
