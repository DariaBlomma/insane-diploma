'use strict';
const openPhoneNumber = () => {
  const accordNumber = document.querySelector('.header-contacts__phone-number-accord a');
  document.addEventListener('click', event => {
    const target = event.target;
    if (target.closest('.header-contacts__arrow')) {
      accordNumber.style.opacity = 1;
      accordNumber.style.marginTop = '30px';
      accordNumber.classList.add('opened');
    } else if (accordNumber.classList.contains('opened')) {
      accordNumber.classList.remove('opened');
      accordNumber.style.opacity = 0;
      accordNumber.style.marginTop = '';
    }
  })
};

openPhoneNumber();

const toggleMenu = () => {
  const menuIcon = document.querySelector('.menu__icon'),
    popupMenu = document.querySelector('.popup-menu'),
    poupDialogMenu = document.querySelector('.popup-dialog-menu');
  window.addEventListener('resize', () => {
    if (window.innerWidth < 576) {
      poupDialogMenu.style.webkitTransform = 'translate3d(0, -841px, 0)';
      poupDialogMenu.style.transform = 'translate3d(0, -841px, 0)';
    } else {
      poupDialogMenu.style.webkitTransform = 'translate3d(645px, 0, 0)';
      poupDialogMenu.style.transform = 'translate3d(645px, 0, 0)';
    }
  })

  document.addEventListener('click', event => {
    const target = event.target;
    if (target.closest('.menu__icon')) {
      menuIcon.classList.add('opened');
      popupMenu.style.visibility = 'visible';
      poupDialogMenu.style.webkitTransform = 'translate3d(0, 0, 0)';
      poupDialogMenu.style.transform = 'translate3d(0, 0, 0)';
    } else if (menuIcon.classList.contains('opened') && (target.closest('.close-menu') || target === popupMenu || target.matches('.menu-link'))) {
      menuIcon.classList.remove('opened');
      popupMenu.style.visibility = 'hidden';

      if (window.innerWidth < 576) {
        poupDialogMenu.style.webkitTransform = 'translate3d(0, -841px, 0)';
        poupDialogMenu.style.transform = 'translate3d(0, -841px, 0)';
      } else {
        poupDialogMenu.style.webkitTransform = 'translate3d(645px, 0, 0)';
        poupDialogMenu.style.transform = 'translate3d(645px, 0, 0)';
      }
    }
  })
};

toggleMenu();
