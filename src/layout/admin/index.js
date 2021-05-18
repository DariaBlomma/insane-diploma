'use strict'
const mainFunction = () => {

    if (String(window.location.href).includes('table.html')) {
        if (document.cookie === '') {
            window.location.href = 'index.html';
        } else {
            const tableFunction = () => {
                const table = document.getElementById('table');

                const renderTableRows = (id, type, name, units, cost) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                  <tr class="table__row">
                  <td class="table__id table__cell">${id}</td>
                  <td class="table-type table__cell">${type}</td>
                  <td class="table-name table__cell">
                  ${name}
                  </td>
                  <td class="table-units table__cell">
                  ${units}
                  </td>
                  <td class="table-cost table__cell">
                  ${cost} руб.
                  </td>
                  <td>
                    <div class="table__actions table__cell">
                      <button class="button action-change"><span class="svg_ui"><svg class="action-icon_change"><use xlink:href="./img/sprite.svg#change"></use></svg></span><span>Изменить</span>
                      </button>
                      <button class="button action-remove"><span class="svg_ui"><svg class="action-icon_remove"><use xlink:href="./img/sprite.svg#remove"></use></svg></span><span>Удалить</span>
                      </button>
                    </div>
                  </td>
                `;
                    row.className = 'table__row';
                    table.append(row);
                };
                let types;

                const select = document.getElementById('typeItem');

                const renderOptions = text => {
                    const newOption = document.createElement('option');
                    newOption.setAttribute('value', text);
                    newOption.textContent = text;
                    select.append(newOption);
                };

                const openPopups = (popupSelector, elemSelector) => {
                    const popup = document.querySelector(popupSelector);
                    const closeBtn = popup.querySelector('.icon__close');
                    document.addEventListener('click', event => {
                        const target = event.target;
                        if (target.closest(elemSelector)) {
                            popup.style.display = 'block';
                        } else if (target === closeBtn) {
                            popup.style.display = 'none';
                        }
                        if (target.matches('.cancel-button span')) {
                            popup.querySelectorAll('input').forEach(item => item.value = '');
                        }
                    });
                };

                const generateId = () => {
                    const idStr = [];
                    for (let i = 0; i < 11; ++i) {
                        const random = Math.floor(Math.random() * 10);
                        idStr.push(random);
                    }
                    return idStr.join('');
                };

                const validation = (elem, type) => {
                    document.addEventListener('input', event => {
                        const target = event.target;
                        let reg;
                        if (type === 'text') {
                            reg = /\d/g;
                        }
                        if (type === 'number') {
                            reg = /\D/g;
                        }

                        if (target === elem) {
                            elem.value = elem.value.replace(reg, '');
                        }
                    });
                };
                // const checkId = () => {
                //     allId.forEach(item => item === generateId());
                // };

                const tableTypes = document.querySelectorAll('.table-type');
                const form = document.querySelector('form');
                const inputType = form.querySelector('.input__type');
                const inputName = form.querySelector('.input__name');
                const inputUnits = form.querySelector('.input__units');
                const inputCost = form.querySelector('.input__cost');


                let allId;
                const options = [...select.options];
                options.forEach((item, index) => {
                    if (index > 0) {
                        item.remove();
                    }
                });
                select.addEventListener('change', () => {
                    tableTypes.forEach(item => {
                        item.parentNode.style.display = '';
                        if (select.value !== item.textContent.trim()) {
                            if (select.value === 'Все услуги') {
                                item.parentNode.style.display = '';
                            } else {
                                item.parentNode.style.display = 'none';
                                console.log('item.parentNode: ', item.parentNode);
                                console.log(select.value);
                            }
                        }
                    });
                });

                openPopups('#modal', '.btn-addItem');
                validation(inputType, 'text');
                validation(inputName, 'text');
                validation(inputUnits, 'text');
                validation(inputCost, 'number');

                const getData = ()  => {
                    fetch('http://localhost:3000/api/items/')
                        .then(response => {
                            if (response.status === 200) {
                                return (response.json());
                            } else {
                                throw new Error('network status is not 200');
                            }
                        })
                        .then(data => {
                            allId = new Set();
                            types = new Set();
                            data.forEach(item => {
                                allId.add(item.id);
                                types.add(item.type);
                                renderTableRows(item.id, item.type, item.name, item.units, item.cost);
                            });
                            types.forEach(item => {
                                renderOptions(item);
                            });
                        })
                        .catch(error => {
                            console.error(error);
                        })
                };
                getData();

                form.addEventListener('submit', event => {
                    event.preventDefault();
                    const type = inputType.value.trim();
                    const name = inputName.value.trim();
                    const units = inputUnits.value.trim();
                    const price = inputCost.value.trim();
                    const inputs = form.querySelectorAll('input');
                    console.log(type, name, units, price);

                    // do fetch http://localhost:3000/api/items/
                    //

                    // const sendForm = () => {
                    //     const doAjax = formId => {
                    //         const form = document.getElementById(formId);
                    //         const checkbox = form.querySelector('.checkbox__input');
                    //         const checkboxLabel = form.querySelector('.checkbox__label');
                    //         const errorPopup = document.querySelector('.popup-error');
                    //         const successPopup = document.querySelector('.popup-thank');
                    //         const loader = document.createElement('div');
                    //         form.append(loader);
                    //         const inputs = form.querySelectorAll('input');
                    //         document.addEventListener('click', event => {
                    //             const target = event.target;
                    //             const closeThank = successPopup.querySelector('.close');
                    //             const closeError = errorPopup.querySelector('.close');
                    //             if (target === closeThank || target === closeError) {
                    //                 successPopup.style.visibility = 'hidden';
                    //                 errorPopup.style.visibility = 'hidden';
                    //             }
                    //         });
                    //         const removeMessage = () => {
                    //             checkboxLabel.style.borderColor = '#322823';
                    //             successPopup.style.visibility = 'hidden';
                    //             errorPopup.style.visibility = 'hidden';
                    //         };
                    //         const showSuccess = () => {
                    //             loader.className = '';
                    //             successPopup.style.visibility = 'visible';
                    //             inputs.forEach(item => {
                    //                 item.value = '';
                    //             });
                    //             checkbox.checked = false;
                    //             setTimeout(removeMessage, 5000);
                    //         };
                    //         const showError = error => {
                    //             loader.className = '';
                    //             errorPopup.style.visibility = 'visible';
                    //             console.error(error);
                    //             setTimeout(removeMessage, 5000);
                    //         };
                    //         form.addEventListener('submit', event => {
                    //             event.preventDefault();
                    //             if (checkbox.checked) {
                    //                 checkboxLabel.style.borderColor = '#322823';
                    //                 loader.className = 'loader';
                    //                 const formData = new FormData(form);
                    //                 const body = {};
                    //                 formData.forEach((val, key) => {
                    //                     body[key] = val;
                    //                 });

                    //                 const postData = body =>  fetch('./server.php', {
                    //                     method: 'POST',
                    //                     headers: {
                    //                         'Content-Type': 'application/json'
                    //                     },
                    //                     body: JSON.stringify(body)
                    //                 });
                    //                 postData(body)
                    //                     .then(response => {
                    //                         if (response.status !== 200) {
                    //                             throw new Error('network status is not 200');
                    //                         }
                    //                         showSuccess();
                    //                     })
                    //                     .catch(showError);
                    //             } else {
                    //                 checkboxLabel.style.borderColor = 'red';
                    //                 setTimeout(() => {
                    //                     checkboxLabel.style.borderColor = '#322823';
                    //                 }, 3000);
                    //             }
                    //         });
                    //     };

                    //     doAjax('feedback1');
                    //     doAjax('feedback2');
                    //     doAjax('feedback3');
                    //     doAjax('feedback4');
                    //     doAjax('feedback5');
                    //     doAjax('feedback6');
                    // };

                    const loader = document.createElement('div');
                    form.append(loader);
                    loader.className = 'loader';
                    const newId = generateId();
                    const formData = new FormData(form);
                    const body = {};
                    formData.forEach((val, key) => {
                        body[key] = val;
                        body['id'] = newId;
                    });

                    const postData = body => fetch('http://localhost:3000/api/items/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(body)
                    });
                    postData(body)
                        .then(response => {
                            if (response.ok) {
                                loader.className = '';
                                inputs.forEach(item => {
                                    item.value = '';
                                });
                            } else {
                                throw new Error('network status is not 200');
                            }
                        })
                        .then(() => {
                            renderTableRows(newId, type, name, units, price);
                        })
                        .catch(error => {
                            console.error(error);
                            loader.className = '';
                        });
                });
            };
            tableFunction();
        }
    } else {
        const auth = () => {
            const setCookie = (key, value, year, month, day) => {
                let cookieStr = key + '=' + encodeURI(value);
                if (year) {
                    const expires = new Date(year, month - 1, day);
                    cookieStr += '; expires=' + expires.toGMTString();
                }

                document.cookie = cookieStr;
            };


            console.log('cookie: ' + decodeURI(document.cookie));

            // let index = document.cookie.indexOf('=');
            // const log = document.cookie.substring(0, index);
            // console.log('log: ', log);
            // const pass = document.cookie.substring(index + 1);
            // console.log('pass: ', pass);

            const myLogin = 'daria';
            const myPassword = 'glo';

            const warnings = document.querySelectorAll('.text-warning');
            warnings.forEach(item => {
                item.style.display = 'none';
            });

            const form = document.querySelector('form');
            const loginInput = document.getElementById('name');
            const passwordInput = document.getElementById('type');
            const submitBtn = form.querySelector('.button-ui_firm');
            form.addEventListener('submit', event => {
                event.preventDefault();
                const warnings = document.querySelectorAll('.text-warning');
                warnings.forEach(item => {
                    item.style.display = 'none';
                });
                const login = loginInput.value.trim();
                const password = passwordInput.value.trim();
                if (login === myLogin && password === myPassword) {
                    setCookie(login, password, 2022, 31, 30);
                    window.location.href = 'table.html';
                } else {
                    loginInput.value = '';
                    passwordInput.value = '';
                    if (login !== myLogin) {
                        loginInput.nextElementSibling.style.display = 'inline-block';
                    }

                    if (password !== myPassword) {
                        passwordInput.nextElementSibling.style.display = 'inline-block';
                    }
                }
            });
        };
        auth();
    }
};
mainFunction();

