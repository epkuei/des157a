function main() {
    'use strict';

    var isMuted = false;

    var muteBtn = document.getElementById('mute-btn');

    muteBtn.addEventListener('click', function() {

        isMuted = !isMuted;

        var allVideos = document.querySelectorAll('.card-video');
        for (var k = 0; k < allVideos.length; k++) {
        allVideos[k].muted = isMuted;
        }

        if (isMuted) {
        muteBtn.textContent = '♪ unmute all';
        } else {
        muteBtn.textContent = '♪ mute all';
        }

    });

    var cards = document.querySelectorAll('.card');

    for (var i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', function() {
        this.classList.toggle('is-flipped');
        });
    }

    // video hover
    var wrappers = document.querySelectorAll('.card-wrapper');

    for (var j = 0; j < wrappers.length; j++) {

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

main();