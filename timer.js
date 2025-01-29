export const timer = () => {
  const timerDiv = document.querySelector('.timer');
  const timerCount = document.querySelectorAll('.timer__count');
  const timerUnits = document.querySelectorAll('.timer__units');
  const heroText = document.querySelector('.hero__text');
  const heroTimer = document.querySelector('.hero__timer');
  const declensions = [
    ["день", "дня", "дней"],
    ["час", "часа", "часов"],
    ["минута", "минуты", "минут"]
  ]

  const deadlineStr = timerDiv.dataset.deadline;
  const [datePart, timePart] = deadlineStr.split(' ');
  const [day, month, year] = datePart.split('/');
  const [hours, minutes] = timePart.split(':');
  const deadlineDate = new Date(year, month - 1, day, hours, minutes, 0);
  
  const getTimeRemaining = () => {
    const now = new Date();
    const diff = deadlineDate - now;
    
    if (diff <= 0) {
      return { diff: 0, days: 0, hours: 0, minutes: 0 };
    };

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    return {diff, days, hours, minutes};
  };

  const declension = (num, words) => {
    if (num % 10 === 1 && num % 100 !== 11) {
        return words[0];
    } else if (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)) {
        return words[1];
    } else {
        return words[2];
    };
  };

  const formatNumber = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  const updateTimer = () => {
    const {diff, days, hours, minutes} = getTimeRemaining();

    if (diff === 0) {
      heroText.remove();
      heroTimer.remove();
      return;
    };

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
      item.textContent = declension(timerCount[index], declensions[index]);
    });

    setTimeout(updateTimer, 1000);
  };

  updateTimer();
};
