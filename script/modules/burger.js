export const burgerMenu = () => {
  const menu = document.querySelector('.header__menu');
  const menuButton = document.querySelector('.header__menu-button');

  menuButton.addEventListener('click', () => {
    menu.classList.toggle('header__menu_active');
  });

};
