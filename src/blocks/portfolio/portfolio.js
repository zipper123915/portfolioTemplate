const tabs = document.querySelectorAll('.portfolio__tab');
const items = document.querySelectorAll('.portfolio__card');

tabs.forEach(tab => {
    tab.addEventListener('click', event => {
        const tag = tab.dataset.tag;
        tabs.forEach(tab => tab.classList.remove('portfolio__tab--active'));
        tab.classList.add('portfolio__tab--active');
        items.forEach(item => {
            if (item.dataset.tag !== tag && tag !== 'all') {
                item.classList.add('portfolio__card--hidden');
            } else {
                item.classList.remove('portfolio__card--hidden');
            }
        })
    });
});
