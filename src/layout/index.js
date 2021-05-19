// import './index.html';
// import './css/style.css';

import openPhoneNumber from './modules/openPhoneNumber';
import toggleMenu from './modules/toggleMenu';
import scroll from './modules/scroll';
import validation from './modules/validation';
import openPopups from './modules/openPopups';
import openPopupsHover from './modules/openPopupsHover';
import sendForm from './modules/sendForm';
import sliders from './modules/sendForm';
import accordion from './modules/accordion';
import showRepairTypesData from './modules/showRepairTypesData';

openPhoneNumber();


toggleMenu();

scroll();


validation();


openPopups('.popup-repair-types', '.link-list');
openPopups('.popup-privacy', '.checkbox__descr span');
openPopups('.popup-transparency', '.transparency-item__img');
openPopups('.popup-consultation', '.consult');
openPopups('.popup-portfolio', '.portfolio-slider__slide-frame', '.popup-portfolio-text');
openPopups('.popup-transparency', '.transparency-item__img');


openPopupsHover();



sendForm();


sliders();

accordion();


showRepairTypesData();
