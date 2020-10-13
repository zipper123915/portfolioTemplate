import Glide, { Controls, Swipe } from '@glidejs/glide/dist/glide.modular.esm';
import webpCheck from '~/js/webpCheck';

const hero = document.querySelector('.hero');

const glide = new Glide('.hero__slider', {
    perView: 1
});

glide.on('move', () => {
    webpCheck(webpSupports => {
        const index = glide.index;
        const image = webpSupports ? `url("images/hero-bg-${ index }.webp")` : `url("images/hero-bg-${ index }.png")`;
        hero.style.backgroundImage = image;
    });
});

glide.mount({
    Controls,
    Swipe
});
