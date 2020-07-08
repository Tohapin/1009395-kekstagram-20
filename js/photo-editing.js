'use strict';

(function () {
  // получение уровня эффекта
  var pinEffectLevel = document.querySelector('.effect-level__pin');
  var depthEffectLevel = document.querySelector('.effect-level__depth');
  var radioEffect = document.getElementsByName('effect');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var levelEffect = document.querySelector('.effect-level');
  var textDescription = document.querySelector('.text__description');
  var effectLevelProportion = 0;
  var nameEffect = 'none';
  var arrayEffects = {
    'none': ['', '', ''],
    'chrome': ['grayscale', '1', ''],
    'sepia': ['sepia', '1', ''],
    'marvin': ['invert', '100', '%'],
    'phobos': ['blur', '10', 'px'],
    'heat': ['brightness', '3', '']
  };

  window.main.arrayImportantElements.push(textDescription);

  levelEffect.classList.add('hidden');

  var applicationEffect = function (Effect, effectLevel) {
    var img = document.querySelector('.img-upload__preview').children[0];
    img.style.filter = arrayEffects[Effect][0] + '(' + arrayEffects[Effect][1] * effectLevel + arrayEffects[Effect][2] + ')';
  };

  var gettingValueEffect = function (pin) {
    effectLevelProportion = (pin.offsetLeft / pin.parentNode.offsetWidth) * 100;
    effectLevelValue.value = Math.round(effectLevelProportion);
    return Math.round(effectLevelProportion) / 100;
  };

  var gettingValueRadioEffect = function (evt) {
    pinEffectLevel.style.left = 100 + '%';
    depthEffectLevel.style.width = 100 + '%';
    effectLevelProportion = (pinEffectLevel.offsetLeft / pinEffectLevel.parentNode.offsetWidth) * 100;
    effectLevelValue.value = Math.round(effectLevelProportion);

    if (evt.target.value === 'none') {
      levelEffect.classList.add('hidden');
      pinEffectLevel.removeEventListener('mousedown', onPinMove);
    } else {
      levelEffect.classList.remove('hidden');
      pinEffectLevel.addEventListener('mousedown', onPinMove);
      applicationEffect(evt.target.value, gettingValueEffect(pinEffectLevel));
      nameEffect = evt.target.value;
    }
  };

  var onPinMove = function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if ((pinEffectLevel.offsetLeft - shift.x) >= 0 && pinEffectLevel.parentNode.offsetWidth >= (pinEffectLevel.offsetLeft - shift.x)) {
        pinEffectLevel.style.left = (pinEffectLevel.offsetLeft - shift.x) + 'px';
        depthEffectLevel.style.width = (depthEffectLevel.offsetWidth - shift.x) + 'px';
        applicationEffect(nameEffect, gettingValueEffect(pinEffectLevel));
      }
    };

    var onMauseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMauseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMauseUp);
  };

  for (var i = 0; i < radioEffect.length; i++) {
    radioEffect[i].addEventListener('change', gettingValueRadioEffect);
  }

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
