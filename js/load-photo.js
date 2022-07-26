const uploadInput = document.querySelector('.img-upload__input');
const uploadPhoto = document.querySelector('.img-upload__preview img');
const PHOTOS_TYPES = ['jpg', 'jpeg', 'png'];

uploadInput.addEventListener('change', () => {
  const filePhoto = uploadInput.files[0];
  const fileName = filePhoto.name.toLowerCase();
  const matches = PHOTOS_TYPES.some((arg) => fileName.endsWith(arg));
  if (matches) {
    uploadPhoto.src = URL.createObjectURL(filePhoto);
  }
});
