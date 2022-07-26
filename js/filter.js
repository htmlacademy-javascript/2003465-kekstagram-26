import {randomize, debounce} from './util.js';
import {insertPhoto} from './insert.js';
import {setPictureEvents} from './gallery.js';

const filtersForm = document.querySelector('.img-filters__form');
const filtersButton = document.querySelectorAll('.img-filters__button');
const NUMBERS_RAMDOM_PHOTOS = 10;
const RENDER_DELAY = 500;

function onFiltersClick (data) {
  const getFilterRandom = debounce(setFilterRandom , RENDER_DELAY);
  const getFilterDefault = debounce(setFilterDefault, RENDER_DELAY);
  const getFilterRanked = debounce(setFilterRanked, RENDER_DELAY);

  filtersForm.addEventListener('click',(evt) => {
    for (const FILTER_BUTTON of filtersButton) {
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
  const newData = data.slice();
  const RANDOM_PHOTOS = [];
  for (let i = 0; i < NUMBERS_RAMDOM_PHOTOS; i++) {
    const randomIndex = randomize(0, newData.length - 1);
    RANDOM_PHOTOS.push(newData[randomIndex]);
    newData.splice(randomIndex, 1);
  }
  return RANDOM_PHOTOS;
}

function getRankedPhotos (data) {
  return data.slice().sort(compareLikes);
}

function deletePic () {
  const pictures = document.querySelectorAll('.picture');
  for (const picture of pictures) {
    picture.remove();
  }
}

function compareLikes (photo1, photo2)  {
  const likes1 = photo1.likes;
  const likes2 = photo2.likes;
  return likes2 - likes1;
}

function setFilterRandom (data) {
  const randomPhoto = getTenRandomPhotos(data);
  deletePic();
  insertPhoto(randomPhoto);
  setPictureEvents(randomPhoto);
}

function setFilterRanked (data) {
  const rankedPhoto = getRankedPhotos(data);
  deletePic();
  insertPhoto(rankedPhoto);
  setPictureEvents(rankedPhoto);
}

function setFilterDefault(data) {
  deletePic();
  insertPhoto(data);
  setPictureEvents(data);
}

export {onFiltersClick};
