import maskPhone from './maskPhone';
const validation = () => {
    const phones = document.querySelectorAll('[name="phone"]');
    document.addEventListener('input', event => {
        const target = event.target;
        phones.forEach(item => {
            if (target === item) {
                item.value = item.value.replace(/\D/g, '');
            }
        })
    });
    maskPhone('[name="phone"]');
};
export default validation;
