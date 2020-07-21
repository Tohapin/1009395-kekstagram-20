'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var arrayImportantElements = []; // массив, в который можно поместить элементы для отслеживания, чтобы окно не закрывалось при активном состоянии элементов

  var randomInteger = function (min, max, exclusion) {
    var integer = Math.round(Math.random() * 10);

    if (exclusion) {
      while ((integer >= max || min >= integer) || exclusion.includes(integer)) {
        integer = Math.round(Math.random() * 100);
      }
    } else {
      while (integer >= max || min >= integer) {
        integer = Math.round(Math.random() * 100);
      }
    }
    return integer;
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };


  var closePopup = function (popup, btnClose, form) {
    var onPopupEscPress = function (evt) {
      var elementСheck = window.main.arrayImportantElements.map(function (e) {
        if (e === document.activeElement) {
          return true;
        } else {
          return false;
        }
      }).indexOf(true);

      if (evt.key === 'Escape' && elementСheck === -1) {
        evt.preventDefault();
        closeThisPopup();
      }
    };

    var onPopupEnterPress = function (evt) {
      if (evt.key === 'Enter') {
        closeThisPopup();
      }
    };

    var onOutsidePopupClick = function (evt) {
      if (evt.target === popup) {
        closeThisPopup();
      }
    };

    var closeThisPopup = function () {
      if (form) {
        form.reset();
        window.photoEditing.defaultValueEffect();
      }

      popup.classList.add('hidden');

      document.removeEventListener('keydown', onPopupEscPress);
      btnClose.removeEventListener('keydown', onPopupEscPress);
      document.querySelector('body').classList.remove('modal-open');
    };

    btnClose.addEventListener('click', function () {
      closeThisPopup();
    });

    btnClose.addEventListener('keydown', onPopupEnterPress);
    document.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('click', onOutsidePopupClick);
  };

  window.main = {
    randomInteger: randomInteger,
    arrayImportantElements: arrayImportantElements,
    closePopup: closePopup,
    debounce: debounce
  };
})();
