"use strict";

$.fn.slider = function (options) {
  //vars
  var params = $.extend({
    animationSpeed: 300
  }, options);
  var $selector = this;
  var $slidesRow = $(".slider_container .slides_row");
  var $arrowLeft = $(".slider_container .arrows.left");
  var $arrowRight = $(".slider_container .arrows.right");
  var activeSlideCounter = 0;
  var offset = 0;
  var windowWidth = $(".slider_container").width();
  console.log("window sizes", windowWidth);
  var slides = $(".slider_container .slides_row .slide").length;
  var endCount = slides - 1;
  var slideCount = slides;
  var tempCounter = 1;
  var x1 = 0;
  var x2 = 0;
  var action = false;
  var distance = 0;
  var content = ""; // Controllers

  function slidesCopyingAtTheBeginning(zeroActiveSlideCounter, zeroSlideCount, zeroTempCounter) {
    activeSlideCounter = zeroActiveSlideCounter;
    slideCount = zeroSlideCount;
    tempCounter = zeroTempCounter;
    slidesController(slideCount);
    $slidesRow.css("transition-duration", "0s");
    var sliderItem = $(".slide");

    for (var i = 0; i < slides; i++) {
      sliderItem.eq(sliderItem.length - (i + 1)).clone().prependTo($(".slides_row"));
    }

    $slidesRow.css("width", windowWidth * $(".slider_container .slides_row .slide").length + 100 + "px");
    setTimeout(function () {
      $slidesRow.css("transition-duration", params.animationSpeed + "ms");
    }, 50);
  }

  function slidesCopyingAtTheEnd() {
    var sliderItem = $(".slide");

    for (var i = 0; i < slides; i++) {
      sliderItem.eq(i).clone().appendTo($(".slides_row"));
    }

    $slidesRow.css("width", windowWidth * $(".slider_container .slides_row .slide").length + 100 + "px");
    endCount = endCount + slides;
  }

  function slidesController(slideCount) {
    var distance = slideCount * windowWidth * -1;
    $slidesRow.css("transform", "translateX(" + distance + "px)");
  }

  function navigationController(slideCount) {
    $(".pointers").removeClass("active");
    $('.pointers[data_nav="' + (slideCount % slides + 1) + '"]').addClass("active");
  }

  function slidesRowController(distance) {
    $slidesRow.css("transform", "translateX(" + (slideCount * windowWidth * -1 + distance) + "px)");
  } // Init


  $slidesRow.css("transition-duration", params.animationSpeed + "ms");
  $(".slide").css("width", windowWidth + "px"); //drawing navs

  for (var i = 0; i < slides; i++) {
    content += "<div data_nav=" + (i + 1) + ' class="pointers"><p>' + (i + 1) + "</p></div>";
  }

  $(".navigation").html(content);
  $('.navigation .pointers[data_nav="1"]').addClass("active"); //

  window.addEventListener("resize", function () {
    // console.log(slideCount, windowWidth, (slideCount * windowWidth * (-1) + distance));
    windowWidth = $(".slider_container").width(); // $slidesRow.css('width', (slides * windowWidth + 100 + offset) + 'px');

    $(".slide").css("width", windowWidth + "px");
    $slidesRow.css("width", windowWidth * $(".slider_container .slides_row .slide").length + 100 + "px");
    slidesController(slideCount);
  }, false); //Actions

  slidesCopyingAtTheBeginning(2, slides, 1);
  slidesCopyingAtTheEnd();
  $arrowLeft.click(function () {
    slideCount--;
    tempCounter--;

    if (tempCounter < 1) {
      activeSlideCounter = activeSlideCounter - 1;
      tempCounter = slides;
    }

    if (slideCount < slides) {
      $slidesRow.css("transition-duration", "0ms");
      slidesController(slides * 2);
      setTimeout(function () {
        $slidesRow.css("transition-duration", params.animationSpeed + "ms");
        activeSlideCounter = 2;
        slideCount = slides * 2 - 1;
        tempCounter = slides;
        slidesController(slideCount);
        navigationController(slideCount);
      }, 30);
    }

    if (slideCount >= slides) {
      slidesController(slideCount);
      navigationController(slideCount);
    }

    setTimeout(function () {}, params.animationSpeed);
  });
  $arrowRight.click(function () {
    slideCount++;
    tempCounter++;

    if (tempCounter > slides) {
      activeSlideCounter = activeSlideCounter + 1;
      tempCounter = 1;
    }

    if (endCount < slideCount) {
      slidesCopyingAtTheEnd();
    }

    slidesController(slideCount);
    navigationController(slideCount);
  });
  $(".slider_container .navigation .pointers").click(function () {
    var counter = parseFloat($(this).attr("data_nav"));
    slidesController(activeSlideCounter * slides - (slides + 1) + counter);
    navigationController(activeSlideCounter * slides - (slides + 1) + counter);
    slideCount = activeSlideCounter * slides - (slides + 1) + counter;
    tempCounter = counter;
  });
  $(".slider_container").mousedown(function (e) {
    $slidesRow.addClass("disable_animation");
    x1 = e.pageX;
    action = true;
  });
  $(window).mouseup(function (e) {
    action = false;
    $slidesRow.removeClass("disable_animation");

    if (distance >= 100) {
      slideCount--;
      tempCounter--;

      if (tempCounter < 1) {
        activeSlideCounter = activeSlideCounter - 1;
        tempCounter = slides;
      }

      if (slideCount < slides) {
        setTimeout(function () {
          slidesCopyingAtTheBeginning(2, 2 * slides - 1, slides);
        }, params.animationSpeed);
      }

      slidesController(slideCount);
      navigationController(slideCount);
    } else if (distance <= -100) {
      slideCount++;
      tempCounter++;

      if (tempCounter > slides) {
        activeSlideCounter = activeSlideCounter + 1;
        tempCounter = 1;
      }

      if (endCount < slideCount) {
        slidesCopyingAtTheEnd();
      }

      slidesController(slideCount);
      navigationController(slideCount);
    } else {
      slidesController(slideCount);
      navigationController(slideCount);
    }

    distance = 0;
  });
  $(window).mousemove(function (e) {
    if (action) {
      x2 = e.pageX;
      distance = x2 - x1;
      slidesRowController(distance);
    }
  });
  document.querySelector(".slider_container").addEventListener("touchstart", function (e) {
    x1 = e.touches[0].pageX;
    $slidesRow.addClass("disable_animation");
    action = true;
  });
  window.addEventListener("touchend", function (e) {
    action = false;
    $slidesRow.removeClass("disable_animation");

    if (distance >= 100) {
      slideCount--;
      tempCounter--;

      if (tempCounter < 1) {
        activeSlideCounter = activeSlideCounter - 1;
        tempCounter = slides;
      }

      if (slideCount < slides) {
        setTimeout(function () {
          slidesCopyingAtTheBeginning(2, 2 * slides - 1, slides);
        }, params.animationSpeed);
      }

      slidesController(slideCount);
      navigationController(slideCount);
    } else if (distance <= -100) {
      slideCount++;
      tempCounter++;

      if (tempCounter > slides) {
        activeSlideCounter = activeSlideCounter + 1;
        tempCounter = 1;
      }

      if (endCount < slideCount) {
        slidesCopyingAtTheEnd();
      }

      slidesController(slideCount);
      navigationController(slideCount);
    } else {
      slidesController(slideCount);
      navigationController(slideCount);
    }

    distance = 0;
  });
  window.addEventListener("touchmove", function (e) {
    if (action) {
      x2 = e.changedTouches[0].pageX;
      distance = x2 - x1;
      slidesRowController(distance);
    }
  });
};