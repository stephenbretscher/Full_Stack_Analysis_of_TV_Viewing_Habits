//   _________________________________________________________________________________________
// SWIPER CAROUSEL JAVASCRIPT
//   _________________________________________________________________________________________

const swiper = new Swiper('.swiper-container', {
  // Optional parameters
  

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

