// ------------------------------
// CALENDAR CONTROLS
// ------------------------------

(function() {

  const calendarControls = document.querySelectorAll('.calendar-control');
  const calendarPopup = document.querySelector('.popup--calendar');

  calendarControls.forEach(control => {
    control.addEventListener('click', () => {
      event.stopPropagation();
      closePopups(calendarPopup);
      calendarPopup.classList.toggle('popup--opened');
    });
  });
}());
