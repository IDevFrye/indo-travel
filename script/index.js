import {timer} from './modules/timer.js';
import {acc} from './modules/accordion.js';
import {burgerMenu} from './modules/burger.js';
import {fly} from './modules/fly.js';

export const init = () => {
  const heroText = ['.hero__text', '.nothing'];
  timer(heroText);
  acc();
  burgerMenu();
  fly();
};
