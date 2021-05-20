const sliders = () => {
    const formulaTabletSlider = new BigSlider({
        slides: '.formula-item.formula-slider__slide',
        container: '.formula-slider',
        arrowRight: '#formula-arrow_right',
        arrowLeft: '#formula-arrow_left',
        slidesOnPage: 3,
        classToChange: 'hidden',
        classAction: 'remove',
        breakpoint: 1200,
        centralClass: 'active',
        name: 'formula'
    });
    formulaTabletSlider.init();

    const repairSliderPart = new Slider({
        slides: '.repair-types-slider__slide',
        wrapToClick: '#repair-types',
        arrowRight: '#repair-types-arrow_right',
        arrowLeft: '#repair-types-arrow_left',
        classToChange: 'repair-hidden',
        classAction: 'remove',
        counterCurrent: '.slider-counter-content__current',
        counterTotal: '.slider-counter-content__total',
        alt: 'electro',
        id:  'electro-slide'
    });
    repairSliderPart.init();

    const repairTypes = document.getElementById('repair-types');
    const navListRepair = document.querySelector('.nav-list-repair');

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
            const repairSliderType = new Slider({
                slides: '.repair-types-slider__slide',
                wrapToClick: '#repair-types',
                arrowRight: '#repair-types-arrow_right',
                arrowLeft: '#repair-types-arrow_left',
                classToChange: 'repair-hidden',
                classAction: 'remove',
                counterCurrent: '.slider-counter-content__current',
                counterTotal: '.slider-counter-content__total',
                alt: `${type}`,
                id:  `${type}-slide`
            });
            repairSliderType.init();
        };
    });

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
        arrowProblem: true,
    });
    sliderPortfolioMobile.init();

    const sliderPortfolioDesctop = new BigSlider({
        slides: '.portfolio-slider.mobile-hide .portfolio-slider__slide',
        container: '.portfolio-slider.mobile-hide',
        arrowRight: '#portfolio-arrow_right',
        arrowLeft: '#portfolio-arrow_left',
        slidesOnPage: 3,
        classToChange: 'portfolio-hidden',
        classAction: 'remove',
        breakpoint2: 1024,
        infinity: false,
        name: 'portfolio-desctop-slider'
    })

    sliderPortfolioDesctop.init();

    // проблемный слайдер без стрелочек и счетчика
    const sliderInnerPortfolioDesctop = new BigSlider({
        slides: '.popup-portfolio-slider__slide',
        container: '.popup-portfolio-slider-wrap',
        arrowRight: '.popup-dialog.popup-dialog-portfolio #popup_portfolio_right',
        arrowLeft: '.popup-dialog.popup-dialog-portfolio #popup_portfolio_left',
        classToChange: 'portfolio-inner-hidden',
        classAction: 'remove',
        breakpoint2: 1024,
        counterCurrent: '.popup-dialog.popup-dialog-portfolio .slider-counter .slider-counter-content__current',
        counterTotal: '.popup-dialog.popup-dialog-portfolio .slider-counter .slider-counter-content__total',
        name: 'portfolio-problem-slider'
    });
    if (window.innerWidth > 1024) {
        sliderInnerPortfolioDesctop.init();
    } else {
        window.addEventListener('resize', event => {
            if (window.innerWidth > 1024) {
                sliderInnerPortfolioDesctop.init();
            }
        })
    }


    const sliderInnerPortfolioTablet = new Slider({
        slides: '.popup-portfolio-slider__slide',
        wrapToClick: '.popup-portfolio',
        arrowRight: '#popup_portfolio_right svg',
        arrowLeft: '#popup_portfolio_left svg',
        classToChange: 'portfolio-hidden',
        classAction: 'remove',
        breakpoint: 1024,
        breakpoint2: 575,
        counterCurrent: '#popup-portfolio-counter .slider-counter-content__current',
        counterTotal: '#popup-portfolio-counter .slider-counter-content__total',
    });
    sliderInnerPortfolioTablet.init();

    const sliderInnerPortfolioMobile = new Slider({
        slides: '.popup-portfolio-slider__slide',
        wrapToClick: '.popup-portfolio',
        arrowRight: '#popup_portfolio_right svg',
        arrowLeft: '#popup_portfolio_left svg',
        classToChange: 'portfolio-hidden',
        classAction: 'remove',
        breakpoint: 575,
        counterCurrent: '#popup-portfolio-counter .slider-counter-content__current',
        counterTotal: '#popup-portfolio-counter .slider-counter-content__total',
    });
    sliderInnerPortfolioMobile.init();

    const documentsSlider = new Slider({
        slides: '.transparency-item',
        wrapToClick: '.transparency-slider-wrap',
        arrowRight: '#transparency-arrow_right',
        arrowLeft: '#transparency-arrow_left',
        classToChange: 'transparency-hidden',
        classAction: 'remove',
        breakpoint: 1090,
    });
    documentsSlider.init();

    const documentsInnerSlider = new Slider({
        slides: '.popup-transparency-slider__slide',
        wrapToClick: '.popup-transparency',
        arrowRight: '#transparency_right svg',
        arrowLeft: '#transparency_left svg',
        classToChange: 'transparency-hidden',
        classAction: 'remove',
        counterCurrent: '.popup-transparency-slider-wrap .slider-counter-content__current',
        counterTotal: '.popup-transparency-slider-wrap .slider-counter-content__total',
    });
    documentsInnerSlider.init();

    const reviewsSlider = new Slider({
        slides: '.reviews-slider__slide',
        wrapToClick: '#reviews',
        arrowRight: '#reviews-arrow_right',
        arrowLeft: '#reviews-arrow_left',
        classToChange: 'transparency-hidden',
        classAction: 'remove',
    });
    reviewsSlider.init();
};
export default sliders;
