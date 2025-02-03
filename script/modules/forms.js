import {fetchRequest} from './data.js';
import {renderLists} from './render.js';

export const bookingFormControl = () => {
  const form = document.querySelector('.reservation__form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    fetchRequest('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: {
        title: form.reservation__name.value,
        body: {
          dates: form.dates.value,
          people: form.people.value,
          phone: form.reservation__phone.value,
        }
      },
      callback(err, data) {
        if (err) {
          console.warn(err, data);
          form.textContent = `К сожалению, заявка не была отправлена (${err})`;
          setTimeout(() => bookingFormReload(), 3000);
        }
        form.textContent = `Ваша заявка успешно отправлена, номер заявки: ${data.id}`;
        setTimeout(() => bookingFormReload(), 3000);
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  const bookingFormReload = () => {
    form.innerHTML = `
    <h2 class="reservation__title">Бронирование тура</h2>
    <div class="reservation__inputs">
      <div class="reservation__selects">
        <label class="reservation__select-wrapper reservation__select-wrapper_date">
          <select name="dates" id="reservation__date" class="reservation__select" required>
            <option value="" class="tour__option">Дата путешествия</option>
            <option value="4.02 - 18.02" class="tour__option reservation__option">4.02 - 18.02</option>
            <option value="7.02 - 21.02" class="tour__option reservation__option">7.02 - 21.02</option>
            <option value="12.02 - 26.02" class="tour__option reservation__option">12.02 - 26.02</option>
            <option value="20.02 - 6.03" class="tour__option reservation__option">20.02 - 6.03</option>
          </select>
        </label>
        <label class="reservation__select-wrapper reservation__select-wrapper_people">
          <select name="people" id="reservation__people" class="reservation__select" required>
            <option value="" class="tour__option reservation__option">Количество человек</option>
            <option value="" class="tour__option reservation__option">1</option>
            <option value="" class="tour__option reservation__option">2</option>
            <option value="" class="tour__option reservation__option">3</option>
            <option value="" class="tour__option reservation__option">4</option>
            <option value="" class="tour__option reservation__option">5</option>
            <option value="" class="tour__option reservation__option">6</option>
          </select>
        </label>
      </div>
    </div>
    <div class="reservation__contacts">
      <div class="reservation__input-wrap">
        <label for="reservation__name" class="reservation__label">ФИО</label>
        <input required type="text" class="reservation__input reservation__input_name" id="reservation__name" placeholder="Введите ваше ФИО">
      </div>
      <div class="reservation__input-wrap">
        <label for="reservation__phone" class="reservation__label">Телефон</label>
        <input required type="text" class="reservation__input" id="reservation__phone" placeholder="Введите номер телефона">
      </div>
    </div>
    <div class="reservation__bottom">
      <div class="reservation__info">
        <p class="reservation__data"></p>
        <p class="reservation__price"></p>
      </div>
      <button class="button reservation__button">Забронировать</button>
    </div>`;
    renderLists();
  };
};

export const footerFormControl = () => {
  let form = document.querySelector('.footer__form');
  let formTitle = document.querySelector('.footer__form-title');
  let formText = document.querySelector('.footer__text');
  let formInput = document.querySelector('.footer__input-wrap');

  const handleSubmit = (e) => {
    e.preventDefault();

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

