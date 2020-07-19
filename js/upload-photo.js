'use strict';

(function () {
  var uploadOpen = document.querySelector('#upload-file');
  var uploadPopup = document.querySelector('.img-upload__overlay');
  var uploadClose = uploadPopup.querySelector('.img-upload__cancel');
  var form = document.querySelector('.img-upload__form');

  var openPopup = function () {
    uploadPopup.classList.remove('hidden');

    window.main.closePopup(uploadPopup, uploadClose, form);
  };

  uploadOpen.addEventListener('change', function () {
    openPopup();
  });

  uploadOpen.addEventListener('change', function (evt) {
    if (evt.key === 'Enter') {
      openPopup();
    }
  });

  window.uploadPhoto = {
    uploadPopup: uploadPopup
  };
})();
