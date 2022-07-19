const PICTURE_LIST = document.querySelector('.pictures');
const PICTURE_TEMPLATE = document.querySelector('#picture').content;
const PICTURE = PICTURE_TEMPLATE.querySelector('a');
const photoFragment = document.createDocumentFragment();

function insertPhoto (photos) {
  photos.forEach(({url, comments, likes}) => {
    const PICTURE_ITEM = PICTURE.cloneNode(true);
    PICTURE_ITEM.querySelector('.picture__img').src = url;
    PICTURE_ITEM.querySelector('.picture__comments').textContent = comments.length;
    PICTURE_ITEM.querySelector('.picture__likes').textContent = likes;
    photoFragment.append(PICTURE_ITEM);
  });
  PICTURE_LIST.append(photoFragment);
}

export {insertPhoto};
