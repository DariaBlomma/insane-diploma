const openPopups = (popupSelector, elemSelector, textSelector) => {
    let text;
    if (textSelector) {
        text = document.querySelector(textSelector);
    }
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
    const frames = document.querySelectorAll('.portfolio-slider__slide-frame');
    let img;
    document.addEventListener('click', event => {
        const target = event.target;
        frames.forEach((item, index) => {
          if (target === item) {
            img = item.querySelector('img').alt.slice(-1);
              // console.log(img);
          }
        })
        let condition;
        if (elemSelector === '.portfolio-slider__slide-frame' && window.innerWidth < 900) {
            const btnLeft = getYMatch(arrowLeft, event) && getXMatch(arrowLeft, event);
            const btnRight = getYMatch(arrowRight, event) && getXMatch(arrowRight, event);
            condition = target.closest(elemSelector) && !btnLeft && !btnRight;
        } else {
            condition = target.closest(elemSelector);
        }
        if (condition) {
            popup.style.visibility = 'visible';
            if (text) {
                text.style.display = 'block';
            }


        } else if (target === closeBtn) {
            popup.style.visibility = 'hidden';
            if (text) {
                text.style.display = 'none';
            }
        } else {
            if (window.innerWidth < 575 && target.classList.contains('close')) {
                popup.style.visibility = 'hidden';
            }

        }
    });
};
export default openPopups;
