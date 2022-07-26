const errorTemplate = document.querySelector('#error').content;
const errorItem = errorTemplate.querySelector('.error');
const errorFragment = document.createDocumentFragment();
const ERROR_VISIBLE_TIME = 5000;

function showErrorUploadData (message) {
  const errorContainer = document.createElement('div');
  errorContainer.style.zIndex = 100;
  errorContainer.style.position = 'absolute';
  errorContainer.style.left = 0;
  errorContainer.style.top = 0;
  errorContainer.style.padding = '10px';
  errorContainer.style.fontSize = '30px';
  errorContainer.style.textAlign = 'center';
  errorContainer.style.backgroundColor = 'red';
  errorContainer.style.lineHeight = '30px';
  errorContainer.textContent = message;

  document.body.append(errorContainer);

  setTimeout(() => {
    errorContainer.remove();
  }, ERROR_VISIBLE_TIME);
}

function showErrorOnloadDForm() {
  const errorModal = errorItem.cloneNode(true);
  errorFragment.append(errorModal);
  document.body.append(errorFragment);
  const errorButton = document.querySelector('.error__button');

  errorButton.addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', (evt) => {
    if (evt.code === 'Escape') {
      onErrorButtonClick();
    }
  });
  document.addEventListener('click', (evt) => {
    if (evt.target === errorModal) {
      onErrorButtonClick();
    }
  });
}

function onErrorButtonClick() {
  document.querySelector('.error').remove();
}

export {showErrorUploadData, showErrorOnloadDForm};
