document.addEventListener('readystatechange', function () {
    if (document.readyState === 'interactive') {
        collectAllFeatureImagesForFullscreenView();
    }
});

t79FV = {

}

function collectAllFeatureImagesForFullscreenView() {

    const images = document.querySelectorAll('#main-content img');
    const imageArray = Array.from(images);

    for (imageIndex in imageArray) {
        imageArray[imageIndex].id = 'image-id-' + imageIndex;
        imageArray[imageIndex].setAttribute('onclick', 'goIntoFullscreenImageView(this)');
        imageArray[imageIndex].getElementsByClassName.cursor = 'zoom-in';
    }
    t79FV.totalNumberOfImages = imageArray.length;

}

