'use strict';

(function () {
  var pictures = '';
  var btnClosePopupPhoto = '';
  var containerBigPicture = document.querySelector('.big-picture');
  var socialComments = containerBigPicture.querySelector('.social__comments');
  var commentsLoader = containerBigPicture.querySelector('.comments-loader');

  var fillingBigPicture = function (photo) {
    containerBigPicture.querySelector('.big-picture__img').getElementsByTagName('img')[0].src = photo.url;
    containerBigPicture.querySelector('.likes-count').textContent = photo.likes;
    containerBigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    containerBigPicture.querySelector('.social__caption').textContent = photo.description;

    while (socialComments.firstChild) {
      socialComments.removeChild(socialComments.firstChild);
    }

    var onCommentsLoaderClick = function () {
      var index = (photo.comments.length < 5) ? photo.comments.length : 5;

      return function () {
        var limit = index + 5;

        while (index < photo.comments.length && index < limit) {
          addComment(photo.comments[index]);
          index++;
        }

        if (photo.comments.length === index) {
          commentsLoader.classList.add('hidden');
        }
      };
    };

    commentsLoader.addEventListener('click', onCommentsLoaderClick());

    for (var i = 0; i < photo.comments.length && i < 5; i++) {
      addComment(photo.comments[i]);
    }

    if (photo.comments.length <= 5) {
      commentsLoader.classList.add('hidden');
    }
  };

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

  var makeViewPhoto = function () {
    pictures = document.querySelectorAll('.picture');
    btnClosePopupPhoto = containerBigPicture.querySelector('.big-picture__cancel');

    for (var i = 0; i < pictures.length; i++) {
      pictures[i].addEventListener('click', onPictureClick);
      pictures[i].addEventListener('keydown', onPictureEnter);
    }
  };

  var open = function (picture) {
    var indexPhoto = window.backend.photos.map(function (e) {
      return e.url;
    }).indexOf(picture.querySelector('img').getAttribute('src'));

    containerBigPicture.classList.remove('hidden');
    commentsLoader.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    fillingBigPicture(window.backend.photos[indexPhoto]);

    var textDescription = containerBigPicture.querySelector('.social__footer-text');
    window.main.arrayImportantElements.push(textDescription);
    window.main.closePopup(containerBigPicture, btnClosePopupPhoto);
  };

  var onPictureClick = function (evt) {
    open(evt.currentTarget);
  };

  var onPictureEnter = function (evt) {
    if (evt.key === 'Enter') {
      open(evt.currentTarget);
    }
  };

  window.viewPhoto = {
    fillingBigPicture: fillingBigPicture,
    containerBigPicture: containerBigPicture,
    makeViewPhoto: makeViewPhoto,
  };
})();
