class Slider3 {
    constructor({ slides, wrapToClick, arrowRight, arrowLeft, currentSlide = 0,
        slidesOnPage = 1, classToChange, classAction, breakpoint = 5000,
        breakpoint2 = 0, counterCurrent, counterTotal, centralClass, arrowProblem = false,
        infinity = true }) {
        this.slides = document.querySelectorAll(slides);
        this.wrapToClick = document.querySelector(wrapToClick);
        this.wrapToClickSelector = wrapToClick;
        this.arrowRight = document.querySelector(arrowRight);
        this.arrowRightSelector = arrowRight;
        this.arrowLeft = document.querySelector(arrowLeft);
        this.arrowLeftSelector = arrowLeft;
        this.currentSlide = currentSlide;
        this.slidesOnPage = slidesOnPage;
        this.classToChange = classToChange;
        this.classAction = classAction;
        this.breakpoint = breakpoint;
        this.breakpoint2 = breakpoint2;
        this.counterCurrent = document.querySelector(counterCurrent);
        this.counterTotal = document.querySelector(counterTotal);
        this.centralClass = centralClass;
        this.arrowProblem = arrowProblem;
        this.infinity = infinity;
        this.click = 0;
        this.originalItemOrder = document.querySelectorAll('.portfolio-slider.mobile-hide .portfolio-slider__slide');
    }

    init() {
        this.main();
    }

    main () {
      // portfolio-slider-mobile tablet-hide desktop-hide
      let items = document.querySelectorAll('.portfolio-slider.mobile-hide .portfolio-slider__slide');
      document.getElementById('portfolio-arrow_left').addEventListener('click',
            event => {
              this.click += 1;
              this.displaySlide((items.length + this.currentSlide - 1) % items.length)
            })
        document.getElementById('portfolio-arrow_right').addEventListener('click',
            event => this.displaySlide((this.currentSlide + 1) % items.length))
        this.displaySlide(this.currentSlide)
    }

    displaySlide(slide) {
        let container = document.querySelector('.portfolio-slider.mobile-hide');
        let items = document.querySelectorAll('.portfolio-slider.mobile-hide .portfolio-slider__slide');
        const showSlidesOnPage = this.slidesOnPage;

        let availableSlides = []
        for (let i = 0; i < items.length; ++i)
            availableSlides.push(i)
        for (let i = 0; i < items.length; ++i)
            availableSlides.push(i)

        let toDisplay = []
        for (let i = slide; i < slide + showSlidesOnPage; ++i)
            toDisplay.push(availableSlides[i])

        items.forEach(item => {
            item.classList.add(this.classToChange)
            item.remove()
        })
        toDisplay.forEach(value => {
            let item = this.originalItemOrder[value]
            item.classList.remove(this.classToChange);
            container.append(item);
        })
        const arrowRight = document.getElementById('portfolio-arrow_right');
        const arrowLeft = document.getElementById('portfolio-arrow_left');
        for (let i = 0; i < this.originalItemOrder.length; ++i) {
            if (slide === 3 && i === 4) {
                arrowRight.style.display = 'none';
                arrowLeft.style.display = '';
            } else if (this.click > 0 && slide === 0 && i === 4) {
                arrowLeft.style.display = 'none';
                arrowRight.style.display = '';
            } else {
                if (i >= slide && i < slide + showSlidesOnPage)
                    continue
                container.append(this.originalItemOrder[i]);
            }
        }

        this.currentSlide = slide
    }
}
