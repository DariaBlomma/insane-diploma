'use strict';
const openPhoneNumber = () => {
  const arrow = document.querySelector('.header-contacts__arrow'),
    accordNumber = document.querySelector('.header-contacts__phone-number-accord a');
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
