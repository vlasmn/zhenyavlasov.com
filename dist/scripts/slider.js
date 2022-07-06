const plugs = document.querySelectorAll('.slider');

function plug(plug_item) {
    var images = plug_item.querySelector('.slider__images');
    var count = images.children.length;
    let imageCount = count;
    let sliderCut = plug_item.offsetWidth / imageCount;

    plug_item.addEventListener('pointermove', function (e) {
        for (let i = 0; i < imageCount; i++) {
            if (e.offsetX > i * sliderCut) {
                images.style.left = -(i * plug_item.offsetWidth) + 'px';
            }
        }
    })
};

plugs.forEach(item => plug(item));
