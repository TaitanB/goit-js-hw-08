import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('input', throttle(onInputData, 500));
refs.form.addEventListener('submit', onSubmitBtn);

let userData = {};
let saveData = {};
formInputText();

function onInputData(e) {
  userData[e.target.name] = e.target.value;
  //   console.log(`userData: `, userData);

  localStorage.setItem('feedback-form-state', JSON.stringify(userData));
  //   console.log(`localStorage: `, localStorage);
}

function formInputText() {
  saveData = JSON.parse(localStorage.getItem('feedback-form-state'));
  //   console.log(`dataGet: `, saveData);
  if (saveData) {
    refs.input.value = saveData.email;
    refs.textarea.value = saveData.message;
  }
}

function onSubmitBtn(e) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  formData.forEach((value, key) => {
    return key, value;
  });
  if (refs.input.value < 1 || refs.textarea.value < 1) {
    window.alert('Bсі поля повинні бути заповнені!');
  } else if (saveData !== null) {
    console.log(saveData);
  } else if (userData !== null) {
    console.log(userData);
  }

  refs.form.reset();

  localStorage.clear('feedback-form-state');
}
