import './insert.js';
import './form-img.js';
import './formatting-photo.js';
import {closeBigPictureByButton, hideComments, showBigPicture, renderCommentsList, setPhotoDescription, stopBodyScroll} from './big-picture.js';

const PICTURES = document.querySelectorAll('.picture');

PICTURES.forEach((PICTURE, i) => {
  PICTURE.addEventListener('click', showBigPicture.bind(null, PICTURE));
  PICTURE.addEventListener('click', hideComments);
  PICTURE.addEventListener('click', renderCommentsList.bind(null, i));
  PICTURE.addEventListener('click', setPhotoDescription.bind(null, i));
  PICTURE.addEventListener('click', stopBodyScroll);
  PICTURE.addEventListener('click', closeBigPictureByButton);
});


