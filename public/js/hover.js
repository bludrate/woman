(function(app) {
    document.addEventListener('touchstart', function(event) {
        var target = event.target;

        target.classList.add('hover');

        app.utils.one(document, 'touchend', function() {
            target.classList.remove('hover');
        });
    });
})(window);