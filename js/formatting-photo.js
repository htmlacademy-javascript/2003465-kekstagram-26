const scaleControl = document.querySelector('.scale__control--value');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const photoPreview = document.querySelector ('.img-upload__preview img');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevel = document.querySelector('.effect-level__slider');
const effectLevelDiv = document.querySelector('.effect-level');
const effectsList = document.querySelector('.effects__list');
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP_SCALE = 25;
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

scaleSmaller.addEventListener('click', () => {
  let numberScaleValue = Number(scaleControl.value.replace('%',''));
  numberScaleValue -= STEP_SCALE;
  if (numberScaleValue >= MIN_SCALE && numberScaleValue <= MAX_SCALE){
    photoPreview.style.transform= `scale(${numberScaleValue/100})`;
    scaleControl.value = `${String(numberScaleValue)}%`;
  }
});

scaleBigger.addEventListener('click', () => {
  let numberScaleValue = Number(scaleControl.value.replace('%',''));
  numberScaleValue += STEP_SCALE;
  if (numberScaleValue >= MIN_SCALE && numberScaleValue <= MAX_SCALE){
    photoPreview.style.transform = `scale(${numberScaleValue/100})`;
    scaleControl.value = `${String(numberScaleValue)}%`;
  }
});

noUiSlider.create(effectLevel, EFFECTS['none']);
effectLevelDiv.classList.add('hidden');

effectsList.addEventListener('click', (evt) => {
  if (evt.target.type === 'radio') {
    if (evt.target.value === 'none') {
      photoPreview.style.filter = '';
      effectLevelDiv.classList.add('hidden');
    } else {
      effectLevelDiv.classList.remove('hidden');
    }
    filterType = EFFECTS[`${evt.target.value}`].filterName;
    filterSymbol = EFFECTS[`${evt.target.value}`].symbol;
    photoPreview.className = '';
    photoPreview.classList.add(`effects__preview--${evt.target.value}`);
    effectLevel.noUiSlider.updateOptions(EFFECTS[`${evt.target.value}`]);
  }
});

effectLevel.noUiSlider.on('update', () => {
  effectLevelValue.value = effectLevel.noUiSlider.get();
  photoPreview.style.filter =  `${filterType}(${effectLevelValue.value}${filterSymbol})`;
});

function setDefaultImgEffects () {
  scaleControl.value = '100%';
  photoPreview.style.transform = 'scale(1)';
  photoPreview.style.filter = '';
  photoPreview.className = '';
  effectLevelDiv.classList.add('hidden');
}

export {setDefaultImgEffects};
