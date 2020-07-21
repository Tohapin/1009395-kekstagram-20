'use strict';

(function () {
  var similarListElement = document.querySelector('.pictures');
  var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var removePhoto = function () {
    var renderedPhotos = document.querySelectorAll('.picture');

    for (var i = 0; i < renderedPhotos.length; i++) {
      renderedPhotos[i].remove();
    }
  };

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

  var sortedArrayByComments = function (mas) {
    var sortMas = mas;

    for (var currentIndex = 0; currentIndex <= sortMas.length - 2; currentIndex++) {
      var minValue = sortMas[currentIndex];

      for (var j = currentIndex + 1; j <= sortMas.length - 1; j++) {
        if (sortMas[j].comments.length > minValue.comments.length) {
          minValue = sortMas[j];
          var swap = sortMas[currentIndex];
          sortMas[currentIndex] = minValue;
          sortMas[j] = swap;
        }
      }
    }
    return sortMas;
  };

  var filterDefault = window.main.debounce(function () {
    removePhoto();
    addPhoto(window.backend.arrayPhoto);
  });

  var filterRandom = window.main.debounce(function () {
    var randomPhotos = [];
    var exclusion = [];

    for (var i = 0; i < window.backend.arrayPhoto.length && i < 10; i++) {
      var randomInt = window.main.randomInteger(0, window.backend.arrayPhoto.length, exclusion);
      exclusion.push(randomInt);
      randomPhotos[i] = window.backend.arrayPhoto[randomInt];
    }

    removePhoto();
    addPhoto(randomPhotos);
  });

  var filterDiscussed = window.main.debounce(function () {
    removePhoto();
    addPhoto(sortedArrayByComments(window.backend.arrayPhoto));
  });

  var resetFilters = function () {
    var filters = document.querySelector('.img-filters');
    var buttons = filters.querySelectorAll('button');

    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('img-filters__button--active');
    }
  };

  var onFiltersClick = function (evt) {
    resetFilters();
    evt.currentTarget.classList.add('img-filters__button--active');

    switch (evt.currentTarget.id) {
      case 'filter-default':
        filterDefault();
        break;
      case 'filter-random':
        filterRandom();
        break;
      case 'filter-discussed':
        filterDiscussed();
        break;
    }
  };

  var showFilters = function () {
    var filters = document.querySelector('.img-filters');
    filters.classList.remove('img-filters--inactive');

    var buttons = filters.querySelectorAll('button');

    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', onFiltersClick);
    }
  };

  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');

  window.gallery = {
    addPhoto: addPhoto,
    fillingBigPicture: fillingBigPicture,
    containerBigPicture: containerBigPicture,
    showFilters: showFilters
  };
})();
