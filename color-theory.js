document.addEventListener('readystatechange', function () {
    if (document.readyState === 'interactive') {
        collectAllFeatureImagesForFullscreenView();
        initFullscreenView();
    }
});

window.addEventListener('resize', function() {
    placeImageInFullscreenView();
});

var t79FV = {
    IMAGE_FRAME_THICKNESS: 0.03
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
    }, 200);
}

function placeImageInFullscreenView() {
    if ( !(t79FV.imageIsPlacedInFullscreen || t79FV.imageOnWayIntoFullscreen) ) {
        return;
    }

    const imageFullWidth = t79FV.originalImage.getAttribute('width');
    const imageFullHeight = t79FV.originalImage.getAttribute('height');
    const imageFullRatio = imageFullWidth / imageFullHeight;

    const maxInnerFrameWidth = t79FV.fullscreenContainer.clientWidth * (1 - 2 * t79FV.IMAGE_FRAME_THICKNESS);
    const maxInnerFrameHeight = t79FV.fullscreenContainer.clientHeight * (1 - 2 * t79FV.IMAGE_FRAME_THICKNESS);
    const maxInnerFrameRatio = maxInnerFrameWidth / maxInnerFrameHeight;

    if (imageFullWidth < maxInnerFrameWidth && imageFullHeight < maxInnerFrameHeight) {
        t79FV.fullscreenImageWidth = imageFullWidth;
        t79FV.fullscreenImageHeight = imageFullHeight;
    } else if (imageFullRatio < maxInnerFrameRatio) {
        t79FV.fullscreenImageWidth = maxInnerFrameHeight * imageFullRatio;
        t79FV.fullscreenImageHeight = maxInnerFrameHeight;
    } else {
        t79FV.fullscreenImageWidth = maxInnerFrameWidth;
        t79FV.fullscreenImageHeight = maxInnerFrameWidth / imageFullRatio;
    }

    window.setTimeout( function() {
        if(t79FV.imageOnWayIntoFullscreen) {
            styleFullscreenContainer('imageAreNowPlacedForFirstTime');
            styleInnerImageFrame('imageAreNowPlacedForFirstTime');
            t79FV.imageOnWayIntoFullscreen = false;
            t79FV.imageIsPlacedInFullscreen = true;
            t79FV.innerImageFrame.addEventListener('transitionend', function() {
                styleScaleedImage(true);
            })
        } else {
            styleFullscreenContainer('imageIsPlaced');
            styleInnerImageFrame('imageIsPlaced');
        }
    });
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
    BACKGROUND_COLOR_ON_WAY_IN: '#cccccc33',
    FULL_VIEW_BACKGROUND_COLOR: '#66666666',
    IMAGE_OPACITY_ON_WAY_IN: '0.2',
}

function styleFullscreenContainer(state) {
    let transitionTime = 0;
    switch(state) {
        case 'enterFullscreen':
            t79FV.fullscreenContainer.style.backgroundColor = t79styiling.BACKGROUND_COLOR_ON_WAY_IN;
            break;
        case 'imageAreNowPlacedForFirstTime':
            transitionTime = 0.4;
        case 'imageIsPlaced':
            t79FV.fullscreenContainer.style.transition = 'all ' + transitionTime + 's ease-in';
            t79FV.fullscreenContainer.style.backgroundColor = t79styiling.FULL_VIEW_BACKGROUND_COLOR;
            break;
        case 'leavingFullscreen':
            t79FV.fullscreenContainer.style.transmition = 'all 0.3s ease-out';
            t79FV.fullscreenContainer.style.backgroundColor = t79styiling.BACKGROUND_COLOR_ON_WAY_IN;


    }
}

function styleInnerImageFrame(state) {
    let transitionTime = 0;
    switch(state) {
        case 'enterFullscreen':
            t79FV.innerImageFrame.style.width = t79FV.originalImage.clientWidth + 'px';
            t79FV.innerImageFrame.style.height  = t79FV.originalImage.clientHeight + 'px';
            t79FV.innerImageFrame.style.opacity = t79styiling.IMAGE_OPACITY_ON_WAY_IN;
            break;
        case 'leavingFullscreen':
            t79FV.innerImageFrame.style.transition = 'all 0.3s ease-out';
            t79FV.innerImageFrame.style.opacity = '0.4';
            break;
        case 'imageAreNowPlacedForFirstTime':
            transitionTime = t79FV.originalImage.getAttribute('width') / t79FV.originalImage.clientWidth * 0.18;
        case 'imageIsPlaced':
            t79FV.innerImageFrame.style.transition = 'all ' + transitionTime +'s ease-in';
            t79FV.innerImageFrame.style.width = t79FV.fullscreenImageWidth + 'px';
            t79FV.innerImageFrame.style.height = t79FV.fullscreenImageHeight + 'px';
            t79FV.innerImageFrame.style.opacity = 1;
            console.log('Image scaled');
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

function styleScaleedImage(state) {
    
}