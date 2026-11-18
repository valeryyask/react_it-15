// server/index.js
// ---------------------------------------------------------
// Это СЕРВЕР-ЗАГЛУШКА (mock backend) для проекта "Агентство недвижимости".
// Он не подключён к базе данных — все данные хранятся прямо
// в оперативной памяти процесса (в массиве).
// После перезапуска сервера данные сбросятся к начальным.
//
// Задача этого файла — показать, как можно подключить
// настоящий бэкенд к таблице объектов недвижимости на фронтенде.
// ---------------------------------------------------------

import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

// Разрешаем запросы с фронтенда (Vite dev-сервер на 5173)
app.use(cors());
// Позволяет читать JSON из тела запроса (req.body)
app.use(express.json());

// "База данных" недвижимости — массив в памяти (заглушка)
let properties = [
  {
    id: 1,
    title: "Квартира в Москве",
    type: "Квартира",
    location: "Москва, Пресненский р-н",
    area: 65,
    price: 180000,
  },
  {
    id: 2,
    title: "Загородный дом",
    type: "Дом",
    location: "Московская обл., Истра",
    area: 180,
    price: 250000,
  },
  {
    id: 3,
    title: "Офис в центре",
    type: "Коммерческая",
    location: "Санкт-Петербург, Центральный р-н",
    area: 95,
    price: 140000,
  },
  {
    id: 4,
    title: "Студия у моря",
    type: "Апартаменты",
    location: "Сочи, Адлер",
    area: 38,
    price: 95000,
  },
  {
    id: 5,
    title: "Коттедж с участком",
    type: "Дом",
    location: "Ленинградская обл., Выборг",
    area: 140,
    price: 190000,
  },
  {
    id: 6,
    title: "Пентхаус с террасой",
    type: "Пентхаус",
    location: "Москва, Хамовники",
    area: 160,
    price: 420000,
  },
];

// Корневой маршрут проверки
app.get("/", (req, res) => {
  res.send("Сервер-заглушка агентства недвижимости работает. Используйте /api/properties");
});

// GET /api/properties — получить весь список объектов
app.get("/api/properties", (req, res) => {
  res.json(properties);
});

// POST /api/properties — добавить новый объект (заглушка)
app.post("/api/properties", (req, res) => {
  const { title, type, location, area, price } = req.body || {};

  if (!title) {
    return res.status(400).json({ error: 'Поле "title" обязательно' });
  }

  const newProperty = {
    id: Date.now(),
    title,
    type: type || "Квартира",
    location: location || "Не указан",
    area: Number(area) || 0,
    price: Number(price) || 0,
  };

  properties.push(newProperty);
  res.status(201).json(newProperty);
});

// DELETE /api/properties/:id — удалить объект по id (заглушка)
app.delete("/api/properties/:id", (req, res) => {
  const id = Number(req.params.id);
  const existed = properties.some((item) => item.id === id);

  properties = properties.filter((item) => item.id !== id);

  if (!existed) {
    return res.status(404).json({ error: "Объект недвижимости с таким id не найден" });
  }

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Сервер-заглушка запущен: http://localhost:${PORT}`);
});
