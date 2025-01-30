import {timer} from './modules/timer.js';
import {acc} from './modules/accordion.js';
import {burgerMenu} from './modules/burger.js';

export const init = () => {
  const heroText = ['.hero__text', '.nothing'];
  timer(heroText);
  acc();
  burgerMenu();
};
