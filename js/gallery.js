import {closeBigPictureByButton, showBigPicture, renderCommentsList, setPhotoDescription, stopBodyScroll, showCommentsNumber, limitCommentsNumber} from './big-picture.js';

function setPictureEvents (data) {
  const PICTURES = document.querySelectorAll('.picture');
  PICTURES.forEach((PICTURE, i) => {
    PICTURE.addEventListener('click', showBigPicture.bind(null, PICTURE));
    PICTURE.addEventListener('click', renderCommentsList.bind(null, data, i));
    PICTURE.addEventListener('click', setPhotoDescription.bind(null, data, i));
    PICTURE.addEventListener('click', showCommentsNumber);
    PICTURE.addEventListener('click', limitCommentsNumber);
    PICTURE.addEventListener('click', stopBodyScroll);
    PICTURE.addEventListener('click', closeBigPictureByButton);
  });
}

export {setPictureEvents};
