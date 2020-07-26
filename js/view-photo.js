'use strict';

(function () {
  var COMMENT_LIMIT = 5;
  var pictures = '';
  var btnClosePopupPhoto = '';
  var containerBigPicture = document.querySelector('.big-picture');
  var socialComments = containerBigPicture.querySelector('.social__comments');
  var commentsLoader = containerBigPicture.querySelector('.comments-loader');

  var fillingBigPicture = function (photo) {
    containerBigPicture.querySelector('.big-picture__img').querySelector('img').src = photo.url;
    containerBigPicture.querySelector('.likes-count').textContent = photo.likes;
    containerBigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    containerBigPicture.querySelector('.social__caption').textContent = photo.description;

    while (socialComments.firstChild) {
      socialComments.removeChild(socialComments.firstChild);
    }

    var onCommentsLoaderClick = function () {
      var index = (photo.comments.length < COMMENT_LIMIT) ? photo.comments.length : COMMENT_LIMIT;

      return function () {
        var limit = index + COMMENT_LIMIT;

        while (index < photo.comments.length && index < limit) {
          addComment(photo.comments[index]);
          index++;
        }

        if (photo.comments.length === index) {
          commentsLoader.classList.add('hidden');
        }
      };
    };

    window.main.addEventsHandler(commentsLoader, 'click', onCommentsLoaderClick());
    window.main.addEventsHandler(commentsLoader, 'Enter', onCommentsLoaderClick());


    for (var i = 0; i < Math.min(photo.comments.length, COMMENT_LIMIT); i++) {
      addComment(photo.comments[i]);
    }

    if (photo.comments.length <= COMMENT_LIMIT) {
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

  var addHandlerPhoto = function () {
    pictures = document.querySelectorAll('.picture');
    btnClosePopupPhoto = containerBigPicture.querySelector('.big-picture__cancel');

    for (var i = 0; i < pictures.length; i++) {
      pictures[i].addEventListener('click', onPictureClick);
      pictures[i].addEventListener('keydown', onPictureEnter);
    }
  };

  var openPhoto = function (picture) {
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

  var defaultValueTextСomment = function () {
    containerBigPicture.querySelector('.social__footer-text').value = '';
  };

  var onPictureClick = function (evt) {
    openPhoto(evt.currentTarget);
  };

  var onPictureEnter = function (evt) {
    if (evt.key === window.main.ENTER_KEY) {
      openPhoto(evt.currentTarget);
    }
  };

  window.viewPhoto = {
    fillingBigPicture: fillingBigPicture,
    containerBigPicture: containerBigPicture,
    addHandlerPhoto: addHandlerPhoto,
    defaultValueTextСomment: defaultValueTextСomment
  };
})();
