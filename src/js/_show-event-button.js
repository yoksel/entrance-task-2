// ------------------------------
// ACTIONS FOR SHOW EVENT BUTTON
// ------------------------------

(function () {
  const ShowEventButton = function(elem) {
    this.elem = elem;
    this.popup = popupEdit;

    elem.addEventListener('click', (event) => {
      event.stopPropagation();
      closePopups();
      this.openPopup(event);
    });
  };

  ShowEventButton.prototype.openPopup = function(event) {
    const slotCoords = this.elem.getBoundingClientRect();
    this.x = slotCoords.x + slotCoords.width / 2;
    this.y = slotCoords.y + slotCoords.height / 2;
    this.popup.elem.style.visibility = 'hidden';
    this.popup.elem.style.display = 'block';

    const left = this.checkXPopupPosition();
    const top = this.checkYPopupPosition();

    this.popup.elem.style.top = `${top}px`;
    this.popup.elem.style.left = `${left}px`;
    this.popup.elem.style.visibility = 'visible';
    this.popup.elem.style.display = '';
    this.popup.elem.classList.add(this.popup.classOpened);
  };

  ShowEventButton.prototype.checkXPopupPosition = function() {
    const popupCoords = this.popup.elem.getBoundingClientRect();

    const popupWidth = popupCoords.width;
    const popupHalfWidth = popupCoords.width / 2;
    const maxArrowOffset = popupHalfWidth - 15;
    this.popup.arrow.style = '';

    let left = this.x - popupHalfWidth;
    const overflowRight = (this.x + popupHalfWidth) - window.innerWidth;

    if (overflowRight > 0) {
      left -= overflowRight;
      let popupLeft = Math.abs(overflowRight);
      if (popupLeft >= maxArrowOffset) {
        popupLeft = maxArrowOffset;
      }
      this.popup.arrow.style.left = `${popupLeft}px`;
    }
    else if (left < 0) {
      let popupRight = Math.abs(left);
      if (popupRight >= maxArrowOffset) {
        popupRight = maxArrowOffset;
      }
      this.popup.arrow.style.right = `${popupRight}px`
      left = 0;
    }

    return left;
  };

  ShowEventButton.prototype.checkYPopupPosition = function() {
    const popupCoords = this.popup.elem.getBoundingClientRect();

    const popupHeight = popupCoords.height;
    const popupHalfHeight = popupCoords.height / 2;
    const maxArrowOffset = popupHalfHeight - 15;

    let top = this.y;
    const overflowBottom = (this.y + popupHeight) - window.innerHeight;

    if (overflowBottom > 0) {
      top -= popupHeight;
      this.popup.elem.classList.add(this.popup.classRotated);
    }
    else if (top < 0) {
      top = 0;
    }
    else {
      this.popup.elem.classList.remove(this.popup.classRotated);
    }

    return top;
  };

  const popupEdit = {
    elem: document.querySelector('.popup--view-info'),
    classOpened: 'popup--opened',
    classRotated: 'popup--rotated',
    closePopup: function() {
      popupEdit.elem.classList.remove(popupEdit.classOpened);
    }
  };

  if (popupEdit.elem) {
    popupEdit.arrow = popupEdit.elem.querySelector('.popup__arrow');
  }

  const showEventButtons = document.querySelectorAll('.button-show-event');
  showEventButtons.forEach(item => {
    const showEventButton = new ShowEventButton(item);
  });
}());
