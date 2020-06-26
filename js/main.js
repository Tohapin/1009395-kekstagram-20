'use strict';

(function () {
  // массив, в который можно поместить элементы для отслеживания, чтобы окно не закрывалось при активном состоянии элементов
  var arrayImportantElements = [];

  var randomInteger = function (min, max) {
    var integer = Math.round(Math.random() * 10);

    while (integer >= max || min >= integer) {
      integer = Math.round(Math.random() * 100);
    }

    return integer;
  };
  // функция для закрытия любого окна, для корого она вызвана
  var closePopup = function (popup, btnClose) {
    var onPopupEscPress = function (evt) {
      // проверка нажатия кнопки escape и наличие в массивеактивного элемента
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

    var closeThisPopup = function () {
      popup.classList.add('hidden');

      document.removeEventListener('keydown', onPopupEscPress);
      btnClose.removeEventListener('keydown', onPopupEscPress);
    };

    btnClose.addEventListener('click', function () {
      closeThisPopup();
    });

    btnClose.addEventListener('keydown', onPopupEnterPress);
    document.addEventListener('keydown', onPopupEscPress);
  };

  window.main = {
    randomInteger: randomInteger,
    arrayImportantElements: arrayImportantElements,
    closePopup: closePopup
  };
})();
