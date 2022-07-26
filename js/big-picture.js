import './insert.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg =  bigPicture.querySelector('.big-picture__img > img');
const commentsNumber = document.querySelector('.comments-number');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');
const photoDescription = bigPicture.querySelector('.social__caption');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
let lastComment = 5;

function onBigPictureCancelClick() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureCancel.removeEventListener('click', onBigPictureCancelClick);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  commentsLoader.classList.remove('hidden');
}

function closeBigPictureByButton () {
  bigPictureCancel.addEventListener('click', onBigPictureCancelClick);

  document.addEventListener('keydown', (event)=> {
    if (event.code === 'Escape') {
      onBigPictureCancelClick();
    }
  });
}

function showBigPicture (picture) {
  const pictureLikes = picture.querySelector('.picture__likes');
  const pictureComments = picture.querySelector('.picture__comments');
  bigPicture.classList.remove('hidden');
  bigPictureImg.src = picture.querySelector('.picture__img').src;
  likesCount.textContent = pictureLikes.textContent;
  commentsCount.textContent = pictureComments.textContent;
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
}

function renderCommentsList (photos, index) {

  const commentFragment = document.createDocumentFragment();

  photos[index].comments.forEach((comment) => {
    const newComment = bigPicture.querySelector('.social__comment').cloneNode(true);
    newComment.querySelector('img').src = comment.avatar;
    newComment.querySelector('img').alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;
    commentFragment.append(newComment);
  });
  bigPicture.querySelector('.social__comments').textContent = '';
  bigPicture.querySelector('.social__comments').append(commentFragment);
}

function setPhotoDescription (photos, index) {
  photoDescription.textContent = photos[index].description;
}

function stopBodyScroll() {
  document.body.classList.add('modal-open');
}

function limitCommentsNumber () {
  if (socialComments.children.length > 5) {
    for (let i = 5; i < socialComments.children.length; i++) {
      socialComments.children[i].classList.add('hidden');
    }
  }
}

function onCommentsLoaderClick () {
  if ((socialComments.children.length - lastComment) < 5) {
    for (let i = lastComment; i < socialComments.children.length; i++) {
      socialComments.children[i].classList.remove('hidden');
    }
    commentsLoader.classList.add('hidden');
    commentsNumber.textContent = socialComments.children.length;
    lastComment = 5;
    return;
  }
  for (let i = lastComment; i < lastComment + 5; i++) {
    socialComments.children[i].classList.remove('hidden');
  }
  lastComment += 5;
  commentsNumber.textContent = lastComment;
  if (+ commentsNumber.textContent === socialComments.children.length) {
    commentsLoader.classList.add('hidden');
  }
}

function showCommentsNumber () {
  if (socialComments.children.length < 5) {
    commentsNumber.textContent = socialComments.children.length;
    commentsLoader.classList.add('hidden');
  } else {
    commentsNumber.textContent = 5;
    commentsLoader.classList.remove('hidden');
  }
}

export {closeBigPictureByButton, showBigPicture, renderCommentsList, setPhotoDescription, stopBodyScroll, showCommentsNumber, limitCommentsNumber};
