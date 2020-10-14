import anime from 'animejs';

const stats = document.querySelectorAll('.stat');

stats.forEach(stat => {
    function scrollChaek() {
        if (screen.height > stat.getBoundingClientRect().top) {
            const number = parseInt(stat.querySelector('.stat__number').textContent);
            const up = { number1: 0 };
            anime({
                targets: up,
                number1: number,
                round: 1,
                duration: 5000,
                easing: 'easeInOutExpo',
                update() {
                    stat.querySelector('.stat__number').textContent = up.number1;
                }
            });
            window.removeEventListener('scroll', scrollChaek)
        }
    }
    window.addEventListener('scroll', scrollChaek);
});
