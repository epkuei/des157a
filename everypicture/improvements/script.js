function main() {
    'use strict';

    var isMuted = false;
    var isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    var muteBtn = document.getElementById('mute-btn');

    muteBtn.addEventListener('click', function() {
        isMuted = !isMuted;

        var allVideos = document.querySelectorAll('.card-video');
        for (var k = 0; k < allVideos.length; k++) {
            allVideos[k].muted = isMuted;
        }

        muteBtn.textContent = isMuted ? '♪ unmute all' : '♪ mute all';
    });

    var cards = document.querySelectorAll('.card');

    for (var i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', function() {
            this.classList.toggle('is-flipped');
        });
    }

    var wrappers = document.querySelectorAll('.card-wrapper');

    for (var j = 0; j < wrappers.length; j++) {

        if (isTouchDevice) {
            // On touch: toggle video play state on tap (before flip triggers)
            wrappers[j].addEventListener('touchstart', function() {
                var wrapper = this;
                var video = wrapper.querySelector('.card-video');
                if (!video) return;

                if (wrapper.classList.contains('is-playing')) {
                    wrapper.classList.remove('is-playing');
                    video.pause();
                    video.currentTime = 0;
                } else {
                    wrapper.classList.add('is-playing');
                    video.volume = 0.15;
                    video.muted = isMuted;
                    video.play();
                }
            }, { passive: true });

        } else {
            // Desktop: hover to play
            wrappers[j].addEventListener('mouseenter', function() {
                var video = this.querySelector('.card-video');
                if (video) {
                    video.volume = 0.15;
                    video.muted = isMuted;
                    video.play();
                }
            });

            wrappers[j].addEventListener('mouseleave', function() {
                var video = this.querySelector('.card-video');
                if (video) {
                    video.pause();
                    video.currentTime = 0;
                }
            });
        }
    }
}

main();