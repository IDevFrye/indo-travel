export const burgerMenu = () => {
  const menu = document.querySelector('.header__menu');
  const menuButton = document.querySelector('.header__menu-button');
  const menuLinks = document.querySelectorAll('.header__link');

  const toggleMenu = () => {
    menu.classList.toggle('header__menu_active');
  };

  menuButton.addEventListener('click', (event) => {
    toggleMenu();
  });

  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('header__menu_active');
    })
  });

  document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
      menu.classList.remove('header__menu_active');
    }
  });
};
