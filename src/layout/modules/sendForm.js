const sendForm = () => {
    const doAjax = formId => {
        const form = document.getElementById(formId);
        const checkbox = form.querySelector('.checkbox__input');
        const checkboxLabel = form.querySelector('.checkbox__label');
        const errorPopup = document.querySelector('.popup-error');
        const successPopup = document.querySelector('.popup-thank');
        const loader = document.createElement('div');
        form.append(loader);
        const inputs = form.querySelectorAll('input');
        document.addEventListener('click', event => {
            const target = event.target;
            const closeThank = successPopup.querySelector('.close');
            const closeError = errorPopup.querySelector('.close');
            if (target === closeThank || target === closeError) {
                successPopup.style.visibility = 'hidden';
                errorPopup.style.visibility = 'hidden';
            }
        });
        const removeMessage = () => {
            checkboxLabel.style.borderColor = '#322823';
            successPopup.style.visibility = 'hidden';
            errorPopup.style.visibility = 'hidden';
        };
        const showSuccess = () => {
            loader.className = '';
            successPopup.style.visibility = 'visible';
            inputs.forEach(item => {
                item.value = '';
            });
            checkbox.checked = false;
            setTimeout(removeMessage, 5000);
        };
        const showError = error => {
            loader.className = '';
            errorPopup.style.visibility = 'visible';
            console.error(error);
            setTimeout(removeMessage, 5000);
        };
        form.addEventListener('submit', event => {
            event.preventDefault();
            if (checkbox.checked) {
                checkboxLabel.style.borderColor = '#322823';
                loader.className = 'loader';
                const formData = new FormData(form);
                const body = {};
                formData.forEach((val, key) => {
                    body[key] = val;
                });

                const postData = body =>  fetch('./server.php', {
                    method: 'POST',
                    header: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                });
                postData(body)
                    .then(response => {
                        if (response.status !== 200) {
                            throw new Error('network status is not 200');
                        }
                        showSuccess();
                    })
                    .catch(showError);
            } else {
                checkboxLabel.style.borderColor = 'red';
                setTimeout(() => {
                    checkboxLabel.style.borderColor = '#322823';
                }, 3000);
            }
        });
    };

    doAjax('feedback1');
    doAjax('feedback2');
    doAjax('feedback3');
    doAjax('feedback4');
    doAjax('feedback5');
    doAjax('feedback6');
};

export default sendForm;
