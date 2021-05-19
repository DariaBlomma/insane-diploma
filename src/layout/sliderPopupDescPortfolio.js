class SliderPopupDescPortfolio {
    constructor({ slides, wrapToClick, arrowRight, arrowLeft, currentSlide = 0,
        slidesOnPage = 1, classToChange, classAction, breakpoint = 5000,
        breakpoint2 = 0, counterCurrent, counterTotal, centralClass, arrowProblem = false, infinity = true }) {
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
        this.originalItemOrder = document.querySelectorAll('.popup-portfolio-slider__slide');
    }

    init() {
        this.main();
    }

    main () {
      let leftArrow = document.querySelector('.popup-dialog.popup-dialog-portfolio #popup_portfolio_left');
      leftArrow.style.top = '300px';
      let rightArrow = document.querySelector('.popup-dialog.popup-dialog-portfolio #popup_portfolio_right');
      rightArrow.style.top = '300px';
      const sliderCounter = document.querySelector('.popup-dialog.popup-dialog-portfolio .slider-counter');
      sliderCounter.style.top = '550px';

      const counterTotal = sliderCounter.querySelector('.slider-counter-content__total');
      counterTotal.textContent = this.originalItemOrder.length;



       let items = document.querySelectorAll('.popup-portfolio-slider__slide')
        leftArrow.addEventListener('click',
            event => this.displaySlide((items.length + this.currentSlide - 1) % items.length));
        rightArrow.addEventListener('click',
            event => this.displaySlide((this.currentSlide + 1) % items.length))
        this.displaySlide(this.currentSlide)
    }

  displaySlide(slide) {
    const sliderCounter = document.querySelector('.popup-dialog.popup-dialog-portfolio .slider-counter');
    const counterCurrent = sliderCounter.querySelector('.slider-counter-content__current');
        let container = document.querySelector('.popup-portfolio-slider-wrap');
        let items = document.querySelectorAll('.popup-portfolio-slider__slide')
        const showSlidesOnPage = 1

        let availableSlides = []
        for (let i = 0; i < items.length; ++i)
            availableSlides.push(i)
        for (let i = 0; i < items.length; ++i)
            availableSlides.push(i)

        let toDisplay = []
        for (let i = slide; i < slide + showSlidesOnPage; ++i)
            toDisplay.push(availableSlides[i])

        items.forEach(item => {
            item.classList.add('hidden')
            item.remove()
        })
        toDisplay.forEach(value => {
            let item = this.originalItemOrder[value];
            item.classList.remove('hidden')
            container.append(item)
        })
        for (let i = 0; i < this.originalItemOrder.length; ++i) {
          counterCurrent.textContent = slide + 1;
            if (i >= slide && i < slide + showSlidesOnPage)
                continue
            container.append(this.originalItemOrder[i])
        }

        this.currentSlide = slide;
    }
}
