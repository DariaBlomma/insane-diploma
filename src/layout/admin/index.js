'use strict'
const mainFunction = () => {

    if (String(window.location.href).includes('table.html')) {
        if (document.cookie === '') {
            window.location.href = 'index.html';
        } else {
            const tableFunction = () => {
                const form = document.querySelector('form');
                const title = document.querySelector('.modal__header');
                const table = document.getElementById('table');
                const inputType = form.querySelector('.input__type');
                const inputName = form.querySelector('.input__name');
                const inputUnits = form.querySelector('.input__units');
                const inputCost = form.querySelector('.input__cost');
                const select = document.getElementById('typeItem');
                const inputs = form.querySelectorAll('input');
                let types;
                let newName;


                const options = [...select.options];
                options.forEach((item, index) => {
                    if (index > 0) {
                        item.remove();
                    }
                });
                select.addEventListener('change', () => {
                    const tableTypes = document.querySelectorAll('.table-type');
                    tableTypes.forEach(item => {
                        item.parentNode.style.display = '';
                        if (select.value !== item.textContent.trim()) {
                            if (select.value === 'Все услуги') {
                                item.parentNode.style.display = '';
                            } else {
                                item.parentNode.style.display = 'none';
                            }
                        }
                    });
                });
                const renderTableRows = (id, type, name, units, cost, beforeRow) => {
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
                    if (beforeRow) {
                        beforeRow.replaceWith(row);
                    } else {
                        table.append(row);
                    }

                };

                const renderOptions = text => {
                    const newOption = document.createElement('option');
                    newOption.setAttribute('value', text);
                    newOption.textContent = text;
                    select.append(newOption);
                };

                const getData = ()  => {
                    console.log('will render');
                    fetch('http://localhost:3000/api/items/')
                        .then(response => {
                            if (response.status === 200) {
                                return (response.json());
                            } else {
                                throw new Error('network status is not 200');
                            }
                        })
                        .then(data => {
                            types = new Set();
                            data.forEach(item => {
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


                const getNewItem = () => {
                    console.log('in new item');
                    fetch('http://localhost:3000/api/items/')
                        .then(response => {
                            if (response.status === 200) {
                                return (response.json());
                            } else {
                                throw new Error('network status is not 200');
                            }
                        })
                        .then(data => {
                            data.forEach(item => {
                                if (item.name === newName) {
                                    renderTableRows(item.id, item.type, item.name, item.units, item.cost);
                                }
                            });
                        })
                        .catch(error => {
                            console.error(error);
                        })
                };

                const sendData = () => {
                    title.textContent = 'Добавение новой услуги';
                    form.addEventListener('submit', event => {
                        event.preventDefault();
                        newName = inputName.value.trim();
                        const loader = document.createElement('div');
                        form.append(loader);
                        loader.className = 'loader';

                        const formData = new FormData(form);
                        const body = {};
                        formData.forEach((val, key) => {
                            body[key] = val;
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
                                getNewItem();

                            })
                            .catch(error => {
                                console.error(error);
                                loader.className = '';
                            });
                    });
                };


                const changeItem = target => {
                    title.textContent = 'Редактировать услугу';
                    const row = target.closest('.table__row');
                    const id = row.querySelector('.table__id').textContent.trim();
                    const type = row.querySelector('.table-type').textContent.trim();
                    const name = row.querySelector('.table-name').textContent.trim();
                    const units = row.querySelector('.table-units').textContent.trim();
                    const cost = row.querySelector('.table-cost').textContent.trim();

                    inputType.value = type;
                    inputName.value = name;
                    inputUnits.value = units;
                    inputCost.value = cost.match(/\d+/g);

                    form.addEventListener('submit', event => {
                        event.preventDefault();
                        newName = inputName.value;
                        const formData = new FormData(form);
                        const body = {};
                        formData.forEach((val, key) => {
                            body[key] = val;
                        });
                        const changeData = body => fetch(`http://localhost:3000/api/items/${id}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(body)
                        });
                        changeData(body)
                            .then(response => {
                                if (response.ok) {
                                    renderTableRows(id, inputType.value,
                                        inputName.value, inputUnits.value, inputCost.value, row);
                                    inputs.forEach(item => {
                                        item.value = '';
                                    });
                                } else {
                                    throw new Error('network status is not 200');
                                }
                            })
                            .catch(error => {
                                console.error(error);
                                inputs.forEach(item => {
                                    item.value = '';
                                });
                            });
                    });
                };


                const deleteItem = target => {
                    const row = target.closest('.table__row');
                    const id = row.querySelector('.table__id').textContent.trim();
                    const deleteData = () => fetch(`http://localhost:3000/api/items/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });
                    deleteData()
                        .then(response => {
                            if (response.ok) {
                                row.remove();
                            } else {
                                throw new Error('network status is not 200');
                            }
                        })
                        .catch(error => {
                            console.error(error);
                        });
                };
                document.addEventListener('click', event => {
                    const target = event.target;
                    if (target.closest('.action-change')) {
                        changeItem(target);
                    }
                    if (target.closest('.btn-addItem')) {
                        sendData();
                    }
                    if (target.closest('.action-remove')) {
                        deleteItem(target);
                    }
                });


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
                        if (target.closest('.cancel-button')) {
                            popup.querySelectorAll('input').forEach(item => item.value = '');
                        }
                    });
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

                openPopups('#modal', '.btn-addItem');
                openPopups('#modal', '.action-change');
                validation(inputType, 'text');
                validation(inputName, 'text');
                validation(inputCost, 'number');

                getData();
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

            const myLogin = 'admin';
            const myPassword = 'admin';

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

