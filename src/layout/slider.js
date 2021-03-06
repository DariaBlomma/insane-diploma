class Slider {
    constructor({ slides, wrapToClick, arrowRight, arrowLeft, currentSlide = 0,
        slidesOnPage = 1, classToChange, classAction, breakpoint = 5000,
        breakpoint2 = 0, counterCurrent, counterTotal, centralClass, arrowProblem = false,
        infinity = true, alt, id, name }) {
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
        this.alt = alt;
        this.id = id;
        this.name = name;
    }

    init() {
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
                    this.main();
                }
            });
        }
        if (this.breakpoint || this.breakpoint2) {
            window.addEventListener('resize', () => {
                this.main();
            });
        } else {
            this.main();
        }

        this.main();
    }

    getYMatch(elem, event) {
        const top = elem.getBoundingClientRect().top;
        return event.y === top || (event.y > top && event.y < top + elem.clientHeight);
    }

    getXMatch (elem, event) {
        const  left = elem.getBoundingClientRect().left;
        return event.x === left || (event.x > left && event.x < left + elem.clientWidth);
    }

    main () {
        let condition;
        let btnLeft,
            btnRight;
        let currentSlide = this.currentSlide;


        if (this.centralClass) {
            this.slides[1].classList.add(this.centralClass);
        }
        if (window.innerWidth < this.breakpoint && window.innerWidth > this.breakpoint2) {
            if (this.classAction === 'remove') {
                this.slides.forEach((item, index) => {
                    if (index > this.slidesOnPage - 1) {
                        item.classList.add(this.classToChange);
                    }
                });
            }

            if (this.alt && this.id) {
                this.slides.forEach(item => {
                    item.classList.add('repair-hidden');
                    const alt = item.querySelector('img').alt;
                    if (alt === this.alt) {
                        item.classList.remove('repair-hidden');
                        item.classList.add(`${this.id}`);
                        this.slides = document.querySelectorAll(`.${this.id}`);
                        this.counterTotal.textContent = this.slides.length;
                    } else {
                        item.classList.add('repair-hidden');
                    }
                });
            }
            if (this.counterTotal) {
                this.counterTotal.textContent = this.slides.length;
                this.counterCurrent.textContent = 1;
            }

            if (this.slidesOnPage > 1) {
                this.slides.forEach((item, index) => {
                    item.classList.remove(this.classToChange);
                    if (index > this.slidesOnPage - 1) {
                        item.classList.add(this.classToChange);
                    }
                });
                currentSlide = this.slidesOnPage - 1;
            }
            this.wrapToClick.addEventListener('click', event => {
                const target = event.target;
                if (this.arrowProblem) {
                    btnLeft = this.getYMatch(this.arrowLeft, event) && this.getXMatch(this.arrowLeft, event);
                    btnRight = this.getYMatch(this.arrowRight, event) && this.getXMatch(this.arrowRight, event);
                    condition = !btnLeft && !btnRight;
                } else if (!this.arrowLeft) {
                    condition = !target.closest(this.arrowRightSelector);
                } else {
                    condition = !target.closest(this.arrowRightSelector) &&  !target.closest(this.arrowLeftSelector);
                }

                if (condition) {
                    return;
                }

                this.prevSlide(this.slides, currentSlide, this.classToChange, this.slidesOnPage, this.classAction);

                if (this.arrowRight && this.arrowLeft) {
                    if (this.arrowProblem) {
                        if (btnLeft) {
                            currentSlide--;
                        } else if (btnRight) {
                            currentSlide++;
                        }
                    } else {
                        if (target.closest(this.arrowLeftSelector)) {
                            currentSlide--;
                        } else if (target.closest(this.arrowRightSelector)) {
                            currentSlide++;
                        }
                    }
                } else {
                    currentSlide++
                }

                if (currentSlide >= this.slides.length) {
                    if (this.infinity) {
                        currentSlide = this.currentSlide;
                        if (this.slidesOnPage > 1) {
                            currentSlide = this.slidesOnPage - 1;
                            this.slides.forEach((item, index) => {
                                item.classList.remove(this.classToChange)
                                if (index > this.slidesOnPage - 1) {
                                    item.classList.add(this.classToChange);
                                }
                            });
                        }
                    } else {
                        this.arrowRight.classList.add(this.classToChange);
                        this.slides[this.slides.length - 1].classList.remove(this.classToChange);
                        if (this.slidesOnPage > 1) {
                            this.slides[this.slides.length - this.slidesOnPage].classList.remove(this.classToChange);
                        }
                        return;
                    }
                }


                if (this.arrowRight && this.arrowLeft) {
                    if (this.slidesOnPage > 1) {
                        if (currentSlide < this.slidesOnPage - 1) {
                            currentSlide = this.slides.length - (this.slidesOnPage - 1);
                            this.slides.forEach((item, index) => {
                                item.classList.remove(this.classToChange)
                                item.classList.remove(this.centralClass);
                                if (index < currentSlide - 1) {
                                    item.classList.add(this.classToChange);
                                }
                            });
                            this.slides[this.slides.length - 1].classList.add(this.centralClass);
                        }
                    } else {
                        if (currentSlide < 0) {
                            currentSlide = this.slides.length - 1;
                        }
                    }
                }

                if (this.counterCurrent) {
                    this.counterCurrent.textContent = currentSlide + 1;
                }

                this.nextSlide(this.slides, currentSlide, this.classToChange, this.classAction);
            });
        }
    }

    prevSlide(elem, index, strClass, slidesNumber, action) {
        if (action === 'remove') {
            if (slidesNumber === 1) {
                elem[index].classList.add(strClass);
            } else if (slidesNumber > 1) {
                // ???? ?????????????? ?????? ??????????????, ?????????? ?????? ??????????????????
                if (elem[index - (this.slidesOnPage - 1)]) {
                    elem[index - (this.slidesOnPage - 1)].classList.add(strClass);
                }
            }
        } else {
            if (slidesNumber === 1) {
                elem[index].classList.remove(strClass);
            }
        }

    }

    nextSlide(elem, index, strClass, action) {
        if (action === 'remove') {
            if (this.centralClass) {
                elem[index - 2].classList.remove(this.centralClass);
                elem[index - 1].classList.add(this.centralClass);
            }
            elem[index].classList.remove(strClass);

        } else {
            elem[index].classList.add(strClass);
        }
    }
}

