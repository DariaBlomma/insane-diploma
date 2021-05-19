const openPhoneNumber = () => {
    const accordNumber = document.querySelector('.header-contacts__phone-number-accord a');
    const arrow = document.querySelector('.header-contacts__arrow');
    document.addEventListener('click', event => {
        const target = event.target;
        if (target.closest('.header-contacts__arrow')) {
            accordNumber.classList.toggle('opened');
            arrow.classList.toggle('opened');
        } else if (accordNumber.classList.contains('opened')) {
            // закрываем при клике вне стрелки
            accordNumber.classList.remove('opened');
            arrow.classList.remove('opened');
        }
    });
};

export default openPhoneNumber;
