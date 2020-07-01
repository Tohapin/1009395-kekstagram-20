'use strict';

(function () {
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

  similarListElement.appendChild(addWizard(window.mock.arrayPhoto));

  // показ фотографии
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

  // показ фотографии по заданию
  fillingBigPicture(window.mock.arrayPhoto[0]);

  // скрытые эллементы по заданию
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');

  window.gallery = {
    fillingBigPicture: fillingBigPicture,
    containerBigPicture: containerBigPicture
  };
})();
