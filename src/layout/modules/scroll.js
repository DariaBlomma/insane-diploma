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

export default scroll;
