import Glide, { Controls, Swipe } from '@glidejs/glide/dist/glide.modular.esm';
import webpCheck from '../../../../../portfolio/src/js/webpCheck';

const hero = document.querySelector('.hero');
const url = new URL(location.href);
const page = url.pathname.match(/\/.*\.html/);
let pageName = '';
if (page) {
    pageName = page[0].replace('.html', '').replace('/', '');
    pageName = pageName === 'index' ? '' : pageName;
}

if (!hero.classList.contains('hero--without-slider')) {
    const glide = new Glide('.hero__slider', {
        perView: 1
    });
    
    if (!hero.classList.contains('hero--slider')) {
        glide.on('move', () => {
            webpCheck(webpSupports => {
                const index = glide.index;
                const image = webpSupports ? `url("images/hero-${ pageName }-bg-${ index }.webp")` : `url("images/hero-${ pageName }-bg-${ index }.png")`;
                hero.style.backgroundImage = image;
            });
        });
    }
    
    glide.mount({
        Controls,
        Swipe
    });
}
