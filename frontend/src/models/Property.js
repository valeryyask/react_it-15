// src/models/Property.js — МОДЕЛЬ "Объект недвижимости".
// Класс описывает, из каких полей состоит одна запись таблицы недвижимости.

export default class Property {
  constructor(id, title, type, location, area, price) {
    // конструктор вызывается при new Property(...)
    this.id = id; // уникальный идентификатор
    this.title = title; // название объекта
    this.type = type; // тип (Квартира, Дом, Офис и т.д.)
    this.location = location; // расположение / адрес
    this.area = area; // площадь в м²
    this.price = price; // стоимость в USD ($)
  }
}
