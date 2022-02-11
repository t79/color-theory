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

    t79FV.fullscreenContainer.onclick = function() {
        t79FV.imageIsPlacedInFullscreen = false;
        t79FV.imageOnWayIntoFullscreen = false;
        styleFullscreenContainer('leavingFullscreen');
        styleInnerImageFrame('leavingFullscreen');
        t79FV.innerImageFrame.addEventListener('transitionend', function() {
            styleOriginalImage('hasLeftFullscreen');
            t79FV.fullscreenContainer.style.display = 'none';
            t79FV.outerImageFrame.innerHTML = '';
        });
    }
}

function changeFullscreenImage(arrow) {

}


function goIntoFullscreenImageView(image) {

    t79FV.originalImage = image;
    const imageNumberString = image.getAttribute('id').split('-')[2];
    t79FV.activeImgNumber = parseInt(imageNumberString);

    dispalayChangeImageArrows(false);

    t79FV.innerImageFrame = document.createElement('div');
    t79FV.innerImageFrame.classList.add('image-view-inner-frame');
    styleInnerImageFrame('enterFullscreen');

    t79FV.scaledImage = document.createElement('img');
    t79FV.scaledImage.src = t79FV.originalImage.src;
    t79FV.scaledImage.classList.add('fullscreen-image');
    
    t79FV.innerImageFrame.appendChild(t79FV.scaledImage);
    t79FV.outerImageFrame.appendChild(t79FV.innerImageFrame);

    styleOriginalImage('enterFullscreen');
    styleFullscreenContainer('enterFullscreen');
    t79FV.fullscreenContainer.style.display = 'inline';

    t79FV.imageOnWayIntoFullscreen = true;

    window.setTimeout( function() {
        styleFullscreenContainer('goingToPlaceTheImage');
        styleInnerImageFrame('goingToPlaceTheImage');
        placeImageInFullscreenView();
    }, 500);
}

function placeImageInFullscreenView() {

}

function dispalayChangeImageArrows(display) {

    if (t79FV.totalNumberOfImages > 1 && display) {
        if (t79FV.activeImgNumber == 0) {
            t79FV.nextFullscrenImageArrow.style.display = 'inline';
            t79FV.previousFullscrenImageArrow.style.display = 'none';
        } else if (t79FV.activeImgNumber == t79FV.totalNumberOfImages - 1) {
            t79FV.nextFullscrenImageArrow.style.display = 'none';
            t79FV.previousFullscrenImageArrow.style.display = 'inline';
        } else {
            t79FV.nextFullscrenImageArrow.style.display = 'inline';
            t79FV.previousFullscrenImageArrow.style.display = 'ninline';
        }
    } else {
        t79FV.nextFullscrenImageArrow.style.display = 'none';
        t79FV.previousFullscrenImageArrow.style.display = 'none';
    }
}

var t79styiling = {
    FULL_VIEW_BACKGROUND_COLOR: '#ffffff66',
    IMAGE_OPACITY_ON_WAY_IN: '0.3',
}

function styleFullscreenContainer(state) {
    switch(state) {
        case 'enterFullscreen':
            t79FV.fullscreenContainer.style.backgroundColor = t79styiling.FULL_VIEW_BACKGROUND_COLOR;
            break;
    }
}

function styleInnerImageFrame(state) {
    switch(state) {
        case 'enterFullscreen':
            t79FV.innerImageFrame.style.width = t79FV.originalImage.clientWidth + 'px';
            t79FV.innerImageFrame.style.height  = t79FV.originalImage.clientHeight + 'px';
            t79FV.innerImageFrame.style.opacity = t79styiling.IMAGE_OPACITY_ON_WAY_IN;
            break;
        case 'leavingFullscreen':
            t79FV.innerImageFrame.style.transition = 'all 0.2s ease-out';
            t79FV.innerImageFrame.style.opacity = '0.6';
    }
}

function styleOriginalImage(state) {
    switch(state) {
        case 'enterFullscreen':
            t79FV.originalImage.style.opacity = '0';
            t79FV.originalImage.style.cursor = 'default';
            break;
        case 'hasLeftFullscreen':
            t79FV.originalImage.style.opacity = '1';
            t79FV.originalImage.style.cursor = 'zoom-in';
    }
}