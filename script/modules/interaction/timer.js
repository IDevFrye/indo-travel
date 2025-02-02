export const declension = (num, words) => {
  if (num % 10 === 1 && num % 100 !== 11) {
      return words[0];
  } else if (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)) {
      return words[1];
  } else {
      return words[2];
  };
};

export const timer = (hero) => {  
  const heroText = hero.map((item) => document.querySelector(item));

  const declensions = [
    ['день', 'дня', 'дней'],
    ['час', 'часа', 'часов'],
    ['минута', 'минуты', 'минут'],
    ['секунда', 'секунды', 'секунд']
  ];

  const getTimeRemaining = (deadline) => {
    const now = new Date();
    const diff = deadline - now;
    
    if (diff <= 0) {
      return { diff: 0, days: 0, hours: 0, minutes: 0 };
    };

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / (1000)) % 60);

    return {diff, days, hours, minutes, seconds};
  };

  const formatNumber = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  const updateTimer = (timerElement, index, deadline, secondsAdded) => {
    const timerCount = timerElement.querySelectorAll('.timer__count');
    const timerUnits = timerElement.querySelectorAll('.timer__units');
    const timerDays = timerElement.querySelector('.timer__item_days');

    const {diff, days, hours, minutes, seconds} = getTimeRemaining(deadline);

    if (diff === 0) {
      if (heroText[index]) {
        heroText[index].remove()
      };
      timerElement.remove();
      return;
    };

    if (diff > 24 * 60 * 60 * 1000) {
      timerCount.forEach((item, index) => {
        if (index === 0) {
          item.textContent = days;
        } else if (index === 1) {
          item.textContent = formatNumber(hours);
        } else {
          item.textContent = formatNumber(minutes);
        }
      });  
      timerUnits.forEach((item, index) => {
        item.textContent = declension(timerCount[index].textContent, declensions[index]);
      });
    } else {
      if (!secondsAdded && diff <= 24 * 60 * 60 * 1000) {
        timerDays.remove();
        const timerSeconds = document.createElement('p');
        timerSeconds.classList.add('timer__item', 'timer__item_seconds');
        timerSeconds.insertAdjacentHTML('afterbegin', `
          <span class="timer__count timer__count_seconds"></span>
          <span class="timer__units timer__units_seconds"></span>`);
        timerElement.append(timerSeconds);
        secondsAdded = true;
      }
      const timerCountNew = timerElement.querySelectorAll('.timer__count');
      const timerUnitsNew = timerElement.querySelectorAll('.timer__units');
      timerCountNew.forEach((item, index) => {
        if (index === 0) {
          item.textContent = formatNumber(hours);
        } else if (index === 1) {
          item.textContent = formatNumber(minutes);
        } else {
          item.textContent = formatNumber(seconds);
        }
      });  
      
      timerUnitsNew.forEach((item, index) => {
        item.textContent = declension(timerCountNew[index].textContent, declensions[index + 1]);
      });
    }
    
    setTimeout(() => updateTimer(timerElement, index, deadline, secondsAdded), 1000);
  };

  const timerElements = document.querySelectorAll('[data-timer-deadline]');

  timerElements.forEach((element, index) => {
    const deadlineStr = element.dataset.timerDeadline;
    const [datePart, timePart] = deadlineStr.split(' ');
    const [day, month, year] = datePart.split('/');
    const [hours, minutes] = timePart.split(':');

    const deadlineGMT3 = new Date(year, month - 1, day, hours, minutes, 0);
    const timezoneOffset = new Date().getTimezoneOffset() / 60;
    const gmt3Offset = -3;
    const userDeadline = new Date(deadlineGMT3.getTime() + (gmt3Offset - timezoneOffset) * 60 * 60 * 1000);
    
    let secondsAdded = false;

    const timerMarkup = `
      <p class="timer__title">До конца акции осталось:</p>
      <p class="timer__item timer__item_days">
        <span class="timer__count timer__count_days">00</span>
        <span class="timer__units timer__units_days">дней</span>
      </p>
      <p class="timer__item timer__item_hours">
        <span class="timer__count timer__count_hours">00</span>
        <span class="timer__units timer__units_hours">часов</span>
      </p>
      <p class="timer__item timer__item_minutes">
        <span class="timer__count timer__count_minutes">00</span>
        <span class="timer__units timer__units_minutes">минут</span>
      </p>
    `;
    
    element.innerHTML = timerMarkup;

    updateTimer(element, index, userDeadline, secondsAdded);
  });
};
