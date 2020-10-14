import glide from '../intro/intro';
const services = document.querySelectorAll('.service__item');

services.forEach(service => {
    service.addEventListener('click', event => {
        glide.go(`=${event.currentTarget.dataset.index}`);
    });
});
