'use strict';

const params = new URLSearchParams(window.location.search);
const fio = (params.get('fio') || '').trim();
const birthdate = params.get('birthdate') || '';

const greeting = document.getElementById('greeting');
const info = document.getElementById('birthdayInfo');
const summary = document.getElementById('summary');

// Форма "Фамилия Имя Отчество": имя — второе слово
function extractName(fullName) {
  const parts = fullName.split(/\s+/).filter(Boolean);
  return parts.length >= 2 ? parts[1] : parts[0];
}

// Склонение слова «день»
function daysWord(n) {
  const n100 = n % 100, n10 = n % 10;
  if (n100 >= 11 && n100 <= 14) return 'дней';
  if (n10 === 1) return 'день';
  if (n10 >= 2 && n10 <= 4) return 'дня';
  return 'дней';
}

// Число дней до ближайшего дня рождения (0 — сегодня)
function daysUntilBirthday(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const now = new Date();
  const todayUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

  // Для 29 февраля в невисокосные годы отмечаем 28 февраля
  function birthdayIn(year) {
    const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    return (m === 2 && d === 29 && !isLeap) ? Date.UTC(year, 1, 28) : Date.UTC(year, m - 1, d);
  }

  let next = birthdayIn(now.getFullYear());
  if (next < todayUTC) next = birthdayIn(now.getFullYear() + 1);
  return Math.round((next - todayUTC) / 86400000);
}

if (!fio || !/^\d{4}-\d{2}-\d{2}$/.test(birthdate) || isNaN(new Date(birthdate))) {
  greeting.textContent = 'Данные не получены';
  info.textContent = 'Заполните форму регистрации, чтобы увидеть приветствие.';
} else {
  greeting.textContent = 'Добро пожаловать, ' + extractName(fio) + '!';
  const days = daysUntilBirthday(birthdate);
  info.textContent = days === 0
    ? 'Сегодня ваш день рождения — с праздником!'
    : 'До вашего дня рождения осталось ' + days + ' ' + daysWord(days) + '.';

  const labels = {
    login: 'Логин', fio: 'ФИО', gender: 'Пол', birthdate: 'Дата рождения',
    country: 'Страна', interests: 'Интересы', about: 'О себе'
  };
  Object.keys(labels).forEach(key => {
    const value = key === 'interests' ? params.getAll('interests').join(', ') : params.get(key);
    if (!value) return;
    const dt = document.createElement('dt');
    const dd = document.createElement('dd');
    dt.textContent = labels[key];
    dd.textContent = value;   // textContent — защита от XSS
    summary.append(dt, dd);
  });
}
