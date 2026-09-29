'use strict';

const form = document.getElementById('regForm');
const today = new Date();
const pad = n => String(n).padStart(2, '0');
const todayStr = today.getFullYear() + '-' + pad(today.getMonth() + 1) + '-' + pad(today.getDate());

const birthInput = document.getElementById('birthdate');
birthInput.max = todayStr;
birthInput.min = '1900-01-01';

// Каждое правило возвращает текст ошибки или '' если поле корректно
const rules = {
  login(v) {
    if (!v) return 'Введите логин';
    if (!/^[A-Za-z][A-Za-z0-9_]{2,19}$/.test(v))
      return 'Логин: 3–20 символов, латиница, цифры и «_», начинается с буквы';
    return '';
  },
  password(v) {
    if (!v) return 'Введите пароль';
    if (v.length < 8) return 'Пароль должен быть не короче 8 символов';
    if (!/[a-zа-яё]/.test(v) || !/[A-ZА-ЯЁ]/.test(v) || !/\d/.test(v))
      return 'Нужны заглавная и строчная буквы и хотя бы одна цифра';
    return '';
  },
  password2(v) {
    if (!v) return 'Повторите пароль';
    if (v !== form.password.value) return 'Пароли не совпадают';
    return '';
  },
  fio(v) {
    const words = v.trim().split(/\s+/);
    if (!v.trim()) return 'Введите ФИО';
    if (words.length < 2 || words.length > 3) return 'Введите фамилию, имя и (при наличии) отчество';
    if (!words.every(w => /^[A-Za-zА-Яа-яЁё]+(-[A-Za-zА-Яа-яЁё]+)*$/.test(w)))
      return 'ФИО может содержать только буквы и дефис';
    return '';
  },
  gender() {
    return form.gender.value ? '' : 'Выберите пол';
  },
  birthdate(v) {
    if (!v) return 'Укажите дату рождения';
    const d = new Date(v + 'T00:00:00');
    if (isNaN(d)) return 'Некорректная дата';
    if (v > todayStr) return 'Дата рождения не может быть в будущем';
    if (v < '1900-01-01') return 'Дата рождения не раньше 1900 года';
    return '';
  },
  country(v) {
    return v ? '' : 'Выберите страну';
  },
  interests() {
    return form.querySelector('input[name="interests"]:checked') ? '' : 'Выберите хотя бы один интерес';
  },
  about(v) {
    const t = v.trim();
    if (t.length < 10) return 'Расскажите о себе хотя бы в 10 символах';
    if (t.length > 500) return 'Не более 500 символов';
    return '';
  }
};

function getValue(name) {
  const el = form.elements[name];
  return el && el.value !== undefined && !(el instanceof RadioNodeList) ? el.value : '';
}

// Возвращает контейнер поля (.field), в который выводится ошибка
function fieldBox(name) {
  return document.querySelector('.error[data-for="' + name + '"]').closest('.field');
}

function validateField(name) {
  const msg = rules[name](getValue(name));
  const box = fieldBox(name);
  box.querySelector('.error').textContent = msg;
  box.classList.toggle('invalid', !!msg);
  box.classList.toggle('valid', !msg);
  return !msg;
}

// Проверка при вводе / потере фокуса
Object.keys(rules).forEach(name => {
  const controls = form.querySelectorAll('[name="' + name + '"], #' + name);
  controls.forEach(el => {
    el.addEventListener('blur', () => validateField(name));
    el.addEventListener('input', () => {
      if (fieldBox(name).classList.contains('invalid')) validateField(name);
    });
    el.addEventListener('change', () => validateField(name));
  });
});
// При смене пароля перепроверяем подтверждение
form.password.addEventListener('input', () => {
  if (form.password2.value) validateField('password2');
});

// Счётчик символов
const about = document.getElementById('about');
const counter = document.getElementById('counter');
about.addEventListener('input', () => { counter.textContent = about.value.length; });

form.addEventListener('submit', e => {
  const results = Object.keys(rules).map(validateField);
  if (results.includes(false)) {
    e.preventDefault();
    const firstBad = form.querySelector('.field.invalid');
    if (firstBad) firstBad.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  // Если всё верно — форма уходит на welcome.html методом GET
});

form.addEventListener('reset', () => {
  document.querySelectorAll('.field').forEach(f => f.classList.remove('valid', 'invalid'));
  document.querySelectorAll('.error').forEach(e => { e.textContent = ''; });
  counter.textContent = '0';
});
