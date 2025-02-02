import {timer} from './modules/interaction/timer.js';
import {acc} from './modules/interaction/accordion.js';
import {burgerMenu} from './modules/interaction/burger.js';
import {fly} from './modules/interaction/fly.js';

import {renderLists} from './modules/render.js'

export const init = () => {
  const heroText = ['.hero__text', '.nothing'];
  timer(heroText);
  acc();
  burgerMenu();
  fly();
  renderLists();
};
