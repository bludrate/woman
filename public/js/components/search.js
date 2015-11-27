(function() {
    var searchForm = document.querySelector('.search');
    var input = searchForm.querySelector('input');
    var meta = document.createElement('meta');

    meta.content = 'width=device-width, initial-scale=1, user-scalable=no';
    meta.name = 'viewport';

    document.querySelector('.icon-search').addEventListener('click', function() {
        searchForm.classList.add('active');

        if (searchForm.classList.contains('active')) {
            document.head.appendChild(meta);
            input.focus();
        }
    });

    input.addEventListener('blur', function() {
        searchForm.classList.remove('active');
        document.head.removeChild(meta);
    })
})(window);