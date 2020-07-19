'use strict';

(function () {
  var URL_SUBMIT = 'https://javascript.pages.academy/kekstagram';
  var form = document.querySelector('.img-upload__form');
  var xhr = new XMLHttpRequest();
  var StatusCode = {
    OK: 200
  };

  var onSendForm = function (evt) {
    evt.preventDefault();

    xhr.open('POST', URL_SUBMIT, true);
    xhr.send(new FormData(form));

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        resetData();
        success();
      } else {
        error();
      }
    });
  };

  form.addEventListener('submit', onSendForm);

  var resetData = function () {
    form.reset();
    window.photoEditing.defaultValueEffect();
    window.gallery.defaultLogo();
    window.uploadPhoto.uploadPopup.classList.add('hidden');
  };

  var success = function () {
    var template = document.querySelector('#success');
    document.body.appendChild(template.content.cloneNode(true));

    var popup = document.querySelector('.success');
    window.main.closePopup(popup, popup.querySelector('.success__button'), form);
  };

  var error = function () {
    window.uploadPhoto.uploadPopup.classList.add('hidden');
    form.reset();
    window.photoEditing.defaultValueEffect();
    var template = document.querySelector('#error');
    document.body.appendChild(template.content.cloneNode(true));

    var popup = document.querySelector('.error');
    window.main.closePopup(popup, popup.querySelector('.error__button'), form);
  };
})();
