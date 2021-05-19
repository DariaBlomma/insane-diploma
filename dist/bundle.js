(()=>{"use strict";const e=function(e,t,r){var o;r&&(o=document.querySelector(r)),".consult"===t&&document.querySelectorAll(".button").forEach((function(e){"Проконсультироваться"===e.textContent&&e.classList.add("consult")}));var n=document.querySelector(".portfolio-slider-wrap").querySelectorAll(".item-hover"),i=function(e,t){var r=e.getBoundingClientRect().top;return t.y===r||t.y>r&&t.y<r+e.clientHeight},l=function(e,t){var r=e.getBoundingClientRect().left;return t.x===r||t.x>r&&t.x<r+e.clientWidth},a=document.querySelector(".slider-arrow-tablet-mobile_left svg"),s=document.querySelector(".slider-arrow-tablet-mobile_right svg");".portfolio-slider__slide-frame"===t&&window.innerWidth<900&&n.forEach((function(e){e.style.visibility="hidden",e.style.opacity=0}));var c=document.querySelector(e),p=c.querySelector(".close");document.addEventListener("click",(function(e){var r,n=e.target;if(".portfolio-slider__slide-frame"===t&&window.innerWidth<900){var d=i(a,e)&&l(a,e),u=i(s,e)&&l(s,e);r=n.closest(t)&&!d&&!u}else r=n.closest(t);r?(c.style.visibility="visible",o&&(o.style.display="block")):n===p?(c.style.visibility="hidden",o&&(o.style.display="none")):window.innerWidth<575&&n.classList.contains("close")&&(c.style.visibility="hidden")}))};var t,r,o,n,i,l,a,s,c,p,d,u,f,m,v,y,w,_,h,g,b;g=document.querySelector(".header-contacts__phone-number-accord a"),b=document.querySelector(".header-contacts__arrow"),document.addEventListener("click",(function(e){e.target.closest(".header-contacts__arrow")?(g.classList.toggle("opened"),b.classList.toggle("opened")):g.classList.contains("opened")&&(g.classList.remove("opened"),b.classList.remove("opened"))})),w=document.querySelector(".menu__icon"),_=document.querySelector(".popup-menu"),h=document.querySelector(".popup-dialog-menu"),window.addEventListener("resize",(function(){window.innerWidth<576?(h.style.webkitTransform="translate3d(0, -841px, 0)",h.style.transform="translate3d(0, -841px, 0)"):(h.style.webkitTransform="translate3d(645px, 0, 0)",h.style.transform="translate3d(645px, 0, 0)")})),document.addEventListener("click",(function(e){var t=e.target;t.closest(".menu__icon")?(w.classList.add("opened"),_.style.visibility="visible",h.style.webkitTransform="translate3d(0, 0, 0)",h.style.transform="translate3d(0, 0, 0)"):w.classList.contains("opened")&&(t.closest(".close-menu")||t===_||t.matches(".menu-link"))&&(w.classList.remove("opened"),_.style.visibility="hidden",window.innerWidth<576?(h.style.webkitTransform="translate3d(0, -841px, 0)",h.style.transform="translate3d(0, -841px, 0)"):(h.style.webkitTransform="translate3d(645px, 0, 0)",h.style.transform="translate3d(645px, 0, 0)"))})),v=/#(?=\D+)/g,y=[].slice.call(document.querySelectorAll('a[href*="#"]')),document.addEventListener("click",(function(e){var t=e.target;y.forEach((function(r){if(null!==r.href.match(v)&&t===r){e.preventDefault();var o=document.querySelector(r.getAttribute("href")).getBoundingClientRect().top+window.pageYOffset;if(0===o)var n=window.setInterval((function(){var e=window.pageYOffset;e>0?window.scrollTo(0,e-300):window.clearInterval(n)}),16);else var i=setInterval((function(){var e=o/20;e>window.pageYOffset-o&&window.innerHeight+window.pageYOffset<document.body.offsetHeight?window.scrollBy(0,e):(window.scrollTo(0,o),clearInterval(i))}),25)}}))})),m=document.querySelectorAll('[name="phone"]'),document.addEventListener("input",(function(e){var t=e.target;m.forEach((function(e){t===e&&(e.value=e.value.replace(/\D/g,""))}))})),maskPhone('[name="phone"]'),e(".popup-repair-types",".link-list"),e(".popup-privacy",".checkbox__descr span"),e(".popup-transparency",".transparency-item__img"),e(".popup-consultation",".consult"),e(".popup-portfolio",".portfolio-slider__slide-frame",".popup-portfolio-text"),e(".popup-transparency",".transparency-item__img"),f=function(e,t,r){var o,n,i,l=e.closest(r);if(l&&!e.closest(".formula-item-popup")){var a=e.getBoundingClientRect().top,s=e.textContent.trim().match(/\d+/g),c=String(s).slice(-1)-1;".formula-slider__slide"===r?(i=document.querySelectorAll(".formula-slider__slide"),o=document.querySelectorAll("".concat(r," .formula-item__icon")),n=document.querySelector("".concat(r," .formula-item-popup-").concat(s))):n=document.querySelector(".formula-item-popup-".concat(s)),a<n.clientHeight?(n.style.bottom="-".concat(n.clientHeight+10,"px"),n.classList.add("down")):(n.style.bottom="90px",n.classList.remove("down")),"toggle"===t&&(n.classList.toggle("formula-popup-opened"),o&&(l.classList.toggle("opened"),o[c].classList.toggle("opened"),i[c].classList.toggle("slide-opened"))),"remove"===t&&(n.classList.remove("formula-popup-opened"),l.classList.remove("opened"))}},window.innerWidth>1200?(document.addEventListener("mouseover",(function(e){var t=e.target;f(t,"toggle",".formula-item__icon")})),document.addEventListener("mouseout",(function(e){var t=e.target;f(t,"remove",".formula-item__icon")}))):document.addEventListener("click",(function(e){var t=e.target;f(t,"toggle",".formula-slider__slide")})),(u=function(e){var t=document.getElementById(e),r=t.querySelector(".checkbox__input"),o=t.querySelector(".checkbox__label"),n=document.querySelector(".popup-error"),i=document.querySelector(".popup-thank"),l=document.createElement("div");t.append(l);var a=t.querySelectorAll("input");document.addEventListener("click",(function(e){var t=e.target,r=i.querySelector(".close"),o=n.querySelector(".close");t!==r&&t!==o||(i.style.visibility="hidden",n.style.visibility="hidden")}));var s=function(){o.style.borderColor="#322823",i.style.visibility="hidden",n.style.visibility="hidden"},c=function(e){l.className="",n.style.visibility="visible",console.error(e),setTimeout(s,5e3)};t.addEventListener("submit",(function(e){if(e.preventDefault(),r.checked){o.style.borderColor="#322823",l.className="loader";var n=new FormData(t),p={};n.forEach((function(e,t){p[t]=e})),function(e){return fetch("./server.php",{method:"POST",header:{"Content-Type":"application/json"},body:JSON.stringify(e)})}(p).then((function(e){if(200!==e.status)throw new Error("network status is not 200");l.className="",i.style.visibility="visible",a.forEach((function(e){e.value=""})),r.checked=!1,setTimeout(s,5e3)})).catch(c)}else o.style.borderColor="red",setTimeout((function(){o.style.borderColor="#322823"}),3e3)}))})("feedback1"),u("feedback2"),u("feedback3"),u("feedback4"),u("feedback5"),u("feedback6"),function(){new SliderFormula({slides:".formula-slider__slide",wrapToClick:".formula",arrowRight:".slider-arrow_right-formula",arrowLeft:".slider-arrow_left-formula",slidesOnPage:3,classToChange:"hidden",classAction:"remove",breakpoint:1200,centralClass:"active"}).init(),new Slider({slides:".repair-types-slider__slide",wrapToClick:"#repair-types",arrowRight:"#repair-types-arrow_right",arrowLeft:"#repair-types-arrow_left",classToChange:"repair-hidden",classAction:"remove",counterCurrent:".slider-counter-content__current",counterTotal:".slider-counter-content__total",alt:"electro",id:"electro-slide"}).init();var e=document.getElementById("repair-types"),t=document.querySelector(".nav-list-repair");e.addEventListener("click",(function(e){e.preventDefault();var r=e.target;if(document.querySelector("#nav-arrow-repair-right_base"))if(r.closest("#nav-arrow-repair-right_base")){var o=t.children[0],n=o.cloneNode(!0);t.append(n),o.remove()}else if(r.closest("#nav-arrow-repair-left_base")){var i=t.children[t.children.length-1],l=i.cloneNode(!0);t.prepend(l),i.remove()}if(r.closest(".repair-types-nav__item")){document.querySelectorAll(".repair-types-nav__item").forEach((function(e){e.classList.remove("active")})),r.classList.add("active");var a=r.dataset.repair;new Slider({slides:".repair-types-slider__slide",wrapToClick:"#repair-types",arrowRight:"#repair-types-arrow_right",arrowLeft:"#repair-types-arrow_left",classToChange:"repair-hidden",classAction:"remove",counterCurrent:".slider-counter-content__current",counterTotal:".slider-counter-content__total",alt:"".concat(a),id:"".concat(a,"-slide")}).init()}})),new Slider({slides:".portfolio-slider-mobile .portfolio-slider__slide-frame",wrapToClick:".portfolio-slider-wrap",arrowRight:".slider-arrow-tablet-mobile_right svg",arrowLeft:".slider-arrow-tablet-mobile_left svg",classToChange:"portfolio-hidden",classAction:"remove",breakpoint:575,counterCurrent:".portfolio .slider-counter-content__current",counterTotal:".portfolio .slider-counter-content__total",arrowProblem:!0}).init(),new Slider3({slides:".portfolio-slider.mobile-hide .portfolio-slider__slide",wrapToClick:".portfolio-slider-wrap",arrowRight:"#portfolio-arrow_right",arrowLEft:"#portfolio-arrow_left",slidesOnPage:3,classToChange:"portfolio-hidden",classAction:"remove",breakpoint2:1024,infinity:!1}).init();var r=new SliderPopupDescPortfolio({slides:".popup-portfolio-slider__slide",wrapToClick:".popup-dialog-portfolio",arrowRight:".popup-arrow.popup-arrow_right",arrowLeft:".popup-arrow.popup-arrow_left",classToChange:"portfolio-inner-hidden",classAction:"remove",breakpoint2:1024,counterCurrent:".slider-counter-content__current",counterTotal:".slider-counter-content__total"});window.innerWidth>1024?r.init():window.addEventListener("resize",(function(e){window.innerWidth>1024&&r.init()})),new Slider({slides:".popup-portfolio-slider__slide",wrapToClick:".popup-portfolio",arrowRight:"#popup_portfolio_right svg",arrowLeft:"#popup_portfolio_left svg",classToChange:"portfolio-hidden",classAction:"remove",breakpoint:1024,breakpoint2:575,counterCurrent:"#popup-portfolio-counter .slider-counter-content__current",counterTotal:"#popup-portfolio-counter .slider-counter-content__total"}).init(),new Slider({slides:".popup-portfolio-slider__slide",wrapToClick:".popup-portfolio",arrowRight:"#popup_portfolio_right svg",arrowLeft:"#popup_portfolio_left svg",classToChange:"portfolio-hidden",classAction:"remove",breakpoint:575,counterCurrent:"#popup-portfolio-counter .slider-counter-content__current",counterTotal:"#popup-portfolio-counter .slider-counter-content__total"}).init(),new Slider({slides:".transparency-item",wrapToClick:".transparency-slider-wrap",arrowRight:"#transparency-arrow_right",arrowLeft:"#transparency-arrow_left",classToChange:"transparency-hidden",classAction:"remove",breakpoint:1090}).init(),new Slider({slides:".popup-transparency-slider__slide",wrapToClick:".popup-transparency",arrowRight:"#transparency_right svg",arrowLeft:"#transparency_left svg",classToChange:"transparency-hidden",classAction:"remove",counterCurrent:".popup-transparency-slider-wrap .slider-counter-content__current",counterTotal:".popup-transparency-slider-wrap .slider-counter-content__total"}).init(),new Slider({slides:".reviews-slider__slide",wrapToClick:"#reviews",arrowRight:"#reviews-arrow_right",arrowLeft:"#reviews-arrow_left",classToChange:"transparency-hidden",classAction:"remove"}).init()}(),p=document.querySelector(".accordion"),(d=p.querySelectorAll(".title_block"))[0].classList.add("msg-active"),p.addEventListener("click",(function(e){var t=e.target;d.forEach((function(e){e.classList.remove("msg-active"),t===e&&e.classList.add("msg-active")}))})),n=document.querySelector(".popup-repair-types"),i=n.querySelector(".popup-repair-types-content__head-title"),l=n.querySelectorAll(".repair-types-name"),a=n.querySelectorAll(".repair-types-value.units"),s=n.querySelectorAll(".repair-types-value.cost"),c=0,document.addEventListener("click",(function(e){var p,d=e.target;if(document.querySelector("#nav-arrow-popup-repair_left")){var u=document.querySelector(".nav-list-popup-repair");if(d.closest("#nav-arrow-popup-repair_right")){var f=u.children[0],m=f.cloneNode(!0);u.append(m),f.remove()}else if(d.closest("#nav-arrow-popup-repair_left")){var v=u.children[u.children.length-1],y=v.cloneNode(!0);u.prepend(y),v.remove()}}"visible"===n.style.visibility&&(p=i.textContent,d.closest(".popup-repair-types-nav__item")&&(p=function(e){return n.querySelectorAll(".popup-repair-types-nav__item").forEach((function(t){t.classList.remove("active"),e===t&&(t.classList.add("active"),i.textContent=t.textContent)})),i.textContent}(d))),fetch("../crm-backend/db.json").then((function(e){if(200!==e.status)throw new Error("network status is not 200");return e.json()})).then((function(e){t=new Map,r=new Map,o=new Map,e.forEach((function(e,n){e.type===p&&(c++,t.set(c,e.name),r.set(c,e.units),o.set(c,e.cost))})),c=0})).then((function(){l.forEach((function(e,r){r+1<t.size?(e.textContent="",e.parentNode.style.display=""):e.parentNode.style.display="none"})),t.forEach((function(e,t){l[t-1].textContent=e})),r.forEach((function(e,t){var r=String(e.match(/\D+/g)),o=String(e.match(/\d+/g));"null"===o&&(o=""),a[t-1].innerHTML="".concat(r,"<sup>").concat(o,"</sup>")})),o.forEach((function(e,t){s[t-1].textContent="".concat(e," руб.")}))})).catch((function(e){console.error(e)}))}))})();