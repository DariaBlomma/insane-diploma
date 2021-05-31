export default class BigSlider {
    constructor({ slides, container, arrowRight, arrowLeft, currentSlide = 0,
        slidesOnPage = 1, classToChange, classAction, breakpoint = 5000,
        breakpoint2 = 0, counterCurrent, counterTotal, centralClass, click = 0, infinity = true, name }) {
        this.originalItemsOrder = document.querySelectorAll(slides);
        this.slidesSelector = slides;
        this.container = document.querySelector(container);
        this.containerSelector = container;
        this.arrowRight = document.querySelector(arrowRight);
        this.arrowRightSelector = arrowRight;
        this.arrowLeft = document.querySelector(arrowLeft);
        this.arrowLeftSelector = arrowLeft;
        this.currentSlide = currentSlide;
        console.log('this.currentSlide: ', this.currentSlide);
        this.slidesOnPage = slidesOnPage;
        this.classToChange = classToChange;
        this.classAction = classAction;
        this.breakpoint = breakpoint;
        this.breakpoint2 = breakpoint2;
        this.counterCurrent = document.querySelector(counterCurrent);
        this.counterTotal = document.querySelector(counterTotal);
        this.centralClass = centralClass;
        this.click = click;
        this.infinity = infinity;
        this.name = name;
    }

    init() {
        if (this.name === 'formula') {
            const formulaSlider = document.querySelector('.formula-slider');
            formulaSlider.style.display = 'flex';
            formulaSlider.style.marginTop = '0';
            this.arrowLeft.style.top = '66%';
            this.arrowRight.style.top = '66%';
            const clone = this.originalItemsOrder[this.originalItemsOrder.length - 1].cloneNode(true);
            formulaSlider.prepend(clone);
            this.originalItemsOrder[this.originalItemsOrder.length - 1].remove();
            this.originalItemsOrder = document.querySelectorAll('.formula-slider__slide');
        }

        if (this.name === 'portfolio-problem-slider') {
            this.arrowRight.style.top = '300px';
            this.arrowLeft.style.top = '300px';
            const sliderCounter = document.querySelector('.popup-dialog.popup-dialog-portfolio .slider-counter');
            sliderCounter.style.top = '550px';
            // document.addEventListener('click', event => {
            //   const target = event.target;
            //   if (target.matches('.portfolio-slider__slide-frame')) {
            //     const img = target.querySelector('img').alt.slice(-1);
            //     this.currentSlide = Number(img);
            //     //console.log(' this.currentSlide: ',  this.currentSlide);
            //   }
            // })
        }

        this.main();
    }

    main () {
      console.log(' this.currentSlide: ',  this.currentSlide);
        if (this.counterCurrent) {
            this.counterTotal.textContent = this.originalItemsOrder.length;
        }
        const items = document.querySelectorAll(this.slidesSelector);
        this.arrowLeft.addEventListener('click',
            event => {
                if (!this.infinity) {
                    this.click += 1;
                }
                this.displaySlide((items.length + this.currentSlide - 1) % items.length)
            });
        this.arrowRight.addEventListener('click',
            event => this.displaySlide((this.currentSlide + 1) % items.length))
        this.displaySlide(this.currentSlide)
    }

    displaySlide(slide) {

        const container = document.querySelector(this.containerSelector);
        const items = document.querySelectorAll(this.slidesSelector);

        const availableSlides = []
        for (let i = 0; i < items.length; ++i) {
            availableSlides.push(i);
        };

        for (let i = 0; i < items.length; ++i) {
            availableSlides.push(i);
        };

        const toDisplay = []
        for (let i = slide; i < slide + this.slidesOnPage; ++i) {
            toDisplay.push(availableSlides[i]);
        };

        items.forEach(item => {
            item.classList.add(this.classToChange);
            item.remove();
        });
        toDisplay.forEach((value, index) => {
            const item = this.originalItemsOrder[value];

            if (this.name === 'formula') {
                const popup = item.querySelector('.formula-item-popup');
                popup.classList.remove('slide-opened');
                popup.classList.remove('formula-popup-opened');
                item.classList.remove('active');
                item.classList.remove('opened');
            }
            item.classList.remove(this.classToChange);
            container.append(item);
            if (index ===  1 && this.name === 'formula') {
                const popup = item.querySelector('.formula-item-popup');
                popup.classList.add('slide-opened');
                popup.classList.add('formula-popup-opened');
                item.classList.add('active');
                item.classList.add('opened');
            }

        });
        for (let i = 0; i < this.originalItemsOrder.length; ++i) {
            if (this.counterCurrent) {
                this.counterCurrent.textContent = slide + 1;
            }
            if (!this.infinity) {
                if (slide === 3 && i === 4) {
                    this.arrowRight.style.display = 'none';
                    this.arrowLeft.style.display = '';
                } else if (this.click > 0 && slide === 0 && i === 4) {
                    this.arrowLeft.style.display = 'none';
                    this.arrowRight.style.display = '';
                }
            }
            if (i >= slide && i < slide + this.slidesOnPage)
                continue
            container.append(this.originalItemsOrder[i]);
        }

        this.currentSlide = slide;
    }
}
