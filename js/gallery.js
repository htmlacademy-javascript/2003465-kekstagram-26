import {closeBigPictureByButton, showBigPicture, renderCommentsList, setPhotoDescription, stopBodyScroll, showCommentsNumber, limitCommentsNumber} from './big-picture.js';

function setPictureEvents (data) {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((picture, i) => {
    picture.addEventListener('click', showBigPicture.bind(null, picture));
    picture.addEventListener('click', renderCommentsList.bind(null, data, i));
    picture.addEventListener('click', setPhotoDescription.bind(null, data, i));
    picture.addEventListener('click', showCommentsNumber);
    picture.addEventListener('click', limitCommentsNumber);
    picture.addEventListener('click', stopBodyScroll);
    picture.addEventListener('click', closeBigPictureByButton);
  });
}

export {setPictureEvents};
