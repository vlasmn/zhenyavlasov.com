// v1: Pavel Selivanov
// v2: Vlad Garbovsky, https://garbovsky.com/

$(window).bind('resize', function(e) {
    $(".slider").on("mousemove touchmove", function (e) {
     const slider = $(this),
      images = $(this).find(".slider__images"),
      imageCount = images.find(".slider__slide").length,
      sliderCut = $(this).width() / imageCount;

     var offset = (e.originalEvent.touches) ? (e.originalEvent.touches[0].pageX - slider.offset().left) : offset = e.offsetX;
      currentImg = Math.ceil(offset / sliderCut) > 0 ? Math.ceil(offset / sliderCut) : 1;
      position = currentImg < imageCount ? currentImg : imageCount - 1;

     images.css("left", -(position * slider.width()));
    });
   });
