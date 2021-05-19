const accordion = () => {
    // msg-active открывает нужный контент
    const accordion = document.querySelector('.accordion');
    const titleBlocks = accordion.querySelectorAll('.title_block');
    titleBlocks[0].classList.add('msg-active');
    accordion.addEventListener('click', event => {
        const target = event.target;
        titleBlocks.forEach(item => {
            item.classList.remove('msg-active');
            if (target === item) {
                item.classList.add('msg-active');
            }
        })
    })
};
export default accordion;
