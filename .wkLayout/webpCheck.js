function testWebP(callback) {
    // eslint-disable-next-line no-undef
    var webP = new Image();
    webP.onload = webP.onerror = function() {
        // eslint-disable-next-line standard/no-callback-literal
        callback(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCd' +
        'ASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}

export default testWebP(function(support) {
    if (!!support === true) {
        document.querySelector('body').classList.add('webp');
    } else {
        document.querySelector('body').classList.add('no-webp');
    }
});
