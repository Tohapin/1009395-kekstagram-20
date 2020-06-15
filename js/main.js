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
    arrayPhoto[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      description: '',
      likes: randomInteger(15, 200),
      comments: createCommentsItem(randomInteger(1, 5))
    };
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

var fillingBigPicture = function (photo) {
  var containerBigPicture = document.querySelector('.big-picture');

  containerBigPicture.classList.remove('hidden');
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

fillingBigPicture(arrayPhoto[0]);

document.querySelector('.social__comment-count').classList.add('hidden');
document.querySelector('.comments-loader').classList.add('hidden');
document.querySelector('body').classList.add('modal-open');


