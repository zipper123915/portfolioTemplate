import glide from '../intro/intro';

const services = document.querySelectorAll('.service__item');
const intro = document.querySelector('.intro');

services.forEach(service => {
    service.addEventListener('click', event => {
        glide.go(`=${ event.currentTarget.dataset.index }`);
    });
});

glide.on('run.after', () => {
    intro.scrollIntoView(false);
});
