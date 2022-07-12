import './insert.js';
import './form-img.js';
import './formatting-photo.js';
import {closeBigPictureByButton, showBigPicture, renderCommentsList, setPhotoDescription, stopBodyScroll, showCommentsNumber, limitCommentsNumber} from './big-picture.js';

const PICTURES = document.querySelectorAll('.picture');

PICTURES.forEach((PICTURE, i) => {
  PICTURE.addEventListener('click', showBigPicture.bind(null, PICTURE));
  PICTURE.addEventListener('click', renderCommentsList.bind(null, i));
  PICTURE.addEventListener('click', setPhotoDescription.bind(null, i));
  PICTURE.addEventListener('click', showCommentsNumber);
  PICTURE.addEventListener('click', limitCommentsNumber);
  PICTURE.addEventListener('click', stopBodyScroll);
  PICTURE.addEventListener('click', closeBigPictureByButton);
});


