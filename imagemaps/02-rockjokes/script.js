(function(){
    'use strict';
    const questions = [
        'What do you call a rock that never goes to school?',
        'Where do rocks like to sleep?',
        'Why was the sedimentary rock extra cheap?',
        'Who is a geologist\'s favorite band?',
        'When were rock jokes the funniest?',
        'Why are we rocks always so optimistic?',
        'What did the rock say to graphic designer?',
        'Why did the tectonic plates break up?',
        'Why was the geologist in tears when the rock jokes were over?'];
    
    const answers = [
        'A skipping stone!', 
        'In bedrocks!', 
        'Because it was on shale',  
        'The Rolling Stones', 
        'During the stone age',
        'Because we don\'t take life for granite',
        'Make the text boulder',
        'There was just too much friction between them',
        'She was just too sedimental'];
    
    const response = [
        'I dunno, what\'s he called?',
        'where?',
        'I dunno, why?',
        'Ok this one is dumb',
        'When? Were they ever?',
        'I\'m not optimistic',
        'I dunno, what?',
        'why?',
        'I can\'t imagine'];
    
    const reaction = [
        'Hahahah',
        'Oh my god that\'s bad',
        'Oh snap. You\'re on a roll',
        'That wasn\'t even funny',
        'Yeah, those were the days...',
        'OMG kill me now',
        'I feel crushed',
        'you\'re cracking me up',
        'Is it ever going to stop?'];
    
    const area1 = document.querySelector('#rock1a-area');
    const area2 = document.querySelector('#rock1b-area');
    const area3 = document.querySelector('#rock1c-area');
    const area4 = document.querySelector('#rock2a-area');
    const area5 = document.querySelector('#rock2b-area');
    const area6 = document.querySelector('#rock2c-area');
    const area7 = document.querySelector('#rock3a-area');
    const area8 = document.querySelector('#rock3b-area');
    const area9 = document.querySelector('#rock3c-area');
    const sb = document.querySelector('#bubble');
    const rockImgs = document.querySelectorAll('div > img');

    area1.addEventListener('mouseover', function(){
        joke('rock1a', 'rock1b', 'rock1c', 0, 2500);
    });

    area2.addEventListener('mouseover', function(){
        joke('rock1b', 'rock1a', 'rock1c', 1, 2500);
    });

    area3.addEventListener('mouseover', function(){
        joke('rock1c', 'rock1b', 'rock1a', 2, 2500);
    });

    area4.addEventListener('mouseover', function(){
        joke('rock2a', 'rock2b', 'rock2c', 3, 2500);
    });

    area5.addEventListener('mouseover', function(){
        joke('rock2b', 'rock2c', 'rock2a', 4, 2500);
    });

    area6.addEventListener('mouseover', function(){
        joke('rock2c', 'rock2a', 'rock2b', 5, 2500);
    });

    area7.addEventListener('mouseover', function(){
        joke('rock3a', 'rock3b', 'rock3c', 6, 2500);
    });

    area8.addEventListener('mouseover', function(){
        joke('rock3b', 'rock3a', 'rock3c', 7, 2500);
    });

    area9.addEventListener('mouseover', function(){
        joke('rock3c', 'rock3b', 'rock3a', 8, 2500);
    });

    function joke(rock1, rock2, rock3, jokeNum, time){
        sb.innerHTML = questions[jokeNum] + '<img src="images/corner2.png" id="corner">';
        sb.className = rock1;
        putImageOnTop(rock1);
        setTimeout(function(){
            sb.innerHTML = response[jokeNum] + '<img src="images/corner2.png" id="corner">';
            sb.className = rock2;
            putImageOnTop(rock2);
            setTimeout(function(){
                sb.innerHTML = answers[jokeNum] + '<img src="images/corner2.png" id="corner">';
                sb.className = rock1;
                putImageOnTop(rock1);
                setTimeout(function(){
                    sb.innerHTML = reaction[jokeNum] + '<img src="images/corner2.png" id="corner">';
                    sb.className = rock3;
                    putImageOnTop(rock3);
                    setTimeout(function(){
                        for( const eachImg of rockImgs ){
                            eachImg.removeAttribute('style');
                        }
                        sb.removeAttribute('class');
                    }, time);
                }, time);
            }, time);
        }, time);
    }

    function putImageOnTop(id){
        for( const eachImg of rockImgs){
            if( eachImg.id == id){
                eachImg.style.zIndex = '1';
            }
            else {
                eachImg.style.zIndex = '0';
            }
        }
    }

})();



