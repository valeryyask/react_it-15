/**
 * Модуль управления данными недвижимости на основе JSON и localStorage.
 */
import initialPropertiesData from './properties.json';

export const INITIAL_PROPERTIES = initialPropertiesData;

const STORAGE_KEY = 'real_estate_properties_v2';

export function loadProperties() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PROPERTIES;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (e) {
    console.warn('Ошибка загрузки данных из localStorage', e);
  }
  return INITIAL_PROPERTIES;
}

export function saveProperties(properties) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
  } catch (e) {
    console.warn('Ошибка сохранения в localStorage', e);
  }
}

export function resetPropertiesStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Ошибка сброса localStorage', e);
  }
  return INITIAL_PROPERTIES;
}
