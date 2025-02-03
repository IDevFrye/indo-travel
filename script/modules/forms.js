import {fetchRequest} from './data.js';
import {renderLists} from './render.js';

export const bookingFormControl = () => {
  const formContainer = document.querySelector('.reservation__container');
  let form = document.querySelector('.reservation__form'); 

  const modalOverlay = document.createElement('div');
  modalOverlay.classList.add('modal__overlay');
  document.body.appendChild(modalOverlay);

  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal__content">
      <h2 class="modal__title"></h2>
      <p class="modal__message"></p>
      <button class="modal__close"></button>
    </div>
  `;
  document.body.appendChild(modal);

  const modalTitle = modal.querySelector('.modal__title');
  const modalMessage = modal.querySelector('.modal__message');
  let modalClose = modal.querySelector('.modal__close');

  const showModal = (title, message, buttonClass, button) => {
    modalTitle.innerHTML = title;
    modalMessage.textContent = message;
    modalClose.classList.remove('modal__close');
    modalClose.classList.add(`${buttonClass}`);
    if (button === 'success') {
      modalClose.innerHTML = `<img src='../../img/Ok.png' class="modal__image">`;
    } else {
      modalClose.innerHTML = `${button}`;
    }
    modalClose = modal.querySelector(`.${buttonClass}`);
    modalClose.addEventListener('click', closeModal);
    modal.classList.add('modal__active');
    modalOverlay.classList.add('modal__overlay__active');
  };

  const closeModal = () => {
    modal.classList.remove('modal__active');
    modalOverlay.classList.remove('modal__overlay__active');
  };

  const setFormHeight = () => {
    formContainer.style.minHeight = `${formContainer.scrollHeight}px`;
    form.style.minHeight = `${formContainer.scrollHeight}px`;
  };

  setFormHeight();

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormHeight();

    fetchRequest('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: {
        title: form.reservation__name.value,
        body: {
          dates: form.dates.value,
          people: form.people.value,
          phone: form.reservation__phone.value,
        },
      },
      headers: {
        'Content-Type': 'application/json',
      },
      callback(err, data) {
        if (err) {
          console.warn(err, data);
          showModal('Упс... Что-то пошло не так', 'Не удалось отправить заявку. Пожалуйста, повторите отправку еще раз',
            'modal__close__info', 'Забронировать');
        } else {
          showModal('Ваша заявка успешно<br>отправлена', 'Наши менеджеры свяжутся с вами в течении 3-х рабочих дней',
            'modal__close__success', 'success');
          form.reset();
          renderLists();
        }
      },
    });
  };

  form.addEventListener('submit', handleSubmit);
};


export const footerFormControl = () => {
  let form = document.querySelector('.footer__form');
  let formTitle = document.querySelector('.footer__form-title');
  let formText = document.querySelector('.footer__text');
  let formInput = document.querySelector('.footer__input-wrap');

  const formHeight = form.scrollHeight;

  const setFormHeight = () => {
    form.style.minHeight = `${formHeight}px`;
  };

  setFormHeight();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormHeight();

    fetchRequest('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: {
        title: form.footer__email.value,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      callback(err, data) {
        if (err) {
          console.warn(err, data);
          formTitle.textContent = 'Заявка не была отправлена';
          formText.textContent = 'Пожалуйста, повторите отправку еще раз';
          formInput.textContent = '';
        } else {
          console.log('fddfdff');
          formTitle.textContent = 'Ваша заявка успешно отправлена';
          formText.textContent = 'Наши менеджеры свяжутся с вами в течение 3-х рабочих дней';
          formInput.textContent = '';
        }

        setTimeout(() => footerFormReload(), 3000);
      }
    });
  };

  form.addEventListener('submit', handleSubmit);

  const footerFormReload = () => {
    form.innerHTML = `
      <h2 class="footer__title footer__form-title">Есть вопросы по туру?</h2>
      <p class="footer__text">Введите свой Email и мы свяжемся с вами в течение 3 рабочих дней</p>
      <div class="footer__input-wrap">
        <input required type="text" class="footer__input" placeholder="Введите адрес электронной почты" id="footer__email">
        <button type="submit" class="button footer__button" aria-label="Кнопка отправки данных формы"></button>
      </div>`;

    form = document.querySelector('.footer__form'); 
    formTitle = document.querySelector('.footer__form-title');
    formText = document.querySelector('.footer__text');
    formInput = document.querySelector('.footer__input-wrap');
  };
};

