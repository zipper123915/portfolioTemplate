const navbar = document.querySelector('.header__navbar');
const navbarCloser = document.querySelector('.header__nav-closer');
const navbarOpener = document.querySelector('.header__nav-opener');
const links = document.querySelectorAll('.header__link');

navbarCloser.addEventListener('click', () => {
    navbar.classList.add('header__navbar--close');
});

navbarOpener.addEventListener('click', () => {
    navbar.classList.remove('header__navbar--close');
});

links.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.add('header__navbar--close');
    });
});
