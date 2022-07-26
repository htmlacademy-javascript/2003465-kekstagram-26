const successTemplate = document.querySelector('#success').content;
const successItem = successTemplate.querySelector('.success');
const successFragment = document.createDocumentFragment();

function showSuccessOnloadDForm() {
  const successModal = successItem.cloneNode(true);
  successFragment.append(successModal);
  document.body.append(successFragment);
  const successButton = document.querySelector('.success__button');

  successButton.addEventListener('click', closeSuccessModal);
  document.addEventListener('keydown', (evt) => {
    if (evt.code === 'Escape') {
      closeSuccessModal();
    }
  });
  document.addEventListener('click', (evt) => {
    if (evt.target === successModal) {
      closeSuccessModal();
    }
  });
}

function closeSuccessModal() {
  document.querySelector('.success').remove();
}

export {showSuccessOnloadDForm};
