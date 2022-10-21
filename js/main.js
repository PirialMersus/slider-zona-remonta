const interleaveOffset = 0.95;
const autoPlayDelay = 2000;
const animationDuration = 700;
const h1yDistance = 200;
const pDistance = 200;
const appearanceDelay = 700;

const changeSlider = () => {
  let progress = jQuery(".swiper-progress-bar .progress");
  progress.stop().parent().addClass("stopped");

  if (
    (swiper.progress === 0 || (swiper.progress === 1 && swiper.params.loop)) &&
    !progress.parent().is(".stopped")
  ) {
    progress.css("width", "0");
    if (this.realIndex === 0) {
      initProgressBar();
    }
  }

  if (progress.parent().is(".stopped")) {
    progress.animate(
      {
        width: Math.round(widthParts * (swiper.realIndex + 1)) + "%",
      },
      autoPlayDelay,
      "linear"
    );
  }
};
const appearH1 = (activeIndex) => {
  jQuery(`.main-slider-content .h1slide${activeIndex}`).addClass("active");
};

const desappearH1 = () => {
  jQuery(`.titleH1`).removeClass("active");
};
const appearP = (activeIndex) => {
  anime({
    targets: `.main-slider-content .pSlide${activeIndex}`,
    translateX: [
      { value: -pDistance, duration: 1 },
      { value: 0, duration: animationDuration, delay: appearanceDelay },
    ],
    opacity: [
      { value: 0, duration: 1 },
      { value: 1, duration: animationDuration, delay: appearanceDelay },
    ],
    easing: "easeInOutQuad",
    duration: animationDuration,
    delay: 100,
    // direction: "reverse",
  });
};

const desappearP = () => {
  anime({
    targets: ".subTitle",
    translateX: -pDistance,
    opacity: 0,
    easing: "easeInOutQuad",
    duration: animationDuration,
  });
};
const appearLink = (activeIndex) => {
  anime({
    targets: `.main-slider-content .link${activeIndex}`,
    translateY: [
      { value: h1yDistance, duration: 1 },
      { value: 0, duration: animationDuration, delay: appearanceDelay },
    ],
    opacity: [
      { value: 0, duration: 1 },
      { value: 1, duration: animationDuration, delay: appearanceDelay },
    ],
    easing: "easeInOutQuad",
    duration: animationDuration,
    delay: 100,
    // direction: "reverse",
  });
};

const desappearLink = () => {
  anime({
    targets: `.main-slider-content div`,
    translateY: h1yDistance,
    opacity: 0,
    easing: "easeInOutQuad",
    duration: animationDuration,
  });
};

const swiper = new Swiper(".main-slider .swiper-container", {
  direction: "vertical",
  speed: animationDuration,
  loop: true,
  grabCursor: true,
  preventInteractionOnTransition: true,
  watchSlidesProgress: true,
  autoplay: {
    delay: autoPlayDelay,
    disableOnInteraction: false,
  },

  navigation: {
    nextEl: ".main-slider .swiper-button-next",
    prevEl: ".main-slider .swiper-button-prev",
  },
  scrollbar: {
    el: ".main-slider .swiper-scrollbar",
    draggable: true,
  },
  pagination: {
    el: ".main-slider .swiper-pagination",
    clickable: true,
    type: "bullets",
    renderBullet: function (index, className) {
      if (index < 9) {
        return (
          '<span class="' + className + '">' + "0" + (index + 1) + "</span>"
        );
      } else {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      }
    },
  },
  on: {
    init: function () {
      appearH1(0);
      appearP(0);
      appearLink(0);
    },
    progress: function () {
      let swiper = this;

      for (let i = 0; i < swiper.slides.length; i++) {
        let slideProgress = swiper.slides[i].progress;
        let innerOffset = swiper.height * interleaveOffset;
        let innerTranslate = slideProgress * innerOffset;

        TweenMax.set(swiper.slides[i].querySelector(".slide-content-wrap"), {
          y: innerTranslate * 0.9,
        });
      }
    },
    setTransition: function (slider, speed) {
      let swiper = this;
      for (let i = 0; i < swiper.slides.length; i++) {
        swiper.slides[i].style.transition = speed + "ms";
        swiper.slides[i].querySelector(".slide-content-wrap").style.transition =
          speed + "ms";
      }
    },
  },
});

const slidersCount = swiper.params.loop
  ? swiper.slides.length - 2
  : swiper.slides.length;
const widthParts = 100 / slidersCount;

function initProgressBar() {
  let calcProgress = (slidersCount - 1) * (autoPlayDelay + swiper.params.speed);
  calcProgress += autoPlayDelay;
  jQuery(".swiper-progress-bar .progress").animate(
    {
      width: "100%",
    },
    calcProgress,
    "linear"
  );
}
initProgressBar();

swiper.on("slideChange", function () {
  desappearP();
  desappearH1();
  desappearLink();
  appearP(this.realIndex);
  appearH1(this.realIndex);
  appearLink(this.realIndex);
  changeSlider();
});

swiper.on("touchMove", function () {
  changeSlider();
});
