const navbar = document.querySelector('.header__navbar');
const navbarCloser = document.querySelector('.header__nav-closer');
const navbarOpener = document.querySelector('.header__nav-opener');

navbarCloser.addEventListener('click', () => {
    navbar.classList.add('header__navbar--close');
});

navbarOpener.addEventListener('click', () => {
    navbar.classList.remove('header__navbar--close');
});
