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
    for (var i = 0; i < data.length; i++) {
      arrayPhoto[i] = data[i];
      // console.log(data[i])
      // console.log(arrayPhoto[i])
    }
    console.log(arrayPhoto[1])
    console.log(arrayPhoto.length);
  }
  // console.log(arrayPhoto);
  // console.log(arrayPhoto[0])
  // console.log(arrayPhoto.length);

  var onError = function (message) {
    console.log(message);
  }

  load(onLoad, onError);
  console.log(arrayPhoto[1])
  console.log(arrayPhoto.length);
  // console.log(arrayPhoto);
  window.backend = {
    arrayPhoto: arrayPhoto
  };
})();
