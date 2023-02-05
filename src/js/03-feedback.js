import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('input', throttle(onInputData, 500));
refs.form.addEventListener('submit', onSubmitBtn);

const STORAGE_KEY = 'feedback-form-state';
let userData = {};
let saveData = {};
formInputText();

function onInputData(e) {
  userData[e.target.name] = e.target.value;
  // console.log(`userData: `, userData);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  // console.log(`localStorage: `, localStorage);
}

function formInputText() {
  saveData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  // console.log(`dataGet: `, saveData);

  if (saveData?.email) {
    refs.input.value = saveData.email;
    // console.log(`dataGet.email: `, saveData.email);
  }
  if (saveData?.message) {
    refs.textarea.value = saveData.message;
    // console.log(`dataGet.message: `, saveData.message);
  }
  userData = { ...saveData };

  // console.log(`userData if: `, userData);
}

function onSubmitBtn(e) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  formData.forEach((value, key) => {
    return key, value;
  });
  if (refs.input.value < 1 || refs.textarea.value < 1) {
    window.alert('Bсі поля повинні бути заповнені!');
  } else if (userData !== null) {
    console.log(userData);
  }

  refs.form.reset();

  localStorage.removeItem(STORAGE_KEY);

  formInputText();
}
