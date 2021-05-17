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

    const portfolioWrap = document.querySelector('.portfolio-slider-wrap');
    const hovers = portfolioWrap.querySelectorAll('.item-hover');
    const getYMatch = (elem, event) => {
        const top = elem.getBoundingClientRect().top;
        return event.y === top || (event.y > top && event.y < top + elem.clientHeight);
    };
    const getXMatch = (elem, event) => {
        const left = elem.getBoundingClientRect().left;
        return event.x === left || (event.x > left && event.x < left + elem.clientWidth);
    };

    const arrowLeft = document.querySelector('.slider-arrow-tablet-mobile_left svg');
    const arrowRight = document.querySelector('.slider-arrow-tablet-mobile_right svg');

    if (elemSelector === '.portfolio-slider__slide-frame' && window.innerWidth < 900) {
        hovers.forEach(item => {
            item.style.visibility = 'hidden';
            item.style.opacity = 0;
        });
    }
    const popup = document.querySelector(popupSelector);
    const closeBtn = popup.querySelector('.close');
    document.addEventListener('click', event => {
        const target = event.target;
        let condition;
        if (elemSelector === '.portfolio-slider__slide-frame' && window.innerWidth < 900) {
            const btnLeft = getYMatch(arrowLeft, event) && getXMatch(arrowLeft, event);
            const btnRight = getYMatch(arrowRight, event) && getXMatch(arrowRight, event);
            condition = target.closest(elemSelector) && !btnLeft && !btnRight;
        } else {
            condition = target.closest(elemSelector);
        }
        if (condition) {
            const hovers = document.querySelectorAll('.portfolio-slider-wrap .item-hover');
            hovers.forEach(item => {
                item.style.visibility = 'visible';
                item.style.opacity = 1;
            });
            popup.style.visibility = 'visible';
        } else if (target === closeBtn) {
            hovers.forEach(item => {
                item.style.visibility = 'hidden';
                item.style.opacity = 0;
            });
            popup.style.visibility = 'hidden';
        } else {
            popup.style.visibility = 'hidden';
        }
    });
};
openPopups('.popup-repair-types', '.link-list');
openPopups('.popup-privacy', '.checkbox__descr span');
openPopups('.popup-transparency', '.transparency-item__img');
openPopups('.popup-consultation', '.consult');
openPopups('.popup-portfolio', '.portfolio-slider__slide-frame');




const openPopupsHover = () => {
    const toggleBlock = (target, action, elem) => {
        let item = target.closest(elem);
        let items;
        let popup;
        let slides;
        if (item && !target.closest('.formula-item-popup')) {
            const top = target.getBoundingClientRect().top;
            const text = target.textContent.trim().match(/\d+/g);
            const slideNumber = String(text).slice(-1) - 1;
            if (elem === '.formula-slider__slide') {
                slides = document.querySelectorAll('.formula-slider__slide');
                items = document.querySelectorAll(`${elem} .formula-item__icon`);
                popup = document.querySelector(`${elem} .formula-item-popup-${text}`);
            } else {
                popup = document.querySelector(`.formula-item-popup-${text}`);
            }

            if (top < popup.clientHeight) {
                popup.style.bottom = `-${popup.clientHeight + 10}px`;
                // подумать как применить стили к псевдоэлементу before
                popup.classList.toggle('formula-popup-opened.down');
            } else {
                popup.style.bottom = '90px';
                popup.classList.remove('formula-popup-opened.down');
            }

            if (action === 'toggle') {
                popup.classList.toggle('formula-popup-opened');
                item.classList.toggle('opened');
                items[slideNumber].classList.toggle('opened');
                slides[slideNumber].classList.toggle('slide-opened');
                console.log('slides[slideNumber]: ', slides[slideNumber]);
            }
            if (action === 'remove') {
                popup.classList.remove('formula-popup-opened');
                item.classList.remove('opened');
            }
        }
    };

    if (window.innerWidth > 1200) {
        document.addEventListener('mouseover', event => {
            const target = event.target;
            toggleBlock(target, 'toggle', '.formula-item__icon');
        });
        document.addEventListener('mouseout', event => {
            const target = event.target;
            toggleBlock(target, 'remove', '.formula-item__icon');
        });
    } else {
        document.addEventListener('click', event => {
            const target = event.target;
            toggleBlock(target, 'toggle', '.formula-slider__slide');
        });
    }

};

openPopupsHover();

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

const formulaSlider = () => {
    if (window.innerWidth < 1200) {
        const slides = document.querySelectorAll('.formula-slider__slide'),
            arrowLeft = document.querySelector('.slider-arrow_left-formula'),
            arrowRight = document.querySelector('.slider-arrow_right-formula'),
            formula = document.querySelector('.formula'),
            formulaSlider = document.querySelector('.formula-slider');
        formulaSlider.style.display = 'flex';
        formulaSlider.style.marginTop = '0';
        arrowLeft.style.top = '66%';
        arrowRight.style.top = '66%';

        let currentSlide = 0;

        const initialState = () => {
            slides[slides.length - 1].style.order = -1;
            slides[slides.length - 1].classList.remove('hidden');
            slides[0].classList.add('active');
            slides[0].style.order = 0;
        };

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            slides[slides.length - 1].style.order = slides.length - 1;

            slides[slides.length - 1].classList.add('hidden');
            elem[index].classList.add(strClass);

            if ( elem[index + 1]) {
                elem[index + 1].classList.remove('hidden');
            }

            if (elem[index - 2]) {
                elem[index - 2].classList.add('hidden');
            }
        };

        slides.forEach((item, index) => {
            if (index > 1) {
                item.classList.add('hidden');
            }
        });

        if (currentSlide === 0) {
            initialState();
        }

        formula.addEventListener('click', event => {
            event.preventDefault();
            const target = event.target;

            if (!target.closest('.slider-arrow_left-formula, .slider-arrow_right-formula')) {
                return;
            }

            prevSlide(slides, currentSlide, 'active');

            if (target.closest('.slider-arrow_right-formula')) {
                currentSlide++;
            } else if (target.closest('.slider-arrow_left-formula')) {
                currentSlide--;
            }

            if (currentSlide === slides.length - 1) {
                slides[0].style.order = slides.length;
                slides[0].classList.remove('hidden');
                slides[slides.length - 3].classList.add('hidden')
            }

            console.log('currentSlide: ', currentSlide);
            if (currentSlide >= slides.length) {
                //initialState();
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slides.length - 1;
                slides[0].style.order = slides.length - 1;
                slides[slides.length - 1].style.order = 0;
                slides[slides.length - 1].classList.add('hidden');
            }
            nextSlide(slides, currentSlide, 'active');
        });
    };
};

// formulaSlider();

const repairSlider = () => {
    const repairTypes = document.getElementById('repair-types');
    const navListRepair = document.querySelector('.nav-list-repair');
    const counterCurrent = document.querySelector('.slider-counter-content__current');
    const counterTotal = document.querySelector('.slider-counter-content__total');
    const repairTypesSlides = [...document.querySelector('.repair-types-slider').children];
    const slides = document.querySelectorAll('.repair-types-slider__slide');

    counterTotal.textContent = repairTypesSlides.length;
    let currentSlide = 0;

    const prevSlide = (elem, index, strClass) => {
        elem[index].classList.add(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
        elem[index].classList.remove(strClass);
    };

    repairTypesSlides.forEach(elem => {
        elem.classList.add('repair-hidden');
    });

    repairTypesSlides[0].classList.remove('repair-hidden');

    repairTypes.addEventListener('click', event => {
        event.preventDefault();
        const target = event.target;

        if (document.querySelector('#nav-arrow-repair-right_base')) {
            if (target.closest('#nav-arrow-repair-right_base')) {
                const btn = navListRepair.children[0];
                const clone = btn.cloneNode(true);
                navListRepair.append(clone);
                btn.remove();
            } else if (target.closest('#nav-arrow-repair-left_base')) {
                const btn = navListRepair.children[navListRepair.children.length - 1];
                const clone = btn.cloneNode(true);
                navListRepair.prepend(clone);
                btn.remove();
            }
        }

        const closestBtn = target.closest('.repair-types-nav__item');
        if (closestBtn) {
            const navItems = document.querySelectorAll('.repair-types-nav__item');
            navItems.forEach(item => {
                item.classList.remove('active');
            });
            target.classList.add('active');
            const type = target.dataset.repair;
            slides.forEach(item => {
                item.classList.remove('repair-hidden');
                const alt = item.querySelector('img').alt;
                if (alt !== type) {
                    item.classList.add('repair-hidden');
                }
            });
        };

        if (!target.closest('#repair-types-arrow_left, #repair-types-arrow_right')) {
            return;
        }


        prevSlide(repairTypesSlides, currentSlide, 'repair-hidden');

        if (target.closest('#repair-types-arrow_right')) {
            currentSlide++;
        } else if (target.closest('#repair-types-arrow_left')) {
            currentSlide--;
        }

        if (currentSlide >= repairTypesSlides.length) {
            currentSlide = 0;
        }

        if (currentSlide < 0) {
            currentSlide = repairTypesSlides.length - 1;
        }

        counterCurrent.textContent = currentSlide + 1;
        nextSlide(repairTypesSlides, currentSlide, 'repair-hidden');
    });
};
repairSlider();


const portfolioMainSlider = () => {
  const sliderPortfolioMobile = new Slider({
    slides: '.portfolio-slider-mobile .portfolio-slider__slide-frame',
    wrapToClick: '.portfolio-slider-wrap',
    arrowRight: '.slider-arrow-tablet-mobile_right svg',
    arrowLeft: '.slider-arrow-tablet-mobile_left svg',
    classToChange: 'portfolio-hidden',
    classAction: 'remove',
    breakpoint: 575,
    counterCurrent: '.portfolio .slider-counter-content__current',
    counterTotal: '.portfolio .slider-counter-content__total',
    arrowProblem: true
});
sliderPortfolioMobile.init();


const sliderPortfolioTablet = new Slider({
  slides: '.portfolio-slider.mobile-hide .portfolio-slider__slide',
  wrapToClick: '.portfolio-slider-wrap',
  arrowRight: '#portfolio-arrow_right',
  slidesOnPage: 2,
  classToChange: 'portfolio-hidden',
  classAction: 'remove',
  breakpoint: 1024,
  breakpoint2: 575,
  infinity: false
});
sliderPortfolioTablet.init();

const sliderPortfolioDesctop = new Slider({
  slides: '.portfolio-slider.mobile-hide .portfolio-slider__slide',
  wrapToClick: '.portfolio-slider-wrap',
  arrowRight: '#portfolio-arrow_right',
  slidesOnPage: 3,
  classToChange: 'portfolio-hidden',
  classAction: 'remove',
  breakpoint2: 1024,
  infinity: false
});
sliderPortfolioDesctop.init();
};
portfolioMainSlider();

const formulaTabletSlider = new Slider({
  slides: '.formula-slider__slide',
  wrapToClick: '.formula',
  arrowRight: '.slider-arrow_right-formula',
  arrowLeft: '.slider-arrow_left-formula',
  slidesOnPage: 3,
  classToChange: 'hidden',
  classAction: 'remove',
  breakpoint: 1200,
  centralClass: 'active'
});
formulaTabletSlider.init();
