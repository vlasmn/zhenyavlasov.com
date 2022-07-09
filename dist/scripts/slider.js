// v1 — Pavel Selivanov
// v2 — Vlad Garbovsky, https://garbovsky.com/

jQuery(document).on("touchend", function(e) {

});

$(".slider").each(function(e) {
    const slider = $(this),
     images = $(this).find(".slider__images"),
     imageCount = images.find(".slider__slide").length,
     sliderCut = $(this).width() / imageCount;

    slider.on("mousemove touchmove", function (e) {
     if (e.originalEvent.touches) {
      var touch = e.originalEvent.touches[0].pageX;
      var offset = (touch - slider.offset().left);
     } else
      offset = e.offsetX;

     for (let i = 0; i < imageCount; i++) {
      if (offset > i * sliderCut) {
       images.css("left", -(i * slider.width()));
      }
     }
    });
   });
