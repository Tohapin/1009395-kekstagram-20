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

  var sortedArrayByComments = function (mas) {
    var sortMas = mas.slice();

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
    addPhoto(window.backend.photos);
  });

  var filterRandom = window.main.debounce(function () {
    var randomPhotos = [];
    var exclusions = [];

    for (var i = 0; i < window.backend.photos.length && i < 10; i++) {
      var randomInt = window.main.randomInteger(0, window.backend.photos.length, exclusions);
      exclusions.push(randomInt);
      randomPhotos[i] = window.backend.photos[randomInt];
    }

    removePhoto();
    addPhoto(randomPhotos);
  });

  var filterDiscussed = window.main.debounce(function () {
    removePhoto();
    addPhoto(sortedArrayByComments(window.backend.photos));
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
    showFilters: showFilters
  };
})();
