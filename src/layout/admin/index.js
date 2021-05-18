'use strict'
const mainFunction = () => {

    if (String(window.location.href).includes('table.html')) {
        if (document.cookie === '') {
            window.location.href = 'index.html';
        } else {
            const tableFunction = () => {
                let types,
                    count;
                const select = document.getElementById('typeItem');
                const renderOptions = text => {
                    const newOption = document.createElement('option');
                    newOption.setAttribute('value', text);
                    newOption.textContent = text;
                    select.append(newOption);
                };

                const options = [...select.options];
                options.forEach((item, index) => {
                    if (index > 0) {
                        item.remove();
                    }
                })

                fetch('http://localhost:3000/api/items')
                    .then(response => {
                        // if (response.status !== 200) {
                        //     throw new Error('network status is not 200');
                        // }
                        // return (response.json());
                        if (response.status === 200) {
                            return (response.json());
                        } else {
                            throw new Error('network status is not 200');
                        }


                    })
                    .then(data => {
                        console.log(data);
                        // types = new Set();
                        // data.forEach((item, index) => {
                        //     types.add(item.type);
                        // });
                        // types.forEach(item => {
                        //     renderOptions(item);
                        // })
                        // console.log(types);

                        // namesArr = new Map();
                        // unitsArr = new Map();
                        // pricesArr = new Map();
                        // data.forEach((item, index) => {
                        //     if (item.type === text) {
                        //         countNames++;
                        //         namesArr.set(countNames, item.name);
                        //         unitsArr.set(countNames, item.units);
                        //         pricesArr.set(countNames, item.cost);
                        //     }
                        // })
                        // countNames = 0;
                    })

                    // .then(() => {
                    //     repairTypesNames.forEach((elem, index) => {
                    //         if (index + 1 < namesArr.size) {
                    //             elem.textContent = '';
                    //             elem.parentNode.style.display = '';
                    //         } else {
                    //             elem.parentNode.style.display = 'none';
                    //         }
                    //     })
                    //     namesArr.forEach((elem, index) => {
                    //         repairTypesNames[index - 1].textContent = elem;
                    //     });
                    //     unitsArr.forEach((elem, index) => {
                    //         const unitLetters = String(elem.match(/\D+/g));
                    //         let unitNumbers = String(elem.match(/\d+/g));
                    //         if (unitNumbers === 'null') {
                    //             unitNumbers = '';
                    //         }
                    //         repairTypesValues[index - 1].innerHTML = `${unitLetters}<sup>${unitNumbers}</sup>`;
                    //     });
                    //     pricesArr.forEach((elem, index) => {
                    //         prices[index - 1].textContent = `${elem} руб.`;
                    //     });
                    // })
                    .catch(error => {
                        console.error(error);
                    })
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

