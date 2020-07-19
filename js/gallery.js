'use strict';

(function () {
  var similarListElement = document.querySelector('.pictures');
  var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var addPhoto = function (mas) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < mas.length; i++) {
      var photoElement = similarPhotoTemplate.cloneNode(true);

      photoElement.querySelector('.picture__img').src = mas[i].url;
      photoElement.querySelector('.picture__likes').textContent = mas[i].likes;
      photoElement.querySelector('.picture__comments').textContent = mas[i].comments.length;

      fragment.appendChild(photoElement);
    }

    similarListElement.appendChild(fragment);
    window.viewPhoto.makeViewPhoto();
  };

  var containerBigPicture = document.querySelector('.big-picture');

  var fillingBigPicture = function (photo) {
    containerBigPicture.querySelector('.big-picture__img').getElementsByTagName('img')[0].src = photo.url;
    containerBigPicture.querySelector('.likes-count').textContent = photo.likes;
    containerBigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    containerBigPicture.querySelector('.social__caption').textContent = photo.description;

    var socialComments = containerBigPicture.querySelector('.social__comments');

    while (socialComments.firstChild) {
      socialComments.removeChild(socialComments.firstChild);
    }

    var addComment = function (comment) {
      var listItem = document.createElement('li');

      listItem.classList.add('social__comment');
      socialComments.appendChild(listItem);

      var imgComments = document.createElement('img');

      imgComments.classList.add('social__picture');
      imgComments.src = comment.avatar;
      imgComments.width = 35;
      imgComments.height = 35;
      imgComments.alt = comment.name;
      listItem.appendChild(imgComments);

      var textComments = document.createElement('p');

      textComments.classList.add('social__text');
      textComments.textContent = comment.message;
      listItem.appendChild(textComments);
    };

    for (var i = 0; i < photo.comments.length; i++) {
      addComment(photo.comments[i]);
    }
  };

  var defaultLogo = function () {
    document.querySelector('.img-upload__label').classList.add('visually-hidden');
  };

  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');

  window.gallery = {
    addPhoto: addPhoto,
    fillingBigPicture: fillingBigPicture,
    containerBigPicture: containerBigPicture,
    defaultLogo: defaultLogo
  };
})();
