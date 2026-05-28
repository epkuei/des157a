document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    function init() {
        var headers = document.querySelectorAll('.article-header');

        for (var i = 0; i < headers.length; i++) {
            headers[i].addEventListener('click', function() {
                var body = this.nextElementSibling;
                var icon = this.querySelector('.toggle-icon');

                if (body.classList.contains('open')) {
                    body.classList.remove('open');
                    icon.textContent = '+';
                } else {
                    body.classList.add('open');
                    icon.textContent = '×';
                }
            });
        }
    }

    init();
});