jQuery(document).on("touchend", function(e) {

});

$(".slider").each(function(e) {
    const slider_item = $(this);
    const images = slider_item.children(".slider__images"),
        imageCount = images.children(".slider__slide").length,
        sliderCut = slider_item.width() / imageCount;

    slider_item.on("mousemove touchmove", function (e) {
        for (let i = 0; i < imageCount; i++) {
            if (e.offsetX > i * sliderCut) {
                images.css("left", -(i * slider_item.width()));
            }
        }
    });
});
