'use strict';

(function () {
  // загрузка фотографии

  var uploadOpen = document.querySelector('#upload-file');
  var uploadPopup = document.querySelector('.img-upload__overlay');
  var uploadClose = uploadPopup.querySelector('.img-upload__cancel');

  var openPopup = function () {
    uploadPopup.classList.remove('hidden');

    window.main.closePopup(uploadPopup, uploadClose);
  };

  uploadOpen.addEventListener('change', function () {
    openPopup();
  });

  uploadOpen.addEventListener('change', function (evt) {
    if (evt.key === 'Enter') {
      openPopup();
    }
  });
})();
