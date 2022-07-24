import './insert.js';

const BIG_PICTURE = document.querySelector('.big-picture');
const BIG_PICTURE_IMG =  BIG_PICTURE.querySelector('.big-picture__img > img');
const COMMENTS_NUMBER = document.querySelector('.comments-number');
const LIKES_COUNT = BIG_PICTURE.querySelector('.likes-count');
const COMMENTS_COUNT = BIG_PICTURE.querySelector('.comments-count');
const SOCIAL_COMMENTS = document.querySelector('.social__comments');
const COMMENTS_LOADER = document.querySelector('.comments-loader');
const PHOTO_DESCRIPTION = BIG_PICTURE.querySelector('.social__caption');
const BIG_PICTURE_CANCEL = document.querySelector('.big-picture__cancel');
let lastComment = 5;

function onBigPictureCancelClick() {
  BIG_PICTURE.classList.add('hidden');
  document.body.classList.remove('modal-open');
  BIG_PICTURE_CANCEL.removeEventListener('click', onBigPictureCancelClick);
  COMMENTS_LOADER.removeEventListener('click', onCommentsLoaderClick);
  COMMENTS_LOADER.classList.remove('hidden');
}

function closeBigPictureByButton () {
  BIG_PICTURE_CANCEL.addEventListener('click', onBigPictureCancelClick);

  document.addEventListener('keydown', (event)=> {
    if (event.code === 'Escape') {
      onBigPictureCancelClick();
    }
  });
}

function showBigPicture (picture) {
  const PICTURE_LIKES = picture.querySelector('.picture__likes');
  const PICTURE_COMMENTS = picture.querySelector('.picture__comments');
  BIG_PICTURE.classList.remove('hidden');
  BIG_PICTURE_IMG.src = picture.querySelector('.picture__img').src;
  LIKES_COUNT.textContent = PICTURE_LIKES.textContent;
  COMMENTS_COUNT.textContent = PICTURE_COMMENTS.textContent;
  COMMENTS_LOADER.addEventListener('click', onCommentsLoaderClick);
}

function renderCommentsList (photos, index) {

  const COMMENT_FRAGMENT = document.createDocumentFragment();

  photos[index].comments.forEach((comment) => {
    const NEW_COMMENT = BIG_PICTURE.querySelector('.social__comment').cloneNode(true);
    NEW_COMMENT.querySelector('img').src = comment.avatar;
    NEW_COMMENT.querySelector('img').alt = comment.name;
    NEW_COMMENT.querySelector('.social__text').textContent = comment.message;
    COMMENT_FRAGMENT.append(NEW_COMMENT);
  });
  BIG_PICTURE.querySelector('.social__comments').textContent = '';
  BIG_PICTURE.querySelector('.social__comments').append(COMMENT_FRAGMENT);
}

function setPhotoDescription (photos, index) {
  PHOTO_DESCRIPTION.textContent = photos[index].description;
}

function stopBodyScroll() {
  document.body.classList.add('modal-open');
}

function limitCommentsNumber () {
  if (SOCIAL_COMMENTS.children.length > 5) {
    for (let i = 5; i < SOCIAL_COMMENTS.children.length; i++) {
      SOCIAL_COMMENTS.children[i].classList.add('hidden');
    }
  }
}

function onCommentsLoaderClick () {
  if ((SOCIAL_COMMENTS.children.length - lastComment) < 5) {
    for (let i = lastComment; i < SOCIAL_COMMENTS.children.length; i++) {
      SOCIAL_COMMENTS.children[i].classList.remove('hidden');
    }
    COMMENTS_LOADER.classList.add('hidden');
    COMMENTS_NUMBER.textContent = SOCIAL_COMMENTS.children.length;
    lastComment = 5;
    return;
  }
  for (let i = lastComment; i < lastComment + 5; i++) {
    SOCIAL_COMMENTS.children[i].classList.remove('hidden');
  }
  lastComment += 5;
  COMMENTS_NUMBER.textContent = lastComment;
  if (+ COMMENTS_NUMBER.textContent === SOCIAL_COMMENTS.children.length) {
    COMMENTS_LOADER.classList.add('hidden');
  }
}

function showCommentsNumber () {
  if (SOCIAL_COMMENTS.children.length < 5) {
    COMMENTS_NUMBER.textContent = SOCIAL_COMMENTS.children.length;
    COMMENTS_LOADER.classList.add('hidden');
  } else {
    COMMENTS_NUMBER.textContent = 5;
    COMMENTS_LOADER.classList.remove('hidden');
  }
}

export {closeBigPictureByButton, showBigPicture, renderCommentsList, setPhotoDescription, stopBodyScroll, showCommentsNumber, limitCommentsNumber};
