class Slider2 {
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
      // console.log('this.arrowLeft: ', this.arrowLeft);
      // console.log('this.arrowRight: ', this.arrowRight);
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
              // console.log('click');
                const target = event.target;
                // console.log('target: ', target);
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

                console.log('currentSlide: ', currentSlide);
                if (currentSlide >= this.slides.length) {
                  if (this.infinity) {
                    if (currentSlide === this.slides.length) {
                      let slider = document.querySelector('.formula-slider');
                      let clone = this.slides[0].cloneNode(true);
                      slider.append(clone);
                      clone.classList.remove(this.classToChange);
                      this.slides[0].remove();
                    }
                    if (currentSlide > this.slides.length) {
                      let slider = document.querySelector('.formula-slider');
                      this.slides = document.querySelectorAll('.formula-slider__slide');
                      let clone01 = this.slides[0].cloneNode(true);
                      slider.append(clone01);
                      this.slides[this.slides.length - this.slidesOnPage].classList.add(this.classToChange);
                      clone01.classList.remove(this.classToChange);
                      clone01.classList.remove(this.centralClass);
                      this.slides[0].remove();
                    }

                    if (currentSlide === this.slides.length + 1) {

                      let slider = document.querySelector('.formula-slider');
                      this.slides = document.querySelectorAll('.formula-slider__slide');
                      let clone02 = this.slides[0].cloneNode(true);
                      slider.append(clone02);

                      this.slides[this.slides.length - this.slidesOnPage].classList.add(this.classToChange);

                      this.slides[2].classList.add(this.classToChange);
                      console.log('this.slides: ', this.slides);
                      this.slides[this.slides.length - 1].classList.add(this.centralClass);
                      clone02.classList.remove(this.classToChange);
                      clone02.classList.remove(this.centralClass);
                      this.slides[0].remove();

                      currentSlide = this.slidesOnPage - 1;
                      // this.slides.forEach((item, index) => {
                      //     item.classList.remove(this.classToChange)
                      //     if (index > this.slidesOnPage - 1) {
                      //         item.classList.add(this.classToChange);
                      //     }
                      // });
                    }
                    // currentSlide = this.currentSlide;
                    // if (this.slidesOnPage > 1) {
                    //   if (currentSlide > this.slides.length) {

                    //   }
                        // currentSlide = this.slidesOnPage - 1;
                        // this.slides.forEach((item, index) => {
                        //     item.classList.remove(this.classToChange)
                        //     if (index > this.slidesOnPage - 1) {
                        //         item.classList.add(this.classToChange);
                        //     }
                        // });
                    // }
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
                          console.log('currentSlide: ', currentSlide);
                        }
                    // }
                            // currentSlide = this.slides.length - (this.slidesOnPage - 1);
                            // console.log('currentSlide: ', currentSlide);
                            // this.slides.forEach((item, index) => {
                            //     item.classList.remove(this.classToChange)
                            //     item.classList.remove(this.centralClass);
                            //     if (index < currentSlide - 1) {
                            //         item.classList.add(this.classToChange);
                            //     }
                            // });
                            // this.slides[this.slides.length - 1].classList.add(this.centralClass);
                        // }
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



    // controlSlider() {
    //     this.prev.addEventListener('click', this.prevSlider.bind(this));
    //     this.next.addEventListener('click', this.nextSlider.bind(this));
    // }

    prevSlide(elem, index, strClass, slidesNumber, action) {
        if (action === 'remove') {
            if (slidesNumber === 1) {
                elem[index].classList.add(strClass);
            } else if (slidesNumber > 1) {
                // не трогать это условие, иначе все сломается
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
                if (elem[index - 2]) {
                    elem[index - 2].classList.remove(this.centralClass);
                }
                // if (elem[index - 1]) {
                //     elem[index - 1].classList.add(this.centralClass);
                // }
                elem[index - 2].classList.remove(this.centralClass);
                elem[index - 1].classList.add(this.centralClass);
            }
            if (index >= this.slides.length) {
            } else {
              elem[index].classList.remove(strClass);
            }


        } else {
            elem[index].classList.add(strClass);
        }
    }
}
