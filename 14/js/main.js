import {insertPhoto} from './insert.js';
import {setUploadForm, closeUploadOverlay} from './form-img.js';
import {setPictureEvents} from './gallery.js';
import './formatting-photo.js';
import {showErrorUploadData} from './error.js';
import './load-photo.js';
import {changeFilters} from './filter.js';


fetch('https://26.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    showErrorUploadData('Не удалось загрузить фотографии с сервера, попробуйте обновить страницу');
  })
  .then((data) => {
    document.querySelector('.img-filters--inactive').style.opacity = 1;
    insertPhoto(data);
    setPictureEvents(data);
    changeFilters(data);
  })
  .catch(() => {
    showErrorUploadData('Не удалось загрузить фотографии с сервера, попробуйте обновить страницу');
  });

setUploadForm(closeUploadOverlay);