const showRepairTypesData = () => {
    const popup = document.querySelector('.popup-repair-types');
    const title = popup.querySelector('.popup-repair-types-content__head-title');
    const repairTypesNames = popup.querySelectorAll('.repair-types-name');
    const repairTypesValues = popup.querySelectorAll('.repair-types-value.units');
    const prices = popup.querySelectorAll('.repair-types-value.cost');

    let namesArr,
        unitsArr,
        pricesArr;

    let countNames = 0;
    const getActualText = target => {
        const btns = popup.querySelectorAll('.popup-repair-types-nav__item');
        btns.forEach(item => {
            item.classList.remove('active');
            if (target === item) {
                item.classList.add('active');
                title.textContent = item.textContent;
            }
        })

        return title.textContent;
    };


    document.addEventListener('click', event => {
        let text;
        const target = event.target;
        const getData = () => {
          fetch('../crm-backend/db.json')
              .then(response => {
                  if (response.status !== 200) {
                      throw new Error('network status is not 200');
                  }
                  return (response.json());
              })
              .then(data => {
                  namesArr = new Map();
                  unitsArr = new Map();
                  pricesArr = new Map();
                  data.forEach((item, index) => {
                      if (item.type === text) {
                          countNames++;
                          namesArr.set(countNames, item.name);
                          unitsArr.set(countNames, item.units);
                          pricesArr.set(countNames, item.cost);
                      }
                  })
                  countNames = 0;
              })
              .then(() => {
                  repairTypesNames.forEach((elem, index) => {
                      if (index + 1 < namesArr.size) {
                          elem.textContent = '';
                          elem.parentNode.style.display = '';
                      } else {
                          elem.parentNode.style.display = 'none';
                      }
                  })
                  namesArr.forEach((elem, index) => {
                      repairTypesNames[index - 1].textContent = elem;
                  });
                  unitsArr.forEach((elem, index) => {
                      const unitLetters = String(elem.match(/\D+/g));
                      let unitNumbers = String(elem.match(/\d+/g));
                      if (unitNumbers === 'null') {
                          unitNumbers = '';
                      }
                      repairTypesValues[index - 1].innerHTML = `${unitLetters}<sup>${unitNumbers}</sup>`;
                  });
                  pricesArr.forEach((elem, index) => {
                      prices[index - 1].textContent = `${elem} руб.`;
                  });
              })
              .catch(error => {
                  console.error(error);
              })
        };
        if (document.querySelector('#nav-arrow-popup-repair_left')) {
            const navList = document.querySelector('.nav-list-popup-repair');

            if (target.closest('#nav-arrow-popup-repair_right')) {
                const btn = navList.children[0];
                const clone = btn.cloneNode(true);
                navList.append(clone);
                btn.remove();
            } else if (target.closest('#nav-arrow-popup-repair_left')) {
                const btn = navList.children[navList.children.length - 1];
                const clone = btn.cloneNode(true);
                navList.prepend(clone);
                btn.remove();
            }
        }
        if (popup.style.visibility === 'visible') {
            text = title.textContent;
            getData();
            if (target.closest('.popup-repair-types-nav__item')) {
                text = getActualText(target);
            }
        }




    });
};

export default showRepairTypesData;
