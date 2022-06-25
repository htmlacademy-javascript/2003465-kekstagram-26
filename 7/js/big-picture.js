import {PHOTOS} from './insert.js';

const BIG_PICTURE = document.querySelector('.big-picture');
const BIG_PICTURE_IMG =  BIG_PICTURE.querySelector('.big-picture__img > img');
const PICTURES = document.querySelectorAll('.picture');
const LIKES_COUNT = BIG_PICTURE.querySelector('.likes-count');
const COMMENTS_COUNT = BIG_PICTURE.querySelector('.comments-count');
const SOCIAL_COMMENT_COUNT = BIG_PICTURE.querySelector('.social__comment-count');
const COMMENTS_LOADER = BIG_PICTURE.querySelector('.comments-loader');
const PHOTO_DESCRIPTION = BIG_PICTURE.querySelector('.social__caption');


PICTURES.forEach((PICTURE, i) => {
  PICTURE.addEventListener('click', () => showBigPicture(PICTURE));
  PICTURE.addEventListener('click', hideComments);
  PICTURE.addEventListener('click', () => getCommentsList(i));
  PICTURE.addEventListener('click', () => getPhotoDescription(i));
  PICTURE.addEventListener('click', spotBodyScroll);
});

function closeBigPicture() {
  BIG_PICTURE.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

document.addEventListener('keydown', (event)=> {
  if (event.code === 'Escape') {
    BIG_PICTURE.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});

function hideComments () {
  SOCIAL_COMMENT_COUNT.classList.add('hidden');
  COMMENTS_LOADER.classList.add('hidden');
}

function showBigPicture (picture) {
  const PICTURE_LIKES = picture.querySelector('.picture__likes');
  const PICTURE_COMMENTS = picture.querySelector('.picture__comments');
  BIG_PICTURE.classList.remove('hidden');
  BIG_PICTURE_IMG.src = picture.querySelector('.picture__img').src;
  LIKES_COUNT.textContent = PICTURE_LIKES.textContent;
  COMMENTS_COUNT.textContent = PICTURE_COMMENTS.textContent;
}

function getCommentsList (count) {

  const COMMENT_FRAGMENT = document.createDocumentFragment();

  PHOTOS[count].comments.forEach((comment) => {
    const NEW_COMMENT = BIG_PICTURE.querySelector('.social__comment').cloneNode(true);
    NEW_COMMENT.querySelector('img').src = comment.avatar;
    NEW_COMMENT.querySelector('img').alt = comment.name;
    NEW_COMMENT.querySelector('.social__text').textContent = comment.message;
    COMMENT_FRAGMENT.append(NEW_COMMENT);
  });
  BIG_PICTURE.querySelector('.social__comments').textContent = '';
  BIG_PICTURE.querySelector('.social__comments').append(COMMENT_FRAGMENT);
}

function getPhotoDescription (count) {
  PHOTO_DESCRIPTION.textContent = PHOTOS[count].description;
}

function spotBodyScroll() {
  document.body.classList.add('modal-open');
}

export {closeBigPicture};
