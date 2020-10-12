import Glide, { Controls } from '@glidejs/glide/dist/glide.modular.esm';

const hero = document.querySelector('.hero');

const glide = new Glide('.hero__slider', {
    perView: 1
});

glide.on('move', () => {
    const index = glide.index;
    hero.style.backgroundImage = `url("images/hero-bg-${index}.png")`;
})

glide.mount({ Controls });
