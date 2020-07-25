'use strict';

(function () {
  var URL_SUBMIT = 'https://javascript.pages.academy/kekstagram';
  var form = document.querySelector('.img-upload__form');
  var xhr = new XMLHttpRequest();

  var onSendForm = function (evt) {
    evt.preventDefault();

    xhr.open('POST', URL_SUBMIT, true);
    xhr.send(new FormData(form));

    xhr.onload = function () {
      if (xhr.status === window.main.StatusCode.OK) {
        resetData();
        success();
      } else {
        resetData();
        error();
      }
    };
  };

  form.addEventListener('submit', onSendForm);

  var resetData = function () {
    form.reset();
    window.photoEditing.defaultValueEffect();
    window.uploadPhoto.uploadPopup.classList.add('hidden');
  };

  var success = function () {
    var template = document.querySelector('#success');
    document.body.appendChild(template.content.cloneNode(true));

    if (document.querySelector('.success').classList.contains('hidden')) {
      document.querySelector('.success').remove();
    }

    var popup = document.querySelector('.success');
    window.main.closePopup(popup, popup.querySelector('.success__button'));
  };

  var error = function () {
    window.uploadPhoto.uploadPopup.classList.add('hidden');
    form.reset();
    window.photoEditing.defaultValueEffect();
    var template = document.querySelector('#error');
    document.body.appendChild(template.content.cloneNode(true));

    if (document.querySelector('.error').classList.contains('hidden')) {
      document.querySelector('.error').remove();
    }

    var popup = document.querySelector('.error');
    window.main.closePopup(popup, popup.querySelector('.error__button'), form);
  };
})();
