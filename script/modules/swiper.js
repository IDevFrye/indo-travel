document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper('.album__slider', {
    loop: true,
    navigation: {
      nextEl: '.album__right',
      prevEl: '.album__left',
    },
    slidesPerView: 1,
    spaceBetween: 20, 
    centeredSlides: true,
    breakpoints: {
      768: {
        slidesPerView: 2, 
      },
      1024: {
        slidesPerView: 3, 
      },
    },
  });
});
