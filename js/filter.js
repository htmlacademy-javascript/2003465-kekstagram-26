import {randomize, debounce} from './util.js';
import {insertPhoto} from './insert.js';
import {setPictureEvents} from './gallery.js';

const FILTERS_FORM = document.querySelector('.img-filters__form');
const FILTERS_BUTTONS = document.querySelectorAll('.img-filters__button');
const RENDER_DELAY = 500;

function changeFilters (data) {
  const getFilterRandom = debounce(setFilterRandom , RENDER_DELAY);
  const getFilterDefault = debounce(setFilterDefault, RENDER_DELAY);
  const getFilterRanked = debounce(setFilterRanked, RENDER_DELAY);

  FILTERS_FORM.addEventListener('click',(evt) => {
    for (const FILTER_BUTTON of FILTERS_BUTTONS) {
      FILTER_BUTTON.classList.remove('img-filters__button--active');
    }
    if (evt.target.className === 'img-filters__button') {
      evt.target.classList.add('img-filters__button--active');
    }
    if (evt.target.id === 'filter-random') {
      getFilterRandom(data);
    }
    if (evt.target.id === 'filter-default') {
      getFilterDefault(data);
    }
    if (evt.target.id === 'filter-discussed') {
      getFilterRanked(data);
    }
  });
}

function getTenRandomPhotos (data) {
  const NEW_DATA = data.slice();
  const RANDOM_PHOTOS = [];
  for (let i = 0; i < 10; i++) {
    const RANDOM_INDEX = randomize(0, NEW_DATA.length - 1);
    RANDOM_PHOTOS.push(NEW_DATA[RANDOM_INDEX]);
    NEW_DATA.splice(RANDOM_INDEX, 1);
  }
  return RANDOM_PHOTOS;
}

function getRankedPhotos (data) {
  return data.slice().sort(compareLikes);
}

function deletePic () {
  const PICTURES = document.querySelectorAll('.picture');
  for (const PICTURE of PICTURES) {
    PICTURE.remove();
  }
}

function compareLikes (photo1, photo2)  {
  const LIKES1 = photo1.likes;
  const LIKES2 = photo2.likes;
  return LIKES2 - LIKES1;
}

function setFilterRandom (data) {
  const RANDOM_PHOTO = getTenRandomPhotos(data);
  deletePic();
  insertPhoto(RANDOM_PHOTO);
  setPictureEvents(RANDOM_PHOTO);
}

function setFilterRanked (data) {
  const RANKED_PHOTO = getRankedPhotos(data);
  deletePic();
  insertPhoto(RANKED_PHOTO);
  setPictureEvents(RANKED_PHOTO);
}

function setFilterDefault(data) {
  deletePic();
  insertPhoto(data);
  setPictureEvents(data);
}

export {changeFilters};
