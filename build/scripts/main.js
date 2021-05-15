/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.html */ "./index.html");
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css/style.css */ "./css/style.css");



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

/***/ }),

/***/ "./maskPhone.js":
/*!**********************!*\
  !*** ./maskPhone.js ***!
  \**********************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "0ba4cb786c4f56ebc8f1.js";

/***/ }),

/***/ "./images/feedback-block/phone_icon.svg":
/*!**********************************************!*\
  !*** ./images/feedback-block/phone_icon.svg ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "6ec30ae9b1c57d7006a6.svg";

/***/ }),

/***/ "./images/feedback-block/viber_icon.svg":
/*!**********************************************!*\
  !*** ./images/feedback-block/viber_icon.svg ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "31b2cb0a00af3c24147f.svg";

/***/ }),

/***/ "./images/feedback-block/whatsapp_icon.svg":
/*!*************************************************!*\
  !*** ./images/feedback-block/whatsapp_icon.svg ***!
  \*************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "36494d2e200c1a47eb0f.svg";

/***/ }),

/***/ "./images/footer/contacts_icon.svg":
/*!*****************************************!*\
  !*** ./images/footer/contacts_icon.svg ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "9403b55c71fec6d76ed9.svg";

/***/ }),

/***/ "./images/footer/menu.svg":
/*!********************************!*\
  !*** ./images/footer/menu.svg ***!
  \********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "2923c22c564e73a41045.svg";

/***/ }),

/***/ "./images/footer/phone.svg":
/*!*********************************!*\
  !*** ./images/footer/phone.svg ***!
  \*********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "e041a572cff7461e8f84.svg";

/***/ }),

/***/ "./images/header/arrow.svg":
/*!*********************************!*\
  !*** ./images/header/arrow.svg ***!
  \*********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "d18861b3f2b7c30eddcb.svg";

/***/ }),

/***/ "./images/header/menuIcon.svg":
/*!************************************!*\
  !*** ./images/header/menuIcon.svg ***!
  \************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "ce95e1640b8d0473b5c5.svg";

/***/ }),

/***/ "./images/header/phoneIcon.svg":
/*!*************************************!*\
  !*** ./images/header/phoneIcon.svg ***!
  \*************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "5c12c5a8f16b62b3bfd7.svg";

/***/ }),

/***/ "./images/header/viber.svg":
/*!*********************************!*\
  !*** ./images/header/viber.svg ***!
  \*********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "3b29a0c0f2d97a1e0fdf.svg";

/***/ }),

/***/ "./images/header/whatsApp.svg":
/*!************************************!*\
  !*** ./images/header/whatsApp.svg ***!
  \************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "ca63d443ad3060cd7c21.svg";

/***/ }),

/***/ "./images/main/circle.svg":
/*!********************************!*\
  !*** ./images/main/circle.svg ***!
  \********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "0ed8364d09b6a9d14ab1.svg";

/***/ }),

/***/ "./images/main/circle_1_icon.svg":
/*!***************************************!*\
  !*** ./images/main/circle_1_icon.svg ***!
  \***************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "4602efc9e82ec12f7bf6.svg";

/***/ }),

/***/ "./images/main/circle_2_icon.svg":
/*!***************************************!*\
  !*** ./images/main/circle_2_icon.svg ***!
  \***************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "0ed0c3d4b93af41fee80.svg";

/***/ }),

/***/ "./images/main/circle_3_icon.svg":
/*!***************************************!*\
  !*** ./images/main/circle_3_icon.svg ***!
  \***************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a8f8ce99f8c3917d2a5e.svg";

/***/ }),

/***/ "./images/main/feedback_icon.svg":
/*!***************************************!*\
  !*** ./images/main/feedback_icon.svg ***!
  \***************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "1972987380f5c160d997.svg";

/***/ }),

/***/ "./images/main/subtract1.svg":
/*!***********************************!*\
  !*** ./images/main/subtract1.svg ***!
  \***********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fe27f24d0e9827718a2c.svg";

/***/ }),

/***/ "./images/main/subtract2.svg":
/*!***********************************!*\
  !*** ./images/main/subtract2.svg ***!
  \***********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "088ffdd6bdfd25719e90.svg";

/***/ }),

/***/ "./images/main/subtract3.svg":
/*!***********************************!*\
  !*** ./images/main/subtract3.svg ***!
  \***********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a3000d58b171fd9fbdea.svg";

/***/ }),

/***/ "./images/popup/1.jpg":
/*!****************************!*\
  !*** ./images/popup/1.jpg ***!
  \****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "53802322d7fcd5ff245d.jpg";

/***/ }),

/***/ "./images/popup/2.jpg":
/*!****************************!*\
  !*** ./images/popup/2.jpg ***!
  \****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "54c18f781bcffd9f20c7.jpg";

/***/ }),

/***/ "./images/popup/3.jpg":
/*!****************************!*\
  !*** ./images/popup/3.jpg ***!
  \****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "36da13d912ba96d6fd1d.jpg";

/***/ }),

/***/ "./images/popup/4.jpg":
/*!****************************!*\
  !*** ./images/popup/4.jpg ***!
  \****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "21fd3b38f1cb4454a043.jpg";

/***/ }),

/***/ "./images/popup/5.jpg":
/*!****************************!*\
  !*** ./images/popup/5.jpg ***!
  \****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "4c91ee8b648f913481e6.jpg";

/***/ }),

/***/ "./images/popup/6.jpg":
/*!****************************!*\
  !*** ./images/popup/6.jpg ***!
  \****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "0bce9bf3c1ddf4d407f8.jpg";

/***/ }),

/***/ "./images/popup/mobile1.jpg":
/*!**********************************!*\
  !*** ./images/popup/mobile1.jpg ***!
  \**********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f7c9f23735c6e17e3223.jpg";

/***/ }),

/***/ "./images/popup/transparency-slide1.jpg":
/*!**********************************************!*\
  !*** ./images/popup/transparency-slide1.jpg ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "51dbfc4f416b4b110fef.jpg";

/***/ }),

/***/ "./images/popup/transparency-slide2.jpg":
/*!**********************************************!*\
  !*** ./images/popup/transparency-slide2.jpg ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "437d77c32f9c3ded333b.jpg";

/***/ }),

/***/ "./images/popup/transparency-slide3.jpg":
/*!**********************************************!*\
  !*** ./images/popup/transparency-slide3.jpg ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "385ba106b77f711464b1.jpg";

/***/ }),

/***/ "./images/portfolio/img_1.jpg":
/*!************************************!*\
  !*** ./images/portfolio/img_1.jpg ***!
  \************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "55a6a0cd46ffddd2091b.jpg";

/***/ }),

/***/ "./images/portfolio/img_2.jpg":
/*!************************************!*\
  !*** ./images/portfolio/img_2.jpg ***!
  \************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "6482c4f3e49cc70feaa4.jpg";

/***/ }),

/***/ "./images/portfolio/img_3.jpg":
/*!************************************!*\
  !*** ./images/portfolio/img_3.jpg ***!
  \************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "32b0b325c262ccc8990e.jpg";

/***/ }),

/***/ "./images/portfolio/img_4.jpg":
/*!************************************!*\
  !*** ./images/portfolio/img_4.jpg ***!
  \************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "088613ae85f5c68348e3.jpg";

/***/ }),

/***/ "./images/portfolio/img_5.jpg":
/*!************************************!*\
  !*** ./images/portfolio/img_5.jpg ***!
  \************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "25043be7440ce094f5a0.jpg";

/***/ }),

/***/ "./images/portfolio/img_6.jpg":
/*!************************************!*\
  !*** ./images/portfolio/img_6.jpg ***!
  \************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "038885207680042ee676.jpg";

/***/ }),

/***/ "./images/repair-types/capital.jpg":
/*!*****************************************!*\
  !*** ./images/repair-types/capital.jpg ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "e1418538bccd9ae8c037.jpg";

/***/ }),

/***/ "./images/repair-types/cosmetic.jpg":
/*!******************************************!*\
  !*** ./images/repair-types/cosmetic.jpg ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a5093e81fe2eea3488b0.jpg";

/***/ }),

/***/ "./images/repair-types/electro.jpg":
/*!*****************************************!*\
  !*** ./images/repair-types/electro.jpg ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "b99dbbfc38f70f93dc4c.jpg";

/***/ }),

/***/ "./images/reviews/ava1.jpg":
/*!*********************************!*\
  !*** ./images/reviews/ava1.jpg ***!
  \*********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "d655a366a9a5b4f53b39.jpg";

/***/ }),

/***/ "./images/reviews/ava2.jpg":
/*!*********************************!*\
  !*** ./images/reviews/ava2.jpg ***!
  \*********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c4a509f5f8702694aa31.jpg";

/***/ }),

/***/ "./images/reviews/ava3.jpg":
/*!*********************************!*\
  !*** ./images/reviews/ava3.jpg ***!
  \*********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f327a204d613c0121b0a.jpg";

/***/ }),

/***/ "./images/reviews/ava4.jpg":
/*!*********************************!*\
  !*** ./images/reviews/ava4.jpg ***!
  \*********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "71c9190f705cb18d78c8.jpg";

/***/ }),

/***/ "./images/reviews/ava5.jpg":
/*!*********************************!*\
  !*** ./images/reviews/ava5.jpg ***!
  \*********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "16f66e37cdfdabcc77ff.jpg";

/***/ }),

/***/ "./images/stock/footnote.svg":
/*!***********************************!*\
  !*** ./images/stock/footnote.svg ***!
  \***********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "193ba7b3b4434a56f7a5.svg";

/***/ }),

/***/ "./images/stock/love.svg":
/*!*******************************!*\
  !*** ./images/stock/love.svg ***!
  \*******************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "94bde321bd0359d1dab9.svg";

/***/ }),

/***/ "./images/transparency/camera.svg":
/*!****************************************!*\
  !*** ./images/transparency/camera.svg ***!
  \****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "793a2be4a9faffcaff95.svg";

/***/ }),

/***/ "./images/transparency/item_img.jpg":
/*!******************************************!*\
  !*** ./images/transparency/item_img.jpg ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "19dd0dbfd159009ad22e.jpg";

/***/ }),

/***/ "./images/zoom.svg":
/*!*************************!*\
  !*** ./images/zoom.svg ***!
  \*************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "87e44e653ac9cbdcafe2.svg";

/***/ }),

/***/ "./index.html":
/*!********************!*\
  !*** ./index.html ***!
  \********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/html-loader/dist/runtime/getUrl.js */ "../../node_modules/html-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___HTML_LOADER_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./css/style.css */ "./css/style.css"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./images/header/phoneIcon.svg */ "./images/header/phoneIcon.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ./images/header/viber.svg */ "./images/header/viber.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ./images/header/whatsApp.svg */ "./images/header/whatsApp.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ./images/header/arrow.svg */ "./images/header/arrow.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(/*! ./images/header/menuIcon.svg */ "./images/header/menuIcon.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_6___ = new URL(/* asset import */ __webpack_require__(/*! ./images/main/circle.svg */ "./images/main/circle.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_7___ = new URL(/* asset import */ __webpack_require__(/*! ./images/main/circle_1_icon.svg */ "./images/main/circle_1_icon.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_8___ = new URL(/* asset import */ __webpack_require__(/*! ./images/main/subtract1.svg */ "./images/main/subtract1.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_9___ = new URL(/* asset import */ __webpack_require__(/*! ./images/main/circle_2_icon.svg */ "./images/main/circle_2_icon.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_10___ = new URL(/* asset import */ __webpack_require__(/*! ./images/main/subtract2.svg */ "./images/main/subtract2.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_11___ = new URL(/* asset import */ __webpack_require__(/*! ./images/main/circle_3_icon.svg */ "./images/main/circle_3_icon.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_12___ = new URL(/* asset import */ __webpack_require__(/*! ./images/main/subtract3.svg */ "./images/main/subtract3.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_13___ = new URL(/* asset import */ __webpack_require__(/*! ./images/main/feedback_icon.svg */ "./images/main/feedback_icon.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_14___ = new URL(/* asset import */ __webpack_require__(/*! ./images/repair-types/electro.jpg */ "./images/repair-types/electro.jpg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_15___ = new URL(/* asset import */ __webpack_require__(/*! ./images/repair-types/cosmetic.jpg */ "./images/repair-types/cosmetic.jpg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_16___ = new URL(/* asset import */ __webpack_require__(/*! ./images/repair-types/capital.jpg */ "./images/repair-types/capital.jpg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_17___ = new URL(/* asset import */ __webpack_require__(/*! ./images/portfolio/img_1.jpg */ "./images/portfolio/img_1.jpg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_18___ = new URL(/* asset import */ __webpack_require__(/*! ./images/portfolio/img_2.jpg */ "./images/portfolio/img_2.jpg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_19___ = new URL(/* asset import */ __webpack_require__(/*! ./images/portfolio/img_3.jpg */ "./images/portfolio/img_3.jpg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_20___ = new URL(/* asset import */ __webpack_require__(/*! ./images/portfolio/img_4.jpg */ "./images/portfolio/img_4.jpg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_21___ = new URL(/* asset import */ __webpack_require__(/*! ./images/portfolio/img_5.jpg */ "./images/portfolio/img_5.jpg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_22___ = new URL(/* asset import */ __webpack_require__(/*! ./images/portfolio/img_6.jpg */ "./images/portfolio/img_6.jpg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_23___ = new URL(/* asset import */ __webpack_require__(/*! ./images/zoom.svg */ "./images/zoom.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_24___ = new URL(/* asset import */ __webpack_require__(/*! ./images/transparency/item_img.jpg */ "./images/transparency/item_img.jpg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_25___ = new URL(/* asset import */ __webpack_require__(/*! ./images/transparency/camera.svg */ "./images/transparency/camera.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_26___ = new URL(/* asset import */ __webpack_require__(/*! ./images/stock/love.svg */ "./images/stock/love.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_27___ = new URL(/* asset import */ __webpack_require__(/*! ./images/stock/footnote.svg */ "./images/stock/footnote.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_28___ = new URL(/* asset import */ __webpack_require__(/*! ./images/feedback-block/phone_icon.svg */ "./images/feedback-block/phone_icon.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_29___ = new URL(/* asset import */ __webpack_require__(/*! ./images/feedback-block/viber_icon.svg */ "./images/feedback-block/viber_icon.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_30___ = new URL(/* asset import */ __webpack_require__(/*! ./images/feedback-block/whatsapp_icon.svg */ "./images/feedback-block/whatsapp_icon.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_31___ = new URL(/* asset import */ __webpack_require__(/*! ./images/reviews/ava1.jpg */ "./images/reviews/ava1.jpg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_32___ = new URL(/* asset import */ __webpack_require__(/*! ./images/reviews/ava2.jpg */ "./images/reviews/ava2.jpg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_33___ = new URL(/* asset import */ __webpack_require__(/*! ./images/reviews/ava3.jpg */ "./images/reviews/ava3.jpg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_34___ = new URL(/* asset import */ __webpack_require__(/*! ./images/reviews/ava4.jpg */ "./images/reviews/ava4.jpg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_35___ = new URL(/* asset import */ __webpack_require__(/*! ./images/reviews/ava5.jpg */ "./images/reviews/ava5.jpg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_36___ = new URL(/* asset import */ __webpack_require__(/*! ./images/footer/contacts_icon.svg */ "./images/footer/contacts_icon.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_37___ = new URL(/* asset import */ __webpack_require__(/*! ./images/footer/phone.svg */ "./images/footer/phone.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_38___ = new URL(/* asset import */ __webpack_require__(/*! ./images/footer/menu.svg */ "./images/footer/menu.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_39___ = new URL(/* asset import */ __webpack_require__(/*! ./images/popup/1.jpg */ "./images/popup/1.jpg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_40___ = new URL(/* asset import */ __webpack_require__(/*! ./images/popup/2.jpg */ "./images/popup/2.jpg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_41___ = new URL(/* asset import */ __webpack_require__(/*! ./images/popup/3.jpg */ "./images/popup/3.jpg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_42___ = new URL(/* asset import */ __webpack_require__(/*! ./images/popup/4.jpg */ "./images/popup/4.jpg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_43___ = new URL(/* asset import */ __webpack_require__(/*! ./images/popup/5.jpg */ "./images/popup/5.jpg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_44___ = new URL(/* asset import */ __webpack_require__(/*! ./images/popup/6.jpg */ "./images/popup/6.jpg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_45___ = new URL(/* asset import */ __webpack_require__(/*! ./images/popup/transparency-slide1.jpg */ "./images/popup/transparency-slide1.jpg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_46___ = new URL(/* asset import */ __webpack_require__(/*! ./images/popup/mobile1.jpg */ "./images/popup/mobile1.jpg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_47___ = new URL(/* asset import */ __webpack_require__(/*! ./images/popup/transparency-slide2.jpg */ "./images/popup/transparency-slide2.jpg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_48___ = new URL(/* asset import */ __webpack_require__(/*! ./images/popup/transparency-slide3.jpg */ "./images/popup/transparency-slide3.jpg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_49___ = new URL(/* asset import */ __webpack_require__(/*! ./maskPhone.js */ "./maskPhone.js"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_50___ = new URL(/* asset import */ __webpack_require__(/*! ./index.js */ "./index.js"), __webpack_require__.b);
// Module
var ___HTML_LOADER_REPLACEMENT_0___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_0___);
var ___HTML_LOADER_REPLACEMENT_1___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_1___);
var ___HTML_LOADER_REPLACEMENT_2___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_2___);
var ___HTML_LOADER_REPLACEMENT_3___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_3___);
var ___HTML_LOADER_REPLACEMENT_4___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_4___);
var ___HTML_LOADER_REPLACEMENT_5___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_5___);
var ___HTML_LOADER_REPLACEMENT_6___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_6___);
var ___HTML_LOADER_REPLACEMENT_7___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_7___);
var ___HTML_LOADER_REPLACEMENT_8___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_8___);
var ___HTML_LOADER_REPLACEMENT_9___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_9___);
var ___HTML_LOADER_REPLACEMENT_10___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_10___);
var ___HTML_LOADER_REPLACEMENT_11___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_11___);
var ___HTML_LOADER_REPLACEMENT_12___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_12___);
var ___HTML_LOADER_REPLACEMENT_13___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_13___);
var ___HTML_LOADER_REPLACEMENT_14___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_14___);
var ___HTML_LOADER_REPLACEMENT_15___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_15___);
var ___HTML_LOADER_REPLACEMENT_16___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_16___);
var ___HTML_LOADER_REPLACEMENT_17___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_17___);
var ___HTML_LOADER_REPLACEMENT_18___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_18___);
var ___HTML_LOADER_REPLACEMENT_19___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_19___);
var ___HTML_LOADER_REPLACEMENT_20___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_20___);
var ___HTML_LOADER_REPLACEMENT_21___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_21___);
var ___HTML_LOADER_REPLACEMENT_22___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_22___);
var ___HTML_LOADER_REPLACEMENT_23___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_23___);
var ___HTML_LOADER_REPLACEMENT_24___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_24___);
var ___HTML_LOADER_REPLACEMENT_25___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_25___);
var ___HTML_LOADER_REPLACEMENT_26___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_26___);
var ___HTML_LOADER_REPLACEMENT_27___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_27___);
var ___HTML_LOADER_REPLACEMENT_28___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_28___);
var ___HTML_LOADER_REPLACEMENT_29___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_29___);
var ___HTML_LOADER_REPLACEMENT_30___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_30___);
var ___HTML_LOADER_REPLACEMENT_31___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_31___);
var ___HTML_LOADER_REPLACEMENT_32___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_32___);
var ___HTML_LOADER_REPLACEMENT_33___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_33___);
var ___HTML_LOADER_REPLACEMENT_34___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_34___);
var ___HTML_LOADER_REPLACEMENT_35___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_35___);
var ___HTML_LOADER_REPLACEMENT_36___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_36___);
var ___HTML_LOADER_REPLACEMENT_37___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_37___);
var ___HTML_LOADER_REPLACEMENT_38___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_38___);
var ___HTML_LOADER_REPLACEMENT_39___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_39___);
var ___HTML_LOADER_REPLACEMENT_40___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_40___);
var ___HTML_LOADER_REPLACEMENT_41___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_41___);
var ___HTML_LOADER_REPLACEMENT_42___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_42___);
var ___HTML_LOADER_REPLACEMENT_43___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_43___);
var ___HTML_LOADER_REPLACEMENT_44___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_44___);
var ___HTML_LOADER_REPLACEMENT_45___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_45___);
var ___HTML_LOADER_REPLACEMENT_46___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_46___);
var ___HTML_LOADER_REPLACEMENT_47___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_47___);
var ___HTML_LOADER_REPLACEMENT_48___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_48___);
var ___HTML_LOADER_REPLACEMENT_49___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_49___);
var ___HTML_LOADER_REPLACEMENT_50___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_50___);
var code = "<!doctype html>\n<html lang=\"ru\">\n<head>\n\t<meta charset=\"UTF-8\">\n\t<meta name=\"viewport\" content=\"width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1\">\n\t<meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n\t<link href=\"https://fonts.googleapis.com/css?family=Noto+Sans+SC:100,300,400,500,700,900&amp;subset=cyrillic\"\n\t\t  rel=\"stylesheet\">\n\t<link\n\t\t\thref=\"https://fonts.googleapis.com/css?family=Montserrat+Alternates:400,600,700,800,900&amp;subset=cyrillic,cyrillic-ext\"\n\t\t\trel=\"stylesheet\">\n\t<link rel=\"stylesheet\" href=\"" + ___HTML_LOADER_REPLACEMENT_0___ + "\">\n\t<title>Relax Live</title></head>\n<body>\n\t<div class=\"main\" id=\"main\">\n\t\t<header class=\"header\">\n\t\t\t<div class=\"header-contacts\">\n\t\t\t\t<div class=\"header-contacts__phone-icon\">\n\t\t\t\t\t<a href=\"tel:+79123456789\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_1___ + "\"\n\t\t\t\t\t\t\t\t\t\t\t\t\talt=\"phoneIcon\"></a></div>\n\t\t\t\t<div class=\"header-contacts-wrap\">\n\t\t\t\t\t<div class=\"header-contacts__phone-number-wrap\"><a class=\"header-contacts__phone-number\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   href=\"tel:+79123456789\">+7 (123) 456-78-90</a>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"header-contacts__phone-number-accord\"><a class=\"header-contacts__phone-number\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t href=\"tel:+79876543210\">+7 (987) 654-32-10</a>\n\t\t\t\t\t\t<div class=\"header-contacts__messagers\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_2___ + "\" alt=\"viber\"> <img\n\t\t\t\t\t\t\t\tsrc=\"" + ___HTML_LOADER_REPLACEMENT_3___ + "\" alt=\"whatsApp\">\n\t\t\t\t\t\t\t<span class=\"header-contacts__messagers-descr\">Viber / WhatsApp</span>\n\t\t\t\t\t\t</div><!-- contacts__messagers --></div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"header-contacts__arrow\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_4___ + "\" alt=\"arrow\"></div>\n\t\t\t</div><!-- contacts -->\n\t\t\t<div class=\"logo\">Relax Live</div>\n\t\t\t<div class=\"menu\">\n\t\t\t\t<div class=\"menu-phone-icon\">\n\t\t\t\t\t<a href=\"tel:+79123456789\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_1___ + "\" alt=\"phoneIcon\"></a>\n\t\t\t\t</div>\n\t\t\t\t<span class=\"menu__title\">Меню </span><img class=\"menu__icon\" src=\"" + ___HTML_LOADER_REPLACEMENT_5___ + "\" alt=\"menuIcon\">\n\t\t\t</div><!-- menu --></header><!-- header -->\n\t\t<div class=\"wrapper_middle\">\n\t\t\t<div class=\"main-title\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<h1 class=\"main-title__title\">Гибкие и универсальные услуги ремонта жилых помещений</h1>\n\t\t\t\t\t<div class=\"main-title__descr\">Широкий спектр услуг позволяет нам гибко подстраиваться под любого клиента</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"services\">\n\t\t\t\t<div class=\"services-title\">Вызывайте нашего специалиста прямо сейчас и в течении 24 часов Вы получите:</div>\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"services-item services-item-1\">\n\t\t\t\t\t\t<div class=\"services-item__img\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_6___ + "\" alt=\"circle\"> <img\n\t\t\t\t\t\t\t\tclass=\"services-item__img-inner-1\" src=\"" + ___HTML_LOADER_REPLACEMENT_7___ + "\" alt=\"circle\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"services-item__descr\">Замер помещения для будущего\n\t\t\t\t\t\t\t<img src=\"" + ___HTML_LOADER_REPLACEMENT_8___ + "\"\n\t\t\t\t\t\t\t\t alt=\"ремонта\"></div>\n\t\t\t\t\t</div><!-- services-item - 1-->\n\t\t\t\t\t<div class=\"services-item services-item-2\">\n\t\t\t\t\t\t<div class=\"services-item__img\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_6___ + "\" alt=\"circle\"> <img\n\t\t\t\t\t\t\t\tclass=\"services-item__img-inner-2\" src=\"" + ___HTML_LOADER_REPLACEMENT_9___ + "\" alt=\"circle\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"services-item__descr\">\n\t\t\t\t\t\t\t<div>Смету работ для\n\t\t\t\t\t\t\t\t<span>вашего<img src=\"" + ___HTML_LOADER_REPLACEMENT_10___ + "\" alt=\"проекта\"></span></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div><!-- services-item - 2--></div><!-- /row -->\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"services-item services-item-3\">\n\t\t\t\t\t\t<div class=\"services-item__img\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_6___ + "\" alt=\"circle\"> <img\n\t\t\t\t\t\t\t\tclass=\"services-item__img-inner-3\" src=\"" + ___HTML_LOADER_REPLACEMENT_11___ + "\" alt=\"circle\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"services-item__descr\">Расчет стоимости\n\t\t\t\t\t\t\t<img src=\"" + ___HTML_LOADER_REPLACEMENT_12___ + "\" alt=\"материалов\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div><!-- services-item - 3-->\n\t\t\t\t\t<div class=\"services-item services-item-4\">\n\t\t\t\t\t\t<div class=\"services-item__img\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_6___ + "\" alt=\"circle\">\n\t\t\t\t\t\t\t<div class=\"services-item__img-inner-4\">\n\t\t\t\t\t\t\t\t<svg width=\"53\" height=\"53\" fill=\"white\" viewBox=\"0 0 53 53\" preserveAspectRatio=\"xMinYMin meet\"\n\t\t\t\t\t\t\t\t\t xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t\t\t<path\n\t\t\t\t\t\t\t\t\t\t\td=\"M50.35 16.783H25.617a2.653 2.653 0 0 0-2.65 2.65V50.35a2.653 2.653 0 0 0 2.65 2.65H50.35A2.653 2.653 0 0 0 53 50.35V19.433a2.653 2.653 0 0 0-2.65-2.65zm.883 33.567a.884.884 0 0 1-.883.883H25.617a.884.884 0 0 1-.884-.883V19.433c0-.488.396-.883.884-.883H50.35c.488 0 .883.395.883.883V50.35z\"></path>\n\t\t\t\t\t\t\t\t\t<path\n\t\t\t\t\t\t\t\t\t\t\td=\"M46.817 20.317H29.15a2.653 2.653 0 0 0-2.65 2.65v2.65a2.653 2.653 0 0 0 2.65 2.65h17.667a2.653 2.653 0 0 0 2.65-2.65v-2.65a2.653 2.653 0 0 0-2.65-2.65zm.883 5.3a.884.884 0 0 1-.883.883H29.15a.884.884 0 0 1-.883-.883v-2.65c0-.488.395-.883.883-.884h17.667c.487 0 .883.396.883.884v2.65zM31.8 30.033h-1.767a1.769 1.769 0 0 0-1.766 1.767v1.767a1.769 1.769 0 0 0 1.766 1.766H31.8a1.769 1.769 0 0 0 1.767-1.766V31.8a1.769 1.769 0 0 0-1.767-1.767zm-1.767 3.534V31.8H31.8v1.767h-1.767zM38.867 30.033H37.1a1.769 1.769 0 0 0-1.767 1.767v1.767a1.769 1.769 0 0 0 1.767 1.766h1.767a1.769 1.769 0 0 0 1.766-1.766V31.8a1.769 1.769 0 0 0-1.766-1.767zM37.1 33.567V31.8h1.767v1.767H37.1zM45.933 30.033h-1.766A1.769 1.769 0 0 0 42.4 31.8v1.767a1.769 1.769 0 0 0 1.767 1.766h1.766a1.769 1.769 0 0 0 1.767-1.766V31.8a1.769 1.769 0 0 0-1.767-1.767zm-1.766 3.534V31.8h1.766l.001 1.767h-1.767zM31.8 37.1h-1.767a1.769 1.769 0 0 0-1.766 1.767v1.766a1.769 1.769 0 0 0 1.766 1.767H31.8a1.769 1.769 0 0 0 1.767-1.767v-1.766A1.769 1.769 0 0 0 31.8 37.1zm-1.767 3.533v-1.766H31.8v1.766h-1.767zM38.867 37.1H37.1a1.769 1.769 0 0 0-1.767 1.767v1.766A1.769 1.769 0 0 0 37.1 42.4h1.767a1.769 1.769 0 0 0 1.766-1.767v-1.766a1.769 1.769 0 0 0-1.766-1.767zM37.1 40.633v-1.766h1.767v1.766H37.1zM45.933 37.1h-1.766a1.769 1.769 0 0 0-1.767 1.767v1.766a1.769 1.769 0 0 0 1.767 1.767h1.766a1.769 1.769 0 0 0 1.767-1.767v-1.766a1.769 1.769 0 0 0-1.767-1.767zm-1.766 3.533v-1.766h1.766l.001 1.766h-1.767zM31.8 44.167h-1.767a1.769 1.769 0 0 0-1.766 1.766V47.7a1.769 1.769 0 0 0 1.766 1.767H31.8a1.769 1.769 0 0 0 1.767-1.767v-1.767a1.769 1.769 0 0 0-1.767-1.766zM30.033 47.7v-1.767H31.8V47.7h-1.767zM38.867 44.167H37.1a1.769 1.769 0 0 0-1.767 1.766V47.7a1.769 1.769 0 0 0 1.767 1.767h1.767a1.769 1.769 0 0 0 1.766-1.767v-1.767a1.769 1.769 0 0 0-1.766-1.766zM37.1 47.7v-1.767h1.767V47.7H37.1zM45.933 44.167h-1.766a1.769 1.769 0 0 0-1.767 1.766V47.7a1.769 1.769 0 0 0 1.767 1.767h1.766A1.769 1.769 0 0 0 47.7 47.7v-1.767a1.769 1.769 0 0 0-1.767-1.766zM44.167 47.7v-1.767h1.766l.001 1.767h-1.767z\"></path>\n\t\t\t\t\t\t\t\t\t<path\n\t\t\t\t\t\t\t\t\t\t\td=\"M1.767 48.584V12.367h7.95a2.653 2.653 0 0 0 2.65-2.65v-7.95H34.45c.488 0 .883.395.883.883v12.367H37.1V2.65A2.653 2.653 0 0 0 34.45 0H12.215a2.633 2.633 0 0 0-1.874.776L.776 10.341A2.634 2.634 0 0 0 0 12.215v36.369a2.653 2.653 0 0 0 2.65 2.65H21.2v-1.767H2.65a.884.884 0 0 1-.883-.883zM10.6 3.016v6.7a.884.884 0 0 1-.883.884H3.016L10.6 3.016z\"></path>\n\t\t\t\t\t\t\t\t\t<path\n\t\t\t\t\t\t\t\t\t\t\td=\"M19.433 22.083a7.066 7.066 0 1 0-7.066 7.067 7.075 7.075 0 0 0 7.066-7.067zm-7.95-5.22v3.454a.884.884 0 0 1-.883.883H7.147a5.305 5.305 0 0 1 4.336-4.337zm.884 10.52a5.304 5.304 0 0 1-5.22-4.416H10.6a2.653 2.653 0 0 0 2.65-2.65v-3.454a5.297 5.297 0 0 1-.883 10.52zM18.992 9.717c.731-.001 1.324-.594 1.325-1.325v-2.65c-.001-.732-.594-1.324-1.325-1.325h-2.65c-.732 0-1.324.593-1.325 1.325v2.65c0 .731.593 1.324 1.325 1.325h2.65zm-2.209-3.534h1.767V7.95h-1.767V6.183zM22.083 5.3a.883.883 0 1 1 1.767 0 .883.883 0 0 1-1.767 0zM25.617 5.3c0-.488.395-.883.883-.883h6.183a.883.883 0 0 1 0 1.766H26.5a.883.883 0 0 1-.883-.883zM22.083 8.833a.883.883 0 1 1 1.767 0 .883.883 0 0 1-1.767 0zM25.617 8.833c0-.488.395-.883.883-.883h6.183a.883.883 0 0 1 0 1.767H26.5a.883.883 0 0 1-.883-.884zM15.017 12.367a.883.883 0 1 1 1.766 0 .883.883 0 0 1-1.766 0zM18.55 12.367c0-.488.395-.884.883-.884h9.717a.883.883 0 1 1 0 1.767h-9.717a.883.883 0 0 1-.883-.883zM31.8 12.367a.883.883 0 1 1 1.767 0 .883.883 0 0 1-1.767 0zM19.875 30.917h-2.65c-.732 0-1.324.593-1.325 1.325v2.65c0 .731.593 1.324 1.325 1.325h2.65c.731-.001 1.324-.594 1.325-1.325v-2.65c-.001-.732-.594-1.324-1.325-1.325zm-.442 3.533h-1.766v-1.767h1.766v1.767zM12.367 31.8a.883.883 0 1 1 1.766 0 .883.883 0 0 1-1.766 0zM3.533 31.8c0-.488.396-.883.884-.883h5.3a.883.883 0 0 1 0 1.766h-5.3a.883.883 0 0 1-.884-.883zM12.367 35.333a.883.883 0 1 1 1.766 0 .883.883 0 0 1-1.766 0zM3.533 35.333c0-.487.396-.883.884-.883h5.3a.883.883 0 0 1 0 1.767h-5.3a.883.883 0 0 1-.884-.884zM3.533 45.492c.001.731.594 1.324 1.325 1.325h2.65c.732-.001 1.325-.594 1.325-1.325v-2.65c0-.732-.593-1.325-1.325-1.325h-2.65c-.731 0-1.324.593-1.325 1.325v2.65zM5.3 43.283h1.767v1.767H5.3v-1.767zM10.6 42.4a.883.883 0 1 1 1.767 0 .883.883 0 0 1-1.767 0zM14.133 42.4c0-.488.396-.883.884-.883h5.3a.883.883 0 1 1 0 1.766h-5.3a.883.883 0 0 1-.884-.883zM10.6 45.933a.883.883 0 1 1 1.767 0 .883.883 0 0 1-1.767 0zM14.133 45.933c0-.487.396-.883.884-.883h5.3a.883.883 0 1 1 0 1.767h-5.3a.883.883 0 0 1-.884-.884zM19.433 38.867a.883.883 0 1 1 1.767 0 .883.883 0 0 1-1.767 0zM7.067 38.867c0-.488.395-.884.883-.884h8.833a.883.883 0 1 1 0 1.767H7.95a.883.883 0 0 1-.883-.883zM3.533 38.867a.883.883 0 1 1 1.767 0 .883.883 0 0 1-1.767 0z\"></path>\n\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"services-item__descr\">Предварительную стоимость\n\t\t\t\t\t\t\t<div class=\"transparency-text-variable\">\n\t\t\t\t\t\t\t\t<svg width=\"84\" height=\"26\" fill=\"white\" viewBox=\"0 0 84 26\" preserveAspectRatio=\"xMinYMin meet\"\n\t\t\t\t\t\t\t\t\t xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t\t\t<path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n\t\t\t\t\t\t\t\t\t\t  d=\"M2.805.208a2.02 2.02 0 0 0-2.02 2.02v21.554a2.02 2.02 0 0 0 2.02 2.02h78.802a2.02 2.02 0 0 0 2.02-2.02V2.229a2.02 2.02 0 0 0-2.02-2.02H2.805zM9.927 21.37H8.395V8.371h1.263l.135 1.044h.05c.825-.673 1.852-1.28 2.913-1.28 2.357 0 3.637 1.853 3.637 4.665 0 3.131-1.869 4.933-3.974 4.933-.825 0-1.7-.387-2.525-1.06l.033 1.599v3.098zm0-5.876c.825.707 1.633.96 2.24.96 1.515 0 2.626-1.365 2.626-3.638 0-2.02-.673-3.384-2.407-3.384-.775 0-1.566.438-2.459 1.263v4.799zm15.628 1.296c-.808.522-1.785.943-3.03.943-2.426 0-4.379-1.768-4.379-4.782 0-2.963 2.004-4.816 4.125-4.816 2.324 0 3.637 1.684 3.637 4.294 0 .337-.033.657-.067.876h-6.163c.101 1.953 1.297 3.199 3.031 3.199.893 0 1.617-.27 2.29-.724l.556 1.01zm-3.267-7.425c-1.296 0-2.441 1.043-2.626 2.845h4.9c0-1.852-.842-2.845-2.274-2.845zm7.253 8.15H28.16V8.37h1.768l1.802 4.294c.127.365.257.718.386 1.067.145.393.288.78.422 1.172h.084c.072-.185.144-.37.217-.553.218-.553.436-1.105.625-1.686l1.751-4.294h1.768v9.143h-1.397V13.39c0-.792.097-2.15.164-3.092l.004-.057h-.067c-.187.503-.399 1.021-.6 1.517-.09.218-.177.432-.26.638l-1.733 4.26h-1.028l-1.768-4.26a40.892 40.892 0 0 1-.841-2.155h-.085c.017.303.04.652.064 1.014.05.765.105 1.586.105 2.135v4.125zm18.32-4.564c0 3.03-2.004 4.782-4.243 4.782-2.24 0-4.243-1.751-4.243-4.782 0-3.048 2.003-4.816 4.243-4.816s4.243 1.768 4.243 4.816zm-6.887 0c0 2.105 1.061 3.502 2.644 3.502 1.583 0 2.66-1.397 2.66-3.502 0-2.105-1.077-3.536-2.66-3.536-1.583 0-2.644 1.431-2.644 3.536zm10.835 4.563h-1.533V8.371h1.533v3.704h4.411V8.371h1.532v9.143H56.22V13.44H51.81v4.075zm12.576 0h-1.532V9.617H59.79V8.371h7.678v1.246h-3.082v7.897zm9.822-1.094c-.876.724-1.903 1.313-3.031 1.313-1.532 0-2.677-.943-2.677-2.593 0-1.987 1.734-2.98 5.624-3.418 0-1.179-.388-2.307-1.886-2.307-1.061 0-2.02.488-2.745.977l-.606-1.061c.842-.539 2.138-1.196 3.603-1.196 2.223 0 3.166 1.499 3.166 3.755v5.624h-1.263l-.135-1.094h-.05zm-4.21-1.381c0 1.044.707 1.465 1.617 1.465.892 0 1.616-.421 2.509-1.213v-2.559c-3.082.37-4.126 1.128-4.126 2.307z\"></path>\n\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div><!-- services-item - 4--></div><!-- /row -->\n\t\t\t\t<div class=\"services-slider\">\n\t\t\t\t\t<div class=\"services-slider__slide services-item\">\n\t\t\t\t\t\t<div class=\"services-item__img\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_6___ + "\" alt=\"circle\"> <img\n\t\t\t\t\t\t\t\tclass=\"services-item__img-inner-1\" src=\"" + ___HTML_LOADER_REPLACEMENT_7___ + "\" alt=\"circle\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"services-item__descr\">Замер помещения для будущего\n\t\t\t\t\t\t\t<img src=\"" + ___HTML_LOADER_REPLACEMENT_8___ + "\"\n\t\t\t\t\t\t\t\t alt=\"ремонта\"></div>\n\t\t\t\t\t</div><!-- services-item - 1-->\n\t\t\t\t\t<div class=\"services-slider__slide services-item\">\n\t\t\t\t\t\t<div class=\"services-item__img\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_6___ + "\" alt=\"circle\"> <img\n\t\t\t\t\t\t\t\tclass=\"services-item__img-inner-2\" src=\"" + ___HTML_LOADER_REPLACEMENT_9___ + "\" alt=\"circle\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"services-item__descr\">\n\t\t\t\t\t\t\t<div>Смету работ для\n\t\t\t\t\t\t\t\t<span>вашего<img src=\"" + ___HTML_LOADER_REPLACEMENT_10___ + "\" alt=\"проекта\"></span></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div><!-- services-item - 2-->\n\t\t\t\t\t<div class=\"services-slider__slide services-item\">\n\t\t\t\t\t\t<div class=\"services-item__img\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_6___ + "\" alt=\"circle\"> <img\n\t\t\t\t\t\t\t\tclass=\"services-item__img-inner-3\" src=\"" + ___HTML_LOADER_REPLACEMENT_11___ + "\" alt=\"circle\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"services-item__descr\">Расчет стоимости\n\t\t\t\t\t\t\t<img src=\"" + ___HTML_LOADER_REPLACEMENT_12___ + "\" alt=\"материалов\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div><!-- services-item - 3-->\n\t\t\t\t\t<div class=\"services-slider__slide services-item\">\n\t\t\t\t\t\t<div class=\"services-item__img\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_6___ + "\" alt=\"circle\">\n\t\t\t\t\t\t\t<div class=\"services-item__img-inner-4\">\n\t\t\t\t\t\t\t\t<svg width=\"53\" height=\"53\" fill=\"none\" viewBox=\"0 0 53 53\" preserveAspectRatio=\"xMinYMin meet\"\n\t\t\t\t\t\t\t\t\t xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t\t\t<path\n\t\t\t\t\t\t\t\t\t\t\td=\"M50.35 16.783H25.617a2.653 2.653 0 0 0-2.65 2.65V50.35a2.653 2.653 0 0 0 2.65 2.65H50.35A2.653 2.653 0 0 0 53 50.35V19.433a2.653 2.653 0 0 0-2.65-2.65zm.883 33.567a.884.884 0 0 1-.883.883H25.617a.884.884 0 0 1-.884-.883V19.433c0-.488.396-.883.884-.883H50.35c.488 0 .883.395.883.883V50.35z\"\n\t\t\t\t\t\t\t\t\t\t\tfill=\"#322823\"></path>\n\t\t\t\t\t\t\t\t\t<path\n\t\t\t\t\t\t\t\t\t\t\td=\"M46.817 20.317H29.15a2.653 2.653 0 0 0-2.65 2.65v2.65a2.653 2.653 0 0 0 2.65 2.65h17.667a2.653 2.653 0 0 0 2.65-2.65v-2.65a2.653 2.653 0 0 0-2.65-2.65zm.883 5.3a.884.884 0 0 1-.883.883H29.15a.884.884 0 0 1-.883-.883v-2.65c0-.488.395-.883.883-.884h17.667c.487 0 .883.396.883.884v2.65zM31.8 30.033h-1.767a1.769 1.769 0 0 0-1.766 1.767v1.767a1.769 1.769 0 0 0 1.766 1.766H31.8a1.769 1.769 0 0 0 1.767-1.766V31.8a1.769 1.769 0 0 0-1.767-1.767zm-1.767 3.534V31.8H31.8v1.767h-1.767zM38.867 30.033H37.1a1.769 1.769 0 0 0-1.767 1.767v1.767a1.769 1.769 0 0 0 1.767 1.766h1.767a1.769 1.769 0 0 0 1.766-1.766V31.8a1.769 1.769 0 0 0-1.766-1.767zM37.1 33.567V31.8h1.767v1.767H37.1zM45.933 30.033h-1.766A1.769 1.769 0 0 0 42.4 31.8v1.767a1.769 1.769 0 0 0 1.767 1.766h1.766a1.769 1.769 0 0 0 1.767-1.766V31.8a1.769 1.769 0 0 0-1.767-1.767zm-1.766 3.534V31.8h1.766l.001 1.767h-1.767zM31.8 37.1h-1.767a1.769 1.769 0 0 0-1.766 1.767v1.766a1.769 1.769 0 0 0 1.766 1.767H31.8a1.769 1.769 0 0 0 1.767-1.767v-1.766A1.769 1.769 0 0 0 31.8 37.1zm-1.767 3.533v-1.766H31.8v1.766h-1.767zM38.867 37.1H37.1a1.769 1.769 0 0 0-1.767 1.767v1.766A1.769 1.769 0 0 0 37.1 42.4h1.767a1.769 1.769 0 0 0 1.766-1.767v-1.766a1.769 1.769 0 0 0-1.766-1.767zM37.1 40.633v-1.766h1.767v1.766H37.1zM45.933 37.1h-1.766a1.769 1.769 0 0 0-1.767 1.767v1.766a1.769 1.769 0 0 0 1.767 1.767h1.766a1.769 1.769 0 0 0 1.767-1.767v-1.766a1.769 1.769 0 0 0-1.767-1.767zm-1.766 3.533v-1.766h1.766l.001 1.766h-1.767zM31.8 44.167h-1.767a1.769 1.769 0 0 0-1.766 1.766V47.7a1.769 1.769 0 0 0 1.766 1.767H31.8a1.769 1.769 0 0 0 1.767-1.767v-1.767a1.769 1.769 0 0 0-1.767-1.766zM30.033 47.7v-1.767H31.8V47.7h-1.767zM38.867 44.167H37.1a1.769 1.769 0 0 0-1.767 1.766V47.7a1.769 1.769 0 0 0 1.767 1.767h1.767a1.769 1.769 0 0 0 1.766-1.767v-1.767a1.769 1.769 0 0 0-1.766-1.766zM37.1 47.7v-1.767h1.767V47.7H37.1zM45.933 44.167h-1.766a1.769 1.769 0 0 0-1.767 1.766V47.7a1.769 1.769 0 0 0 1.767 1.767h1.766A1.769 1.769 0 0 0 47.7 47.7v-1.767a1.769 1.769 0 0 0-1.767-1.766zM44.167 47.7v-1.767h1.766l.001 1.767h-1.767z\"\n\t\t\t\t\t\t\t\t\t\t\tfill=\"#322823\"></path>\n\t\t\t\t\t\t\t\t\t<path\n\t\t\t\t\t\t\t\t\t\t\td=\"M1.767 48.584V12.367h7.95a2.653 2.653 0 0 0 2.65-2.65v-7.95H34.45c.488 0 .883.395.883.883v12.367H37.1V2.65A2.653 2.653 0 0 0 34.45 0H12.215a2.633 2.633 0 0 0-1.874.776L.776 10.341A2.634 2.634 0 0 0 0 12.215v36.369a2.653 2.653 0 0 0 2.65 2.65H21.2v-1.767H2.65a.884.884 0 0 1-.883-.883zM10.6 3.016v6.7a.884.884 0 0 1-.883.884H3.016L10.6 3.016z\"\n\t\t\t\t\t\t\t\t\t\t\tfill=\"#322823\"></path>\n\t\t\t\t\t\t\t\t\t<path\n\t\t\t\t\t\t\t\t\t\t\td=\"M19.433 22.083a7.066 7.066 0 1 0-7.066 7.067 7.075 7.075 0 0 0 7.066-7.067zm-7.95-5.22v3.454a.884.884 0 0 1-.883.883H7.147a5.305 5.305 0 0 1 4.336-4.337zm.884 10.52a5.304 5.304 0 0 1-5.22-4.416H10.6a2.653 2.653 0 0 0 2.65-2.65v-3.454a5.297 5.297 0 0 1-.883 10.52zM18.992 9.717c.731-.001 1.324-.594 1.325-1.325v-2.65c-.001-.732-.594-1.324-1.325-1.325h-2.65c-.732 0-1.324.593-1.325 1.325v2.65c0 .731.593 1.324 1.325 1.325h2.65zm-2.209-3.534h1.767V7.95h-1.767V6.183zM22.083 5.3a.883.883 0 1 1 1.767 0 .883.883 0 0 1-1.767 0zM25.617 5.3c0-.488.395-.883.883-.883h6.183a.883.883 0 0 1 0 1.766H26.5a.883.883 0 0 1-.883-.883zM22.083 8.833a.883.883 0 1 1 1.767 0 .883.883 0 0 1-1.767 0zM25.617 8.833c0-.488.395-.883.883-.883h6.183a.883.883 0 0 1 0 1.767H26.5a.883.883 0 0 1-.883-.884zM15.017 12.367a.883.883 0 1 1 1.766 0 .883.883 0 0 1-1.766 0zM18.55 12.367c0-.488.395-.884.883-.884h9.717a.883.883 0 1 1 0 1.767h-9.717a.883.883 0 0 1-.883-.883zM31.8 12.367a.883.883 0 1 1 1.767 0 .883.883 0 0 1-1.767 0zM19.875 30.917h-2.65c-.732 0-1.324.593-1.325 1.325v2.65c0 .731.593 1.324 1.325 1.325h2.65c.731-.001 1.324-.594 1.325-1.325v-2.65c-.001-.732-.594-1.324-1.325-1.325zm-.442 3.533h-1.766v-1.767h1.766v1.767zM12.367 31.8a.883.883 0 1 1 1.766 0 .883.883 0 0 1-1.766 0zM3.533 31.8c0-.488.396-.883.884-.883h5.3a.883.883 0 0 1 0 1.766h-5.3a.883.883 0 0 1-.884-.883zM12.367 35.333a.883.883 0 1 1 1.766 0 .883.883 0 0 1-1.766 0zM3.533 35.333c0-.487.396-.883.884-.883h5.3a.883.883 0 0 1 0 1.767h-5.3a.883.883 0 0 1-.884-.884zM3.533 45.492c.001.731.594 1.324 1.325 1.325h2.65c.732-.001 1.325-.594 1.325-1.325v-2.65c0-.732-.593-1.325-1.325-1.325h-2.65c-.731 0-1.324.593-1.325 1.325v2.65zM5.3 43.283h1.767v1.767H5.3v-1.767zM10.6 42.4a.883.883 0 1 1 1.767 0 .883.883 0 0 1-1.767 0zM14.133 42.4c0-.488.396-.883.884-.883h5.3a.883.883 0 1 1 0 1.766h-5.3a.883.883 0 0 1-.884-.883zM10.6 45.933a.883.883 0 1 1 1.767 0 .883.883 0 0 1-1.767 0zM14.133 45.933c0-.487.396-.883.884-.883h5.3a.883.883 0 1 1 0 1.767h-5.3a.883.883 0 0 1-.884-.884zM19.433 38.867a.883.883 0 1 1 1.767 0 .883.883 0 0 1-1.767 0zM7.067 38.867c0-.488.395-.884.883-.884h8.833a.883.883 0 1 1 0 1.767H7.95a.883.883 0 0 1-.883-.883zM3.533 38.867a.883.883 0 1 1 1.767 0 .883.883 0 0 1-1.767 0z\"\n\t\t\t\t\t\t\t\t\t\t\tfill=\"#322823\"></path>\n\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"services-item__descr\">Предварительную стоимость\n\t\t\t\t\t\t\t<div class=\"transparency-text-variable\">\n\t\t\t\t\t\t\t\t<svg width=\"84\" height=\"26\" fill=\"none\" viewBox=\"0 0 84 26\" preserveAspectRatio=\"xMinYMin meet\"\n\t\t\t\t\t\t\t\t\t xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t\t\t<path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n\t\t\t\t\t\t\t\t\t\t  d=\"M2.805.208a2.02 2.02 0 0 0-2.02 2.02v21.554a2.02 2.02 0 0 0 2.02 2.02h78.802a2.02 2.02 0 0 0 2.02-2.02V2.229a2.02 2.02 0 0 0-2.02-2.02H2.805zM9.927 21.37H8.395V8.371h1.263l.135 1.044h.05c.825-.673 1.852-1.28 2.913-1.28 2.357 0 3.637 1.853 3.637 4.665 0 3.131-1.869 4.933-3.974 4.933-.825 0-1.7-.387-2.525-1.06l.033 1.599v3.098zm0-5.876c.825.707 1.633.96 2.24.96 1.515 0 2.626-1.365 2.626-3.638 0-2.02-.673-3.384-2.407-3.384-.775 0-1.566.438-2.459 1.263v4.799zm15.628 1.296c-.808.522-1.785.943-3.03.943-2.426 0-4.379-1.768-4.379-4.782 0-2.963 2.004-4.816 4.125-4.816 2.324 0 3.637 1.684 3.637 4.294 0 .337-.033.657-.067.876h-6.163c.101 1.953 1.297 3.199 3.031 3.199.893 0 1.617-.27 2.29-.724l.556 1.01zm-3.267-7.425c-1.296 0-2.441 1.043-2.626 2.845h4.9c0-1.852-.842-2.845-2.274-2.845zm7.253 8.15H28.16V8.37h1.768l1.802 4.294c.127.365.257.718.386 1.067.145.393.288.78.422 1.172h.084c.072-.185.144-.37.217-.553.218-.553.436-1.105.625-1.686l1.751-4.294h1.768v9.143h-1.397V13.39c0-.792.097-2.15.164-3.092l.004-.057h-.067c-.187.503-.399 1.021-.6 1.517-.09.218-.177.432-.26.638l-1.733 4.26h-1.028l-1.768-4.26a40.892 40.892 0 0 1-.841-2.155h-.085c.017.303.04.652.064 1.014.05.765.105 1.586.105 2.135v4.125zm18.32-4.564c0 3.03-2.004 4.782-4.243 4.782-2.24 0-4.243-1.751-4.243-4.782 0-3.048 2.003-4.816 4.243-4.816s4.243 1.768 4.243 4.816zm-6.887 0c0 2.105 1.061 3.502 2.644 3.502 1.583 0 2.66-1.397 2.66-3.502 0-2.105-1.077-3.536-2.66-3.536-1.583 0-2.644 1.431-2.644 3.536zm10.835 4.563h-1.533V8.371h1.533v3.704h4.411V8.371h1.532v9.143H56.22V13.44H51.81v4.075zm12.576 0h-1.532V9.617H59.79V8.371h7.678v1.246h-3.082v7.897zm9.822-1.094c-.876.724-1.903 1.313-3.031 1.313-1.532 0-2.677-.943-2.677-2.593 0-1.987 1.734-2.98 5.624-3.418 0-1.179-.388-2.307-1.886-2.307-1.061 0-2.02.488-2.745.977l-.606-1.061c.842-.539 2.138-1.196 3.603-1.196 2.223 0 3.166 1.499 3.166 3.755v5.624h-1.263l-.135-1.094h-.05zm-4.21-1.381c0 1.044.707 1.465 1.617 1.465.892 0 1.616-.421 2.509-1.213v-2.559c-3.082.37-4.126 1.128-4.126 2.307z\"\n\t\t\t\t\t\t\t\t\t\t  fill=\"#937E6C\"></path>\n\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div><!-- services-item - 4--></div>\n\t\t\t\t<button class=\"button button_wide\">Проконсультироваться</button>\n\t\t\t\t<div class=\"feedback\">\n\t\t\t\t\t<div class=\"feedback-wrap\">\n\t\t\t\t\t\t<div class=\"feedback__icon\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_13___ + "\" alt=\"phone\"></div>\n\t\t\t\t\t\t<div class=\"feedback__title\">Получите консультацию от специалиста в удобное для Вас время</div>\n\t\t\t\t\t\t<form class=\"feedback__form\" id=\"feedback1\">\n\t\t\t\t\t\t\t<div class=\"feedback__input\">\n\t\t\t\t\t\t\t\t<input class=\"input feedback__input-input\" name=\"phone\" type=\"text\"\n\t\t\t\t\t\t\t\t\t   placeholder=\"Введите номер телефона\" id=\"feedback-input1\"\n\t\t\t\t\t\t\t\t\t   minlength=\"18\" required></div>\n\t\t\t\t\t\t\t<button class=\"button\">Перезвоните мне</button>\n\t\t\t\t\t\t\t<div class=\"checkbox\"><input class=\"checkbox__input\" type=\"checkbox\" id=\"checkbox1\"> <label\n\t\t\t\t\t\t\t\t\tclass=\"checkbox__label\" for=\"checkbox1\"></label>\n\t\t\t\t\t\t\t\t<div class=\"checkbox__descr checkbox__descr_round-feedback\">Я соглашаюсь с\n\t\t\t\t\t\t\t\t\t<span class=\"link-privacy\">политикой конфиденциальности</span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</form>\n\t\t\t\t\t</div>\n\t\t\t\t</div><!-- /feedback --></div><!-- services --></div><!-- wrapper_main --></div><!-- main -->\n\t<div class=\"formula\" id=\"formula\">\n\t\t<div class=\"wrapper_small mobile-hide tablet-hide\">\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"formula-item\">\n\t\t\t\t\t<div class=\"formula-item__icon\">\n\t\t\t\t\t\t<div class=\"formula-item-popup formula-item-popup-01\">Работы ведутся\n\t\t\t\t\t\t\t<strong>точно</strong> по графику со\n\t\t\t\t\t\t\tстрогим <strong>cоблюдением</strong> сроков ремонта, <strong>указанных</strong> в договоре.\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"formula-item__icon-inner\"></div>\n\t\t\t\t\t\t<span class=\"formula-item__icon-inner-text\">01</span></div>\n\t\t\t\t\t<div class=\"formula-item__descr\">Делаем объекты в конкретный срок</div>\n\t\t\t\t</div><!-- formula-item --></div>\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"formula-item\">\n\t\t\t\t\t<div class=\"formula-item__icon\">\n\t\t\t\t\t\t<div class=\"formula-item-popup formula-item-popup-06\"><p>\n\t\t\t\t\t\t\t<strong>Сами</strong> вывозим и утилизируем мусор.\n\t\t\t\t\t\t</p>По приезду, вы войдете в <strong>чистую</strong> жилое помещение, в котором можно <strong>сразу\n\t\t\t\t\t\t\tжить.</strong></div>\n\t\t\t\t\t\t<div class=\"formula-item__icon-inner\"></div>\n\t\t\t\t\t\t<span class=\"formula-item__icon-inner-text\">06</span></div>\n\t\t\t\t\t<div class=\"formula-item__descr\">Оставляем чистоту после ремонта</div>\n\t\t\t\t</div><!-- formula-item -->\n\t\t\t\t<div class=\"formula-item\">\n\t\t\t\t\t<div class=\"formula-item__icon\">\n\t\t\t\t\t\t<div class=\"formula-item-popup formula-item-popup-02\">Наш\n\t\t\t\t\t\t\t<strong>профессиональный</strong> опыт реализации\n\t\t\t\t\t\t\tобъектов и задач <strong>различного</strong> назначения и масштаба. Мы очень\n\t\t\t\t\t\t\t<strong>гибки</strong> и\n\t\t\t\t\t\t\t<strong>лояльны</strong> к нам клиентам.\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"formula-item__icon-inner\"></div>\n\t\t\t\t\t\t<span class=\"formula-item__icon-inner-text\">02</span></div>\n\t\t\t\t\t<div class=\"formula-item__descr\">Подстраиваемость под любую задачу</div>\n\t\t\t\t</div><!-- formula-item --></div><!-- row -->\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"section-title formula-title\">Формула успешности <span>ремонта от Relax Live</span></div>\n\t\t\t</div><!-- row -->\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"formula-item\">\n\t\t\t\t\t<div class=\"formula-item__icon\">\n\t\t\t\t\t\t<div class=\"formula-item-popup formula-item-popup-05\"><p>Стоимость\n\t\t\t\t\t\t\t<strong>фиксируется</strong> в договоре и\n\t\t\t\t\t\t\t<strong>не меняется</strong> в процессе работы.</p>Мы предлагаем\n\t\t\t\t\t\t\t<strong>наличный и безналичный\n\t\t\t\t\t\t\t\tрасчет,</strong> оплату на карту, а также беспроцентную рассрочку.\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"formula-item__icon-inner\"></div>\n\t\t\t\t\t\t<span class=\"formula-item__icon-inner-text\">05</span></div>\n\t\t\t\t\t<div class=\"formula-item__descr\">Несколько вариантов оплаты и рассрочка</div>\n\t\t\t\t</div><!-- formula-item -->\n\t\t\t\t<div class=\"formula-item\">\n\t\t\t\t\t<div class=\"formula-item__icon\">\n\t\t\t\t\t\t<div class=\"formula-item-popup formula-item-popup-03\">Перед началом работ мы\n\t\t\t\t\t\t\t<strong>грамотно</strong>\n\t\t\t\t\t\t\tпрорабатываем, распределяем и просчитываем весь проект на основе ваших пожеланий и прочный, таким образом мы\n\t\t\t\t\t\t\tверно управляем вашим <strong>бюджетом.</strong></div>\n\t\t\t\t\t\t<div class=\"formula-item__icon-inner\"></div>\n\t\t\t\t\t\t<span class=\"formula-item__icon-inner-text\">03</span></div>\n\t\t\t\t\t<div class=\"formula-item__descr\">Разумное распределение бюджета</div>\n\t\t\t\t</div><!-- formula-item --></div>\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"formula-item\">\n\t\t\t\t\t<div class=\"formula-item__icon\">\n\t\t\t\t\t\t<div class=\"formula-item-popup formula-item-popup-04\">Стоимость услуг,\n\t\t\t\t\t\t\t<strong>зафиксированная</strong> в\n\t\t\t\t\t\t\tдоговоре, <strong>не меняется</strong> в процессе выполнения работ. Вы можете быть\n\t\t\t\t\t\t\t<strong>уверены</strong>\n\t\t\t\t\t\t\tв изначальной цене!\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"formula-item__icon-inner\"></div>\n\t\t\t\t\t\t<span class=\"formula-item__icon-inner-text\">04</span></div>\n\t\t\t\t\t<div class=\"formula-item__descr\">Гарантируем фиксированную цену</div>\n\t\t\t\t</div><!-- formula-item --></div><!-- row --></div><!-- /wrapper-small tablet-hide -->\n\t\t<div class=\"wrapper_small desktop-hide\">\n\t\t\t<div class=\"section-title formula-title\">Формула успешности <span>ремонта от Relax Live</span></div>\n\t\t\t<div class=\"formula-slider-wrap\">\n\t\t\t\t<div class=\"formula-slider\">\n\t\t\t\t\t<div class=\"formula-item formula-slider__slide\">\n\t\t\t\t\t\t<div class=\"formula-item__icon\">\n\t\t\t\t\t\t\t<div class=\"formula-item-popup formula-item-popup-01\">Работы ведутся\n\t\t\t\t\t\t\t\t<strong>точно</strong> по графику со\n\t\t\t\t\t\t\t\tстрогим <strong>cоблюдением</strong> сроков ремонта,\n\t\t\t\t\t\t\t\t<strong>указанных</strong> в договоре.\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"formula-item__icon-inner\">01</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"formula-item__descr\">Делаем объекты в конкретный срок</div>\n\t\t\t\t\t</div><!-- formula-item -->\n\t\t\t\t\t<div class=\"formula-item formula-slider__slide\">\n\t\t\t\t\t\t<div class=\"formula-item__icon\">\n\t\t\t\t\t\t\t<div class=\"formula-item-popup formula-item-popup-02\">Наш\n\t\t\t\t\t\t\t\t<strong>профессиональный</strong> опыт реализации\n\t\t\t\t\t\t\t\tобъектов и задач <strong>различного</strong> назначения и масштаба. Мы очень\n\t\t\t\t\t\t\t\t<strong>гибки</strong> и\n\t\t\t\t\t\t\t\t<strong>лояльны</strong> к нам клиентам.\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"formula-item__icon-inner\">02</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"formula-item__descr\">Подстраиваемость<br>под любую задачу</div>\n\t\t\t\t\t</div><!-- formula-item -->\n\t\t\t\t\t<div class=\"formula-item formula-slider__slide\">\n\t\t\t\t\t\t<div class=\"formula-item__icon\">\n\t\t\t\t\t\t\t<div class=\"formula-item-popup formula-item-popup-03\">Перед началом работ мы\n\t\t\t\t\t\t\t\t<strong>грамотно</strong>\n\t\t\t\t\t\t\t\tпрорабатываем, распределяем и просчитываем весь проект на основе ваших пожеланий и прочный, таким образом\n\t\t\t\t\t\t\t\tмы верно управляем вашим <strong>бюджетом.</strong></div>\n\t\t\t\t\t\t\t<div class=\"formula-item__icon-inner\">03</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"formula-item__descr\">Разумное распределение бюджета</div>\n\t\t\t\t\t</div><!-- formula-item -->\n\t\t\t\t\t<div class=\"formula-item formula-slider__slide\">\n\t\t\t\t\t\t<div class=\"formula-item__icon\">\n\t\t\t\t\t\t\t<div class=\"formula-item-popup formula-item-popup-04\">Стоимость услуг,\n\t\t\t\t\t\t\t\t<strong>зафиксированная</strong> в\n\t\t\t\t\t\t\t\tдоговоре, <strong>не меняется</strong> в процессе выполнения работ. Вы можете быть\n\t\t\t\t\t\t\t\t<strong>уверены</strong> в изначальной цене!\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"formula-item__icon-inner\">04</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"formula-item__descr\">Гарантируем фиксированную цену</div>\n\t\t\t\t\t</div><!-- formula-item -->\n\t\t\t\t\t<div class=\"formula-item formula-slider__slide\">\n\t\t\t\t\t\t<div class=\"formula-item__icon\">\n\t\t\t\t\t\t\t<div class=\"formula-item-popup formula-item-popup-05\"><p>Стоимость\n\t\t\t\t\t\t\t\t<strong>фиксируется</strong> в договоре и\n\t\t\t\t\t\t\t\t<strong>не меняется</strong> в процессе работы.</p>Мы предлагаем\n\t\t\t\t\t\t\t\t<strong>наличный и безналичный\n\t\t\t\t\t\t\t\t\tрасчет,</strong> оплату на карту, а также беспроцентную рассрочку.\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"formula-item__icon-inner\">05</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"formula-item__descr\">Несколько вариантов оплаты и рассрочка</div>\n\t\t\t\t\t</div><!-- formula-item -->\n\t\t\t\t\t<div class=\"formula-item formula-slider__slide\">\n\t\t\t\t\t\t<div class=\"formula-item__icon\">\n\t\t\t\t\t\t\t<div class=\"formula-item-popup formula-item-popup-06\">\n\t\t\t\t\t\t\t\t<strong>Сами</strong> вывозим и утилизируем мусор. По\n\t\t\t\t\t\t\t\tприезду, вы войдете в <strong>чистую</strong> жилое помещение, в котором можно <strong>сразу\n\t\t\t\t\t\t\t\tжить.</strong></div>\n\t\t\t\t\t\t\t<div class=\"formula-item__icon-inner\">06</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"formula-item__descr\">Оставляем чистоту<br>после ремонта</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div><!-- /formula-slider -->\n\t\t\t\t<div class=\"slider-arrow slider-arrow_left slider-arrow_left-formula\" id=\"formula-arrow_left\">\n\t\t\t\t\t<svg width=\"18\" height=\"12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 17 12\"\n\t\t\t\t\t\t preserveAspectRatio=\"xMinYMin meet\">\n\t\t\t\t\t\t<path\n\t\t\t\t\t\t\t\td=\"M.97 5.47a.75.75 0 0 0 0 1.06l4.773 4.773a.75.75 0 1 0 1.06-1.06L2.561 6l4.242-4.243a.75.75 0 0 0-1.06-1.06L.97 5.47zm16.53-.22h-16v1.5h16v-1.5z\"\n\t\t\t\t\t\t\t\tfill=\"#322823\"></path>\n\t\t\t\t\t</svg>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"slider-arrow slider-arrow_right slider-arrow_right-formula\" id=\"formula-arrow_right\">\n\t\t\t\t\t<svg width=\"17\" height=\"12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 17 12\"\n\t\t\t\t\t\t preserveAspectRatio=\"xMinYMin meet\">\n\t\t\t\t\t\t<path\n\t\t\t\t\t\t\t\td=\"M16.03 5.47a.75.75 0 0 1 0 1.06l-4.773 4.773a.75.75 0 0 1-1.06-1.06L14.439 6l-4.242-4.243a.75.75 0 1 1 1.06-1.06L16.03 5.47zM.5 5.25h15v1.5H.5v-1.5z\"\n\t\t\t\t\t\t\t\tfill=\"#322823\"></path>\n\t\t\t\t\t</svg>\n\t\t\t\t</div>\n\t\t\t</div><!-- /formula-slider-wrap --></div>\n\t</div><!-- formula -->\n\t<div class=\"repair-types\" id=\"repair-types\">\n\t\t<div class=\"wrapper_middle\">\n\t\t\t<div class=\"row row_reverse\">\n\t\t\t\t<div class=\"repair-types-slider-wrap\">\n\t\t\t\t\t<div class=\"repair-types-slider\">\n\t\t\t\t\t\t<div class=\"types-repair1\">\n\t\t\t\t\t\t\t<div class=\"repair-types-slider__slide\">\n\t\t\t\t\t\t\t\t<img src=\"" + ___HTML_LOADER_REPLACEMENT_14___ + "\" alt=\"electro\"></div>\n\t\t\t\t\t\t\t<div class=\"repair-types-slider__slide\">\n\t\t\t\t\t\t\t\t<img src=\"" + ___HTML_LOADER_REPLACEMENT_15___ + "\" alt=\"cosmetic\"></div>\n\t\t\t\t\t\t\t<div class=\"repair-types-slider__slide\">\n\t\t\t\t\t\t\t\t<img src=\"" + ___HTML_LOADER_REPLACEMENT_16___ + "\" alt=\"capital\"></div>\n\t\t\t\t\t\t\t<div class=\"repair-types-slider__slide\">\n\t\t\t\t\t\t\t\t<img src=\"" + ___HTML_LOADER_REPLACEMENT_14___ + "\" alt=\"electro\"></div>\n\t\t\t\t\t\t\t<div class=\"repair-types-slider__slide\">\n\t\t\t\t\t\t\t\t<img src=\"" + ___HTML_LOADER_REPLACEMENT_15___ + "\" alt=\"cosmetic\"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"types-repair2\">\n\t\t\t\t\t\t\t<div class=\"repair-types-slider__slide\">\n\t\t\t\t\t\t\t\t<img src=\"" + ___HTML_LOADER_REPLACEMENT_15___ + "\" alt=\"cosmetic\"></div>\n\t\t\t\t\t\t\t<div class=\"repair-types-slider__slide\">\n\t\t\t\t\t\t\t\t<img src=\"" + ___HTML_LOADER_REPLACEMENT_14___ + "\" alt=\"electro\"></div>\n\t\t\t\t\t\t\t<div class=\"repair-types-slider__slide\">\n\t\t\t\t\t\t\t\t<img src=\"" + ___HTML_LOADER_REPLACEMENT_16___ + "\" alt=\"capital\"></div>\n\t\t\t\t\t\t\t<div class=\"repair-types-slider__slide\">\n\t\t\t\t\t\t\t\t<img src=\"" + ___HTML_LOADER_REPLACEMENT_14___ + "\" alt=\"electro\"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"types-repair3\">\n\t\t\t\t\t\t\t<div class=\"repair-types-slider__slide\">\n\t\t\t\t\t\t\t\t<img src=\"" + ___HTML_LOADER_REPLACEMENT_16___ + "\" alt=\"capital\"></div>\n\t\t\t\t\t\t\t<div class=\"repair-types-slider__slide\">\n\t\t\t\t\t\t\t\t<img src=\"" + ___HTML_LOADER_REPLACEMENT_14___ + "\" alt=\"electro\"></div>\n\t\t\t\t\t\t\t<div class=\"repair-types-slider__slide\">\n\t\t\t\t\t\t\t\t<img src=\"" + ___HTML_LOADER_REPLACEMENT_16___ + "\" alt=\"capital\"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"types-repair4\">\n\t\t\t\t\t\t\t<div class=\"repair-types-slider__slide\">\n\t\t\t\t\t\t\t\t<img src=\"" + ___HTML_LOADER_REPLACEMENT_14___ + "\" alt=\"electro\"></div>\n\t\t\t\t\t\t\t<div class=\"repair-types-slider__slide\">\n\t\t\t\t\t\t\t\t<img src=\"" + ___HTML_LOADER_REPLACEMENT_15___ + "\" alt=\"cosmetic\"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"types-repair5\">\n\t\t\t\t\t\t\t<div class=\"repair-types-slider__slide\">\n\t\t\t\t\t\t\t\t<img src=\"" + ___HTML_LOADER_REPLACEMENT_16___ + "\" alt=\"capital\"></div>\n\t\t\t\t\t\t\t<div class=\"repair-types-slider__slide\">\n\t\t\t\t\t\t\t\t<img src=\"" + ___HTML_LOADER_REPLACEMENT_14___ + "\" alt=\"electro\"></div>\n\t\t\t\t\t\t\t<div class=\"repair-types-slider__slide\">\n\t\t\t\t\t\t\t\t<img src=\"" + ___HTML_LOADER_REPLACEMENT_16___ + "\" alt=\"capital\"></div>\n\t\t\t\t\t\t\t<div class=\"repair-types-slider__slide\">\n\t\t\t\t\t\t\t\t<img src=\"" + ___HTML_LOADER_REPLACEMENT_14___ + "\" alt=\"electro\"></div>\n\t\t\t\t\t\t\t<div class=\"repair-types-slider__slide\">\n\t\t\t\t\t\t\t\t<img src=\"" + ___HTML_LOADER_REPLACEMENT_16___ + "\" alt=\"capital\"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div><!-- /.repair-types-slider -->\n\t\t\t\t\t<div class=\"slider-counter slider-counter-repair slider-counter-responsive\" id=\"repair-counter\">\n\t\t\t\t\t\t<div class=\"slider-counter-content\">\n\t\t\t\t\t\t\t<div class=\"slider-counter-content__current\">1</div>\n\t\t\t\t\t\t\t<div class=\"slider-counter-content__total\">3</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"slider-arrow slider-arrow_left\" id=\"repair-types-arrow_left\">\n\t\t\t\t\t\t<svg width=\"18\" height=\"12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18 12\"\n\t\t\t\t\t\t\t preserveAspectRatio=\"xMinYMin meet\">\n\t\t\t\t\t\t\t<path\n\t\t\t\t\t\t\t\t\td=\"M.97 5.47a.75.75 0 0 0 0 1.06l4.773 4.773a.75.75 0 1 0 1.06-1.06L2.561 6l4.242-4.243a.75.75 0 0 0-1.06-1.06L.97 5.47zm16.53-.22h-16v1.5h16v-1.5z\"\n\t\t\t\t\t\t\t\t\tfill=\"#322823\"></path>\n\t\t\t\t\t\t</svg>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"slider-arrow slider-arrow_right\" id=\"repair-types-arrow_right\">\n\t\t\t\t\t\t<svg width=\"17\" height=\"12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 17 12\"\n\t\t\t\t\t\t\t preserveAspectRatio=\"xMinYMin meet\">\n\t\t\t\t\t\t\t<path\n\t\t\t\t\t\t\t\t\td=\"M16.03 5.47a.75.75 0 0 1 0 1.06l-4.773 4.773a.75.75 0 0 1-1.06-1.06L14.439 6l-4.242-4.243a.75.75 0 1 1 1.06-1.06L16.03 5.47zM.5 5.25h15v1.5H.5v-1.5z\"\n\t\t\t\t\t\t\t\t\tfill=\"#322823\"></path>\n\t\t\t\t\t\t</svg>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"link-list link-list-repair desktop-hide\"><a>Полный список услуг и цен\n\t\t\t\t\t\t<svg width=\"17\" height=\"16\" fill=\"none\" viewBox=\"0 0 17 16\" preserveAspectRatio=\"xMinYMin meet\">\n\t\t\t\t\t\t\t<path\n\t\t\t\t\t\t\t\t\td=\"M16.207 8.707a1 1 0 0 0 0-1.414L9.843.929A1 1 0 1 0 8.43 2.343L14.086 8l-5.657 5.657a1 1 0 1 0 1.414 1.414l6.364-6.364zM0 9h15.5V7H0v2z\"\n\t\t\t\t\t\t\t\t\tfill=\"#7F6956\"></path>\n\t\t\t\t\t\t</svg>\n\t\t\t\t\t</a></div><!-- link-list tablet-hide  --></div><!-- /repair-types-slider-wrap -->\n\t\t\t\t<div class=\"repair-types-tab\">\n\t\t\t\t\t<div class=\"section-title repair-types-title\">Какие виды<br><span>ремонта мы делаем:</span></div>\n\t\t\t\t\t<!-- /.section-title repair-types-title -->\n\t\t\t\t\t<div class=\"nav-wrap nav-wrap-repair\">\n\t\t\t\t\t\t<nav class=\"nav repair-types-nav\">\n\t\t\t\t\t\t\t<div class=\"nav-list nav-list-repair\">\n\t\t\t\t\t\t\t\t<button type=\"button\" class=\"button_o repair-types-nav__item repair-types-nav__item-1 active\">\n\t\t\t\t\t\t\t\t\t<svg width=\"259\" height=\"46\" fill=\"none\" viewBox=\"0 0 259 46\" preserveAspectRatio=\"xMinYMin meet\">\n\t\t\t\t\t\t\t\t\t\t<path\n\t\t\t\t\t\t\t\t\t\t\t\td=\"M33.5 1h-10c-12.15 0-22 9.85-22 22s9.85 22 22 22h187M48.5 1h187c12.15 0 22 9.85 22 22s-9.85 22-22 22h-17.1\"\n\t\t\t\t\t\t\t\t\t\t\t\tstroke=\"#EEEBE5\" stroke-width=\"2\" stroke-linecap=\"round\"></path>\n\t\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t\tЧастичный ремонт\n\t\t\t\t\t\t\t\t</button><!-- /.repair-types__nav-item -->\n\t\t\t\t\t\t\t\t<button type=\"button\" class=\"button_o repair-types-nav__item repair-types-nav__item-2\">\n\t\t\t\t\t\t\t\t\t<svg width=\"300\" height=\"46\" fill=\"none\" viewBox=\"0 0 300 46\" preserveAspectRatio=\"xMinYMin meet\">\n\t\t\t\t\t\t\t\t\t\t<path\n\t\t\t\t\t\t\t\t\t\t\t\td=\"M38.25 1H23C10.85 1 1 10.85 1 23s9.85 22 22 22h221.289M55.711 1H277c12.15 0 22 9.85 22 22s-9.85 22-22 22h-23.515\"\n\t\t\t\t\t\t\t\t\t\t\t\tstroke=\"#EEEBE5\" stroke-width=\"2\" stroke-linecap=\"round\"></path>\n\t\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t\tКосметический ремонт\n\t\t\t\t\t\t\t\t</button><!-- /.repair-types__nav-item -->\n\t\t\t\t\t\t\t\t<button type=\"button\" class=\"button_o repair-types-nav__item repair-types-nav__item-3\">\n\t\t\t\t\t\t\t\t\t<svg width=\"281\" height=\"46\" fill=\"none\" viewBox=\"0 0 281 46\" preserveAspectRatio=\"xMinYMin meet\">\n\t\t\t\t\t\t\t\t\t\t<path\n\t\t\t\t\t\t\t\t\t\t\t\td=\"M35.875 1H23C10.85 1 1 10.85 1 23s9.85 22 22 22h205.777M52.223 1H258c12.15 0 22 9.85 22 22s-9.85 22-22 22h-20.613\"\n\t\t\t\t\t\t\t\t\t\t\t\tstroke=\"#EEEBE5\" stroke-width=\"2\" stroke-linecap=\"round\"></path>\n\t\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t\tКапитальный ремонт\n\t\t\t\t\t\t\t\t</button><!-- /.repair-types__nav-item -->\n\t\t\t\t\t\t\t\t<button type=\"button\" class=\"button_o repair-types-nav__item repair-types-nav__item-4\">\n\t\t\t\t\t\t\t\t\t<svg width=\"268\" height=\"46\" fill=\"none\" viewBox=\"0 0 268 46\" preserveAspectRatio=\"xMinYMin meet\">\n\t\t\t\t\t\t\t\t\t\t<path\n\t\t\t\t\t\t\t\t\t\t\t\td=\"M34.25 1H23C10.85 1 1 10.85 1 23s9.85 22 22 22h195.164M49.836 1H245c12.15 0 22 9.85 22 22s-9.85 22-22 22h-18.627\"\n\t\t\t\t\t\t\t\t\t\t\t\tstroke=\"#EEEBE5\" stroke-width=\"2\" stroke-linecap=\"round\"></path>\n\t\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t\tЕвроремонт ремонт\n\t\t\t\t\t\t\t\t</button><!-- /.repair-types__nav-item -->\n\t\t\t\t\t\t\t\t<button type=\"button\" class=\"button_o repair-types-nav__item repair-types-nav__item-5\">\n\t\t\t\t\t\t\t\t\t<svg width=\"324\" height=\"46\" fill=\"none\" viewBox=\"0 0 324 46\" preserveAspectRatio=\"xMinYMin meet\">\n\t\t\t\t\t\t\t\t\t\t<path\n\t\t\t\t\t\t\t\t\t\t\t\td=\"M41.25 1H23C10.85 1 1 10.85 1 23s9.85 22 22 22h240.883M60.117 1H301c12.15 0 22 9.85 22 22s-9.85 22-22 22h-27.18\"\n\t\t\t\t\t\t\t\t\t\t\t\tstroke=\"#EEEBE5\" stroke-width=\"2\" stroke-linecap=\"round\"></path>\n\t\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t\tИндивидуальный ремонт\n\t\t\t\t\t\t\t\t</button><!-- /.repair-types__nav-item --></div>\n\t\t\t\t\t\t</nav><!-- /.repair-types__nav -->\n\t\t\t\t\t\t<div class=\"nav-arrow nav-arrow_left desktop-hide\" id=\"nav-arrow-repair-left_base\">\n\t\t\t\t\t\t\t<svg width=\"12\" height=\"16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t\t<path d=\"M11 1L1 8l10 7\" stroke=\"#322823\" stroke-width=\".3\" stroke-linecap=\"round\"\n\t\t\t\t\t\t\t\t\t  stroke-linejoin=\"round\"></path>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"nav-arrow nav-arrow_right desktop-hide\" id=\"nav-arrow-repair-right_base\">\n\t\t\t\t\t\t\t<svg width=\"12\" height=\"16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t\t<path d=\"M1 1l10 7-10 7\" stroke=\"#322823\" stroke-width=\".3\" stroke-linecap=\"round\"\n\t\t\t\t\t\t\t\t\t  stroke-linejoin=\"round\"></path>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div><!-- /.repair-types__nav-wrap -->\n\t\t\t\t\t<div class=\"link-list link-list-repair mobile-hide tablet-hide\"><a>Полный список услуг и цен\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<svg width=\"17\" height=\"16\" fill=\"none\" viewBox=\"0 0 18 12\" preserveAspectRatio=\"xMinYMin meet\">\n\t\t\t\t\t\t\t\t<path\n\t\t\t\t\t\t\t\t\t\td=\"M16.207 8.707a1 1 0 0 0 0-1.414L9.843.929A1 1 0 1 0 8.43 2.343L14.086 8l-5.657 5.657a1 1 0 1 0 1.414 1.414l6.364-6.364zM0 9h15.5V7H0v2z\"\n\t\t\t\t\t\t\t\t\t\tfill=\"#7F6956\"></path>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</a></div><!-- link-list tablet-hide  --></div><!-- /.repair-types-tab --></div><!-- /.row --></div>\n\t\t<!-- /.wrapper_small --></div><!-- /.repair-types -->\n\t<div class=\"wave-block feedback-block\">\n\t\t<div class=\"wrapper_feedback\">\n\t\t\t<div class=\"section-title feedback-block__title mobile-hide tablet-hide\">Давайте начнем\n\t\t\t\t<span>воплощать вашу мечту о ремонте со встречи?</span>\n\t\t\t</div>\n\t\t\t<div class=\"section-title feedback-block__title mobile-hide desktop-hide\">Давайте начнем воплощать вашу\n\t\t\t\t<span>мечту о ремонте со встречи?</span>\n\t\t\t</div>\n\t\t\t<div class=\"section-title feedback-block__title tablet-hide desktop-hide\">Давайте начнем воплощать\n\t\t\t\t<span>вашу мечту о ремонте со встречи?</span>\n\t\t\t</div>\n\t\t\t<div class=\"feedback-block__descr\">Обсудите проект со специалистом или вызовите замерщика.</div>\n\t\t\t<form class=\"feedback-block__form\" id=\"feedback2\"><label><span><sup>*</sup>Введите ваше имя:</span> <input\n\t\t\t\t\ttype=\"text\" class=\"feedback-block__form-input feedback-block__form-input_name\" name=\"name\" required=\"\"\n\t\t\t\t\tmaxlength=\"20\"></label> <label><span><sup>*</sup>Введите ваш номер:</span> <input type=\"text\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  class=\"feedback-block__form-input feedback-block__form-input_phone\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  name=\"phone\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  id=\"feedback-input2\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  required=\"\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  placeholder=\"+7 (___)___-__-__\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  minlength=\"18\"></label>\n\t\t\t\t<button class=\"button button-feedback-block\">Перезвоните мне</button>\n\t\t\t\t<div class=\"checkbox checkbox-feedback-block\">\n\t\t\t\t\t<input class=\"checkbox__input\" type=\"checkbox\" id=\"checkbox2\"\n\t\t\t\t\t\t   required=\"\"> <label class=\"checkbox__label\"\n\t\t\t\t\t\t\t\t\t\t\t   for=\"checkbox2\"></label>\n\t\t\t\t\t<div class=\"checkbox__descr\">Нажимая на кнопку, Вы даете согласие на\n\t\t\t\t\t\t<span class=\"link-privacy\">обработку своих персональных данных</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</form>\n\t\t</div>\n\t</div><!-- /feedback-block -->\n\t<div class=\"portfolio\" id=\"portfolio\">\n\t\t<div class=\"wrapper_middle\">\n\t\t\t<div class=\"section-title portfolio-title\">Вдохновляющее портфолио <span>реализованное нами</span></div>\n\t\t\t<div class=\"portfolio-slider-wrap\">\n\t\t\t\t<div class=\"portfolio-slider-mobile tablet-hide desktop-hide\">\n\t\t\t\t\t<div class=\"portfolio-slider__slide-frame\"><img class=\"portfolio-slider__slide-frame-img\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsrc=\"" + ___HTML_LOADER_REPLACEMENT_17___ + "\" alt=\"img_1\">\n\t\t\t\t\t\t<div class=\"item-hover\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"portfolio-slider__slide-frame\"><img class=\"portfolio-slider__slide-frame-img\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsrc=\"" + ___HTML_LOADER_REPLACEMENT_18___ + "\" alt=\"img_2\">\n\t\t\t\t\t\t<div class=\"item-hover\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"portfolio-slider__slide-frame\"><img class=\"portfolio-slider__slide-frame-img\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsrc=\"" + ___HTML_LOADER_REPLACEMENT_19___ + "\" alt=\"img_3\">\n\t\t\t\t\t\t<div class=\"item-hover\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"portfolio-slider__slide-frame\"><img class=\"portfolio-slider__slide-frame-img\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsrc=\"" + ___HTML_LOADER_REPLACEMENT_20___ + "\" alt=\"img_4\">\n\t\t\t\t\t\t<div class=\"item-hover\"></div>\n\t\t\t\t\t</div><!-- /portfolio-slider__slide -->\n\t\t\t\t\t<div class=\"portfolio-slider__slide-frame\"><img class=\"portfolio-slider__slide-frame-img\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsrc=\"" + ___HTML_LOADER_REPLACEMENT_21___ + "\" alt=\"img_5\">\n\t\t\t\t\t\t<div class=\"item-hover\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"portfolio-slider__slide-frame\"><img class=\"portfolio-slider__slide-frame-img\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsrc=\"" + ___HTML_LOADER_REPLACEMENT_22___ + "\" alt=\"img_6\">\n\t\t\t\t\t\t<div class=\"item-hover\"></div>\n\t\t\t\t\t</div><!-- /portfolio-slider__slide -->\n\t\t\t\t\t<div class=\"portfolio-slider__slide-frame\"><img class=\"portfolio-slider__slide-frame-img\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsrc=\"" + ___HTML_LOADER_REPLACEMENT_20___ + "\" alt=\"img_1\">\n\t\t\t\t\t\t<div class=\"item-hover\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"portfolio-slider__slide-frame\"><img class=\"portfolio-slider__slide-frame-img\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsrc=\"" + ___HTML_LOADER_REPLACEMENT_19___ + "\" alt=\"img_2\">\n\t\t\t\t\t\t<div class=\"item-hover\"></div>\n\t\t\t\t\t</div><!-- /portfolio-slider__slide -->\n\t\t\t\t\t<div class=\"portfolio-slider__slide-frame\"><img class=\"portfolio-slider__slide-frame-img\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsrc=\"" + ___HTML_LOADER_REPLACEMENT_18___ + "\" alt=\"img_3\">\n\t\t\t\t\t\t<div class=\"item-hover\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"portfolio-slider__slide-frame\"><img class=\"portfolio-slider__slide-frame-img\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsrc=\"" + ___HTML_LOADER_REPLACEMENT_17___ + "\" alt=\"img_4\">\n\t\t\t\t\t\t<div class=\"item-hover\"></div>\n\t\t\t\t\t</div><!-- /portfolio-slider__slide --></div><!-- /portfolio-slider -->\n\t\t\t\t<div class=\"slider-counter slider-counter-responsive desktop-hide\" id=\"portfolio-counter\">\n\t\t\t\t\t<div class=\"slider-counter-content\">\n\t\t\t\t\t\t<div class=\"slider-counter-content__current\">1</div>\n\t\t\t\t\t\t<div class=\"slider-counter-content__total\">3</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"slider-arrow-tablet-mobile slider-arrow-tablet-mobile_left tablet-hide desktop-hide\"\n\t\t\t\t\t id=\"portfolio-arrow-mobile_left\">\n\t\t\t\t\t<svg width=\"25\" height=\"34\" fill=\"none\" viewBox=\"0 0 25 34\" preserveAspectRatio=\"xMinYMin meet\"\n\t\t\t\t\t\t xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t<path d=\"M23 32L2 17 23 2\" stroke=\"#fff\" stroke-opacity=\".5\" stroke-width=\"3\" stroke-linecap=\"round\"\n\t\t\t\t\t\t\t  stroke-linejoin=\"round\"></path>\n\t\t\t\t\t</svg>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"slider-arrow-tablet-mobile slider-arrow-tablet-mobile_right tablet-hide desktop-hide\"\n\t\t\t\t\t id=\"portfolio-arrow-mobile_right\" disabled=\"disabled\">\n\t\t\t\t\t<svg width=\"25\" height=\"34\" fill=\"none\" viewBox=\"0 0 25 34\" preserveAspectRatio=\"xMinYMin meet\"\n\t\t\t\t\t\t xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t<path d=\"M2 2l21 15L2 32\" stroke=\"#fff\" stroke-opacity=\".5\" stroke-width=\"3\" stroke-linecap=\"round\"\n\t\t\t\t\t\t\t  stroke-linejoin=\"round\"></path>\n\t\t\t\t\t</svg>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"slider-arrow slider-arrow_left-portfolio mobile-hide\" id=\"portfolio-arrow_left\">\n\t\t\t\t\t<svg width=\"18\" height=\"12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18 12\"\n\t\t\t\t\t\t preserveAspectRatio=\"xMinYMin meet\">\n\t\t\t\t\t\t<path\n\t\t\t\t\t\t\t\td=\"M.97 5.47a.75.75 0 0 0 0 1.06l4.773 4.773a.75.75 0 1 0 1.06-1.06L2.561 6l4.242-4.243a.75.75 0 0 0-1.06-1.06L.97 5.47zm16.53-.22h-16v1.5h16v-1.5z\"\n\t\t\t\t\t\t\t\tfill=\"#322823\"></path>\n\t\t\t\t\t</svg>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"slider-arrow slider-arrow_right-portfolio mobile-hide\" id=\"portfolio-arrow_right\">\n\t\t\t\t\t<svg width=\"17\" height=\"12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18 12\"\n\t\t\t\t\t\t preserveAspectRatio=\"xMinYMin meet\">\n\t\t\t\t\t\t<path\n\t\t\t\t\t\t\t\td=\"M16.03 5.47a.75.75 0 0 1 0 1.06l-4.773 4.773a.75.75 0 0 1-1.06-1.06L14.439 6l-4.242-4.243a.75.75 0 1 1 1.06-1.06L16.03 5.47zM.5 5.25h15v1.5H.5v-1.5z\"\n\t\t\t\t\t\t\t\tfill=\"#322823\"></path>\n\t\t\t\t\t</svg>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"portfolio-slider mobile-hide\">\n\t\t\t\t\t<div class=\"portfolio-slider__slide fade-tab\">\n\t\t\t\t\t\t<div class=\"portfolio-slider__slide-frame\"><img class=\"portfolio-slider__slide-frame-img\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsrc=\"" + ___HTML_LOADER_REPLACEMENT_17___ + "\" alt=\"img_1\">\n\t\t\t\t\t\t\t<div class=\"item-hover\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_23___ + "\" alt=\"zoom\"> <span>Нажмите, чтобы<br>увеличить</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"portfolio-slider__slide-frame\"><img class=\"portfolio-slider__slide-frame-img\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsrc=\"" + ___HTML_LOADER_REPLACEMENT_18___ + "\" alt=\"img_2\">\n\t\t\t\t\t\t\t<div class=\"item-hover\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_23___ + "\" alt=\"zoom\"> <span>Нажмите, чтобы<br>увеличить</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div><!-- /portfolio-slider__slide -->\n\t\t\t\t\t<div class=\"portfolio-slider__slide fade-tab\">\n\t\t\t\t\t\t<div class=\"portfolio-slider__slide-frame\"><img class=\"portfolio-slider__slide-frame-img\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsrc=\"" + ___HTML_LOADER_REPLACEMENT_19___ + "\" alt=\"img_3\">\n\t\t\t\t\t\t\t<div class=\"item-hover\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_23___ + "\" alt=\"zoom\"> <span>Нажмите, чтобы<br>увеличить</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"portfolio-slider__slide-frame\"><img class=\"portfolio-slider__slide-frame-img\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsrc=\"" + ___HTML_LOADER_REPLACEMENT_20___ + "\" alt=\"img_4\">\n\t\t\t\t\t\t\t<div class=\"item-hover\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_23___ + "\" alt=\"zoom\"> <span>Нажмите, чтобы<br>увеличить</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div><!-- /portfolio-slider__slide -->\n\t\t\t\t\t<div class=\"portfolio-slider__slide fade-tab\">\n\t\t\t\t\t\t<div class=\"portfolio-slider__slide-frame\"><img class=\"portfolio-slider__slide-frame-img\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsrc=\"" + ___HTML_LOADER_REPLACEMENT_21___ + "\" alt=\"img_5\">\n\t\t\t\t\t\t\t<div class=\"item-hover\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_23___ + "\" alt=\"zoom\"> <span>Нажмите, чтобы<br>увеличить</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"portfolio-slider__slide-frame\"><img class=\"portfolio-slider__slide-frame-img\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsrc=\"" + ___HTML_LOADER_REPLACEMENT_22___ + "\" alt=\"img_6\">\n\t\t\t\t\t\t\t<div class=\"item-hover\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_23___ + "\" alt=\"zoom\"> <span>Нажмите, чтобы<br>увеличить</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div><!-- /portfolio-slider__slide -->\n\t\t\t\t\t<div class=\"portfolio-slider__slide fade-tab\">\n\t\t\t\t\t\t<div class=\"portfolio-slider__slide-frame\"><img class=\"portfolio-slider__slide-frame-img\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsrc=\"" + ___HTML_LOADER_REPLACEMENT_20___ + "\" alt=\"img_1\">\n\t\t\t\t\t\t\t<div class=\"item-hover\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_23___ + "\" alt=\"zoom\"> <span>Нажмите, чтобы<br>увеличить</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"portfolio-slider__slide-frame\"><img class=\"portfolio-slider__slide-frame-img\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsrc=\"" + ___HTML_LOADER_REPLACEMENT_19___ + "\" alt=\"img_2\">\n\t\t\t\t\t\t\t<div class=\"item-hover\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_23___ + "\" alt=\"zoom\"> <span>Нажмите, чтобы<br>увеличить</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div><!-- /portfolio-slider__slide -->\n\t\t\t\t\t<div class=\"portfolio-slider__slide fade-tab\">\n\t\t\t\t\t\t<div class=\"portfolio-slider__slide-frame\"><img class=\"portfolio-slider__slide-frame-img\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsrc=\"" + ___HTML_LOADER_REPLACEMENT_18___ + "\" alt=\"img_3\">\n\t\t\t\t\t\t\t<div class=\"item-hover\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_23___ + "\" alt=\"zoom\"> <span>Нажмите, чтобы<br>увеличить</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"portfolio-slider__slide-frame\"><img class=\"portfolio-slider__slide-frame-img\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsrc=\"" + ___HTML_LOADER_REPLACEMENT_17___ + "\" alt=\"img_4\">\n\t\t\t\t\t\t\t<div class=\"item-hover\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_23___ + "\" alt=\"zoom\"> <span>Нажмите, чтобы<br>увеличить</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div><!-- /portfolio-slider__slide --></div><!-- /portfolio-slider --></div><!-- /slider-wrap-->\n\t\t</div>\n\t</div><!-- /portfolio -->\n\t<div class=\"transparency\" id=\"transparency\">\n\t\t<div class=\"wrapper\">\n\t\t\t<div class=\"section-title transparency-title mobile-hide\">Работаем с каждым клиентом<span>честно и прозрачно</span>\n\t\t\t</div>\n\t\t\t<div class=\"section-title transparency-title tablet-hide desktop-hide\">Работаем с каждым\n\t\t\t\t<span><strong>клиентом</strong> честно и прозрачно</span></div>\n\t\t\t<div class=\"section-subtitle\">Никаких скрытых платежей и сорванных сроков!</div>\n\t\t\t<div class=\"transparency-slider-wrap\">\n\t\t\t\t<div class=\"transparency-slider row\">\n\t\t\t\t\t<div class=\"transparency-item\">\n\t\t\t\t\t\t<div class=\"transparency-item__img\">\n\t\t\t\t\t\t\t<img src=\"" + ___HTML_LOADER_REPLACEMENT_24___ + "\" alt=\"document\">\n\t\t\t\t\t\t\t<div class=\"item-hover\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_23___ + "\" alt=\"zoom\"> <span>Нажмите, чтобы<br>увеличить</span>\n\t\t\t\t\t\t\t\t<div class=\"transparency-item__hint\">\n\t\t\t\t\t\t\t\t\t<strong>нажмите</strong> на документ, чтобы его посмотреть\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"transparency-item__title\">Договор</div>\n\t\t\t\t\t\t<div class=\"transparency-item__descr\">Заключение договора четко фиксирует финансовые и временные показатели\n\t\t\t\t\t\t\tвыполнения работы, прав и обязанности сторон.\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"transparency-item\">\n\t\t\t\t\t\t<div class=\"transparency-item__img\">\n\t\t\t\t\t\t\t<img src=\"" + ___HTML_LOADER_REPLACEMENT_24___ + "\" alt=\"document\">\n\t\t\t\t\t\t\t<div class=\"item-hover\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_23___ + "\" alt=\"zoom\"> <span>Нажмите, чтобы<br>увеличить</span>\n\t\t\t\t\t\t\t\t<div class=\"transparency-item__hint\">\n\t\t\t\t\t\t\t\t\t<strong>нажмите</strong> на документ, чтобы его посмотреть\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"transparency-item__title\">Смета</div>\n\t\t\t\t\t\t<div class=\"transparency-item__descr\">Профессиональная команда сметчиков готовит детальную смету с учетом всех\n\t\t\t\t\t\t\tнакладных расходов. После этого смета на протяжении строительства не меняется.\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"transparency-item\">\n\t\t\t\t\t\t<div class=\"transparency-item__img\">\n\t\t\t\t\t\t\t<img src=\"" + ___HTML_LOADER_REPLACEMENT_24___ + "\" alt=\"document\">\n\t\t\t\t\t\t\t<div class=\"item-hover\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_23___ + "\" alt=\"zoom\"> <span>Нажмите, чтобы<br>увеличить</span>\n\t\t\t\t\t\t\t\t<div class=\"transparency-item__hint\">\n\t\t\t\t\t\t\t\t\t<strong>нажмите</strong> на документ, чтобы его посмотреть\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"transparency-item__title\">График платежей</div>\n\t\t\t\t\t\t<div class=\"transparency-item__descr\">На этапе подписания договора составляется-график производства и\n\t\t\t\t\t\t\tфинансирования работ. Данный документ является основным при проведении и контроле работ на объекте.\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div><!-- /transparency-slider row -->\n\t\t\t\t<div class=\"slider-arrow slider-arrow_left\" id=\"transparency-arrow_left\">\n\t\t\t\t\t<svg width=\"18\" height=\"12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18 12\"\n\t\t\t\t\t\t preserveAspectRatio=\"xMinYMin meet\">\n\t\t\t\t\t\t<path\n\t\t\t\t\t\t\t\td=\"M.97 5.47a.75.75 0 0 0 0 1.06l4.773 4.773a.75.75 0 1 0 1.06-1.06L2.561 6l4.242-4.243a.75.75 0 0 0-1.06-1.06L.97 5.47zm16.53-.22h-16v1.5h16v-1.5z\"\n\t\t\t\t\t\t\t\tfill=\"#322823\"></path>\n\t\t\t\t\t</svg>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"slider-arrow slider-arrow_right\" id=\"transparency-arrow_right\">\n\t\t\t\t\t<svg width=\"17\" height=\"12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18 12\"\n\t\t\t\t\t\t preserveAspectRatio=\"xMinYMin meet\">\n\t\t\t\t\t\t<path\n\t\t\t\t\t\t\t\td=\"M16.03 5.47a.75.75 0 0 1 0 1.06l-4.773 4.773a.75.75 0 0 1-1.06-1.06L14.439 6l-4.242-4.243a.75.75 0 1 1 1.06-1.06L16.03 5.47zM.5 5.25h15v1.5H.5v-1.5z\"\n\t\t\t\t\t\t\t\tfill=\"#322823\"></path>\n\t\t\t\t\t</svg>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"transparency-videoreport\">\n\t\t\t\t<div class=\"transparency-videoreport__icon\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_25___ + "\" alt=\"camera\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"transparency-videoreport__descr\">Предоставляем фото и видео отчеты по каждому этапу строительства. Вы\n\t\t\t\t\tможете даже не появляться на объекте до его конечной сдачи Вам.\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div><!-- /transparency -->\n\t<div class=\"wave-block stock\">\n\t\t<div class=\"wrapper_middle\">\n\t\t\t<div class=\"stock__title\">Акция</div>\n\t\t\t<div class=\"stock__descr\">Заказывая ремонт от нашего клиента по рекомендации, <strong>скидка 10%!</strong>\n\t\t\t</div>\n\t\t\t<div class=\"stock__love\">\n\t\t\t\t<div class=\"stock__love-icon\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_26___ + "\" alt=\"\"></div>\n\t\t\t\t<div class=\"stock__love-descr\">Просто потому, что мы любим радовать клиентов!</div>\n\t\t\t</div>\n\t\t\t<div class=\"stock__footnote\">\n\t\t\t\t<div class=\"stock__footnote-icon\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_27___ + "\" alt=\"\"></div>\n\t\t\t\t<div class=\"stock__footnote-descr\">Акция длится с 1 января по 15 марта.</div>\n\t\t\t\t<div class=\"social-buttons desktop-hide\">\n\t\t\t\t\t<div class=\"social-buttons-item\"><a href=\"tel:+71234567890\" class=\"button button_round\"><img\n\t\t\t\t\t\t\tsrc=\"" + ___HTML_LOADER_REPLACEMENT_28___ + "\" alt=\"phone\"></a>\n\t\t\t\t\t\t<div class=\"social-buttons-item__descr\">Телефон</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"social-buttons-item\">\n\t\t\t\t\t\t<a href=\"https://msng.link/vi/71234567890\" class=\"button_social\"><img\n\t\t\t\t\t\t\t\tsrc=\"" + ___HTML_LOADER_REPLACEMENT_29___ + "\" alt=\"viber\"></a>\n\t\t\t\t\t\t<div class=\"social-buttons-item__descr\">Viber</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"social-buttons-item\">\n\t\t\t\t\t\t<a href=\"https://msng.link/wa/71234567890\" class=\"button_social\"><img\n\t\t\t\t\t\t\t\tsrc=\"" + ___HTML_LOADER_REPLACEMENT_30___ + "\" alt=\"whatsapp\"></a>\n\t\t\t\t\t\t<div class=\"social-buttons-item__descr\">WhatsApp</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"feedback stock-feedback\">\n\t\t\t\t<div class=\"feedback-wrap\">\n\t\t\t\t\t<div class=\"feedback__icon\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_13___ + "\" alt=\"\"></div>\n\t\t\t\t\t<div class=\"feedback__title\">Получите консультацию от специалиста в удобное для Вас время</div>\n\t\t\t\t\t<form class=\"feedback__form\" id=\"feedback3\">\n\t\t\t\t\t\t<div class=\"feedback__input\"><input class=\"input feedback__input-input\" name=\"phone\" type=\"text\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tplaceholder=\"Введите номер телефона\" id=\"feedback-input3\" minlength=\"18\" required>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<button class=\"button\">Перезвоните мне</button>\n\t\t\t\t\t\t<div class=\"checkbox\"><input class=\"checkbox__input\" type=\"checkbox\" id=\"checkbox3\"> <label\n\t\t\t\t\t\t\t\tclass=\"checkbox__label\" for=\"checkbox3\"></label>\n\t\t\t\t\t\t\t<div class=\"checkbox__descr checkbox__descr_round-feedback\">Я соглашаюсь с\n\t\t\t\t\t\t\t\t<span class=\"link-privacy\">политикой конфиденциальности</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</form>\n\t\t\t\t</div>\n\t\t\t</div><!-- /feedback --></div>\n\t</div><!-- /stock -->\n\t<div class=\"director\" id=\"director\">\n\t\t<div class=\"wrapper_small\">\n\t\t\t<div class=\"section-title director__title desktop-hide\">Эдуард Тюленев<span>о ценностях Relax Live</span>\n\t\t\t</div>\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"director-avatar\">\n\t\t\t\t\t<div class=\"director-avatar__photo-wrap\">\n\t\t\t\t\t\t<div class=\"director-avatar__photo\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"director-avatar__descr mobile-hide tablet-hide\">Мы с любовью создаем уют для Вашего дома. Получите\n\t\t\t\t\t\tот меня персональную консультацию!\n\t\t\t\t\t</div>\n\t\t\t\t\t<button class=\"button button_wide mobile-hide tablet-hide\">Проконсультироваться</button>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"director-content\">\n\t\t\t\t\t<div class=\"section-title director__title mobile-hide tablet-hide\">Эдуард\n\t\t\t\t\t\tТюленев<span>о ценностях Relax Live</span></div>\n\t\t\t\t\t<div class=\"director-content-wrap\">\n\t\t\t\t\t\t<div class=\"director-content__text\">\n\t\t\t\t\t\t\t<p>С самого первого дня основания компании Relax Live моей главной целью\n\t\t\t\t\t\t\t\tбыло сделать ремонт стильным и продуманным. Наша главная задача - оставаться в рамках той философии, которая\n\t\t\t\t\t\t\t\tизначально укрепилась в компании. Это значит, что мы в первую очередь думаем не о продажах услуг и\n\t\t\t\t\t\t\t\tпривлечении клиентов, а о нашем продукте!</p>\n\t\t\t\t\t\t\t<p>Мы думаем о том, как ежедневно совершенствовать сам продукт. Наш клиент должен получить самый лучший,\n\t\t\t\t\t\t\t\tсамый качественный ремонт с высокой степенью функциональности. В компании была поставлена цель - мы должны\n\t\t\t\t\t\t\t\tсоздать стандарт рынка. И как я думаю нам это удалось!</p></div>\n\t\t\t\t\t\t<div class=\"director-content__signature\">\n\t\t\t\t\t\t\t<div class=\"director-content__signature-wrap\">\n\t\t\t\t\t\t\t\t<div class=\"director-content__signature-title\">Эдуард Тюленев</div>\n\t\t\t\t\t\t\t\t<div class=\"director-content__signature-descr\">Генеральный директор компании «Relax Live»</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"director-avatar__descr-wrap\">\n\t\t\t\t\t<div class=\"director-avatar__descr desktop-hide\">Мы с любовью создаем уют для Вашего дома. Получите от меня\n\t\t\t\t\t\tперсональную консультацию!\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<button class=\"button button_wide desktop-hide\">Проконсультироваться</button>\n\t\t\t</div>\n\t\t</div>\n\t</div><!-- /director -->\n\t<div class=\"reviews\" id=\"reviews\">\n\t\t<div class=\"section-title reviews__title\">Мы рады делать <span>клиентов счастливыми</span></div>\n\t\t<div class=\"reviews-slider-wrap\">\n\t\t\t<div class=\"slider-arrow slider-arrow_left slider-arrow_left\" id=\"reviews-arrow_left\">\n\t\t\t\t<svg width=\"17\" height=\"12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 17 12\"\n\t\t\t\t\t preserveAspectRatio=\"xMinYMin meet\">\n\t\t\t\t\t<path\n\t\t\t\t\t\t\td=\"M.97 5.47a.75.75 0 0 0 0 1.06l4.773 4.773a.75.75 0 1 0 1.06-1.06L2.561 6l4.242-4.243a.75.75 0 0 0-1.06-1.06L.97 5.47zm16.53-.22h-16v1.5h16v-1.5z\"\n\t\t\t\t\t\t\tfill=\"#322823\"></path>\n\t\t\t\t</svg>\n\t\t\t</div>\n\t\t\t<div class=\"slider-arrow slider-arrow_right\" id=\"reviews-arrow_right\">\n\t\t\t\t<svg width=\"17\" height=\"12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 17 12\"\n\t\t\t\t\t preserveAspectRatio=\"xMinYMin meet\">\n\t\t\t\t\t<path\n\t\t\t\t\t\t\td=\"M16.03 5.47a.75.75 0 0 1 0 1.06l-4.773 4.773a.75.75 0 0 1-1.06-1.06L14.439 6l-4.242-4.243a.75.75 0 1 1 1.06-1.06L16.03 5.47zM.5 5.25h15v1.5H.5v-1.5z\"\n\t\t\t\t\t\t\tfill=\"#322823\"></path>\n\t\t\t\t</svg>\n\t\t\t</div>\n\t\t\t<div class=\"reviews-slider\">\n\t\t\t\t<div class=\"reviews-slider__slide\">\n\t\t\t\t\t<div class=\"reviews-slider__slide-img\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_31___ + "\" alt=\"\"></div>\n\t\t\t\t\t<div class=\"reviews-slider__slide-date\">05.02.2020</div>\n\t\t\t\t\t<div class=\"reviews-slider__slide-title\">Анютка Дюгурова</div>\n\t\t\t\t\t<div class=\"reviews-slider__slide-descr\">Выражаю свою благодарность компании, проводившей полный ремонт *под\n\t\t\t\t\t\tключ* в моей однокомнатной квартире. Предварительная смета была расписана подробно, понятно по каждому виду\n\t\t\t\t\t\tработ. Фактическая смета ... <a class=\"link-reviews-detail\">Подробнее</a></div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"reviews-slider__slide\">\n\t\t\t\t\t<div class=\"reviews-slider__slide-img\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_32___ + "\" alt=\"\"></div>\n\t\t\t\t\t<div class=\"reviews-slider__slide-date\">08.03.2020</div>\n\t\t\t\t\t<div class=\"reviews-slider__slide-title\">Дюгурова Анютка</div>\n\t\t\t\t\t<div class=\"reviews-slider__slide-descr\">Предварительная смета была расписана подробно, понятно по каждому виду\n\t\t\t\t\t\tработ. Фактическая смета Выражаю свою благодарность компании, проводившей полный ремонт *под ключ* в моей\n\t\t\t\t\t\tоднокомнатной квартире... <a class=\"link-reviews-detail\">Подробнее</a></div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"reviews-slider__slide\">\n\t\t\t\t\t<div class=\"reviews-slider__slide-img\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_33___ + "\" alt=\"\"></div>\n\t\t\t\t\t<div class=\"reviews-slider__slide-date\">05.12.2020</div>\n\t\t\t\t\t<div class=\"reviews-slider__slide-title\">Анютка Дюгурова</div>\n\t\t\t\t\t<div class=\"reviews-slider__slide-descr\">Выражаю свою благодарность компании, проводившей полный ремонт *под\n\t\t\t\t\t\tключ* в моей однокомнатной квартире. Предварительная смета была расписана подробно, понятно по каждому виду\n\t\t\t\t\t\tработ. Фактическая смета ... <a class=\"link-reviews-detail\">Подробнее</a></div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"reviews-slider__slide\">\n\t\t\t\t\t<div class=\"reviews-slider__slide-img\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_34___ + "\" alt=\"\"></div>\n\t\t\t\t\t<div class=\"reviews-slider__slide-date\">05.02.2020</div>\n\t\t\t\t\t<div class=\"reviews-slider__slide-title\">Анютка Дюгурова</div>\n\t\t\t\t\t<div class=\"reviews-slider__slide-descr\">Предварительная смета была расписана подробно, понятно по каждому виду\n\t\t\t\t\t\tработ. Фактическая смета Выражаю свою благодарность компании, проводившей полный ремонт *под ключ* в моей\n\t\t\t\t\t\tоднокомнатной квартире... <a class=\"link-reviews-detail\">Подробнее</a></div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"reviews-slider__slide\">\n\t\t\t\t\t<div class=\"reviews-slider__slide-img\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_35___ + "\" alt=\"\"></div>\n\t\t\t\t\t<div class=\"reviews-slider__slide-date\">05.02.2020</div>\n\t\t\t\t\t<div class=\"reviews-slider__slide-title\">Анютка Дюгурова</div>\n\t\t\t\t\t<div class=\"reviews-slider__slide-descr\">Выражаю свою благодарность компании, проводившей полный ремонт *под\n\t\t\t\t\t\tключ* в моей однокомнатной квартире. Предварительная смета была расписана подробно, понятно по каждому виду\n\t\t\t\t\t\tработ. Фактическая смета ... <a class=\"link-reviews-detail\">Подробнее</a></div>\n\t\t\t\t</div>\n\t\t\t</div><!-- /reviews-slider --></div>\n\t\t<div class=\"slider-dots slider-dots-reviews slider-dots-base\">\n\t\t\t<div class=\"dot dot-reviews switch dot_active\">\n\t\t\t\t<div class=\"dot__inner\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"dot dot-reviews switch\">\n\t\t\t\t<div class=\"dot__inner\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"dot dot-reviews switch\">\n\t\t\t\t<div class=\"dot__inner\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"dot dot-reviews switch\">\n\t\t\t\t<div class=\"dot__inner\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"dot dot-reviews switch\">\n\t\t\t\t<div class=\"dot__inner\"></div>\n\t\t\t</div>\n\t\t</div><!-- /slider-dots_gray --></div><!-- /reviews -->\n\t<div class=\"wave-block feedback-block\">\n\t\t<div class=\"wrapper_feedback\">\n\t\t\t<div class=\"section-title feedback-block__title feedback-block__title_social mobile-hide tablet-hide\">Узнайте расчет\n\t\t\t\t<span>стоимости ремонта Вашего помещения</span></div>\n\t\t\t<div class=\"section-title feedback-block__title mobile-hide desktop-hide\">Узнайте расчет стоимости\n\t\t\t\t<span>ремонта Вашего помещения</span>\n\t\t\t</div>\n\t\t\t<div class=\"section-title feedback-block__title tablet-hide desktop-hide\">Узнайте расчет\n\t\t\t\t<span>стоимости ремонта Вашего помещения</span>\n\t\t\t</div>\n\t\t\t<div class=\"feedback-block__descr\">Обсудите проект со специалистом или вызовите замерщика.</div>\n\t\t\t<form class=\"feedback-block__form\" id=\"feedback4\"><label><span><sup>*</sup>Введите ваше имя:</span> <input\n\t\t\t\t\ttype=\"text\" class=\"feedback-block__form-input feedback-block__form-input_name\" name=\"name\" required=\"\"\n\t\t\t\t\tmaxlength=\"20\"></label> <label><span><sup>*</sup>Введите ваш номер:</span> <input type=\"text\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  class=\"feedback-block__form-input feedback-block__form-input_phone\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  name=\"phone\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  id=\"feedback-input4\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  required=\"\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  placeholder=\"+7 (___)___-__-__\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  minlength=\"18\"></label>\n\t\t\t\t<button class=\"button button-feedback-block\">Перезвоните мне</button>\n\t\t\t\t<div class=\"checkbox checkbox-feedback-block\">\n\t\t\t\t\t<input class=\"checkbox__input\" type=\"checkbox\" id=\"checkbox4\"\n\t\t\t\t\t\t   required=\"\"> <label class=\"checkbox__label\"\n\t\t\t\t\t\t\t\t\t\t\t   for=\"checkbox4\"></label>\n\t\t\t\t\t<div class=\"checkbox__descr\">Нажимая на кнопку, Вы даете согласие на\n\t\t\t\t\t\t<span class=\"link-privacy\">обработку своих персональных данных</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</form>\n\t\t</div>\n\t</div><!-- /feedback-block -->\n\t<div class=\"faq\" id=\"faq\">\n\t\t<div class=\"wrapper_middle\">\n\t\t\t<div class=\"section-title faq__title\">Часто задаваемые <span>вопросы</span></div>\n\t\t\t<div class=\"accordion\">\n\t\t\t\t<ul>\n\t\t\t\t\t<li><h2 class=\"title_block msg-active\">«Можно ли удешевить ремонт и как это сделать?»</h2>\n\t\t\t\t\t\t<div class=\"msg\">\n\t\t\t\t\t\t\t<p>Ремонт забирает не мало сил, нервов, времени и конечно же финансовых затрат. Удешевить и\n\t\t\t\t\t\t\t\tсэкономить на ремонте можно!</p>\n\t\t\t\t\t\t\t<p>1. Создав дизайн проект, Вы получаете интересную идею, продуманный ремонт и не стандартный подход,\n\t\t\t\t\t\t\t\tсэкономив приличную сумму денег до 15%, сохранив ваше время, поможет избежать типовых решений, переделок и\n\t\t\t\t\t\t\t\tсрыва работ, сделает квартиру вашим идеальным и самым уютным местом для жизни. На основании проекта\n\t\t\t\t\t\t\t\tсоставляется смета, планируются этапы работ и сроки их выполнения, заказ и закупка материалов,\n\t\t\t\t\t\t\t\tоборудования мебели.</p>\n\t\t\t\t\t\t\t<p>2. Используя в работе компании комплекс современных технологий, таких как: - Машинная штукатурка\n\t\t\t\t\t\t\t\tстандарта Q4. Позволяет сделать идеально ровные и гладкие стены, экономя время проведения работ до75%,\n\t\t\t\t\t\t\t\tстоимость работ до 15%, расход материала до 30%. - Полусухая стяжка B.S. (British standards).\n\t\t\t\t\t\t\t\tИспользование специальных материалов и инструментов, даёт идеально ровную и гладкую поверхность пола без\n\t\t\t\t\t\t\t\tтрещин, гарантируя качественную установку паркета, ламината, плитки и т.д., экономя время проведения работ\n\t\t\t\t\t\t\t\tдо 75%, затрат на подъём материала до 100%. - Монтаж сантехники по технологии «Система натяжное кольцо»\n\t\t\t\t\t\t\t\tгарантирует высокое качество соединения и долговечность. - Пайка доз медью в электромонтажных работах даёт\n\t\t\t\t\t\t\t\tнадежный контакт.</p>\n\t\t\t\t\t\t\t<p>3. Выбрав нашу строительную компанию Вы экономите на закупке материалов, выборе и приобретении\n\t\t\t\t\t\t\t\tоборудования, мебели и т.д. Мы работаем с проверенными поставщиками, которые гарантируют качество\n\t\t\t\t\t\t\t\tматериала и оборудования, сроки доставки, а также сэкономят до 10% Вашего бюджета.</p>\n\t\t\t\t\t\t\t<p>Доверяя свой ремонт специалистам Вы экономите свою жизненную энергию, время и деньги.</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</li>\n\t\t\t\t\t<li><h2 class=\"title_block\">«В какое время лучше делать ремонт?»</h2>\n\t\t\t\t\t\t<div class=\"msg\">\n\t\t\t\t\t\t\t<p>Ремонт забирает не мало сил, нервов, времени и конечно же финансовых затрат. Удешевить и\n\t\t\t\t\t\t\t\tсэкономить на ремонте можно!</p>\n\t\t\t\t\t\t\t<p>1. Создав дизайн проект, Вы получаете интересную идею, продуманный ремонт и не стандартный подход,\n\t\t\t\t\t\t\t\tсэкономив приличную сумму денег до 15%, сохранив ваше время, поможет избежать типовых решений, переделок и\n\t\t\t\t\t\t\t\tсрыва работ, сделает квартиру вашим идеальным и самым уютным местом для жизни. На основании проекта\n\t\t\t\t\t\t\t\tсоставляется смета, планируются этапы работ и сроки их выполнения, заказ и закупка материалов,\n\t\t\t\t\t\t\t\tоборудования мебели.</p>\n\t\t\t\t\t\t\t<p>2. Используя в работе компании комплекс современных технологий, таких как: - Машинная штукатурка\n\t\t\t\t\t\t\t\tстандарта Q4. Позволяет сделать идеально ровные и гладкие стены, экономя время проведения работ до75%,\n\t\t\t\t\t\t\t\tстоимость работ до 15%, расход материала до 30%. - Полусухая стяжка B.S. (British standards).\n\t\t\t\t\t\t\t\tИспользование специальных материалов и инструментов, даёт идеально ровную и гладкую поверхность пола без\n\t\t\t\t\t\t\t\tтрещин, гарантируя качественную установку паркета, ламината, плитки и т.д., экономя время проведения работ\n\t\t\t\t\t\t\t\tдо 75%, затрат на подъём материала до 100%. - Монтаж сантехники по технологии «Система натяжное кольцо»\n\t\t\t\t\t\t\t\tгарантирует высокое качество соединения и долговечность. - Пайка доз медью в электромонтажных работах даёт\n\t\t\t\t\t\t\t\tнадежный контакт.</p>\n\t\t\t\t\t\t\t<p>3. Выбрав нашу строительную компанию Вы экономите на закупке материалов, выборе и приобретении\n\t\t\t\t\t\t\t\tоборудования, мебели и т.д. Мы работаем с проверенными поставщиками, которые гарантируют качество\n\t\t\t\t\t\t\t\tматериала и оборудования, сроки доставки, а также сэкономят до 10% Вашего бюджета.</p>\n\t\t\t\t\t\t\t<p>Доверяя свой ремонт специалистам Вы экономите свою жизненную энергию, время и деньги.</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</li>\n\t\t\t\t\t<li><h2 class=\"title_block\">«Сколько времени потребуется на ремонт?»</h2>\n\t\t\t\t\t\t<div class=\"msg\">\n\t\t\t\t\t\t\t<p>Ремонт забирает не мало сил, нервов, времени и конечно же финансовых затрат. Удешевить и\n\t\t\t\t\t\t\t\tсэкономить на ремонте можно!</p>\n\t\t\t\t\t\t\t<p>1. Создав дизайн проект, Вы получаете интересную идею, продуманный ремонт и не стандартный подход,\n\t\t\t\t\t\t\t\tсэкономив приличную сумму денег до 15%, сохранив ваше время, поможет избежать типовых решений, переделок и\n\t\t\t\t\t\t\t\tсрыва работ, сделает квартиру вашим идеальным и самым уютным местом для жизни. На основании проекта\n\t\t\t\t\t\t\t\tсоставляется смета, планируются этапы работ и сроки их выполнения, заказ и закупка материалов,\n\t\t\t\t\t\t\t\tоборудования мебели.</p>\n\t\t\t\t\t\t\t<p>2. Используя в работе компании комплекс современных технологий, таких как: - Машинная штукатурка\n\t\t\t\t\t\t\t\tстандарта Q4. Позволяет сделать идеально ровные и гладкие стены, экономя время проведения работ до75%,\n\t\t\t\t\t\t\t\tстоимость работ до 15%, расход материала до 30%. - Полусухая стяжка B.S. (British standards).\n\t\t\t\t\t\t\t\tИспользование специальных материалов и инструментов, даёт идеально ровную и гладкую поверхность пола без\n\t\t\t\t\t\t\t\tтрещин, гарантируя качественную установку паркета, ламината, плитки и т.д., экономя время проведения работ\n\t\t\t\t\t\t\t\tдо 75%, затрат на подъём материала до 100%. - Монтаж сантехники по технологии «Система натяжное кольцо»\n\t\t\t\t\t\t\t\tгарантирует высокое качество соединения и долговечность. - Пайка доз медью в электромонтажных работах даёт\n\t\t\t\t\t\t\t\tнадежный контакт.</p>\n\t\t\t\t\t\t\t<p>3. Выбрав нашу строительную компанию Вы экономите на закупке материалов, выборе и приобретении\n\t\t\t\t\t\t\t\tоборудования, мебели и т.д. Мы работаем с проверенными поставщиками, которые гарантируют качество\n\t\t\t\t\t\t\t\tматериала и оборудования, сроки доставки, а также сэкономят до 10% Вашего бюджета.</p>\n\t\t\t\t\t\t\t<p>Доверяя свой ремонт специалистам Вы экономите свою жизненную энергию, время и деньги.</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</li>\n\t\t\t\t\t<li><h2 class=\"title_block\">«От чего зависит стоимость ремонта?»</h2>\n\t\t\t\t\t\t<div class=\"msg\">\n\t\t\t\t\t\t\t<p>Ремонт забирает не мало сил, нервов, времени и конечно же финансовых затрат. Удешевить и\n\t\t\t\t\t\t\t\tсэкономить на ремонте можно!</p>\n\t\t\t\t\t\t\t<p>1. Создав дизайн проект, Вы получаете интересную идею, продуманный ремонт и не стандартный подход,\n\t\t\t\t\t\t\t\tсэкономив приличную сумму денег до 15%, сохранив ваше время, поможет избежать типовых решений, переделок и\n\t\t\t\t\t\t\t\tсрыва работ, сделает квартиру вашим идеальным и самым уютным местом для жизни. На основании проекта\n\t\t\t\t\t\t\t\tсоставляется смета, планируются этапы работ и сроки их выполнения, заказ и закупка материалов,\n\t\t\t\t\t\t\t\tоборудования мебели.</p>\n\t\t\t\t\t\t\t<p>2. Используя в работе компании комплекс современных технологий, таких как: - Машинная штукатурка\n\t\t\t\t\t\t\t\tстандарта Q4. Позволяет сделать идеально ровные и гладкие стены, экономя время проведения работ до75%,\n\t\t\t\t\t\t\t\tстоимость работ до 15%, расход материала до 30%. - Полусухая стяжка B.S. (British standards).\n\t\t\t\t\t\t\t\tИспользование специальных материалов и инструментов, даёт идеально ровную и гладкую поверхность пола без\n\t\t\t\t\t\t\t\tтрещин, гарантируя качественную установку паркета, ламината, плитки и т.д., экономя время проведения работ\n\t\t\t\t\t\t\t\tдо 75%, затрат на подъём материала до 100%. - Монтаж сантехники по технологии «Система натяжное кольцо»\n\t\t\t\t\t\t\t\tгарантирует высокое качество соединения и долговечность. - Пайка доз медью в электромонтажных работах даёт\n\t\t\t\t\t\t\t\tнадежный контакт.</p>\n\t\t\t\t\t\t\t<p>3. Выбрав нашу строительную компанию Вы экономите на закупке материалов, выборе и приобретении\n\t\t\t\t\t\t\t\tоборудования, мебели и т.д. Мы работаем с проверенными поставщиками, которые гарантируют качество\n\t\t\t\t\t\t\t\tматериала и оборудования, сроки доставки, а также сэкономят до 10% Вашего бюджета.</p>\n\t\t\t\t\t\t\t<p>Доверяя свой ремонт специалистам Вы экономите свою жизненную энергию, время и деньги.</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</li>\n\t\t\t\t\t<li><h2 class=\"title_block\">«Нужен ли мне дизайн проект или нет?»</h2>\n\t\t\t\t\t\t<div class=\"msg\">\n\t\t\t\t\t\t\t<p>Ремонт забирает не мало сил, нервов, времени и конечно же финансовых затрат. Удешевить и\n\t\t\t\t\t\t\t\tсэкономить на ремонте можно!</p>\n\t\t\t\t\t\t\t<p>1. Создав дизайн проект, Вы получаете интересную идею, продуманный ремонт и не стандартный подход,\n\t\t\t\t\t\t\t\tсэкономив приличную сумму денег до 15%, сохранив ваше время, поможет избежать типовых решений, переделок и\n\t\t\t\t\t\t\t\tсрыва работ, сделает квартиру вашим идеальным и самым уютным местом для жизни. На основании проекта\n\t\t\t\t\t\t\t\tсоставляется смета, планируются этапы работ и сроки их выполнения, заказ и закупка материалов,\n\t\t\t\t\t\t\t\tоборудования мебели.</p>\n\t\t\t\t\t\t\t<p>2. Используя в работе компании комплекс современных технологий, таких как: - Машинная штукатурка\n\t\t\t\t\t\t\t\tстандарта Q4. Позволяет сделать идеально ровные и гладкие стены, экономя время проведения работ до75%,\n\t\t\t\t\t\t\t\tстоимость работ до 15%, расход материала до 30%. - Полусухая стяжка B.S. (British standards).\n\t\t\t\t\t\t\t\tИспользование специальных материалов и инструментов, даёт идеально ровную и гладкую поверхность пола без\n\t\t\t\t\t\t\t\tтрещин, гарантируя качественную установку паркета, ламината, плитки и т.д., экономя время проведения работ\n\t\t\t\t\t\t\t\tдо 75%, затрат на подъём материала до 100%. - Монтаж сантехники по технологии «Система натяжное кольцо»\n\t\t\t\t\t\t\t\tгарантирует высокое качество соединения и долговечность. - Пайка доз медью в электромонтажных работах даёт\n\t\t\t\t\t\t\t\tнадежный контакт.</p>\n\t\t\t\t\t\t\t<p>3. Выбрав нашу строительную компанию Вы экономите на закупке материалов, выборе и приобретении\n\t\t\t\t\t\t\t\tоборудования, мебели и т.д. Мы работаем с проверенными поставщиками, которые гарантируют качество\n\t\t\t\t\t\t\t\tматериала и оборудования, сроки доставки, а также сэкономят до 10% Вашего бюджета.</p>\n\t\t\t\t\t\t\t<p>Доверяя свой ремонт специалистам Вы экономите свою жизненную энергию, время и деньги.</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</li>\n\t\t\t\t\t<li><h2 class=\"title_block\">«Есть ли у Вашей компании гарантии?»</h2>\n\t\t\t\t\t\t<div class=\"msg\">\n\t\t\t\t\t\t\t<p>Ремонт забирает не мало сил, нервов, времени и конечно же финансовых затрат. Удешевить и\n\t\t\t\t\t\t\t\tсэкономить на ремонте можно!</p>\n\t\t\t\t\t\t\t<p>1. Создав дизайн проект, Вы получаете интересную идею, продуманный ремонт и не стандартный подход,\n\t\t\t\t\t\t\t\tсэкономив приличную сумму денег до 15%, сохранив ваше время, поможет избежать типовых решений, переделок и\n\t\t\t\t\t\t\t\tсрыва работ, сделает квартиру вашим идеальным и самым уютным местом для жизни. На основании проекта\n\t\t\t\t\t\t\t\tсоставляется смета, планируются этапы работ и сроки их выполнения, заказ и закупка материалов,\n\t\t\t\t\t\t\t\tоборудования мебели.</p>\n\t\t\t\t\t\t\t<p>2. Используя в работе компании комплекс современных технологий, таких как: - Машинная штукатурка\n\t\t\t\t\t\t\t\tстандарта Q4. Позволяет сделать идеально ровные и гладкие стены, экономя время проведения работ до75%,\n\t\t\t\t\t\t\t\tстоимость работ до 15%, расход материала до 30%. - Полусухая стяжка B.S. (British standards).\n\t\t\t\t\t\t\t\tИспользование специальных материалов и инструментов, даёт идеально ровную и гладкую поверхность пола без\n\t\t\t\t\t\t\t\tтрещин, гарантируя качественную установку паркета, ламината, плитки и т.д., экономя время проведения работ\n\t\t\t\t\t\t\t\tдо 75%, затрат на подъём материала до 100%. - Монтаж сантехники по технологии «Система натяжное кольцо»\n\t\t\t\t\t\t\t\tгарантирует высокое качество соединения и долговечность. - Пайка доз медью в электромонтажных работах даёт\n\t\t\t\t\t\t\t\tнадежный контакт.</p>\n\t\t\t\t\t\t\t<p>3. Выбрав нашу строительную компанию Вы экономите на закупке материалов, выборе и приобретении\n\t\t\t\t\t\t\t\tоборудования, мебели и т.д. Мы работаем с проверенными поставщиками, которые гарантируют качество\n\t\t\t\t\t\t\t\tматериала и оборудования, сроки доставки, а также сэкономят до 10% Вашего бюджета.</p>\n\t\t\t\t\t\t\t<p>Доверяя свой ремонт специалистам Вы экономите свою жизненную энергию, время и деньги.</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</li>\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<h2 class=\"title_block\">«Кто будет работать? Можно ли специалистов оставлять самих на объекте?»</h2>\n\t\t\t\t\t\t<div class=\"msg\">\n\t\t\t\t\t\t\t<p>Ремонт забирает не мало сил, нервов, времени и конечно же финансовых затрат. Удешевить и\n\t\t\t\t\t\t\t\tсэкономить на ремонте можно!</p>\n\t\t\t\t\t\t\t<p>1. Создав дизайн проект, Вы получаете интересную идею, продуманный ремонт и не стандартный подход,\n\t\t\t\t\t\t\t\tсэкономив приличную сумму денег до 15%, сохранив ваше время, поможет избежать типовых решений, переделок и\n\t\t\t\t\t\t\t\tсрыва работ, сделает квартиру вашим идеальным и самым уютным местом для жизни. На основании проекта\n\t\t\t\t\t\t\t\tсоставляется смета, планируются этапы работ и сроки их выполнения, заказ и закупка материалов,\n\t\t\t\t\t\t\t\tоборудования мебели.</p>\n\t\t\t\t\t\t\t<p>2. Используя в работе компании комплекс современных технологий, таких как: - Машинная штукатурка\n\t\t\t\t\t\t\t\tстандарта Q4. Позволяет сделать идеально ровные и гладкие стены, экономя время проведения работ до75%,\n\t\t\t\t\t\t\t\tстоимость работ до 15%, расход материала до 30%. - Полусухая стяжка B.S. (British standards).\n\t\t\t\t\t\t\t\tИспользование специальных материалов и инструментов, даёт идеально ровную и гладкую поверхность пола без\n\t\t\t\t\t\t\t\tтрещин, гарантируя качественную установку паркета, ламината, плитки и т.д., экономя время проведения работ\n\t\t\t\t\t\t\t\tдо 75%, затрат на подъём материала до 100%. - Монтаж сантехники по технологии «Система натяжное кольцо»\n\t\t\t\t\t\t\t\tгарантирует высокое качество соединения и долговечность. - Пайка доз медью в электромонтажных работах даёт\n\t\t\t\t\t\t\t\tнадежный контакт.</p>\n\t\t\t\t\t\t\t<p>3. Выбрав нашу строительную компанию Вы экономите на закупке материалов, выборе и приобретении\n\t\t\t\t\t\t\t\tоборудования, мебели и т.д. Мы работаем с проверенными поставщиками, которые гарантируют качество\n\t\t\t\t\t\t\t\tматериала и оборудования, сроки доставки, а также сэкономят до 10% Вашего бюджета.</p>\n\t\t\t\t\t\t\t<p>Доверяя свой ремонт специалистам Вы экономите свою жизненную энергию, время и деньги.</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t</div><!-- /accordeon --></div>\n\t</div><!-- /faq -->\n\t<div class=\"wave-block feedback-block\">\n\t\t<div class=\"wrapper_feedback\">\n\t\t\t<div class=\"section-title feedback-block__title feedback-block__title_noafter tablet-hide mobile-hide\">Не нашли\n\t\t\t\tответа на <span>свой вопрос?</span></div>\n\t\t\t<div class=\"section-title feedback-block__title feedback-block__title_noafter desktop-hide\">Не нашли ответа\n\t\t\t\t<span>на свой вопрос?</span>\n\t\t\t</div>\n\t\t\t<div class=\"feedback-block__descr\">Обсудите проект со специалистом или вызовите замерщика.</div>\n\t\t\t<form class=\"feedback-block__form\" id=\"feedback5\"><label><span><sup>*</sup>Введите ваше имя:</span> <input\n\t\t\t\t\ttype=\"text\" class=\"feedback-block__form-input feedback-block__form-input_name\" name=\"name\" required=\"\"\n\t\t\t\t\tmaxlength=\"20\"></label> <label><span><sup>*</sup>Введите ваш номер:</span> <input type=\"text\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  class=\"feedback-block__form-input feedback-block__form-input_phone\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  name=\"phone\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  id=\"feedback-input5\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  required=\"\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  placeholder=\"+7 (___)___-__-__\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  minlength=\"18\"></label>\n\t\t\t\t<button class=\"button button-feedback-block\">Перезвоните мне</button>\n\t\t\t\t<div class=\"checkbox checkbox-feedback-block\">\n\t\t\t\t\t<input class=\"checkbox__input\" type=\"checkbox\" id=\"checkbox5\"\n\t\t\t\t\t\t   required=\"\"> <label class=\"checkbox__label\"\n\t\t\t\t\t\t\t\t\t\t\t   for=\"checkbox5\"></label>\n\t\t\t\t\t<div class=\"checkbox__descr\">Нажимая на кнопку, Вы даете согласие на\n\t\t\t\t\t\t<span class=\"link-privacy\">обработку своих персональных данных</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</form>\n\t\t</div>\n\t</div><!-- /feedback-block -->\n\t<div class=\"footer\">\n\t\t<div class=\"footer_noncolor\">\n\t\t\t<div class=\"wrapper\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"footer-logo\">\n\t\t\t\t\t\t<div class=\"footer-logo__logo logo\">Relax Live</div>\n\t\t\t\t\t\t<div class=\"footer-logo__descr mobile-hide\">Доступный и качественный ремонт для вашего удобства!</div>\n\t\t\t\t\t</div><!-- /footer-logo -->\n\t\t\t\t\t<div class=\"footer-contacts mobile-hide\">\n\t\t\t\t\t\t<div class=\"footer-contacts__icon\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_36___ + "\" alt=\"\"></div>\n\t\t\t\t\t\t<div class=\"footer-contacts-wrap\">\n\t\t\t\t\t\t\t<div class=\"footer-contacts__title\">Свяжитесь с нами:</div>\n\t\t\t\t\t\t\t<div class=\"footer-contacts__phones\">\n\t\t\t\t\t\t\t\t<a href=\"tel:+79876543210\" class=\"footer-contacts__phones-phone\">+7 (987) 654-32-10</a>\n\t\t\t\t\t\t\t\t<a href=\"tel:+71234567890\" class=\"footer-contacts__phones-phone\">+7 (123) 456-78-90</a>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div><!-- /footer-contacts -->\n\t\t\t\t\t<div class=\"menu tablet-hide desktop-hide\">\n\t\t\t\t\t\t<div class=\"menu-phone-icon\">\n\t\t\t\t\t\t\t<a href=\"tel:+71234567890\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_37___ + "\" alt=\"phoneIcon\"></a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<img class=\"menu__icon\" src=\"" + ___HTML_LOADER_REPLACEMENT_38___ + "\" alt=\"menuIcon\"></div><!-- menu -->\n\t\t\t\t</div><!-- /row -->\n\t\t\t</div><!-- /wrapper --></div>\n\t\t<div class=\"footer_color\">\n\t\t\t<div class=\"wrapper\">\n\t\t\t\t<div class=\"row row_reverse\">\n\t\t\t\t\t<div class=\"copyright\">\n\t\t\t\t\t\t<div class=\"copyright__title\">Все права защищены © 2021.</div>\n\t\t\t\t\t\t<div class=\"copyright__subtitle link-privacy\">Политика конфиденциальности</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<button class=\"button-footer\"><a href=\"#main\">Вверх</a></button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div><!-- /footer -->\n\t<div class=\"popup popup-menu\">\n\t\t<div class=\"popup-dialog-menu\">\n\t\t\t<div class=\"close close-menu\">\n\t\t\t\t<svg width=\"22\" height=\"22\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n\t\t\t\t\t<path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n\t\t\t\t\t\t  d=\"M21.673.327a1.118 1.118 0 0 0-1.581 0L11 9.42 1.909.327A1.118 1.118 0 0 0 .327 1.91L9.42 11 .327 20.091a1.118 1.118 0 1 0 1.582 1.581L11 12.582l9.091 9.09a1.118 1.118 0 1 0 1.581-1.58L12.582 11l9.09-9.091a1.118 1.118 0 0 0 0-1.582z\"\n\t\t\t\t\t\t  fill=\"#fff\" fill-opacity=\".5\"></path>\n\t\t\t\t</svg>\n\t\t\t</div>\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"popup-menu-main\">\n\t\t\t\t\t<nav class=\"popup-menu-nav\">\n\t\t\t\t\t\t<div class=\"popup-menu-title\">Меню</div>\n\t\t\t\t\t\t<div class=\"popup-menu-nav__item active_menu\"><a class=\"menu-link\" href=\"#main\">главная</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"popup-menu-nav__item\"><a class=\"menu-link\" href=\"#formula\">преимущества</a></div>\n\t\t\t\t\t\t<div class=\"popup-menu-nav__item\"><a class=\"menu-link\" href=\"#repair-types\">виды ремонта</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"popup-menu-nav__item\"><a class=\"menu-link\" href=\"#portfolio\">наше портфолио</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"popup-menu-nav__item\">\n\t\t\t\t\t\t\t<a class=\"menu-link\" href=\"#transparency\">прозрачность работы</a></div>\n\n\t\t\t\t\t\t<div class=\"popup-menu-nav__item\"><a class=\"menu-link\" href=\"#director\">об основателе</a></div>\n\t\t\t\t\t\t<div class=\"popup-menu-nav__item\"><a class=\"menu-link\" href=\"#reviews\">отзывы клиентов</a></div>\n\n\t\t\t\t\t\t<div class=\"popup-menu-nav__item\"><a class=\"menu-link\" href=\"#faq\">часто задаваемые вопросы</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"link-list link-list-menu mobile-hide\"><a class=\"menu-link no-overflow\" href=\"#\">\n\t\t\t\t\t\t\t<svg width=\"17\" height=\"16\" fill=\"none\" viewBox=\"0 0 17 16\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t\t<path\n\t\t\t\t\t\t\t\t\t\td=\"M.293 8.707a1 1 0 0 1 0-1.414L6.657.929A1 1 0 0 1 8.07 2.343L2.414 8l5.657 5.657a1 1 0 1 1-1.414 1.414L.293 8.707zM16.5 9H1V7h15.5v2z\"\n\t\t\t\t\t\t\t\t\t\tfill=\"#CFB8A4\"></path>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\tПолный список услуг и цен</a></div>\n\t\t\t\t\t</nav>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"popup-menu-copyright\">Все права защищены © 2021. Политика конфиденциальности</div>\n\t\t\t</div>\n\t\t\t<div class=\"link-list link-list-menu tablet-hide desktop-hide\"><a class=\"menu-link no-overflow\" href=\"#\">\n\t\t\t\t<svg width=\"17\" height=\"16\" fill=\"none\" viewBox=\"0 0 17 16\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t<path\n\t\t\t\t\t\t\td=\"M.293 8.707a1 1 0 0 1 0-1.414L6.657.929A1 1 0 0 1 8.07 2.343L2.414 8l5.657 5.657a1 1 0 1 1-1.414 1.414L.293 8.707zM16.5 9H1V7h15.5v2z\"\n\t\t\t\t\t\t\tfill=\"#CFB8A4\"></path>\n\t\t\t\t</svg>\n\t\t\t\tПолный список услуг и цен</a></div>\n\t\t</div>\n\t</div>\n\t<div class=\"popup popup-consultation\">\n\t\t<div class=\"feedback-wrap\">\n\t\t\t<div class=\"close close-consultation\">\n\t\t\t\t<svg width=\"22\" height=\"22\" fill=\"none\" viewBox=\"0 0 22 22\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t<mask id=\"a\" fill=\"#fff\">\n\t\t\t\t\t\t<path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n\t\t\t\t\t\t\t  d=\"M21.673.327a1.118 1.118 0 0 0-1.581 0L11 9.42 1.909.327A1.118 1.118 0 0 0 .327 1.91L9.42 11 .327 20.091a1.118 1.118 0 1 0 1.582 1.581L11 12.582l9.091 9.09a1.118 1.118 0 1 0 1.581-1.58L12.582 11l9.09-9.091a1.118 1.118 0 0 0 0-1.582z\"></path>\n\t\t\t\t\t</mask>\n\t\t\t\t\t<path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n\t\t\t\t\t\t  d=\"M21.673.327a1.118 1.118 0 0 0-1.581 0L11 9.42 1.909.327A1.118 1.118 0 0 0 .327 1.91L9.42 11 .327 20.091a1.118 1.118 0 1 0 1.582 1.581L11 12.582l9.091 9.09a1.118 1.118 0 1 0 1.581-1.58L12.582 11l9.09-9.091a1.118 1.118 0 0 0 0-1.582z\"\n\t\t\t\t\t\t  fill=\"#fff\" fill-opacity=\".8\"></path>\n\t\t\t\t\t<path\n\t\t\t\t\t\t\td=\"M20.091.327l.708.708-.707-.708zm1.582 0l-.707.708.707-.708zM11 9.42l-.707.707.707.707.707-.707L11 9.419zM1.909.327l.707-.707-.707.707zm-1.582 0L-.38-.38l.707.707zm0 1.582l.708-.708-.708.708zM9.42 11l.707.707.707-.707-.707-.707-.707.707zM.327 20.091l-.707-.707.707.707zm0 1.581l.708-.707-.708.707zm1.582 0l-.708-.707.708.707zM11 12.582l.707-.708-.707-.707-.707.707.707.707zm10.672 7.51l-.707.707.707-.708zM12.582 11l-.708-.707-.707.707.707.707.707-.707zm9.09-9.091l.708.707-.707-.707zm-.873-.874a.118.118 0 0 1 .166 0L22.38-.38a2.118 2.118 0 0 0-2.996 0L20.8 1.035zm-9.092 9.091L20.8 1.035 19.384-.38l-9.091 9.092 1.414 1.414zM1.201 1.035l9.092 9.091 1.414-1.414L2.616-.38 1.2 1.035zm-.166 0a.118.118 0 0 1 .166 0L2.616-.38a2.118 2.118 0 0 0-2.996 0l1.415 1.415zm0 .166a.118.118 0 0 1 0-.166L-.38-.38a2.118 2.118 0 0 0 0 2.996L1.035 1.2zm9.091 9.092L1.035 1.2-.38 2.616l9.092 9.091 1.414-1.414zM1.035 20.799l9.091-9.092-1.414-1.414-9.092 9.091L1.035 20.8zm0 .166a.118.118 0 0 1 0-.166L-.38 19.384a2.118 2.118 0 0 0 0 2.996l1.415-1.415zm.167 0a.118.118 0 0 1-.167 0L-.38 22.38a2.118 2.118 0 0 0 2.996 0L1.2 20.965zm9.09-9.091l-9.09 9.091 1.414 1.415 9.091-9.092-1.414-1.414zM20.8 20.965l-9.092-9.091-1.414 1.414 9.091 9.092 1.415-1.415zm.166 0a.118.118 0 0 1-.166 0l-1.415 1.415a2.118 2.118 0 0 0 2.996 0l-1.415-1.415zm0-.166a.118.118 0 0 1 0 .166l1.415 1.415a2.118 2.118 0 0 0 0-2.996L20.965 20.8zm-9.091-9.092l9.091 9.091 1.415-1.414-9.092-9.091-1.414 1.414zm9.091-10.506l-9.091 9.092 1.414 1.414 9.092-9.091L20.965 1.2zm0-.166a.118.118 0 0 1 0 .166l1.415 1.415a2.118 2.118 0 0 0 0-2.996l-1.415 1.415z\"\n\t\t\t\t\t\t\tfill=\"#000\" mask=\"url(#a)\"></path>\n\t\t\t\t</svg>\n\t\t\t</div>\n\t\t\t<div class=\"feedback__icon\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_13___ + "\" alt=\"\"></div>\n\t\t\t<div class=\"feedback__title\">Получите консультацию от специалиста в удобное для Вас время</div>\n\t\t\t<form class=\"feedback__form\" id=\"feedback6\">\n\t\t\t\t<div class=\"feedback__input\"><input class=\"input feedback__input-input\" name=\"phone\" type=\"text\"\n\t\t\t\t\t\t\t\t\t\t\t\t\tplaceholder=\"Введите номер телефона\" id=\"feedback-input6\" minlength=\"18\" required>\n\t\t\t\t</div>\n\t\t\t\t<button class=\"button button-consultation\">Перезвоните мне</button>\n\t\t\t\t<div class=\"checkbox\"><input class=\"checkbox__input\" type=\"checkbox\" id=\"checkbox6\"> <label\n\t\t\t\t\t\tclass=\"checkbox__label checkbox__label-consultation\" for=\"checkbox6\"></label>\n\t\t\t\t\t<div class=\"checkbox__descr checkbox__descr_round-feedback\">Я соглашаюсь с\n\t\t\t\t\t\t<span class=\"link-privacy\">политикой конфиденциальности</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</form>\n\t\t</div><!-- /feedback --></div><!-- /popup consultation -->\n\t<div class=\"popup popup-thank\">\n\t\t<div class=\"feedback-wrap popup-thank-bg\">\n\t\t\t<div class=\"close close-thank\">\n\t\t\t\t<svg width=\"22\" height=\"22\" fill=\"none\" viewBox=\"0 0 22 22\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t<mask id=\"a\" fill=\"#fff\">\n\t\t\t\t\t\t<path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n\t\t\t\t\t\t\t  d=\"M21.673.327a1.118 1.118 0 0 0-1.581 0L11 9.42 1.909.327A1.118 1.118 0 0 0 .327 1.91L9.42 11 .327 20.091a1.118 1.118 0 1 0 1.582 1.581L11 12.582l9.091 9.09a1.118 1.118 0 1 0 1.581-1.58L12.582 11l9.09-9.091a1.118 1.118 0 0 0 0-1.582z\"></path>\n\t\t\t\t\t</mask>\n\t\t\t\t\t<path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n\t\t\t\t\t\t  d=\"M21.673.327a1.118 1.118 0 0 0-1.581 0L11 9.42 1.909.327A1.118 1.118 0 0 0 .327 1.91L9.42 11 .327 20.091a1.118 1.118 0 1 0 1.582 1.581L11 12.582l9.091 9.09a1.118 1.118 0 1 0 1.581-1.58L12.582 11l9.09-9.091a1.118 1.118 0 0 0 0-1.582z\"\n\t\t\t\t\t\t  fill=\"#fff\" fill-opacity=\".8\"></path>\n\t\t\t\t</svg>\n\t\t\t</div>\n\t\t\t<div class=\"popup-thank-content\">\n\t\t\t\t<div class=\"popup-thank__title\">Спасибо<br>за обращение!</div>\n\t\t\t\t<div class=\"popup-thank__descr\">Ожидайте звонка нашего специалиста. Будем рады помогать Вам!</div>\n\t\t\t\t<div class=\"popup-thank__logo\">Relax Live</div>\n\t\t\t</div>\n\t\t</div><!-- /feedback --></div>\n    <div class=\"popup popup-error\">\n      <div class=\"feedback-wrap popup-thank-bg\">\n        <div class=\"close close-thank\">\n          <svg width=\"22\" height=\"22\" fill=\"none\" viewBox=\"0 0 22 22\" xmlns=\"http://www.w3.org/2000/svg\">\n            <mask id=\"a\" fill=\"#fff\">\n              <path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                  d=\"M21.673.327a1.118 1.118 0 0 0-1.581 0L11 9.42 1.909.327A1.118 1.118 0 0 0 .327 1.91L9.42 11 .327 20.091a1.118 1.118 0 1 0 1.582 1.581L11 12.582l9.091 9.09a1.118 1.118 0 1 0 1.581-1.58L12.582 11l9.09-9.091a1.118 1.118 0 0 0 0-1.582z\"></path>\n            </mask>\n            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                d=\"M21.673.327a1.118 1.118 0 0 0-1.581 0L11 9.42 1.909.327A1.118 1.118 0 0 0 .327 1.91L9.42 11 .327 20.091a1.118 1.118 0 1 0 1.582 1.581L11 12.582l9.091 9.09a1.118 1.118 0 1 0 1.581-1.58L12.582 11l9.09-9.091a1.118 1.118 0 0 0 0-1.582z\"\n                fill=\"#fff\" fill-opacity=\".8\"></path>\n          </svg>\n        </div>\n        <div class=\"popup-thank-content\">\n          <div class=\"popup-thank__title\"></div>\n          <div class=\"popup-thank__descr\">Что-то пошло не так ...</div>\n          <div class=\"popup-thank__logo\">Relax Live</div>\n        </div>\n      </div><!-- /feedback --></div>\n\t<div class=\"popup popup-repair-types\">\n\t\t<div class=\"close mobile-hide\">\n\t\t\t<svg width=\"22\" height=\"22\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n\t\t\t\t<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M21.673.327a1.118 1.118 0 0 0-1.581 0L11 9.42 1.909.327A1.118 1.118 0 0 0 .327 1.91L9.42 11 .327 20.091a1.118 1.118 0 1 0 1.582 1.581L11 12.582l9.091 9.09a1.118 1.118 0 1 0 1.581-1.58L12.582 11l9.09-9.091a1.118 1.118 0 0 0 0-1.582z\"\n\t\t\t\t\t  fill=\"#322823\" fill-opacity=\".5\"></path>\n\t\t\t</svg>\n\t\t</div>\n\t\t<div class=\"popup-dialog popup-dialog-repair-types\">\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"popup-repair-types-tab\">\n\t\t\t\t\t<div class=\"mobile-hide popup-repair-types-nav__title\">Полный список услуг и цен</div>\n\t\t\t\t\t<div class=\"tablet-hide desktop-hide popup-repair-types-nav__title\">\n\t\t\t\t\t\t<div class=\"close\">\n\t\t\t\t\t\t\t<svg width=\"22\" height=\"22\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n\t\t\t\t\t\t\t\t<path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n\t\t\t\t\t\t\t\t\t  d=\"M21.673.327a1.118 1.118 0 0 0-1.581 0L11 9.42 1.909.327A1.118 1.118 0 0 0 .327 1.91L9.42 11 .327 20.091a1.118 1.118 0 1 0 1.582 1.581L11 12.582l9.091 9.09a1.118 1.118 0 1 0 1.581-1.58L12.582 11l9.09-9.091a1.118 1.118 0 0 0 0-1.582z\"\n\t\t\t\t\t\t\t\t\t  fill=\"#322823\" fill-opacity=\".5\"></path>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\tCписок услуг и цен\n\t\t\t\t\t</div><!-- /popup-repair-types-nav__title -->\n\t\t\t\t\t<div class=\"nav-wrap nav-wrap-repair\">\n\t\t\t\t\t\t<nav class=\"nav-popup nav-popup-repair-types transparancy-cut\">\n\t\t\t\t\t\t\t<div class=\"nav-list nav-list-popup-repair\">\n\t\t\t\t\t\t\t\t<button class=\"button_o popup-repair-types-nav__item active\">Потолок: Демонтажные работы</button>\n\t\t\t\t\t\t\t\t<button class=\"button_o popup-repair-types-nav__item\">Потолок: Монтажные работы</button>\n\t\t\t\t\t\t\t\t<button class=\"button_o popup-repair-types-nav__item\">Стены: Демонтажные работы</button>\n\t\t\t\t\t\t\t\t<button class=\"button_o popup-repair-types-nav__item\">Стены: Монтажные работы</button>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</nav><!-- /.repair-types__nav -->\n\t\t\t\t\t\t<div class=\"nav-arrow nav-arrow_left desktop-hide\" id=\"nav-arrow-popup-repair_left\">\n\t\t\t\t\t\t\t<svg width=\"12\" height=\"16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t\t<path d=\"M11 1L1 8l10 7\" stroke=\"#322823\" stroke-width=\".3\" stroke-linecap=\"round\"\n\t\t\t\t\t\t\t\t\t  stroke-linejoin=\"round\"></path>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"nav-arrow nav-arrow_right desktop-hide\" id=\"nav-arrow-popup-repair_right\">\n\t\t\t\t\t\t\t<svg width=\"12\" height=\"16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t\t<path d=\"M1 1l10 7-10 7\" stroke=\"#322823\" stroke-width=\".3\" stroke-linecap=\"round\"\n\t\t\t\t\t\t\t\t\t  stroke-linejoin=\"round\"></path>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div><!-- /.repair-types__nav-wrap --></div><!-- /.repair-types-tab -->\n\t\t\t\t<div class=\"popup-repair-types-content\">\n\t\t\t\t\t<div class=\"popup-repair-types-content__head mobile-hide\">\n\t\t\t\t\t\t<div class=\"popup-repair-types-content__head-title\" id=\"switch-inner\">Потолок: Демонтажные работы</div>\n\t\t\t\t\t\t<div class=\"popup-repair-types-content__head-date\">28 марта 2021 <i><i></i></i></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"popup-repair-types-content-table-wrap\">\n\t\t\t\t\t\t<table class=\"popup-repair-types-content-table__head\">\n\t\t\t\t\t\t\t<thead>\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<th>Виды работ</th>\n\t\t\t\t\t\t\t\t<th class=\"mobile-hide\">Ед. измерения</th>\n\t\t\t\t\t\t\t\t<th class=\"mobile-hide\">Цена за ед.</th>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t</thead>\n\t\t\t\t\t\t</table>\n\t\t\t\t\t\t<div class=\"popup-repair-types-content-table\">\n\t\t\t\t\t\t\t<table class=\"popup-repair-types-content-table__list\">\n\t\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row showHide\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Очистка потолка от побелки, краски,водоэмульсионки</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">130 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Очистка потолка от обоев</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">120 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Разборка ПВХ ,МДФ панелей с потолка</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">170 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Очистка потолка от побелки, краски,водоэмульсионки</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">110 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Очистка потолка от обоев</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">140 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Разборка ПВХ ,МДФ панелей с потолка</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">180 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Очистка потолка от побелки, краски,водоэмульсионки</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">100 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Очистка потолка от обоев</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">120 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Разборка ПВХ ,МДФ панелей с потолка</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">110 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Очистка потолка от побелки, краски,водоэмульсионки</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">100 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Очистка потолка от обоев</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">120 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Разборка ПВХ ,МДФ панелей с потолка</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">110 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t\t</table><!-- /popup-repair-types-tab-table-list -->\n\t\t\t\t\t\t\t<table class=\"popup-repair-types-content-table__list\">\n\t\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Побелка, покраска</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">190 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Поклейка обоев</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">120 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Монтаж ПВХ ,МДФ панелей</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">170 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Очистка потолка от побелки, краски,водоэмульсионки</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">110 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Очистка потолка от обоев</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">140 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Разборка ПВХ ,МДФ панелей с потолка</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">180 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Очистка потолка от побелки, краски,водоэмульсионки</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">100 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Очистка потолка от обоев</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">120 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Разборка ПВХ ,МДФ панелей с потолка</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">110 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Очистка потолка от побелки, краски,водоэмульсионки</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">100 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Очистка потолка от обоев</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">120 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Разборка ПВХ ,МДФ панелей с потолка</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">110 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t\t</table><!-- /popup-repair-types-tab-table-list -->\n\t\t\t\t\t\t\t<table class=\"popup-repair-types-content-table__list\">\n\t\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Очистка стен от побелки, краски,водоэмульсионки</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">130 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Очистка стен от обоев</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">105 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Разборка ПВХ ,МДФ панелей со стен</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">110 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Очистка потолка от побелки, краски,водоэмульсионки</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">110 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Очистка потолка от обоев</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">140 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Разборка ПВХ ,МДФ панелей с потолка</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">180 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Очистка потолка от побелки, краски,водоэмульсионки</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">100 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Очистка потолка от обоев</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">120 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Разборка ПВХ ,МДФ панелей с потолка</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">110 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Очистка потолка от побелки, краски,водоэмульсионки</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">100 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Очистка потолка от обоев</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">120 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Разборка ПВХ ,МДФ панелей с потолка</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">110 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t\t</table><!-- /popup-repair-types-tab-table-list -->\n\t\t\t\t\t\t\t<table class=\"popup-repair-types-content-table__list\">\n\t\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Очистка потолка от побелки, краски,водоэмульсионки</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">150 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Поклейка обоев</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">100 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Разборка ПВХ ,МДФ панелей с потолка</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">170 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Очистка потолка от побелки, краски,водоэмульсионки</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">110 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Очистка потолка от обоев</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">140 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Разборка ПВХ ,МДФ панелей с потолка</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">180 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Очистка потолка от побелки, краски,водоэмульсионки</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">100 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Очистка потолка от обоев</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">120 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Разборка ПВХ ,МДФ панелей с потолка</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">110 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Очистка потолка от побелки, краски,водоэмульсионки</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">100 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Очистка потолка от обоев</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">120 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr class=\"mobile-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-name\">Разборка ПВХ ,МДФ панелей с потолка</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Ед.измерения</td>\n\t\t\t\t\t\t\t\t\t<td class=\"mobile-col-title tablet-hide desktop-hide\">Цена за ед.</td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">м<sup>2</sup></td>\n\t\t\t\t\t\t\t\t\t<td class=\"repair-types-value\">110 руб.</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t\t</table><!-- /popup-repair-types-tab-table-list -->\n\t\t\t\t\t\t</div><!-- /popup-repair-types-tab-table --></div>\n\t\t\t\t</div><!-- /popup-repair-types-tab --></div><!-- /.row --></div><!-- /popup-dialog --></div>\n\t<!-- /popup popup-repair-types -->\n\t<div class=\"popup popup-portfolio\">\n\t\t<div class=\"close mobile-hide\">\n\t\t\t<svg width=\"22\" height=\"22\" fill=\"none\" viewBox=\"0 0 22 22\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t<path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n\t\t\t\t\t  d=\"M21.673.327a1.118 1.118 0 0 0-1.581 0L11 9.42 1.909.327A1.118 1.118 0 0 0 .327 1.91L9.42 11 .327 20.091a1.118 1.118 0 1 0 1.582 1.581L11 12.582l9.091 9.09a1.118 1.118 0 1 0 1.581-1.58L12.582 11l9.09-9.091a1.118 1.118 0 0 0 0-1.582z\"\n\t\t\t\t\t  fill=\"#322823\" fill-opacity=\".5\"></path>\n\t\t\t</svg>\n\t\t</div>\n\t\t<div class=\"popup-dialog popup-dialog-portfolio\">\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"popup-portfolio-slider-wrap\">\n\t\t\t\t\t<div class=\"close tablet-hide desktop-hide\">\n\t\t\t\t\t\t<svg width=\"22\" height=\"22\" fill=\"none\" viewBox=\"0 0 22 22\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t<path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n\t\t\t\t\t\t\t\t  d=\"M21.673.327a1.118 1.118 0 0 0-1.581 0L11 9.42 1.909.327A1.118 1.118 0 0 0 .327 1.91L9.42 11 .327 20.091a1.118 1.118 0 1 0 1.582 1.581L11 12.582l9.091 9.09a1.118 1.118 0 1 0 1.581-1.58L12.582 11l9.09-9.091a1.118 1.118 0 0 0 0-1.582z\"\n\t\t\t\t\t\t\t\t  fill=\"#322823\" fill-opacity=\".5\"></path>\n\t\t\t\t\t\t</svg>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"popup-portfolio-slider\">\n\t\t\t\t\t\t<div class=\"popup-portfolio-slider__slide\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_39___ + "\" alt=\"\"></div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-slider__slide\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_40___ + "\" alt=\"\"></div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-slider__slide\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_41___ + "\" alt=\"\"></div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-slider__slide\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_42___ + "\" alt=\"\"></div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-slider__slide\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_43___ + "\" alt=\"\"></div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-slider__slide\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_44___ + "\" alt=\"\"></div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-slider__slide\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_42___ + "\" alt=\"\"></div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-slider__slide\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_41___ + "\" alt=\"\"></div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-slider__slide\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_40___ + "\" alt=\"\"></div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-slider__slide\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_39___ + "\" alt=\"\"></div>\n\t\t\t\t\t\t<!-- /popup-portfolio-slide --></div>\n\t\t\t\t\t<div class=\"slider-counter\" id=\"popup-portfolio-counter\">\n\t\t\t\t\t\t<div class=\"slider-counter-content\">\n\t\t\t\t\t\t\t<div class=\"slider-counter-content__current\">1</div>\n\t\t\t\t\t\t\t<div class=\"slider-counter-content__total\">3</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"popup-arrow popup-arrow_left\" id=\"popup_portfolio_left\">\n\t\t\t\t\t\t<svg width=\"32\" height=\"44\" fill=\"none\" viewBox=\"0 0 32 44\" preserveAspectRatio=\"xMinYMin meet\"\n\t\t\t\t\t\t\t xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t<path d=\"M30 41.999l-28-20 28-20\" stroke=\"#fff\" stroke-opacity=\".5\" stroke-width=\"3\" stroke-linecap=\"round\"\n\t\t\t\t\t\t\t\t  stroke-linejoin=\"round\"></path>\n\t\t\t\t\t\t</svg>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"popup-arrow popup-arrow_right\" id=\"popup_portfolio_right\">\n\t\t\t\t\t\t<svg width=\"32\" height=\"44\" fill=\"none\" viewBox=\"0 0 32 44\" preserveAspectRatio=\"xMinYMin meet\"\n\t\t\t\t\t\t\t xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t<path d=\"M2 1.999l28 20-28 20\" stroke=\"#fff\" stroke-opacity=\".5\" stroke-width=\"3\" stroke-linecap=\"round\"\n\t\t\t\t\t\t\t\t  stroke-linejoin=\"round\"></path>\n\t\t\t\t\t\t</svg>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"popup-portfolio-text\">\n\t\t\t\t\t<div class=\"popup-portfolio-text-important\">\n\t\t\t\t\t\t<div class=\"popup-portfolio-text-wrap\">\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Площадь квартиры</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value_big\">64<span> м<sup>2</sup></span></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text-wrap\">\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Срок<br>ремонта</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value_big\">51<span> дней</span></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"popup-portfolio-text-price\">\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Вид ремонта</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">Косметический</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Стоимость работ</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">111 000 &#8381;</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Стоимость материалов</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">129 000 &#8381;</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div><!-- /popup-portfolio-text-price -->\n\t\t\t\t\t<div class=\"popup-portfolio-text-authors\">\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Общая стоимость ремонта</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">240 000 &#8381;</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Прораб: <strong>Петренко А.В.</strong></div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Руководитель проекта:</div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\"><strong>Тюленев Э.Н.</strong></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div><!-- /popup-portfolio-text -->\n\t\t\t\t<div class=\"popup-portfolio-text\">\n\t\t\t\t\t<div class=\"popup-portfolio-text-important\">\n\t\t\t\t\t\t<div class=\"popup-portfolio-text-wrap\">\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Площадь квартиры</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value_big\">97<span> м<sup>2</sup></span></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text-wrap\">\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Срок<br>ремонта</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value_big\">98<span> дней</span></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"popup-portfolio-text-price\">\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Вид ремонта</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">Евроремонт</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Стоимость работ</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">200 500 &#8381;</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Стоимость материалов</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">135 900 &#8381;</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div><!-- /popup-portfolio-text-price -->\n\t\t\t\t\t<div class=\"popup-portfolio-text-authors\">\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Общая стоимость ремонта</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">346 400 &#8381;</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Прораб: <strong>Петренко А.В.</strong></div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Руководитель проекта:</div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\"><strong>Тюленев Э.Н.</strong></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"popup-portfolio-text\">\n\t\t\t\t\t<div class=\"popup-portfolio-text-important\">\n\t\t\t\t\t\t<div class=\"popup-portfolio-text-wrap\">\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Площадь квартиры</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value_big\">56<span> м<sup>2</sup></span></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text-wrap\">\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Срок<br>ремонта</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value_big\">54<span> дней</span></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"popup-portfolio-text-price\">\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Вид ремонта</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">Косметический</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Стоимость работ</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">120 000 &#8381;</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Стоимость материалов</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">180 000 &#8381;</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div><!-- /popup-portfolio-text-price -->\n\t\t\t\t\t<div class=\"popup-portfolio-text-authors\">\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Общая стоимость ремонта</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">300 000 &#8381;</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Прораб: <strong>Петренко А.В.</strong></div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Руководитель проекта:</div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\"><strong>Тюленев Э.Н.</strong></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div><!-- /popup-portfolio-text -->\n\t\t\t\t<div class=\"popup-portfolio-text\">\n\t\t\t\t\t<div class=\"popup-portfolio-text-important\">\n\t\t\t\t\t\t<div class=\"popup-portfolio-text-wrap\">\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Площадь квартиры</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value_big\">102<span> м<sup>2</sup></span></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text-wrap\">\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Срок<br>ремонта</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value_big\">99<span> дней</span></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"popup-portfolio-text-price\">\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Вид ремонта</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">Евроремонт</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Стоимость работ</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">200 500 &#8381;</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Стоимость материалов</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">185 900 &#8381;</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div><!-- /popup-portfolio-text-price -->\n\t\t\t\t\t<div class=\"popup-portfolio-text-authors\">\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Общая стоимость ремонта</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">386 400 &#8381;</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Прораб: <strong>Петренко А.В.</strong></div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Руководитель проекта:</div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\"><strong>Тюленев Э.Н.</strong></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div><!-- /popup-portfolio-text -->\n\t\t\t\t<div class=\"popup-portfolio-text\">\n\t\t\t\t\t<div class=\"popup-portfolio-text-important\">\n\t\t\t\t\t\t<div class=\"popup-portfolio-text-wrap\">\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Площадь квартиры</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value_big\">82<span> м<sup>2</sup></span></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text-wrap\">\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Срок<br>ремонта</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value_big\">90<span> дней</span></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"popup-portfolio-text-price\">\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Вид ремонта</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">Индивидуальный</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Стоимость работ</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">200 500 &#8381;</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Стоимость материалов</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">185 900 &#8381;</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div><!-- /popup-portfolio-text-price -->\n\t\t\t\t\t<div class=\"popup-portfolio-text-authors\">\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Общая стоимость ремонта</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">386 400 &#8381;</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Прораб: <strong>Петренко А.В.</strong></div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Руководитель проекта:</div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\"><strong>Тюленев Э.Н.</strong></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div><!-- /popup-portfolio-text -->\n\t\t\t\t<div class=\"popup-portfolio-text\">\n\t\t\t\t\t<div class=\"popup-portfolio-text-important\">\n\t\t\t\t\t\t<div class=\"popup-portfolio-text-wrap\">\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Площадь квартиры</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value_big\">82<span> м<sup>2</sup></span></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text-wrap\">\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Срок<br>ремонта</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value_big\">90<span> дней</span></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"popup-portfolio-text-price\">\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Вид ремонта</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">Индивидуальный</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Стоимость работ</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">200 500 &#8381;</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Стоимость материалов</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">185 900 &#8381;</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div><!-- /popup-portfolio-text-price -->\n\t\t\t\t\t<div class=\"popup-portfolio-text-authors\">\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Общая стоимость ремонта</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">386 400 &#8381;</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Прораб: <strong>Петренко А.В.</strong></div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Руководитель проекта:</div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\"><strong>Тюленев Э.Н.</strong></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div><!-- /popup-portfolio-text -->\n\t\t\t\t<div class=\"popup-portfolio-text\">\n\t\t\t\t\t<div class=\"popup-portfolio-text-important\">\n\t\t\t\t\t\t<div class=\"popup-portfolio-text-wrap\">\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Площадь квартиры</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value_big\">87<span> м<sup>2</sup></span></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text-wrap\">\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Срок<br>ремонта</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value_big\">74<span> дней</span></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"popup-portfolio-text-price\">\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Вид ремонта</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">Евроремонт</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Стоимость работ</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">200 500 &#8381;</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Стоимость материалов</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">185 900 &#8381;</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div><!-- /popup-portfolio-text-price -->\n\t\t\t\t\t<div class=\"popup-portfolio-text-authors\">\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Общая стоимость ремонта</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">386 400 &#8381;</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Прораб: <strong>Петренко А.В.</strong></div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Руководитель проекта:</div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\"><strong>Тюленев Э.Н.</strong></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div><!-- /popup-portfolio-text -->\n\t\t\t\t<div class=\"popup-portfolio-text\">\n\t\t\t\t\t<div class=\"popup-portfolio-text-important\">\n\t\t\t\t\t\t<div class=\"popup-portfolio-text-wrap\">\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Площадь квартиры</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value_big\">56<span> м<sup>2</sup></span></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text-wrap\">\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Срок<br>ремонта</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value_big\">54<span> дней</span></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"popup-portfolio-text-price\">\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Вид ремонта</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">Косметический</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Стоимость работ</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">120 000 &#8381;</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Стоимость материалов</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">180 000 &#8381;</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div><!-- /popup-portfolio-text-price -->\n\t\t\t\t\t<div class=\"popup-portfolio-text-authors\">\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Общая стоимость ремонта</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">300 000 &#8381;</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Прораб: <strong>Петренко А.В.</strong></div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Руководитель проекта:</div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\"><strong>Тюленев Э.Н.</strong></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div><!-- /popup-portfolio-text -->\n\t\t\t\t<div class=\"popup-portfolio-text\">\n\t\t\t\t\t<div class=\"popup-portfolio-text-important\">\n\t\t\t\t\t\t<div class=\"popup-portfolio-text-wrap\">\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Площадь квартиры</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value_big\">102<span> м<sup>2</sup></span></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text-wrap\">\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Срок<br>ремонта</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value_big\">99<span> дней</span></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"popup-portfolio-text-price\">\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Вид ремонта</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">Евроремонт</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Стоимость работ</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">200 500 &#8381;</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Стоимость материалов</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">185 900 &#8381;</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div><!-- /popup-portfolio-text-price -->\n\t\t\t\t\t<div class=\"popup-portfolio-text-authors\">\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Общая стоимость ремонта</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">386 400 &#8381;</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Прораб: <strong>Петренко А.В.</strong></div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Руководитель проекта:</div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\"><strong>Тюленев Э.Н.</strong></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div><!-- /popup-portfolio-text -->\n\t\t\t\t<div class=\"popup-portfolio-text\">\n\t\t\t\t\t<div class=\"popup-portfolio-text-important\">\n\t\t\t\t\t\t<div class=\"popup-portfolio-text-wrap\">\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Площадь квартиры</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value_big\">82<span> м<sup>2</sup></span></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text-wrap\">\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Срок<br>ремонта</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value_big\">90<span> дней</span></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"popup-portfolio-text-price\">\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Вид ремонта</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">Индивидуальный</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Стоимость работ</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">200 500 &#8381;</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Стоимость материалов</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">185 900 &#8381;</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div><!-- /popup-portfolio-text-price -->\n\t\t\t\t\t<div class=\"popup-portfolio-text-authors\">\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Общая стоимость ремонта</div>\n\t\t\t\t\t\t\t<div class=\"popup-portfolio-text__value\">386 400 &#8381;</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Прораб: <strong>Петренко А.В.</strong></div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\">Руководитель проекта:</div>\n\t\t\t\t\t\t<div class=\"popup-portfolio-text__title\"><strong>Тюленев Э.Н.</strong></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div><!-- /popup-portfolio-text --></div>\n\t\t</div>\n\t</div><!-- /popup-portfolio -->\n\t<div class=\"popup popup-transparency\">\n\t\t<div class=\"close mobile-hide\">\n\t\t\t<svg width=\"22\" height=\"22\" fill=\"none\" viewBox=\"0 0 22 22\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t<path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n\t\t\t\t\t  d=\"M21.673.327a1.118 1.118 0 0 0-1.581 0L11 9.42 1.909.327A1.118 1.118 0 0 0 .327 1.91L9.42 11 .327 20.091a1.118 1.118 0 1 0 1.582 1.581L11 12.582l9.091 9.09a1.118 1.118 0 1 0 1.581-1.58L12.582 11l9.09-9.091a1.118 1.118 0 0 0 0-1.582z\"\n\t\t\t\t\t  fill=\"#322823\" fill-opacity=\".5\"></path>\n\t\t\t</svg>\n\t\t</div>\n\t\t<div class=\"popup-dialog-transparency\">\n\t\t\t<div class=\"close tablet-hide desktop-hide\">\n\t\t\t\t<svg width=\"22\" height=\"22\" fill=\"none\" viewBox=\"0 0 22 22\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t<path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n\t\t\t\t\t\t  d=\"M21.673.327a1.118 1.118 0 0 0-1.581 0L11 9.42 1.909.327A1.118 1.118 0 0 0 .327 1.91L9.42 11 .327 20.091a1.118 1.118 0 1 0 1.582 1.581L11 12.582l9.091 9.09a1.118 1.118 0 1 0 1.581-1.58L12.582 11l9.09-9.091a1.118 1.118 0 0 0 0-1.582z\"\n\t\t\t\t\t\t  fill=\"#322823\" fill-opacity=\".5\"></path>\n\t\t\t\t</svg>\n\t\t\t</div>\n\t\t\t<div class=\"popup-transparency-slider-wrap\">\n\t\t\t\t<div class=\"popup-transparency-slider\">\n\t\t\t\t\t<div class=\"popup-transparency-slider__slide\"><img class=\"mobile-hide\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   src=\"" + ___HTML_LOADER_REPLACEMENT_45___ + "\" alt=\"\">\n\t\t\t\t\t\t<img\n\t\t\t\t\t\t\t\tclass=\"tablet-hide desktop-hide\" src=\"" + ___HTML_LOADER_REPLACEMENT_46___ + "\" alt=\"\"></div>\n\t\t\t\t\t<div class=\"popup-transparency-slider__slide\"><img class=\"mobile-hide\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   src=\"" + ___HTML_LOADER_REPLACEMENT_47___ + "\" alt=\"\">\n\t\t\t\t\t\t<img\n\t\t\t\t\t\t\t\tclass=\"tablet-hide desktop-hide\" src=\"" + ___HTML_LOADER_REPLACEMENT_46___ + "\" alt=\"\"></div>\n\t\t\t\t\t<div class=\"popup-transparency-slider__slide\"><img class=\"mobile-hide\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   src=\"" + ___HTML_LOADER_REPLACEMENT_48___ + "\" alt=\"\">\n\t\t\t\t\t\t<img\n\t\t\t\t\t\t\t\tclass=\"tablet-hide desktop-hide\" src=\"" + ___HTML_LOADER_REPLACEMENT_46___ + "\" alt=\"\"></div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"slider-counter slider-counter_dark\" id=\"transparency-popup-counter\">\n\t\t\t\t\t<div class=\"slider-counter-content\">\n\t\t\t\t\t\t<div class=\"slider-counter-content__current\"></div>\n\t\t\t\t\t\t<div class=\"slider-counter-content__total\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"popup-arrow popup-arrow_transparency popup-arrow_transparency_left\" id=\"transparency_left\">\n\t\t\t\t\t<svg width=\"18\" height=\"25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t<path d=\"M16.543 23.205L1 12.103 16.543 1.002\" stroke=\"#fff\" stroke-opacity=\".5\" stroke-width=\"1.665\"\n\t\t\t\t\t\t\t  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n\t\t\t\t\t</svg>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"popup-arrow popup-arrow_transparency popup-arrow_transparency_right\" id=\"transparency_right\">\n\t\t\t\t\t<svg width=\"18\" height=\"25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t<path d=\"M1.458 1L17 12.102 1.458 23.204\" stroke=\"#fff\" stroke-opacity=\".5\" stroke-width=\"1.665\"\n\t\t\t\t\t\t\t  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n\t\t\t\t\t</svg>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class=\"popup popup-privacy\">\n\t\t<div class=\"close mobile-hide\">\n\t\t\t<svg width=\"22\" height=\"22\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n\t\t\t\t<path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n\t\t\t\t\t  d=\"M21.673.327a1.118 1.118 0 0 0-1.581 0L11 9.42 1.909.327A1.118 1.118 0 0 0 .327 1.91L9.42 11 .327 20.091a1.118 1.118 0 1 0 1.582 1.581L11 12.582l9.091 9.09a1.118 1.118 0 1 0 1.581-1.58L12.582 11l9.09-9.091a1.118 1.118 0 0 0 0-1.582z\"\n\t\t\t\t\t  fill=\"#322823\" fill-opacity=\".5\"></path>\n\t\t\t</svg>\n\t\t</div>\n\t\t<div class=\"popup-dialog popup-dialog-privacy\">\n\t\t\t<div class=\"close tablet-hide desktop-hide\">\n\t\t\t\t<svg width=\"22\" height=\"22\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n\t\t\t\t\t<path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n\t\t\t\t\t\t  d=\"M21.673.327a1.118 1.118 0 0 0-1.581 0L11 9.42 1.909.327A1.118 1.118 0 0 0 .327 1.91L9.42 11 .327 20.091a1.118 1.118 0 1 0 1.582 1.581L11 12.582l9.091 9.09a1.118 1.118 0 1 0 1.581-1.58L12.582 11l9.09-9.091a1.118 1.118 0 0 0 0-1.582z\"\n\t\t\t\t\t\t  fill=\"rgba(255, 255, 255)\" fill-opacity=\".5\"></path>\n\t\t\t\t</svg>\n\t\t\t</div>\n\t\t\t<div class=\"popup-privacy-wrap\">\n\t\t\t\t<div class=\"popup-privacy__title link-privacy\">Политика конфиденциальности</div>\n\t\t\t</div>\n\t\t\t<div class=\"popup-privacy__text-wrap\">\n\t\t\t\t<div class=\"popup-privacy__text\">\n\t\t\t\t\t<div class=\"popup-privacy__text-list\">\n\t\t\t\t\t\t<ol>\n\t\t\t\t\t\t\t<li class=\"popup-privacy__text-list__title\">1. Общие условия</li>\n\t\t\t\t\t\t\t<li>1.1 Существующая на текущий момент политика конфиденциальности персональных данных (далее – Политика\n\t\t\t\t\t\t\t\tконфиденциальности) работает со следующими понятиями:\n\t\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t\t\t<li>«Администрация сайта» Так называют представляющих интересы организации специалистов, в чьи\n\t\t\t\t\t\t\t\t\t\tобязанности входит управление сайтом, то есть организация и (или) обработка поступивших на него\n\t\t\t\t\t\t\t\t\t\tперсональных данных. Для выполнения этих обязанностей они должны чётко представлять, для чего\n\t\t\t\t\t\t\t\t\t\tобрабатываются сведения, какие сведения должна быть обработаны, какие действия (операции) должны\n\t\t\t\t\t\t\t\t\t\tпроизводиться с полученными сведениями.\n\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t<li>«Персональные данные» — сведения, имеющие прямое или косвенное отношение к определённому либо\n\t\t\t\t\t\t\t\t\t\tопределяемому физическому лицу (также называемому субъектом персональных данных).\n\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t<li>«Обработка персональных данных» — любая операция (действие) либо совокупность таковых, которые\n\t\t\t\t\t\t\t\t\t\tАдминистрация производит с персональными данными. Их могут собирать, записывать, систематизировать,\n\t\t\t\t\t\t\t\t\t\tнакапливать, хранить, уточнять (при необходимости обновлять или изменять), извлекать, использовать,\n\t\t\t\t\t\t\t\t\t\tпередавать (распространять, предоставлять, открывать к ним доступ), обезличивать, блокировать, удалять\n\t\t\t\t\t\t\t\t\t\tи даже уничтожать. Данные операции (действия) могут выполняться как автоматически, так и вручную.\n\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t<li>«Конфиденциальность персональных данных» — обязательное требование, предъявляемое к Оператору или\n\t\t\t\t\t\t\t\t\t\tиному работающему с данными Пользователя должностному лицу, хранить полученные сведения в тайне, не\n\t\t\t\t\t\t\t\t\t\tпосвящая в них посторонних, если предоставивший персональные данные Пользователь не изъявил своё\n\t\t\t\t\t\t\t\t\t\tсогласие, а также отсутствует законное основание для разглашения.\n\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t<li>«Пользователь сайта Интернет-магазина» (далее — Пользователь)» – человек, посетивший сайт\n\t\t\t\t\t\t\t\t\t\tИнтернет-магазина, а также пользующийся его программами и продуктами.\n\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ol>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n  <script src=\"" + ___HTML_LOADER_REPLACEMENT_49___ + "\"></script>\n\t<script src=\"" + ___HTML_LOADER_REPLACEMENT_50___ + "\"></script>\n</body>\n</html>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "../../node_modules/html-loader/dist/runtime/getUrl.js":
/*!*************************************************************!*\
  !*** ../../node_modules/html-loader/dist/runtime/getUrl.js ***!
  \*************************************************************/
/***/ (function(module) {



module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  }

  if (!url) {
    return url;
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = String(url.__esModule ? url.default : url);

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  }

  if (options.maybeNeedQuotes && /[\t\n\f\r "'=<>`]/.test(url)) {
    return "\"".concat(url, "\"");
  }

  return url;
};

/***/ }),

/***/ "./css/style.css":
/*!***********************!*\
  !*** ./css/style.css ***!
  \***********************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "b88d04fba731603756b1.css";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../";
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map