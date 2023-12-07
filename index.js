const carousel = document.querySelector('.slider-wrapper');
const images = document.querySelectorAll('img');
const dots = document.querySelectorAll('.dot');
const imgArray = Array.from(images);
const dotArray = Array.from(dots);

const buttons = document.querySelectorAll('button');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentIndex = 0;

function handleOffset(currentIndex, offset) {
    let newIndex = (currentIndex + offset);
    if (newIndex < 0) {
        updatedIndex = images.length-1;
    } else if (newIndex > images.length-1) {
        updatedIndex = 0;
    } else {
        updatedIndex = newIndex;
    }
    return updatedIndex;
}

function updateCarousel(currentIndex) {
    imgArray[currentIndex].scrollIntoView({
        behaviour: 'smooth',
        inline: 'center'
    })
}

function updateDot(currentDot) {
    dots.forEach((dot) => {
        delete dot.dataset.active;
    });
    currentDot.dataset.active = true;
}

dots.forEach((dot) => {
    dot.addEventListener('click', () => {
        currentIndex = dotArray.indexOf(dot);
        updateDot(dot);
        updateCarousel(currentIndex);
        resetCarousel();
    })
})

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1;

        handleOffset(currentIndex, offset);
        currentIndex = updatedIndex;
        currentDot = dotArray[currentIndex];
        updateDot(currentDot);
        updateCarousel(currentIndex);
        resetCarousel();
    })
})

function cycleCarousel() {
    const offset = 1;
    
    handleOffset(currentIndex, offset);
    currentIndex = updatedIndex;
    currentDot = dotArray[currentIndex];
    updateDot(currentDot);
    updateCarousel(currentIndex);
}

var myInterval;

const runCarousel = function(){
    myInterval = setInterval(cycleCarousel, 5000);
    //why does setInterval need to be inserted into a variable?
}

function stopCarousel() {
    clearInterval(myInterval);
}

function resetCarousel() {
    stopCarousel();
    runCarousel();
}

window.onload = function() {
    runCarousel();
}
