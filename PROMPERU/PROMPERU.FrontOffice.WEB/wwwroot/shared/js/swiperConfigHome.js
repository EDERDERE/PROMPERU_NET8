export function initializeSwiper(selector, config) {
  if (window.swiperInstances && window.swiperInstances[selector]) {
    window.swiperInstances[selector].destroy(true, true);
  }

  window.swiperInstances = window.swiperInstances || {};
  window.swiperInstances[selector] = new Swiper(selector, config);
}

export const swiperConfigs = {
  mySwiper: {
    direction: "vertical",
    slidesPerView: 1,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  },
  cursosSwiper: {
    direction: "horizontal",
    slidesPerView: "auto",
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-next",
      prevEl: ".swiper-prev",
    },
    breakpoints: {
      320: { slidesPerView: 1.2, spaceBetween: 20 },
      480: { slidesPerView: 2.2, spaceBetween: 20 },
      640: { slidesPerView: 3.2, spaceBetween: 20 },
    },
  },
  testimoniosSwiper: {
    direction: "horizontal",
    slidesPerView: 3,
    centeredSlides: true,
    initialSlide: 1,
    spaceBetween: 0,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 20 },
      480: { slidesPerView: 2, spaceBetween: 20 },
      640: { slidesPerView: 3, spaceBetween: 20 },
    },
  },
};
