const UPLOAD_INPUT = document.querySelector('.img-upload__input');
const UPLOAD_PHOTO = document.querySelector('.img-upload__preview img');
const PHOTOS_TYPES = ['jpg', 'jpeg', 'png'];

UPLOAD_INPUT.addEventListener('change', () => {
  const FILE_PHOTO = UPLOAD_INPUT.files[0];
  const FILE_NAME = FILE_PHOTO.name.toLowerCase();
  const MATCHES = PHOTOS_TYPES.some((arg) => FILE_NAME.endsWith(arg));
  if (MATCHES) {
    UPLOAD_PHOTO.src = URL.createObjectURL(FILE_PHOTO);
  }
});
