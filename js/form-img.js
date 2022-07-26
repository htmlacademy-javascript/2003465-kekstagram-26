import {showErrorOnloadDForm} from './error.js';
import {showSuccessOnloadDForm} from './success.js';
import {setDefaultImgEffects} from './formatting-photo.js';

const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const uploadForm = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');
const textComment = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');
const MAX_HASHTAG_LENGTH = 20;
const MIN_HASHTAG_LENGTH = 0;
const MAX_HASHTAG_NUMBERS = 5;
const MAX_COMMENT_LENGTH = 140;
const REGULAR_EXPRESSION = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const pristine = new Pristine(uploadForm,{
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper_invalid',
  successClass: 'img-upload__field-wrapper_valid',
  errorTextParent:'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'input__error'
});

pristine.addValidator(textHashtags,  checkHashtagLength, 'От 1 до 19 символов');
pristine.addValidator(textHashtags,  checkHashtagsValue, 'Недопустимый символ');
pristine.addValidator(textHashtags,  checkHashtagsNumber, 'Не более пяти хэштегов');
pristine.addValidator(textHashtags,  checkHashtagsRepeat, 'Хэштеги не должны повторяться');
pristine.addValidator(textComment,  checkCommentLength, 'Длина комментария не более 140 символов');

function setUploadForm (onSuccess) {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      const formData = new FormData(evt.target);
      blockSubmitButton();
      fetch(
        'https://26.javascript.pages.academy/kekstagram',
        {
          method: 'POST',
          body: formData,
          type: 'multipart/form-data',
        })
        .then((response) => {
          if (response.ok) {
            onSuccess();
            showSuccessOnloadDForm();
            unblockSubmitButton();
            setDefaultImgEffects();
            textHashtags.value = '';
            textComment.value = '';
          } else {
            showErrorOnloadDForm();
          }
        })
        .catch(() => {
          closeByError();
          showErrorOnloadDForm();
        });
    }
  });
}

function checkHashtagLength(value) {
  return value.length >= MIN_HASHTAG_LENGTH && value.length < MAX_HASHTAG_LENGTH;
}

function checkHashtagsValue() {
  if (textHashtags.value === '') {
    return true;
  }
  return textHashtags.value.split(' ').some((hashtag) => REGULAR_EXPRESSION.test(hashtag));
}

function checkHashtagsNumber() {
  return textHashtags.value.split(' ').length <= MAX_HASHTAG_NUMBERS;
}

function checkHashtagsRepeat() {
  return (new Set(textHashtags.value.split(' '))).size === textHashtags.value.split(' ').length;
}

function checkCommentLength () {
  return textComment.value.length <= MAX_COMMENT_LENGTH;
}

uploadFile.addEventListener('change', () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeUploadOverlayByButton();
});

function onUploadCancelClick() {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFile.value='';
  uploadCancel.removeEventListener('click', onUploadCancelClick);
  document.removeEventListener('keydown', onEscClick);
  setDefaultImgEffects();
}

function closeByError() {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFile.value='';
  uploadCancel.removeEventListener('click', onUploadCancelClick);
  document.removeEventListener('keydown', onEscClick);
}

function closeUploadOverlayByButton () {
  uploadCancel.addEventListener('click', onUploadCancelClick);

  document.addEventListener('keydown', onEscClick);
}

function onEscClick (evt) {
  if (evt.code === 'Escape' && evt.target !== textHashtags && evt.target !== textComment) {
    onUploadCancelClick();
  }
}

function blockSubmitButton () {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
}

function unblockSubmitButton () {
  submitButton.disabled = false;
  submitButton.textContent = 'Сохранить';
}

export {setUploadForm, onUploadCancelClick};
