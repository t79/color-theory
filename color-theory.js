document.addEventListener('readystatechange', function () {
    if (document.readyState === 'interactive') {
        collectAllFeatureImagesForFullscreenView();
        initFullscreenView();
    }
});

var t79FV = {

}

function collectAllFeatureImagesForFullscreenView() {

    const images = document.querySelectorAll('#main-content img');
    const imageArray = Array.from(images);

    for (imageIndex in imageArray) {
        imageArray[imageIndex].id = 'image-id-' + imageIndex;
        imageArray[imageIndex].setAttribute('onclick', 'goIntoFullscreenImageView(this)');
        imageArray[imageIndex].style.cursor = 'zoom-in';
    }
    t79FV.totalNumberOfImages = imageArray.length;

}

function initFullscreenView() {

    t79FV.nextFullscrenImageArrow = document.getElementById('prvious-fullscreen-image-arrow');
    t79FV.nextFullscrenImageArrow.setAttribute('data-direction', 'next');
    preparFullscreenArrows(t79FV.nextFullscrenImageArrow);
    t79FV.previousFullscrenImageArrow = document.getElementById('next-fullscreen-image-arrow');
    t79FV.previousFullscrenImageArrow.setAttribute('data-direction', 'previous');
    preparFullscreenArrows(t79FV.previousFullscrenImageArrow);

    function preparFullscreenArrows(arrow) {
        arrow.addEventListener('click', function(event) {
            event.stopPropagation();
            changeFullscreenImage(this);
        })
    }

    t79FV.fullscreenContainer = document.getElementById('fullscreen-view-container');
    t79FV.outerImageFrame = document.getElementById('outer-image-frame');
}

function changeFullscreenImage(arrow) {

}

