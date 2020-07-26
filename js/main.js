'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var ENTER_KEY = 'Enter';
  var ESCAPE_KEY = 'Escape';
  var StatusCode = {
    OK: 200
  };
  var arrayImportantElements = []; // массив, в который можно поместить элементы для отслеживания, чтобы окно не закрывалось при активном состоянии элементов
  var arrayEvents = [];

  var addEventsHandler = function (el, ev, ha) {
    arrayEvents.push({
      element: el,
      event: ev,
      handler: ha
    });
    el.addEventListener(ev, ha);
  };

  var removeEvents = function () {
    arrayEvents.forEach(function (item) {
      item.element.removeEventListener(item.event, item.handler);
    });
    arrayEvents.length = 0;
  };

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
      if (evt.key === ESCAPE_KEY) {
        evt.preventDefault();
        closeThisPopup();
      }
    };

    var onPopupEnterPress = function (evt) {
      if (evt.key === ENTER_KEY) {
        closeThisPopup();
      }
    };

    var onOutsidePopupClick = function (evt) {
      if (evt.target === popup) {
        closeThisPopup();
      }
    };

    var checkElement = function (e) {
      return e === document.activeElement;
    };

    var closeThisPopup = function () {
      if (!arrayImportantElements.some(checkElement)) {
        if (form) {
          form.reset();
          window.photoEditing.defaultValueEffect();
        }

        window.viewPhoto.defaultValueTextСomment();

        popup.classList.add('hidden');

        btnClose.removeEventListener('click', closeThisPopup);
        btnClose.removeEventListener('keydown', onPopupEnterPress);
        document.removeEventListener('keydown', onPopupEscPress);
        popup.removeEventListener('click', onOutsidePopupClick);
        document.querySelector('body').classList.remove('modal-open');
        removeEvents();
      }
    };

    btnClose.addEventListener('click', closeThisPopup);

    btnClose.addEventListener('keydown', onPopupEnterPress);
    document.addEventListener('keydown', onPopupEscPress);
    popup.addEventListener('click', onOutsidePopupClick);
  };

  window.main = {
    randomInteger: randomInteger,
    arrayImportantElements: arrayImportantElements,
    closePopup: closePopup,
    debounce: debounce,
    StatusCode: StatusCode,
    ENTER_KEY: ENTER_KEY,
    arrayEvents: arrayEvents,
    addEventsHandler: addEventsHandler
  };
})();
