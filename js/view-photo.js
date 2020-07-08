'use strict';

// просмотр любой фотографии в полноэкранном режиме
(function () {
  var pictures = document.querySelectorAll('.picture');
  var btnClosePopupPhoto = window.gallery.containerBigPicture.querySelector('.big-picture__cancel');

  var openPopup = function (picture) {
    var indexPhoto = window.backend.arrayPhoto.map(function (e) {
      return e.url;
    }).indexOf(picture.querySelector('img').getAttribute('src'));

    window.gallery.containerBigPicture.classList.remove('hidden');
    window.gallery.fillingBigPicture(window.backend.arrayPhoto[indexPhoto]);

    var textDescription = window.gallery.containerBigPicture.querySelector('.social__footer-text');
    window.main.arrayImportantElements.push(textDescription);
    window.main.closePopup(window.gallery.containerBigPicture, btnClosePopupPhoto);
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
