const SUCCESS_TEMPLATE = document.querySelector('#success').content;
const SUCCESS_ITEM = SUCCESS_TEMPLATE.querySelector('.success');
const SUCCESS_FRAGMENT = document.createDocumentFragment();

function showSuccessOnloadDForm() {
  const SUCCESS_MODAL = SUCCESS_ITEM.cloneNode(true);
  SUCCESS_FRAGMENT.append(SUCCESS_MODAL);
  document.body.append(SUCCESS_FRAGMENT);
  const SUCCESS_BUTTON = document.querySelector('.success__button');

  SUCCESS_BUTTON.addEventListener('click', closeSuccessModal);
  document.addEventListener('keydown', (evt) => {
    if (evt.code === 'Escape') {
      closeSuccessModal();
    }
  });
  document.addEventListener('click', (evt) => {
    if (evt.target === SUCCESS_MODAL) {
      closeSuccessModal();
    }
  });
}

function closeSuccessModal() {
  document.querySelector('.success').remove();
}

export {showSuccessOnloadDForm};
