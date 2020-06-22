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

// показ фотографии

var fillingBigPicture = function (photo) {
  var containerBigPicture = document.querySelector('.big-picture');

  // containerBigPicture.classList.remove('hidden');
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

// загрузка фотографии

// var buttonUploadPhoto = document.querySelector('#upload-file');

// buttonUploadPhoto.addEventListener('change', function (evt) {
//   document.querySelector('.img-upload__overlay').classList.remove('hidden');
// });

var uploadOpen = document.querySelector('#upload-file');
var uploadPopup = document.querySelector('.img-upload__overlay');
var uploadClose = uploadPopup.querySelector('.img-upload__cancel');

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape' && hashtag !== document.activeElement) {
    evt.preventDefault();
    closePopup();
  }
};

var openPopup = function () {
  uploadPopup.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  uploadPopup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  hashtag.removeEventListener('change', hashtagCheck);
};

uploadOpen.addEventListener('change', function () {
  openPopup();
});

uploadOpen.addEventListener('change', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

uploadClose.addEventListener('click', function () {
  closePopup();
});

uploadClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

var pinEffectLevel = document.querySelector('.effect-level__pin');
var radioEffect = document.getElementsByName('effect');
var valueEffectLevel = 0;
var effect = 'none';

var effectLevelValue = document.querySelector('.effect-level__value');

// получение пропорции уровня эффекта и запись ее в input
var gettingValueEffect = function (evt) {
  valueEffectLevel = evt.target.offsetLeft / evt.target.parentNode.offsetWidth;
};

// обнуление эффекта при переключении и получение его названия
var gettingValueRadioEffect = function (evt) {
  valueEffectLevel = 0;
  effectLevelValue.value = 0;
  effect = evt.target.value;
};

pinEffectLevel.addEventListener('mouseup', gettingValueEffect);

for (var i = 0; i < radioEffect.length; i++) {
  radioEffect[i].addEventListener('change', gettingValueRadioEffect);
}

effectLevelValue.value = Math.round(valueEffectLevel * 100) + ' ' + effect;

var hashtag = document.querySelector('.text__hashtags');

var hashtagCheck = function () {
  var masHashtag = hashtag.value.split(' ');

  if (masHashtag !== '' && masHashtag.length <= 5) {
    for (var int = 0; int < masHashtag.length; int++) {
      if (!masHashtag[int].match(/^#[а-яёА-ЯË\w]{1,19}/gi)) {
        hashtag.setCustomValidity('Не корректный хэштег: ' + masHashtag[i]);
      } else {
        hashtag.setCustomValidity('');
      }
    }
  } else if (masHashtag.length > 5) {
    hashtag.setCustomValidity('Не больше 5 тегов');
  }
};

hashtag.addEventListener('change', hashtagCheck);
