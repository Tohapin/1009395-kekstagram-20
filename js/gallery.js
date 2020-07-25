'use strict';

(function () {
  var similarListElement = document.querySelector('.pictures');
  var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var removePhoto = function () {
    var renderedPhotos = document.querySelectorAll('.picture');

    renderedPhotos.forEach(function (element) {
      element.remove();
    });
  };

  var addPhoto = function (mas) {
    var fragment = document.createDocumentFragment();

    mas.forEach(function (element) {
      var photoElement = similarPhotoTemplate.cloneNode(true);

      photoElement.querySelector('.picture__img').src = element.url;
      photoElement.querySelector('.picture__likes').textContent = element.likes;
      photoElement.querySelector('.picture__comments').textContent = element.comments.length;

      fragment.appendChild(photoElement);
    });

    similarListElement.appendChild(fragment);
    window.viewPhoto.addHandlerPhoto();
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

  var filterDefault = function () {
    removePhoto();
    addPhoto(window.backend.photos);
  };

  var filterRandom = function () {
    var randomPhotos = [];
    var exclusions = [];

    for (var i = 0; i < window.backend.photos.length && i < 10; i++) {
      var randomInt = window.main.randomInteger(0, window.backend.photos.length, exclusions);
      exclusions.push(randomInt);
      randomPhotos[i] = window.backend.photos[randomInt];
    }

    removePhoto();
    addPhoto(randomPhotos);
  };

  var filterDiscussed = function () {
    removePhoto();
    addPhoto(sortedArrayByComments(window.backend.photos));
  };

  var resetFilters = function () {
    var filters = document.querySelector('.img-filters');
    var buttons = filters.querySelectorAll('button');

    buttons.forEach(function (element) {
      element.classList.remove('img-filters__button--active');
    });
  };

  var selectionFilter = window.main.debounce(function (id) {
    switch (id) {
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
  });

  var onFiltersClick = function (evt) {
    resetFilters();
    evt.currentTarget.classList.add('img-filters__button--active');
    selectionFilter(evt.currentTarget.id);
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
