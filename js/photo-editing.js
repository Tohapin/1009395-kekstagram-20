'use strict';

(function () {
  var SCALE_STEP = 25;
  var QUANTITY_HASHTAGS = 5;
  var QUANTITY_WORDS_DESCRIPTION = 140;
  var pinEffectLevel = document.querySelector('.effect-level__pin');
  var depthEffectLevel = document.querySelector('.effect-level__depth');
  var radioEffect = document.getElementsByName('effect');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var levelEffect = document.querySelector('.effect-level');
  var textDescription = document.querySelector('.text__description');
  var effectLevelProportion = 0;
  var nameEffect = 'none';
  var Effects = {
    'none': ['none', '', ''],
    'chrome': ['grayscale', '1', ''],
    'sepia': ['sepia', '1', ''],
    'marvin': ['invert', '100', '%'],
    'phobos': ['blur', '3', 'px'],
    'heat': ['brightness', '3', '']
  };
  var scaleControls = document.querySelector('.scale');
  var scaleControlSmaller = scaleControls.querySelector('.scale__control--smaller');
  var scaleControlValue = scaleControls.querySelector('.scale__control--value');
  var scaleControlBigger = scaleControls.querySelector('.scale__control--bigger');

  var applicationScale = function (value) {
    window.image.preview.style.transform = 'scale(' + (value / 100) + ')';
  };

  var onScaleControlSmallerClick = function () {
    var scaleValue = scaleControlValue.value.slice(0, -1);

    if (scaleValue > SCALE_STEP) {
      if ((scaleValue - SCALE_STEP) < SCALE_STEP) {
        scaleValue = SCALE_STEP;
      } else {
        scaleValue -= SCALE_STEP;
      }
    }

    scaleControlValue.value = scaleValue + '%';
    applicationScale(scaleValue);
  };

  var onScaleControlBiggerClick = function () {
    var scaleValue = scaleControlValue.value.slice(0, -1);

    if (scaleValue < 100) {
      if ((100 - scaleValue) <= SCALE_STEP) {
        scaleValue = 100;
      } else {
        scaleValue = parseInt(scaleValue, 10) + SCALE_STEP;
      }
    }

    scaleControlValue.value = scaleValue + '%';
    applicationScale(scaleValue);
  };

  scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);

  levelEffect.classList.add('hidden');

  var applicationEffect = function (Effect, effectLevel) {
    var img = document.querySelector('.img-upload__preview').children[0];
    if (Effect !== 'none') {
      img.style.filter = Effects[Effect][0] + '(' + Effects[Effect][1] * effectLevel + Effects[Effect][2] + ')';
    } else {
      img.style.filter = Effects[Effect][0];
    }
  };

  var gettingValueEffect = function (pin) {
    effectLevelProportion = (pin.offsetLeft / pin.parentNode.offsetWidth) * 100;
    effectLevelValue.value = Math.round(effectLevelProportion);
    return Math.round(effectLevelProportion) / 100;
  };

  var onGettingValueRadioEffect = function (evt) {
    pinEffectLevel.style.left = 100 + '%';
    depthEffectLevel.style.width = 100 + '%';
    effectLevelProportion = (pinEffectLevel.offsetLeft / pinEffectLevel.parentNode.offsetWidth) * 100;
    effectLevelValue.value = Math.round(effectLevelProportion);

    if (evt.target.value === 'none') {
      levelEffect.classList.add('hidden');
      pinEffectLevel.removeEventListener('mousedown', onPinMove);
      applicationEffect(evt.target.value, '');
    } else {
      levelEffect.classList.remove('hidden');
      document.querySelector('body').classList.add('modal-open');
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

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var defaultValueEffect = function () {
    effectLevelValue.value = 100;
    pinEffectLevel.style.left = document.querySelector('.effect-level__line').offsetWidth + 'px';
    depthEffectLevel.style.width = document.querySelector('.effect-level__line').offsetWidth + 'px';
    applicationEffect('none', '');
    levelEffect.classList.add('hidden');
    applicationScale(100);
  };

  for (var i = 0; i < radioEffect.length; i++) {
    radioEffect[i].addEventListener('change', onGettingValueRadioEffect);
  }

  window.main.arrayImportantElements.push(textDescription);

  var hashtag = document.querySelector('.text__hashtags');
  // добавляет элемент в массив для отслеживания
  window.main.arrayImportantElements.push(hashtag);

  var incorrectData = function (element, message) {
    element.setCustomValidity(message);
    element.style.outline = '1px solid red';

    var onElementEnter = function () {
      element.style.outline = 'none';
      element.removeEventListener('enter', onElementEnter);
    };

    var onElementClick = function () {
      element.style.outline = 'none';
      element.removeEventListener('click', onElementClick);
    };

    element.addEventListener('click', onElementClick);
    element.addEventListener('enter', onElementEnter);
  };

  var onHashtagCheck = function () {
    var masHashtag = hashtag.value.split(' ');

    if (hashtag.value !== '') {
      if (masHashtag.length <= QUANTITY_HASHTAGS) {
        for (var int = 0; int < masHashtag.length; int++) {
          if (!masHashtag[int].match(/^#[а-яёА-ЯË\w]{1,19}/gi)) {
            incorrectData(hashtag, 'Не корректный хэштег: ' + masHashtag[i]);
          } else {
            hashtag.setCustomValidity('');
          }
        }
      } else if (masHashtag.length > QUANTITY_HASHTAGS) {
        incorrectData(hashtag, 'Не больше ' + QUANTITY_HASHTAGS + 'тегов');
      }
    } else {
      hashtag.setCustomValidity('');
    }
  };

  var onDescriptionCheck = function () {
    if (textDescription.value.length > QUANTITY_WORDS_DESCRIPTION) {
      incorrectData(textDescription, 'Не более ' + QUANTITY_WORDS_DESCRIPTION + ' символов');
    }
  };

  hashtag.addEventListener('change', onHashtagCheck);
  textDescription.addEventListener('change', onDescriptionCheck);

  window.photoEditing = {
    defaultValueEffect: defaultValueEffect,
    pinEffectLevel: pinEffectLevel
  };
})();
