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
export default toggleMenu;
