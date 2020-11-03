import Glide from '@glidejs/glide/dist/glide.modular.esm';
import imagesloaded from 'imagesloaded';

function AutoHeight(Glide, Components, Events) {
    const AUTOHEIGHT = {
        mount() {
            Components.Html.track.style.transition = 'height 0.2s ease-in-out';
            
            imagesloaded(Components.Html.track, () => {
                AUTOHEIGHT.set();
            });
        },
        
        set() {
            Components.Html.track.style.height = `${ Components.Html.slides[Glide.index].offsetHeight }px`;
        }
    };
    
    Events.on(['run', 'resize'], () => {
        AUTOHEIGHT.set();
    });
    
    return AUTOHEIGHT;
}

const glide = new Glide('.intro__slider');

glide.mount({ AutoHeight });

export default glide;
