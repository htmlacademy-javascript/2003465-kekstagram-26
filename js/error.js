const ERROR_TEMPLATE = document.querySelector('#error').content;
const ERROR_ITEM = ERROR_TEMPLATE.querySelector('.error');
const ERROR_FRAGMENT = document.createDocumentFragment();
const ERROR_VISIBLE_TIME = 5000;

function showErrorUploadData (message) {
  const ERROR_CONTAINER = document.createElement('div');
  ERROR_CONTAINER.style.zIndex = 100;
  ERROR_CONTAINER.style.position = 'absolute';
  ERROR_CONTAINER.style.left = 0;
  ERROR_CONTAINER.style.top = 0;
  ERROR_CONTAINER.style.padding = '10px';
  ERROR_CONTAINER.style.fontSize = '30px';
  ERROR_CONTAINER.style.textAlign = 'center';
  ERROR_CONTAINER.style.backgroundColor = 'red';
  ERROR_CONTAINER.style.lineHeight = '30px';
  ERROR_CONTAINER.textContent = message;

  document.body.append(ERROR_CONTAINER);

  setTimeout(() => {
    ERROR_CONTAINER.remove();
  }, ERROR_VISIBLE_TIME);
}

function showErrorOnloadDForm() {
  const ERROR_MODAL = ERROR_ITEM.cloneNode(true);
  ERROR_FRAGMENT.append(ERROR_MODAL);
  document.body.append(ERROR_FRAGMENT);
  const ERROR_BUTTON = document.querySelector('.error__button');

  ERROR_BUTTON.addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', (evt) => {
    if (evt.code === 'Escape') {
      onErrorButtonClick();
    }
  });
  document.addEventListener('click', (evt) => {
    if (evt.target === ERROR_MODAL) {
      onErrorButtonClick();
    }
  });
}

function onErrorButtonClick() {
  document.querySelector('.error').remove();
}

export {showErrorUploadData, showErrorOnloadDForm};
