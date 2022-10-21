const interleaveOffset = 0.95;
const autoPlayDelay = 2000;
const animationDuration = 700;
const h1yDistance = 200;
const pDistance = 200;

const changeSlider = () => {
  let progress = $(".swiper-progress-bar .progress");
  progress.stop().parent().addClass("stopped");

  if (
    (swiper.progress === 0 || (swiper.progress === 1 && swiper.params.loop)) &&
    !progress.parent().is(".stopped")
  ) {
    progress.css("width", "0");
    if (this.activeIndex === 0) {
      initProgressBar();
    }
  }

  if (progress.parent().is(".stopped")) {
    progress.animate(
      {
        width: Math.round(widthParts * (swiper.activeIndex + 1)) + "%",
      },
      autoPlayDelay,
      "linear"
    );
  }
};
const appearH1 = (activeIndex) => {
  anime({
    targets: `.mainSliderContent .h1slide${activeIndex}`,
    translateY: [
      { value: -h1yDistance, duration: 1 },
      { value: 0, duration: animationDuration, delay: 1 },
    ],
    opacity: [
      { value: 0, duration: 1 },
      { value: 1, duration: animationDuration, delay: 1 },
    ],
    easing: "easeInOutQuad",
    duration: animationDuration,
    delay: 100,
    // direction: "reverse",
  });
};

const desappearH1 = () => {
  anime({
    targets: `.mainSliderContent h1`,
    translateY: -h1yDistance,
    opacity: 0,
    easing: "easeInOutQuad",
    duration: animationDuration,
    // direction: "reverse",
  });
};
const appearP = (activeIndex) => {
  anime({
    targets: `.mainSliderContent .pSlide${activeIndex}`,
    translateX: [
      { value: -pDistance, duration: 1 },
      { value: 0, duration: animationDuration, delay: 1 },
    ],
    opacity: [
      { value: 0, duration: 1 },
      { value: 1, duration: animationDuration, delay: 1 },
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
    targets: `.mainSliderContent .link${activeIndex}`,
    translateY: [
      { value: h1yDistance, duration: 1 },
      { value: 0, duration: animationDuration, delay: 1 },
    ],
    opacity: [
      { value: 0, duration: 1 },
      { value: 1, duration: animationDuration, delay: 1 },
    ],
    easing: "easeInOutQuad",
    duration: animationDuration,
    delay: 100,
    // direction: "reverse",
  });
};

const desappearLink = () => {
  anime({
    targets: `.mainSliderContent div`,
    translateY: h1yDistance,
    opacity: 0,
    easing: "easeInOutQuad",
    duration: animationDuration,
    // direction: "reverse",
  });
};

const swiper = new Swiper(".main-slider .swiper-container", {
  direction: "vertical",
  // horizontal slider
  // direction: 'horizontal',
  speed: 800,
  // loop: true,
  grabCursor: true,
  mousewheelControl: true,
  watchSlidesProgress: true,
  autoplay: {
    delay: autoPlayDelay,
    disableOnInteraction: false,
  },

  // mousewheel: {
  // releaseOnEdges: true,
  // },
  navigation: {
    nextEl: ".main-slider .swiper-button-next",
    prevEl: ".main-slider .swiper-button-prev",
  },
  //   effect: "fade",
  //   fadeEffect: {
  //     crossFade: true,
  //   },
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

        TweenMax.set(swiper.slides[i].querySelector(".slideContentWrap"), {
          y: innerTranslate,
          // horizontal slider
          // x: innerTranslate,
        });
      }
    },
    setTransition: function (slider, speed) {
      let swiper = this;
      for (let i = 0; i < swiper.slides.length; i++) {
        swiper.slides[i].style.transition = speed + "ms";
        swiper.slides[i].querySelector(".slideContentWrap").style.transition =
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
  $(".swiper-progress-bar .progress").animate(
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

  appearP(this.activeIndex);
  appearH1(this.activeIndex);
  appearLink(this.activeIndex);

  changeSlider();
});

swiper.on("touchMove", function () {
  changeSlider();
});

swiper.on("reachEnd", function () {
  setTimeout(function () {
    swiper.mousewheel.disable();
  }, 500);
});
function wheel(event) {
  let delta = 0;
  if (!event) event = window.event;
  if (event.wheelDelta) {
    delta = event.wheelDelta / 120;
  } else if (event.detail) {
    delta = -event.detail / 3;
  }
  if (delta) {
    if (delta > 0) {
      swiper.mousewheel.enable();
    }
  }
}

window.addEventListener("mousewheel", wheel);
window.addEventListener("DOMMouseScroll", wheel);
