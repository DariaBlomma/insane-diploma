class Slider3 {
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
        this.click = 0;
        this.originalItemOrder = document.querySelectorAll('.portfolio-slider.mobile-hide .portfolio-slider__slide');
    }

    init() {
        //console.log(this.wrapToClickSelector);
        if (this.wrapToClickSelector === '.formula') {
            const formulaSlider = document.querySelector('.formula-slider');
            formulaSlider.style.display = 'flex';
            formulaSlider.style.marginTop = '0';
            this.arrowLeft.style.top = '66%';
            this.arrowRight.style.top = '66%';
            const clone = this.slides[this.slides.length - 1].cloneNode(true);
            formulaSlider.prepend(clone);
            this.slides[this.slides.length - 1].remove();
            this.slides = document.querySelectorAll('.formula-slider__slide');
        }


        if (this.wrapToClickSelector === '.popup-portfolio' &&
        !this.wrapToClick.style.visibility !== 'visible') {
        } else {
            document.addEventListener('click', () => {
                const wrap = document.querySelector('.popup-portfolio');
                if (wrap.style.visibility === 'visible') {
                    // const shortPopup = document.querySelector('.popup-dialog-portfolio');
                    // if (window.innerWIdth < 575) {
                    //     shortPopup.style.height = '260px';
                    // } else if (window.innerWIdth > 900) {
                    //     shortPopup.style.height = '565px'; // было 857
                    // }
                    this.main();
                }
            });
        }

        this.main();
    }

    getYMatch(elem, event) {
        const top = elem.getBoundingClientRect().top;
        return event.y === top || (event.y > top && event.y < top + elem.clientHeight);
    }

    getXMatch (elem, event) {
        const left = elem.getBoundingClientRect().left;
        return event.x === left || (event.x > left && event.x < left + elem.clientWidth);
    }

    main () {

        let items = document.querySelectorAll('.portfolio-slider.mobile-hide .portfolio-slider__slide')
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
        const showSlidesOnPage = 3

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
        for (let i = 0; i < this.originalItemOrder.length; ++i) {
            if (slide === 3 && i === 4) {
                document.getElementById('portfolio-arrow_right').style.display = 'none';
            } else if (this.click > 0 && slide === 0 && i === 4) {
                document.getElementById('portfolio-arrow_left').style.display = 'none';
            } else {
                if (i >= slide && i < slide + showSlidesOnPage)
                    continue
                container.append(this.originalItemOrder[i]);
            }
        }

        this.currentSlide = slide
    }
}
