const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const picture = pictureTemplate.querySelector('a');
const photoFragment = document.createDocumentFragment();

function insertPhoto (photos) {
  photos.forEach(({url, comments, likes}) => {
    const pictureItem = picture.cloneNode(true);
    pictureItem.querySelector('.picture__img').src = url;
    pictureItem.querySelector('.picture__comments').textContent = comments.length;
    pictureItem.querySelector('.picture__likes').textContent = likes;
    photoFragment.append(pictureItem);
  });
  pictureList.append(photoFragment);
}

export {insertPhoto};
