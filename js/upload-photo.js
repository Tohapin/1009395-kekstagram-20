'use strict';

(function () {
  var uploadOpen = document.querySelector('#upload-file');
  var uploadPopup = document.querySelector('.img-upload__overlay');
  var uploadClose = uploadPopup.querySelector('.img-upload__cancel');
  var form = document.querySelector('.img-upload__form');

  var onUploadChange = function () {
    uploadPopup.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');

    window.main.closePopup(uploadPopup, uploadClose, form);
  };

  uploadOpen.addEventListener('change', onUploadChange);

  uploadOpen.addEventListener('change', function (evt) {
    if (evt.key === 'Enter') {
      onUploadChange();
    }
  });

  window.uploadPhoto = {
    uploadPopup: uploadPopup
  };
})();
