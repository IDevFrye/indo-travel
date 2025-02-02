import {loadData} from './data.js';
import {declension} from './interaction/timer.js';

export const renderLists = async () => {
  const data = await loadData();
  const resDate = document.querySelector('#reservation__date');
  const resPeople = document.querySelector('#reservation__people');
  const resData = document.querySelector('.reservation__data');
  const resPrice = document.querySelector('.reservation__price');
  const tourDate = document.querySelector('#tour__date');
  const tourPeople = document.querySelector('#tour__people');
  const tourForm = document.querySelector('.tour__form');

  resPeople.disabled = true;
  tourPeople.disabled = true;

  resData.innerHTML = '';
  resPrice.innerHTML = '';
  resDate.innerHTML = `
    <option value="" class="tour__option">Дата путешествия</option>
    `;
  tourDate.innerHTML = `
    <option value="" class="tour__option">Дата путешествия</option>
    `;
  data.forEach((item) => {
    resDate.innerHTML += `
    <option value="${item.date}" class="tour__option reservation__option">${item.date}</option>`;
  });
  data.forEach((item) => {
    tourDate.innerHTML += `
    <option value="${item.date}" class="tour__option reservation__option">${item.date}</option>`;
  });

  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];

  const people = ['человек', 'человека', 'человек'];

  const formatDate = (dateRange) => {
    const [start, end] = dateRange.split(" - ");
    const [startDay, startMonth] = start.split(".");
    const [endDay, endMonth] = end.split(".");
    
    const formattedStart = `${startDay} ${months[parseInt(startMonth) - 1]}`;
    const formattedEnd = `${endDay} ${months[parseInt(endMonth) - 1]}`;
    
    return `${formattedStart} - ${formattedEnd}`;
  };

  resDate.addEventListener('change', () => {
    const valueDate = resDate.value;
    
    if (valueDate !== '') {
      resPeople.innerHTML = `
      <option value="" class="tour__option reservation__option">Количество человек</option>
      `;
      resPeople.disabled = false;
      const selectedDate = data.find(item => item.date == valueDate);
      const min = selectedDate['min-people'];
      const max = selectedDate['max-people'];
      for(let i = min; i <= max; i++) {
        resPeople.innerHTML += `
          <option value="${i}" class="tour__option reservation__option">${i}</option>
        `;
      };
      resData.innerText = `${formatDate(resDate.value)}`;
      
      resPeople.addEventListener('change', () => {
        const valueDate = resDate.value;
        const selectedDate = data.find(item => item.date == valueDate);
        const valuePeople = resPeople.value || 0;
        const total = selectedDate.price * valuePeople;
        resData.innerText = `${formatDate(resDate.value)}, ${valuePeople} ${declension(valuePeople, people)}`;
        resPrice.innerText = `${total.toLocaleString('ru-RU')}₽`;
      });
    } else {
      resPeople.disabled = true;
      resPeople.value = '';
    };
  });

  tourDate.addEventListener('change', () => {
    const valueDate = tourDate.value;
    
    if (valueDate !== '') {
      tourPeople.innerHTML = `
      <option value="" class="tour__option reservation__option">Количество человек</option>
      `;
      tourPeople.disabled = false;
      const selectedDate = data.find(item => item.date == valueDate);
      const min = selectedDate['min-people'];
      const max = selectedDate['max-people'];
      for(let i = min; i <= max; i++) {
        tourPeople.innerHTML += `
          <option value="${i}" class="tour__option reservation__option">${i}</option>
        `;
      };
    } else {
      tourPeople.disabled = true;
      tourPeople.value = '';
    };
  });

  tourForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const anchor = document.getElementById('reservation');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth' });
    };

    const selectedDate = data.find(item => item.date == tourDate.value);
    const total = selectedDate.price * tourPeople.value;
      
    resData.innerText = `${formatDate(selectedDate.date)}, ${tourPeople.value} ${declension(tourPeople.value, people)}`;
    resPrice.innerText = `${total.toLocaleString('ru-RU')}₽`;

    resDate.value = tourDate.value;
    resPeople.disabled = false;
    resPeople.innerHTML = `
      <option value="" class="tour__option reservation__option">Количество человек</option>
      `;
    const min = selectedDate['min-people'];
    const max = selectedDate['max-people'];
    for(let i = min; i <= max; i++) {
      resPeople.innerHTML += `
        <option value="${i}" class="tour__option reservation__option">${i}</option>
      `;
    };
    resPeople.value = tourPeople.value;
  });
};
