'use strict';

(function () {
  // получение уровня эффекта
  var pinEffectLevel = document.querySelector('.effect-level__pin');
  var radioEffect = document.getElementsByName('effect');
  var textDescription = document.querySelector('.text__description');
  var effectLevelProportion = 0;
  var effect = 'none';

  var effectLevelValue = document.querySelector('.effect-level__value');

  window.main.arrayImportantElements.push(textDescription);

  // получение пропорции уровня эффекта и запись ее в input
  var gettingValueEffect = function (evt) {
    effectLevelProportion = evt.target.offsetLeft / evt.target.parentNode.offsetWidth;
  };

  // обнуление эффекта при переключении и получение его названия
  var gettingValueRadioEffect = function (evt) {
    effectLevelProportion = 0;
    effectLevelValue.value = 0;
    effect = evt.target.value;
  };

  pinEffectLevel.addEventListener('mouseup', gettingValueEffect);

  for (var i = 0; i < radioEffect.length; i++) {
    radioEffect[i].addEventListener('change', gettingValueRadioEffect);
  }

  effectLevelValue.value = Math.round(effectLevelProportion * 100) + ' ' + effect;

  var hashtag = document.querySelector('.text__hashtags');
  // добавляет элемент в массив для отслеживания
  window.main.arrayImportantElements.push(hashtag);

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
})();
