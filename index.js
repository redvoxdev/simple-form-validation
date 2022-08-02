const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

function checkEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

function checkLength(input, minLength, maxLength) {
  if (input.value.length < minLength) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${minLength} characters`
    );
  } else if (input.value.length > maxLength) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${maxLength} characters`
    );
  } else {
    showSuccess(input);
  }
}

function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  initCheck();
});

function initCheck() {
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password, password2);
}


const locale = "en";

const translations = {
  'en': {
    'title': 'Registration',
    'label-name': 'Username',
    'label-email': 'Email',
    'label-password': 'Password',
    'label-password2': 'Confirm password', 
    'submit': 'Submit',
  },
  "ru": {
    "title": "Регистрация",
    'label-name': 'Имя пользователя',
    'label-email': 'Эл. почта',
    'label-password': 'Пароль',
    'label-password2': 'Подтвердите пароль',
    'submit': 'Зарегистрироваться',
  }
};

function translate(element, locale) {
  const key = element.getAttribute("data-i18n");
  element.innerText = translations[locale][key];
}

const checkbox = document.querySelector('input[type=checkbox]');
const title = document.querySelector('[data-i18n=title]')

checkbox.addEventListener('change', (e) => {
  let locale = "en";
  if (e.currentTarget.checked) {
    locale = "en";
  } else {
    locale = "ru"
  }

  const items = document.querySelectorAll('[data-i18n]');
  items.forEach(item => translate(item, locale));
})
