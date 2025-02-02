export const acc = () => {
  const items = document.querySelectorAll('.travel__item');
  const buttons = document.querySelectorAll('.travel__item-title');
  const textWrappers = document.querySelectorAll('.travel__item-text-wrapper');

  let heightWrapper = 0;

  textWrappers.forEach(elem => {
    if (heightWrapper < elem.scrollHeight) {
      heightWrapper = elem.scrollHeight;
    };
  });

  buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      items.forEach((item, i) => {
        const textWrapper = textWrappers[i];
        if (index === i) {
          textWrapper.style.height =
            item.classList.contains('travel__item_active') ?
            '' : `${heightWrapper}px`;
          item.classList.toggle('travel__item_active');
        } else {
          if (items[i].classList.contains('travel__item_active')) {
            items[i].classList.remove('travel__item_active');
          };
          textWrapper.style.height = '';
        };
      });
    });
  });

  items.forEach((item, i) => {
    if (item.classList.contains('travel__item_active')) {
      textWrappers[i].style.height = `${heightWrapper}px`;
    }
  });
};
