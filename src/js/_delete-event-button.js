// ------------------------------
// ACTIONS FOR DELETE EVENT BUTTON
// ------------------------------

(function () {
  const formButtonRemove = document.querySelector('.form__button--remove');
  const popupButtonRemove = document.querySelector('.popup__button--remove');

  if (formButtonRemove) {
    formButtonRemove.addEventListener('click', openPopup);
    popupButtonRemove.addEventListener('click', closePopup);
  }

  function openPopup(event) {

    event.preventDefault();
    document.body.classList.add('page--popup-opened');

    console.log('openPopup');
  }

  function closePopup(a) {
    document.location.href="/";
  }

}());
