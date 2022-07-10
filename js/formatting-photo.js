const SCALE_CONTROL = document.querySelector('.scale__control--value');
const SCALE_SMALLER = document.querySelector('.scale__control--smaller');
const SCALE_BIGGER = document.querySelector('.scale__control--bigger');
const PHOTO_PREVIEW = document.querySelector ('.img-upload__preview img');
const EFFECT_LEVEL_VALUE = document.querySelector('.effect-level__value');
const EFFECT_LEVEL = document.querySelector('.effect-level__slider');
const EFFECTS_LIST = document.querySelector('.effects__list');
let filterType;
let filterSymbol;
const EFFECTS = {
  none: {
    filterName: 'none',
    symbol: '',
    range: {
      min: 0,
      max: 0,
    },
    start: 0,
    step: 0,
    connect: 'lower',
  },
  chrome: {
    filterName: 'grayscale',
    symbol: '',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  },
  sepia: {
    filterName: 'sepia',
    symbol: '',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  },
  marvin: {
    filterName: 'invert',
    symbol: '%',
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1/100,
    connect: 'lower',
  },
  phobos: {
    filterName: 'blur',
    symbol: 'px',
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
  },
  heat: {
    filterName: 'brightness',
    symbol: '',
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
  }
};

SCALE_SMALLER.addEventListener('click', () => {
  let numberScaleValue = Number(SCALE_CONTROL.value.replace('%',''));
  numberScaleValue -= 25;
  if (numberScaleValue >= 0 && numberScaleValue <= 100){
    PHOTO_PREVIEW.style.transform= `scale(${numberScaleValue/100})`;
    SCALE_CONTROL.value = `${String(numberScaleValue)}%`;
  }
});

SCALE_BIGGER.addEventListener('click', () => {
  let numberScaleValue = Number(SCALE_CONTROL.value.replace('%',''));
  numberScaleValue += 25;
  if (numberScaleValue >= 0 && numberScaleValue <= 100){
    PHOTO_PREVIEW.style.transform = `scale(${numberScaleValue/100})`;
    SCALE_CONTROL.value = `${String(numberScaleValue)}%`;
  }
});

noUiSlider.create(EFFECT_LEVEL, EFFECTS['none']);
EFFECT_LEVEL.setAttribute('disabled', true);

EFFECTS_LIST.addEventListener('click', (evt) => {
  if (evt.target.type === 'radio') {
    if (evt.target.value === 'none') {
      PHOTO_PREVIEW.style.filter = '';
      EFFECT_LEVEL.setAttribute('disabled', true);
    } else {
      EFFECT_LEVEL.removeAttribute('disabled');
    }
    filterType = EFFECTS[`${evt.target.value}`].filterName;
    filterSymbol = EFFECTS[`${evt.target.value}`].symbol;
    PHOTO_PREVIEW.className = '';
    PHOTO_PREVIEW.classList.add(`effects__preview--${evt.target.value}`);
    EFFECT_LEVEL.noUiSlider.updateOptions(EFFECTS[`${evt.target.value}`]);
  }
});

EFFECT_LEVEL.noUiSlider.on('update', () => {
  EFFECT_LEVEL_VALUE.value = EFFECT_LEVEL.noUiSlider.get();
  PHOTO_PREVIEW.style.filter =  `${filterType}(${EFFECT_LEVEL_VALUE.value}${filterSymbol})`;
});
