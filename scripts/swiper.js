// const swiper = new Swiper('.swiper', {
//   // Optional parameters
//   direction: 'vertical',
//   loop: true,

//   // If we need pagination
//   pagination: {
//     el: '.swiper-pagination',
//   },

//   // Navigation arrows
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },

//   // And if we need scrollbar
//   scrollbar: {
//     el: '.swiper-scrollbar',
//   },
// });

const swiper1 = new Swiper('.swiper', {
  simulateTouch: false,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  speed: 700,
});

const swiper2 = new Swiper('.swiper-gallery', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  simulateTouch: false,
  loop: true,
  autoplay: {
    delay: 10000,
    disableOnInteraction: true,
  },
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  speed: 700,
});
