'use strict';

var randomInteger = function (min, max) {
  var integer = Math.round(Math.random() * 10);

  while (integer >= max || min >= integer) {
    integer = Math.round(Math.random() * 100);
  }

  return integer;
};

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

  return arrayMessage[randomInteger(0, 6)] + ' ' + arrayMessage[randomInteger(0, 6)];
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

  return arrayFirstName[randomInteger(0, 7)];
};

var createCommentsItem = function (arrayLength) {
  var arrayComments = [];

  for (var i = 0; i <= arrayLength; i++) {
    arrayComments[i] = {avatar: 'img/avatar-' + randomInteger(1, 6) + '.svg', message: randomMessage(), name: randomName()};
  }

  return arrayComments;
};

var createPhotoItem = function (arrayLength) {
  var arrayPhoto = [];

  for (var i = 0; i < arrayLength; i++) {
    arrayPhoto[i] = {url: 'photos/' + (i + 1) + '.jpg', description: '', likes: randomInteger(15, 200), comments: createCommentsItem(randomInteger(1, 5))};
  }

  return arrayPhoto;
};

var arrayPhoto = createPhotoItem(25);

var similarListElement = document.querySelector('.pictures');
var similarWizardTemplate = document.querySelector('#picture').content.querySelector('.picture');

var addWizard = function (mas) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < mas.length; i++) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.picture__img').src = mas[i].url;
    wizardElement.querySelector('.picture__likes').textContent = mas[i].likes;
    wizardElement.querySelector('.picture__comments').textContent = mas[i].comments.length;

    fragment.appendChild(wizardElement);
  }

  return fragment;
};

similarListElement.appendChild(addWizard(arrayPhoto));
