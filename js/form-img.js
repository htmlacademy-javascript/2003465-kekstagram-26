import {showErrorOnloadDForm} from './error.js';
import {showSuccessOnloadDForm} from './success.js';
import {setDefaultImgEffects} from './formatting-photo.js';

const UPLOAD_FILE = document.querySelector('#upload-file');
const UPLOAD_OVERLAY = document.querySelector('.img-upload__overlay');
const UPLOAD_CANCEL = document.querySelector('#upload-cancel');
const UPLOAD_FORM = document.querySelector('.img-upload__form');
const TEXT_HASHTAGS = document.querySelector('.text__hashtags');
const TEXT_COMMENT = document.querySelector('.text__description');
const SUBMIT_BUTTON = document.querySelector('.img-upload__submit');
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_NUMBERS = 5;
const MAX_COMMENT_LENGTH = 140;
const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const PRISTINE = new Pristine(UPLOAD_FORM,{
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper_invalid',
  successClass: 'img-upload__field-wrapper_valid',
  errorTextParent:'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'input__error'
});

PRISTINE.addValidator(TEXT_HASHTAGS,  checkHashtagLength, 'От 1 до 19 символов');
PRISTINE.addValidator(TEXT_HASHTAGS,  checkHashtagsValue, 'Недопустимый символ');
PRISTINE.addValidator(TEXT_HASHTAGS,  checkHashtagsNumber, 'Не более пяти хэштегов');
PRISTINE.addValidator(TEXT_HASHTAGS,  checkHashtagsRepeat, 'Хэштеги не должны повторяться');
PRISTINE.addValidator(TEXT_COMMENT,  checkCommentLength, 'Длина комментария не более 140 символов');

function setUploadForm (onSuccess) {
  UPLOAD_FORM.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (PRISTINE.validate()) {
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
            TEXT_HASHTAGS.value = '';
            TEXT_COMMENT.value = '';
          } else {
            showErrorOnloadDForm();
          }
        })
        .catch(() => {
          closeUploadOverlay();
          showErrorOnloadDForm();
        });
    }
  });
}

function checkHashtagLength(value) {
  return value.length >= 0 && value.length < MAX_HASHTAG_LENGTH;
}

function checkHashtagsValue() {
  if (TEXT_HASHTAGS.value === '') {
    return true;
  }
  return TEXT_HASHTAGS.value.split(' ').some((hashtag) => re.test(hashtag));
}

function checkHashtagsNumber() {
  return TEXT_HASHTAGS.value.split(' ').length <= MAX_HASHTAG_NUMBERS;
}

function checkHashtagsRepeat() {
  return (new Set(TEXT_HASHTAGS.value.split(' '))).size === TEXT_HASHTAGS.value.split(' ').length;
}

function checkCommentLength () {
  return TEXT_COMMENT.value.length <= MAX_COMMENT_LENGTH;
}

UPLOAD_FILE.addEventListener('change', () => {
  UPLOAD_OVERLAY.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeUploadOverlayByButton();
});

function closeUploadOverlay() {
  UPLOAD_OVERLAY.classList.add('hidden');
  document.body.classList.remove('modal-open');
  UPLOAD_FILE.value='';
  UPLOAD_CANCEL.removeEventListener('click', closeUploadOverlay);
  document.removeEventListener('keydown', closeUploadOverlayByEsc);
}

function closeUploadOverlayByButton () {
  UPLOAD_CANCEL.addEventListener('click', closeUploadOverlay);

  document.addEventListener('keydown', closeUploadOverlayByEsc);
}

function closeUploadOverlayByEsc (evt) {
  if (evt.code === 'Escape' && evt.target !== TEXT_HASHTAGS && evt.target !== TEXT_COMMENT) {
    closeUploadOverlay();
  }
}

function blockSubmitButton () {
  SUBMIT_BUTTON.disabled = true;
  SUBMIT_BUTTON.textContent = 'Сохраняю...';
}

function unblockSubmitButton () {
  SUBMIT_BUTTON.disabled = false;
  SUBMIT_BUTTON.textContent = 'Сохранить';
}

export {setUploadForm, closeUploadOverlay};
