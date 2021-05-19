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
                popup.classList.add('down');
            } else {
                popup.style.bottom = '90px';
                popup.classList.remove('down');
            }

            if (action === 'toggle') {
                popup.classList.toggle('formula-popup-opened');
                if (items) {
                    item.classList.toggle('opened');
                    items[slideNumber].classList.toggle('opened');
                    slides[slideNumber].classList.toggle('slide-opened');
                }
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
export default openPopupsHover;
