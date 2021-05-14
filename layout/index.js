'use strict';
const openPhoneNumber = () => {
    const accordNumber = document.querySelector('.header-contacts__phone-number-accord a');
    document.addEventListener('click', event => {
        const target = event.target;
        if (target.closest('.header-contacts__arrow')) {
            accordNumber.classList.toggle('opened');
        } else if (accordNumber.classList.contains('opened')) {
          // закрываем при клике вне стрелки
            accordNumber.classList.remove('opened');
        }
    });
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
    });

    document.addEventListener('click', event => {
        const target = event.target;
        if (target.closest('.menu__icon')) {
            menuIcon.classList.add('opened');
            popupMenu.style.visibility = 'visible';
            poupDialogMenu.style.webkitTransform = 'translate3d(0, 0, 0)';
            poupDialogMenu.style.transform = 'translate3d(0, 0, 0)';
        } else if (menuIcon.classList.contains('opened') &&
    (target.closest('.close-menu') || target === popupMenu || target.matches('.menu-link'))) {
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
    });
};

toggleMenu();

const scroll = () => {
  // проверка, что это не заглушка, а реальный якорь
    const reg = /#(?=\D+)/g;
    const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
        animationTime = 500,
        framesCount = 20;
    document.addEventListener('click', e => {
        const target = e.target;
        anchors.forEach(item => {
            if (item.href.match(reg) !== null && target === item) {
                e.preventDefault();
                const coordY = document.querySelector(item.getAttribute('href'))
                    .getBoundingClientRect().top + window.pageYOffset;

                if (coordY === 0) {
                    const scrollToTop = window.setInterval(() => {
                        const pos = window.pageYOffset;
                        if (pos > 0) {
                            window.scrollTo(0, pos - 300);
                        } else {
                            window.clearInterval(scrollToTop);
                        }
                    }, 16);
                } else {
                    const scroller = setInterval(() => {
                        const scrollBy = coordY / framesCount;

                        if (scrollBy > window.pageYOffset - coordY &&
                            window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
                            window.scrollBy(0, scrollBy);
                        } else {
                            window.scrollTo(0, coordY);
                            clearInterval(scroller);
                        }
                    }, animationTime / framesCount);
                }
            }
        });
    });
};

scroll();

const toggleFullList = () => {
    const popupRepairTypes = document.querySelector('.popup-repair-types');
    document.addEventListener('click', event => {
        const target = event.target;
        if (target.closest('.link-list.link-list-repair') || target.closest('.menu-link.no-overflow')) {
            popupRepairTypes.style.visibility = 'visible';
        } else if (target.closest('.popup-repair-types .close')) {
            popupRepairTypes.style.visibility = 'hidden';
        }
    })
};
toggleFullList();
