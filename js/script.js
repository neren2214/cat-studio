// ==========================================================================
// Котостудия — валидация формы записи на фотосессию
// ==========================================================================
(function () {
  'use strict';

  const form = document.getElementById('bookingForm');
  const successBox = document.getElementById('formSuccess');

  if (!form) return;

  const nameField = document.getElementById('ownerName');
  const emailField = document.getElementById('ownerEmail');
  const catField = document.getElementById('catName');

  // Простая, но надёжная проверка email (без внешних библиотек)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const namePattern = /^[A-Za-zА-Яа-яЁё\s-]{2,60}$/;
  const catNamePattern = /^[A-Za-zА-Яа-яЁё\s-]{1,40}$/;

  function setFieldValidity(field, isValid) {
    field.classList.toggle('is-valid', isValid);
    field.classList.toggle('is-invalid', !isValid);
  }

  function validateName() {
    const isValid = namePattern.test(nameField.value.trim());
    setFieldValidity(nameField, isValid);
    return isValid;
  }

  function validateEmail() {
    const isValid = emailPattern.test(emailField.value.trim());
    setFieldValidity(emailField, isValid);
    return isValid;
  }

  function validateCatName() {
    const isValid = catNamePattern.test(catField.value.trim());
    setFieldValidity(catField, isValid);
    return isValid;
  }

  // Валидация "на лету", пока пользователь печатает / покидает поле
  nameField.addEventListener('input', validateName);
  emailField.addEventListener('input', validateEmail);
  catField.addEventListener('input', validateCatName);

  form.addEventListener('submit', function (event) {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isCatNameValid = validateCatName();

    const isFormValid = isNameValid && isEmailValid && isCatNameValid;

    if (!isFormValid) {
      event.preventDefault();
      event.stopPropagation();
      form.classList.add('was-validated');
      successBox.classList.add('d-none');
      return;
    }

    // В демо-версии реальная отправка на сервер отсутствует —
    // просто показываем сообщение об успехе и сбрасываем форму.
    event.preventDefault();
    form.classList.remove('was-validated');
    successBox.classList.remove('d-none');
    form.reset();
    [nameField, emailField, catField].forEach((f) =>
      f.classList.remove('is-valid', 'is-invalid')
    );

    setTimeout(() => successBox.classList.add('d-none'), 6000);
  });
})();
