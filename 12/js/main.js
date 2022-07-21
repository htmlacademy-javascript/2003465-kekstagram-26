import {insertPhoto} from './insert.js';
import {setUploadForm, closeUploadOverlay} from './form-img.js';
import {setPictureEvents} from './gallery.js';
import './formatting-photo.js';
import {showErrorUploadData} from './error.js';

fetch('https://26.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    showErrorUploadData('Не удалось загрузить фотографии с сервера, попробуйте обновить страницу');
  })
  .then((data) => {
    insertPhoto(data);
    setPictureEvents(data);
  })
  .catch(() => {
    showErrorUploadData('Не удалось загрузить фотографии с сервера, попробуйте обновить страницу');
  });

setUploadForm(closeUploadOverlay);