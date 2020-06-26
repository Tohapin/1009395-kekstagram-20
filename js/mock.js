'use strict';

(function () {
  var randomMessage = function () {
    var arrayMessage = [
      'Всё отлично!',
      'В целом всё неплохо. Но не всё.',
      'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
      'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
      'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
      'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
      ''
    ];

    return arrayMessage[window.main.randomInteger(0, 6)] + ' ' + arrayMessage[window.main.randomInteger(0, 6)];
  };

  var randomName = function () {
    var arrayFirstName = [
      'Иван',
      'Хуан Себастьян',
      'Мария',
      'Кристоф',
      'Виктор',
      'Юлия',
      'Люпита',
      'Вашингтон'
    ];

    return arrayFirstName[window.main.randomInteger(0, 7)];
  };

  var createCommentsItem = function (arrayLength) {
    var arrayComments = [];

    for (var i = 0; i <= arrayLength; i++) {
      arrayComments[i] = {avatar: 'img/avatar-' + window.main.randomInteger(1, 6) + '.svg', message: randomMessage(), name: randomName()};
    }

    return arrayComments;
  };

  var createPhotoItem = function (arrayLength) {
    var arrayPhoto = [];

    for (var i = 0; i < arrayLength; i++) {
      arrayPhoto[i] = {
        url: 'photos/' + (i + 1) + '.jpg',
        description: '',
        likes: window.main.randomInteger(15, 200),
        comments: createCommentsItem(window.main.randomInteger(1, 5))
      };
    }

    return arrayPhoto;
  };

  var arrayPhoto = createPhotoItem(25);

  window.mock = {
    arrayPhoto: arrayPhoto
  };
})();
