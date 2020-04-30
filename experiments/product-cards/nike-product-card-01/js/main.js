const shoes = document.querySelectorAll('.shoe');
const shoeBg = document.querySelector('.shoe-background');
const sizes = document.querySelectorAll('.size');
const colors = document.querySelectorAll('.color');
const gradients = document.querySelectorAll('.gradient');

let prevColor = "blue";
let animationEnd = true;

// Dynamically change the shoe-background height on tablet & mobile devices

let x = window.matchMedia("(max-width: 1199px)");

function changeShoeBGHeight() {
    if(x.matches) {
        let shoeHeight = shoes[0].offsetHeight;
        shoeBg.style.height = `${shoeHeight * 0.9}px`;
    }
    else {
        shoeBg.style.height = "475px";
    }
}

changeShoeBGHeight();

window.addEventListener('resize', changeShoeBGHeight);

// Dynamically change the shoe size

function changeShoeSize() {
    sizes.forEach(function removeClass(size) {
        size.classList.remove('active');
    });
    this.classList.add('active');
}

// Dynamically change the shoe image color with all the regarding elemets

function changeShoeColor() {
    if(!animationEnd) return;
    let primary = this.getAttribute('primary');
    let color = this.getAttribute('color');
    let shoe = document.querySelector(`.shoe[color="${color}"]`);
    let gradient = document.querySelector(`.gradient[color="${color}"]`);
    let prevGradient = document.querySelector(`.gradient[color="${prevColor}"]`);

    if(color == prevColor) return;

    // Dynamically change the active shoe color
    colors.forEach(function removeClass(color) {
        color.classList.remove('active');
    });
    this.classList.add('active');

    document.documentElement.style.setProperty('--primary', primary);

    // Dynamically change the shoe image which related to the active color
    shoes.forEach(function removeClass(shoe) {
        shoe.classList.remove('show', 'animated');
    });
    shoe.classList.add('show', 'animated');

    // Dynamically change the shoe backgroud gradient which related to the active color
    gradients.forEach(function removeClass(gradient) {
        gradient.classList.remove('first', 'second');
    });
    gradient.classList.add('first');
    prevGradient.classList.add('second');

    prevColor = color;
    animationEnd = false;

    // Check whether the shoe backgroud gradient animation end or not

    gradient.addEventListener('animationend', () => {
        animationEnd = true;
    })
}

sizes.forEach(function addListener(size) {
    size.addEventListener('click', changeShoeSize);
});

colors.forEach(function addListener(color) {
    color.addEventListener('click', changeShoeColor);
});