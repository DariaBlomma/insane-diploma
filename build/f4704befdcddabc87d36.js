import './index.html';
import './css/style.css';

var openPhoneNumber = function openPhoneNumber() {
  var accordNumber = document.querySelector('.header-contacts__phone-number-accord a');
  document.addEventListener('click', function (event) {
    var target = event.target;

    if (target.closest('.header-contacts__arrow')) {
      accordNumber.classList.toggle('opened');
    } else if (accordNumber.classList.contains('opened')) {
      // закрываем при клике вне стрелки
      accordNumber.classList.remove('opened');
    }
  });
};

openPhoneNumber();

var toggleMenu = function toggleMenu() {
  var menuIcon = document.querySelector('.menu__icon'),
      popupMenu = document.querySelector('.popup-menu'),
      poupDialogMenu = document.querySelector('.popup-dialog-menu');
  window.addEventListener('resize', function () {
    if (window.innerWidth < 576) {
      poupDialogMenu.style.webkitTransform = 'translate3d(0, -841px, 0)';
      poupDialogMenu.style.transform = 'translate3d(0, -841px, 0)';
    } else {
      poupDialogMenu.style.webkitTransform = 'translate3d(645px, 0, 0)';
      poupDialogMenu.style.transform = 'translate3d(645px, 0, 0)';
    }
  });
  document.addEventListener('click', function (event) {
    var target = event.target;

    if (target.closest('.menu__icon')) {
      menuIcon.classList.add('opened');
      popupMenu.style.visibility = 'visible';
      poupDialogMenu.style.webkitTransform = 'translate3d(0, 0, 0)';
      poupDialogMenu.style.transform = 'translate3d(0, 0, 0)';
    } else if (menuIcon.classList.contains('opened') && (target.closest('.close-menu') || target === popupMenu || target.matches('.menu-link'))) {
      menuIcon.classList.remove('opened');
      popupMenu.style.visibility = 'hidden';

      if (window.innerWidth < 576) {
        poupDialogMenu.style.webkitTransform = 'translate3d(0, -841px, 0)';
        poupDialogMenu.style.transform = 'translate3d(0, -841px, 0)';
      } else {
        poupDialogMenu.style.webkitTransform = 'translate3d(645px, 0, 0)';
        poupDialogMenu.style.transform = 'translate3d(645px, 0, 0)';
      }
    }
  });
};

toggleMenu();

var scroll = function scroll() {
  // проверка, что это не заглушка, а реальный якорь
  var reg = /#(?=\D+)/g;
  var anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
      animationTime = 500,
      framesCount = 20;
  document.addEventListener('click', function (e) {
    var target = e.target;
    anchors.forEach(function (item) {
      if (item.href.match(reg) !== null && target === item) {
        e.preventDefault();
        var coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;

        if (coordY === 0) {
          var scrollToTop = window.setInterval(function () {
            var pos = window.pageYOffset;

            if (pos > 0) {
              window.scrollTo(0, pos - 300);
            } else {
              window.clearInterval(scrollToTop);
            }
          }, 16);
        } else {
          var scroller = setInterval(function () {
            var scrollBy = coordY / framesCount;

            if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
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

scroll();

var validation = function validation() {
  var phones = document.querySelectorAll('[name="phone"]');
  document.addEventListener('input', function (event) {
    var target = event.target;
    phones.forEach(function (item) {
      if (target === item) {
        item.value = item.value.replace(/\D/g, '');
      }
    });
  });
  maskPhone('[name="phone"]');
};

validation();

var openPopups = function openPopups(popupSelector, elemSelector) {
  if (elemSelector === '.consult') {
    var btns = document.querySelectorAll('.button');
    btns.forEach(function (item) {
      if (item.textContent === 'Проконсультироваться') {
        item.classList.add('consult');
      }
    });
  }

  var popup = document.querySelector(popupSelector);
  var closeBtn = popup.querySelector('.close');
  document.addEventListener('click', function (event) {
    var target = event.target;

    if (target.closest(elemSelector)) {
      popup.style.visibility = 'visible';
    } else if (target === closeBtn) {
      popup.style.visibility = 'hidden';
    }
  });
};

openPopups('.popup-repair-types', '.link-list');
openPopups('.popup-privacy', '.checkbox__descr span');
openPopups('.popup-transparency', '.transparency-item__img');
openPopups('.popup-consultation', '.consult');
openPopups('.popup-portfolio', '.portfolio-slider__slide-frame');

var openPopupsHover = function openPopupsHover() {
  var toggleBlock = function toggleBlock(target, action, elem) {
    var item = target.closest(elem);
    var popup;

    if (item && !target.closest('.formula-item-popup')) {
      var top = target.getBoundingClientRect().top;
      var text = target.textContent.trim().match(/\d+/g);

      if (elem === '.formula-slider__slide') {
        item = document.querySelector("".concat(elem, " .formula-item__icon"));
        console.log(' item : ', item);
        popup = document.querySelector("".concat(elem, " .formula-item-popup-").concat(text));
        console.log('popup: ', popup);
      } else {
        popup = document.querySelector(".formula-item-popup-".concat(text));
        console.log('popup: ', popup);
      }

      if (top < popup.clientHeight) {
        popup.style.bottom = "-".concat(popup.clientHeight + 10, "px"); // подумать как применить стили к псевдоэлементу before

        popup.classList.toggle('formula-popup-opened.down');
      } else {
        popup.style.bottom = '90px';
        popup.classList.remove('formula-popup-opened.down');
      }

      if (action === 'toggle') {
        popup.classList.toggle('formula-popup-opened');
        item.classList.toggle('opened');
      }

      if (action === 'remove') {
        popup.classList.remove('formula-popup-opened');
        item.classList.remove('opened');
      }
    }
  };

  if (window.innerWidth > 1200) {
    document.addEventListener('mouseover', function (event) {
      var target = event.target;
      toggleBlock(target, 'toggle', '.formula-item__icon');
    });
    document.addEventListener('mouseout', function (event) {
      var target = event.target;
      toggleBlock(target, 'remove', '.formula-item__icon');
    });
  } else {
    document.addEventListener('click', function (event) {
      var target = event.target;
      console.log('target: ', target);
      toggleBlock(target, 'toggle', '.formula-slider__slide');
    }); // document.addEventListener('mouseout', event => {
    //     const target = event.target;
    //     toggleBlock(target, 'remove');
    // });
  }
};

openPopupsHover();

var sendForm = function sendForm() {
  var doAjax = function doAjax(formId) {
    var form = document.getElementById(formId);
    var checkbox = form.querySelector('.checkbox__input');
    var checkboxLabel = form.querySelector('.checkbox__label');
    var errorPopup = document.querySelector('.popup-error');
    var successPopup = document.querySelector('.popup-thank');
    var loader = document.createElement('div');
    form.append(loader);
    var inputs = form.querySelectorAll('input');
    document.addEventListener('click', function (event) {
      var target = event.target;
      var closeThank = successPopup.querySelector('.close');
      var closeError = errorPopup.querySelector('.close');

      if (target === closeThank || target === closeError) {
        successPopup.style.visibility = 'hidden';
        errorPopup.style.visibility = 'hidden';
      }
    });

    var removeMessage = function removeMessage() {
      checkboxLabel.style.borderColor = '#322823';
      successPopup.style.visibility = 'hidden';
      errorPopup.style.visibility = 'hidden';
    };

    var showSuccess = function showSuccess() {
      loader.className = '';
      successPopup.style.visibility = 'visible';
      inputs.forEach(function (item) {
        item.value = '';
      });
      checkbox.checked = false;
      setTimeout(removeMessage, 5000);
    };

    var showError = function showError(error) {
      loader.className = '';
      errorPopup.style.visibility = 'visible';
      console.error(error);
      setTimeout(removeMessage, 5000);
    };

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (checkbox.checked) {
        checkboxLabel.style.borderColor = '#322823';
        loader.className = 'loader';
        var formData = new FormData(form);
        var body = {};
        formData.forEach(function (val, key) {
          body[key] = val;
        });

        var postData = function postData(body) {
          return fetch('./server.php', {
            method: 'POST',
            header: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          });
        };

        postData(body).then(function (response) {
          if (response.status !== 200) {
            throw new Error('network status is not 200');
          }

          showSuccess();
        })["catch"](showError);
      } else {
        checkboxLabel.style.borderColor = 'red';
        setTimeout(function () {
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

sendForm(); //  formula-item__icon
// formula-item__popup