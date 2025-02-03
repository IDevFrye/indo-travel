import {fetchRequest} from './data.js';
import {declension} from './interaction/timer.js';

export const bookingFormControl = () => {
  const people = ['человек', 'человека', 'человек'];
  let form = document.querySelector('.reservation__form'); 

  const modalOverlay = document.createElement('div');
  modalOverlay.classList.add('overlay');
  document.body.appendChild(modalOverlay);

  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <h2 class="modal__title">Подтверждение заявки</h2>
    <p class="modal__text modal__text_people"></p>
    <p class="modal__text modal__text_dates"></p>
    <p class="modal__text modal__text_price"></p>
    <div class="modal__button">
      <button class="modal__btn modal__btn_confirm">Подтверждаю</button>
      <button class="modal__btn modal__btn_edit">Изменить данные</button>
    </div>
  `;
  document.body.appendChild(modal);

  const styles = new Set();
  const loadModalStyles = url => {
    if (styles.has(url)) return;
    return new Promise((resolve) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      link.addEventListener('load', () => {
        resolve();
      });
      document.head.append(link);
      styles.add(url);
    });
  };

  const modalPeople = modal.querySelector('.modal__text_people');
  const modalDates = modal.querySelector('.modal__text_dates');
  const modalPrice = modal.querySelector('.modal__text_price');
  const confirmBtn = modal.querySelector('.modal__btn_confirm');
  const editBtn = modal.querySelector('.modal__btn_edit');

  const showModal = async () => {
    await loadModalStyles('../../css/modal.css');

    const selectedPeople = form.people.value;
    const selectedDates = form.dates.value;
    const tourPrice = document.querySelector('.reservation__price').textContent;

    modalPeople.textContent = `Бронирование путешествия в Индонезию на ${selectedPeople} ${declension(selectedPeople, people)}`;
    modalDates.textContent = `В даты: ${selectedDates}`;
    modalPrice.textContent = `Стоимость тура: ${tourPrice}`;

    modal.classList.add('modal__active');
    modalOverlay.classList.add('overlay__active');
  };

  const closeModal = () => {
    modalOverlay.classList.remove('overlay__active');
    modal.classList.remove('modal__active');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showModal();
  };

  const handleConfirm = async () => {
    await fetchRequest('https://jsonplaceholder.typicode.com/posts', {
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
          alert('Ошибка при отправке. Попробуйте снова.');
        } else {
          form.querySelectorAll('input, select, button').forEach((el) => el.setAttribute('disabled', true));
          closeModal();
          alert(`Заявка отправлена! Номер заявки: ${data.id}`);
        }
      },
    });
  };

  form.addEventListener('submit', handleSubmit);
  confirmBtn.addEventListener('click', handleConfirm);
  editBtn.addEventListener('click', closeModal);
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

