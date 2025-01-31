export const burgerMenu = () => {
  const menu = document.querySelector('.header__menu');
  const menuButton = document.querySelector('.header__menu-button');
  const menuLinks = document.querySelectorAll('.header__link');

  let isOpen = false;
  let animationFrame;

  const animateMenu = (open) => {
    let start = NaN;
    const duration = 300;
    const burgerOffset = 200;
    const burgerWidthOffset = 300;
    const leftEdge = menuButton.offsetLeft;
    console.log('leftEdge: ', leftEdge);
    const startPosition = open ? 
      leftEdge - burgerWidthOffset : leftEdge - burgerOffset;
    const endPosition = open ? 
      leftEdge - burgerOffset : leftEdge - burgerWidthOffset;

    const step = (timestamp) => {
      start ||= timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const currentPosition = startPosition + (endPosition - startPosition) * progress;

      menu.style.left = `${currentPosition}px`;

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        cancelAnimationFrame(animationFrame);
        if (!open) menu.classList.remove('header__menu_active');
      }
    };

    if (open) menu.classList.add('header__menu_active');
    requestAnimationFrame(step);
  };

  const toggleMenu = () => {
    isOpen = !isOpen;
    animateMenu(isOpen);
  };

  menuButton.addEventListener('click', toggleMenu);

  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      isOpen = false;
      animateMenu(isOpen);
    })
  });

  document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
      isOpen = false;
      animateMenu(isOpen);
    }
  });
};
