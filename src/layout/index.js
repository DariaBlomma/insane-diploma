// import './index.html';
// import './css/style.css';

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

const validation = () => {
    const phones = document.querySelectorAll('[name="phone"]');
    document.addEventListener('input', event => {
        const target = event.target;
        phones.forEach(item => {
            if (target === item) {
                item.value = item.value.replace(/\D/g, '');
            }
        })
    });
    maskPhone('[name="phone"]');
};
validation();

const openPopups = (popupSelector, elemSelector) => {
    if (elemSelector === '.consult') {
        const btns = document.querySelectorAll('.button');
        btns.forEach(item => {
            if (item.textContent === 'Проконсультироваться') {
                item.classList.add('consult');
            }
        })
    }
    const popup = document.querySelector(popupSelector);
    const closeBtn = popup.querySelector('.close');
    document.addEventListener('click', event => {
        const target = event.target;
        if (target.closest(elemSelector)) {
            popup.style.visibility = 'visible';
        } else if (target === closeBtn) {
            popup.style.visibility = 'hidden';
        }
    });
};
openPopups('.popup-repair-types', '.link-list');
openPopups('.popup-privacy', '.checkbox__descr span');
openPopups('.popup-transparency', '.transparency-item__img');
openPopups('.popup-consultation', '.consult');
openPopups('.popup-portfolio', '.portfolio-slider__slide-frame');

const sendForm = () => {
    const doAjax = formId => {
        const form = document.getElementById(formId);
        const checkbox = form.querySelector('.checkbox__input');
        const checkboxLabel = form.querySelector('.checkbox__label');
        const errorPopup = document.querySelector('.popup-error');
        const successPopup = document.querySelector('.popup-thank');
        const loader = document.createElement('div');
        form.append(loader);
        const inputs = form.querySelectorAll('input');
        document.addEventListener('click', event => {
            const target = event.target;
            const closeThank = successPopup.querySelector('.close');
            const closeError = errorPopup.querySelector('.close');
            if (target === closeThank || target === closeError) {
                successPopup.style.visibility = 'hidden';
                errorPopup.style.visibility = 'hidden';
            }
        });
        const removeMessage = () => {
            checkboxLabel.style.borderColor = '#322823';
            successPopup.style.visibility = 'hidden';
            errorPopup.style.visibility = 'hidden';
        };
        const showSuccess = () => {
            loader.className = '';
            successPopup.style.visibility = 'visible';
            inputs.forEach(item => {
                item.value = '';
            });
            checkbox.checked = false;
            setTimeout(removeMessage, 5000);
        };
        const showError = error => {
            loader.className = '';
            errorPopup.style.visibility = 'visible';
            console.error(error);
            setTimeout(removeMessage, 5000);
        };
        form.addEventListener('submit', event => {
            event.preventDefault();
            if (checkbox.checked) {
                checkboxLabel.style.borderColor = '#322823';
                loader.className = 'loader';
                const formData = new FormData(form);
                const body = {};
                formData.forEach((val, key) => {
                    body[key] = val;
                });

                const postData = body =>  fetch('./server.php', {
                    method: 'POST',
                    header: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                });
                postData(body)
                    .then(response => {
                        if (response.status !== 200) {
                            throw new Error('network status is not 200');
                        }
                        showSuccess();
                    })
                    .catch(showError);
            } else {
                checkboxLabel.style.borderColor = 'red';
                setTimeout(() => {
                    checkboxLabel.style.borderColor = '#322823';
                }, 3000);
            }
        });
    };

    doAjax('feedback1');
    doAjax('feedback2');
    doAjax('feedback3');
    doAjax('feedback4');
    doAjax('feedback5');
    doAjax('feedback6');
};

sendForm();
