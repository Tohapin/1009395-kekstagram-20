'use strict';

(function () {
  var URL_LOAD = 'https://javascript.pages.academy/kekstagram/data';
  var StatusCode = {
    OK: 200
  };
  var arrayPhoto = [];

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', URL_LOAD);
    xhr.send();
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(Array.from(xhr.response));
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
  };

  var onLoad = function (data) {
    window.gallery.showFilters();
    for (var i = 0; i < data.length; i++) {
      arrayPhoto[i] = data[i];
    }
    window.gallery.addPhoto(arrayPhoto);
  };

  var onError = function (message) {
    var containerPictures = document.querySelector('.pictures.container');
    var div = document.createElement('div');
    div.classList.add('error');

    var divInner = document.createElement('div');
    divInner.classList.add('error__inner');

    var errorTitle = document.createElement('h2');
    errorTitle.classList.add('error__title');
    errorTitle.innerHTML = message;

    containerPictures.appendChild(div);
    div.appendChild(divInner);
    divInner.appendChild(errorTitle);
  };

  load(onLoad, onError);

  window.backend = {
    arrayPhoto: arrayPhoto
  };
})();
