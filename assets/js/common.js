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

// ------------------------------
// CREATE EVENT POPUP
// ------------------------------

(function () {
  const searchStr = document.location.search.substr(1);
  const searchArr = searchStr.split('&');
  const query = {};
  const buttonClose = document.querySelector('.popup__button--ok');

  searchArr.forEach(item => {
    const itemArr = item.split('=');
    query[itemArr[0]] = itemArr[1];
  });

  if (query.action == 'create') {
    openPopup();
  }

  if (buttonClose) {
    buttonClose.addEventListener('click', closePopup);
  }

  function openPopup(event) {
    document.body.classList.add('page--popup-opened');
  }

  function closePopup() {
    document.body.classList.remove('page--popup-opened');
  }
}());

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

// ------------------------------
// HIGHLIGHT ROOMS
// ------------------------------

(function(){
  const SlotsList = function(elem) {
    const slotButtons = elem.querySelectorAll('.slot__button:not(.button-show-event)');
    const roomId = elem.dataset.roomId;
    const that = this;
    this.roomElem = document.querySelector(`.room--${roomId}`);
    const classes = {
      hover: 'room--slot-highlighted',
      press: 'room--slot-pressed',
    };

    if (!roomId) {
      return;
    }

    slotButtons.forEach(button => {
      button.addEventListener('mouseover', () => {
        that.roomElem.classList.add(classes.hover);
      });

      button.addEventListener('mouseout', () => {
        that.roomElem.classList.remove(classes.hover);
      });

      button.addEventListener('mousedown', () => {
        that.roomElem.classList.add(classes.press);
      });

      button.addEventListener('mouseup', () => {
        that.roomElem.classList.add(classes.press);
      });
    });
  };

  const slotsLists = document.querySelectorAll('.slots__list');
  slotsLists.forEach = [].forEach;

  slotsLists.forEach(item => {
    slotsList = new SlotsList(item);
  });
}());

// ------------------------------
// POPUPS
// ------------------------------

(function (window) {

  function closePopups(elem) {
    const popups = document.querySelectorAll('.popup');

    popups.forEach(popup => {
      if(popup !== elem) {
        popup.classList.remove('popup--opened');
      }
    });
  }

  window.closePopups = closePopups;

  window.addEventListener('click', event => {
    closePopups();
  });

  const popups = document.querySelectorAll('.popup');

  popups.forEach(popup => {
    popup.addEventListener('click', event => {
      event.stopPropagation();
    });
  });

  //------------------------------

  const popupViewInfo = {
    elem: document.querySelector('.popup--view-info'),
    classOpened: 'popup--opened',
    classRotated: 'popup--rotated',
    closePopup: function() {
      popupViewInfo.elem.classList.remove(popupViewInfo.classOpened);
    }
  };

  if (popupViewInfo.elem) {
    popupViewInfo.arrow = popupViewInfo.elem.querySelector('.popup__arrow');
  }

  function chageClassOnScroll() {
    popupViewInfo.closePopup();

    if (shedule.scrollLeft < 30) {
      shedule.classList.remove(scrollClass);
    }
    else {
      shedule.classList.add(scrollClass);
    }
  }

  const shedule = document.querySelector('.shedule');
  const scrollClass = 'shedule--scroll';

  if (shedule) {
    shedule.addEventListener('scroll', () => {
      throttle(chageClassOnScroll);
    });

    window.addEventListener('scroll', () => {
      throttle(chageClassOnScroll);
    });
  }

}(this));

// ------------------------------
// SCROLL NAV
// ------------------------------

(function() {

const currenTimeMarker = {
  elem: document.querySelector('.current-time'),
  classHidden: 'current-time--hidden'
};

const ScrollNav = function (elem) {
  this.elem = elem;
  this.controls = elem.querySelectorAll('.scroll-nav__control');
  this.items = elem.querySelector('.scroll-nav__items');
  this.currentClass = `${elem.dataset.target}--current`;
  this.currentElem = document.querySelector(`.${this.currentClass}`);
  this.contentCount = 0;

  if (!this.currentElem) {
    return;
  }

  this.controls.forEach(control => {
    if (control.classList.contains('scroll-nav__control--left')) {
      control.dataset.direction = 'backward';
      this.leftControl = control;
    }
    else {
      control.dataset.direction = 'forward';
      this.rightControl = control;
    }

    this.checkNextTarget(control);

    control.addEventListener('click', () => {
      event.stopPropagation();
      this.switchContent(control);
    });
  });
};

ScrollNav.prototype.checkNextTarget = function (control) {

  if (this.currentElem) {
    let target = this.currentElem.nextElementSibling;

    if (control.dataset.direction == 'backward') {
      target = this.currentElem.previousElementSibling;
    }

    if (!target) {
      control.disabled = true;
    }
    else {
     control.disabled = false;
    }
  }
};

ScrollNav.prototype.switchContent = function (control) {
  if (this.currentElem) {
    let target = this.currentElem.nextElementSibling;

    if (control.dataset.direction == 'backward') {
      target = this.currentElem.previousElementSibling;
      this.contentCount--;
    }
    else {
      this.contentCount++;
    }

    this.items.style.transform = `translateX(${this.contentCount * -100}%)`;

    this.currentElem.classList.remove(this.currentClass);
    target.classList.add(this.currentClass);
    this.currentElem = target;

    this.checkNextTarget(this.rightControl);
    this.checkNextTarget(this.leftControl);
  }

  if (this.elem.dataset.target == 'shedule__day') {
    this.toggleCurrentTime();
    closePopups();
  }
};

ScrollNav.prototype.toggleCurrentTime = function () {
  if (this.contentCount > 0) {
    currenTimeMarker.elem.classList.add('current-time--hidden');
    return;
  }
  else {
    currenTimeMarker.elem.classList.remove('current-time--hidden');
  }
};

const scrollNavElems = document.querySelectorAll('.scroll-nav');

scrollNavElems.forEach(item => {
  const scrollNav = new ScrollNav(item);
});

}());

// ------------------------------
// SELECT USERS
// ------------------------------

(function() {

  const SelectRoom = function(elem) {

    this.elem = elem;
    const items = elem.querySelectorAll('.select-room__item');

    items.forEach(item => {
      const label = item.querySelector('.select-room__label');
      const input = item.querySelector('.select-room__input');
      const closeControl = item.querySelector('.close-control');

      label.addEventListener('click', () => {
        this.elem.classList.add('select-room--room-selected');
      })

      closeControl.addEventListener('click', () => {
        input.checked = false;
        this.elem.classList.remove('select-room--room-selected');
      })
    });
  };

  const selectRooms = document.querySelectorAll('.select-room');

  selectRooms.forEach(item => {
    const selectRoom = new SelectRoom(item);
  });

}());

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

// ------------------------------
// SET TIME
// ------------------------------

(function () {

  const currenTimeMarker = {
    elem: document.querySelector('.current-time'),
    classHidden: 'current-time--hidden'
  };

  const hoursItems = document.querySelectorAll('.hours-nav__item');
  hoursItems.slice = [].slice;

  function setTime() {
    const marker = document.querySelector('.current-time');

    if (!marker) {
      return;
    }

    const value = currenTimeMarker.elem.querySelector('.current-time__value');
    const now = new Date();
    const nowHhours = now.getHours();
    let nowMins = now.getMinutes();
    const hoursStart = 8;
    const hoursEnd = 23;
    const workHoursInDay = hoursEnd - hoursStart;
    const hourPosInDay = nowHhours - hoursStart;

    if (nowHhours < hoursStart || nowHhours > hoursEnd) {
      currenTimeMarker.elem.classList.add('current-time--hidden');
      return;
    }
    else {
      currenTimeMarker.elem.classList.remove('current-time--hidden');
    }

    const offset = (hourPosInDay + nowMins / 60) / workHoursInDay * 100;

    if (nowMins < 10) {
      nowMins = `0${nowMins}`;
    }
    value.innerHTML = `${nowHhours}:${nowMins}`;
    currenTimeMarker.elem.style.marginLeft = `${offset}%`;

    fadePastHours(hourPosInDay);
  }

  function fadePastHours(hourPosInDay) {
    const pastHours = hoursItems.slice(0, hourPosInDay);

    pastHours.forEach(item => {
      item.classList.add('hours-nav__item--past');
    });
  }

  setTime();

  setInterval(setTime, 1000 * 60);
}());

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

function throttle(func) {
  setTimeout(func, 100);
}
