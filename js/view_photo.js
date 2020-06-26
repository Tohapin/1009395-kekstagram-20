'use strict';

// просмотр любой фотографии в полноэкранном режиме
(function () {
  var pictures = document.querySelectorAll('.picture');
  var btnClosePopupPhoto = window.filling.containerBigPicture.querySelector('.big-picture__cancel');

  var openPopup = function (picture) {
    var indexPhoto = window.mock.arrayPhoto.map(function (e) {
      return e.url;
    }).indexOf(picture.querySelector('img').getAttribute('src'));

    window.filling.containerBigPicture.classList.remove('hidden');
    window.filling.fillingBigPicture(window.mock.arrayPhoto[indexPhoto]);

    var textDescription = window.filling.containerBigPicture.querySelector('.social__footer-text');
    // добавляет элемент в массив для отслеживания
    window.main.arrayImportantElements.push(textDescription);
    window.main.closePopup(window.filling.containerBigPicture, btnClosePopupPhoto);
  };

  var onPictureClick = function (evt) {
    openPopup(evt.currentTarget);
  };

  var onPictureEnter = function (evt) {
    if (evt.key === 'Enter') {
      openPopup(evt.currentTarget);
    }
  };

  for (var i = 0; i < pictures.length; i++) {
    pictures[i].addEventListener('click', onPictureClick);
    pictures[i].addEventListener('keydown', onPictureEnter);
  }
})();
