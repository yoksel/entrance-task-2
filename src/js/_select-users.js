// ------------------------------
// SELECT USERS
// ------------------------------

(function() {

  const SelectUser = function(elem) {
    const usersControl = elem.querySelector('.users-control');
    const usersPopup = elem.querySelector('.popup--users');
    const selectUsersInput = elem.querySelector('.select-users__input');

    usersControl.addEventListener('click', (event) => {
      event.stopPropagation();
      closePopups(usersPopup);
      usersPopup.classList.toggle('popup--opened');
      usersControl.classList.toggle('users-control--opened');
    });

    selectUsersInput.addEventListener('click', (event) => {
      event.stopPropagation();
      closePopups(usersPopup);
      usersPopup.classList.add('popup--opened');
      usersControl.classList.add('users-control--opened');
    });

    selectUsersInput.addEventListener('blur', (event) => {
      event.stopPropagation();
      closePopups(usersPopup);
      usersPopup.classList.remove('popup--opened');
      usersControl.classList.remove('users-control--opened');
    });
  };

  const selectUsers = document.querySelectorAll('.select-users');

  selectUsers.forEach(item => {
    const selectUser = new SelectUser(item);
  });

}());
