export const fly = () => {
  const maxWidthPlane = 758;
  const docEl = document.documentElement;

  if (docEl.clientWidth >= maxWidthPlane) {
    const airplane = document.createElement('div');

    airplane.style.cssText = `
      position: fixed;
      width: 50px;
      height: 50px;
      pointer-events: none;
      background: url(../../img/airplane.svg) center/contain no-repeat;
    `;

    document.body.append(airplane);

    const maxLeft = docEl.scrollWidth - airplane.clientWidth;
    const initTop = docEl.clientHeight - airplane.clientHeight;
    airplane.style.left = `${maxLeft}px`;
    airplane.style.top = `${initTop}px`;

    let lastScrollY = -1;

    let currentRotation = 0;
    let targetRotation = 0;
    let animationFrame;

    const animateRotation = () => {
      currentRotation += (targetRotation - currentRotation) * 0.1;
      const maxScroll = docEl.scrollHeight - docEl.clientHeight;
      const percentScroll = (window.scrollY * 100) / maxScroll;
      const top = initTop * (percentScroll / 100);
      airplane.style.transform = `translateY(${-top}px) 
        rotate(${currentRotation}deg)`;

      if (Math.abs(targetRotation - currentRotation) > 0.1) {
        animationFrame = requestAnimationFrame(animateRotation);
      } else {
        currentRotation = targetRotation;
        cancelAnimationFrame(animationFrame);
      }
    };

    const calcPositionFly = () => {
      if (window.scrollY < lastScrollY) {
        targetRotation = 180;
      } else {
        targetRotation = 0;
      };

      lastScrollY = window.scrollY;

      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(animateRotation);
    };

    window.addEventListener('scroll', calcPositionFly);

    calcPositionFly();
  };
};
