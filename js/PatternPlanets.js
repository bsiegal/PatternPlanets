/******************************************************************************* 
 * 
 * Copyright 2012 Bess Siegal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 ******************************************************************************/

var PatternPlanets = {
    level: 2, /* lowest level */
    mode: 'random',
    
    init: function() {
        PatternPlanets.setLevel();
        PatternPlanets.setMode();

        if ((navigator.userAgent.match(/iPhone/i)) || 
                (navigator.userAgent.match(/iPad/i))) {
            PatternPlanets.iPad = true;
            $('.mobile').css({'display': 'block'});
            $('.browser').css({'display': 'none'});
            PatternPlanets.noSound = true;
        } else if (navigator.userAgent.match(/Android/i))  {
            PatternPlanets.noSound = true;
        }
        
        if ($('#PatternPlanetsCanvas').width() < 670 || $('#PatternPlanetsCanvas').height() < 200) {
            $('body').addClass('handHeld');            
        }

        $('html').click(function() {
            if ($('#about').is(':visible')) {
                $('#about').slideUp();
            }
        });
    },
    
    draw: function() {
        var view = PatternPlanets.scope.view;
        view.draw();
    },
        
    setLevel: function() {
        PatternPlanets.level = parseInt($('#level').val());
        PatternPlanets.playAgain();
    },
    
    setMode: function() {
        PatternPlanets.mode = $('#mode').val();
        PatternPlanets.playAgain();
    },
    
    showHooray: function(show, x, y) {
        var div = $('#buttonBar'); 
        if (show) {
            div.fadeIn();
            var canvasPos = $('#PatternPlanetsCanvas').offset();
            var top = canvasPos.top + y - div.height() / 2;
            var left = canvasPos.left / 2 + (x - div.width() / 2);
            div.css('top', top + 'px');
            div.css('left', left + 'px');
            $('#again').focus();
        } else {
            div.fadeOut();
        }
    },
    
    playSound: function(file) {
        if (!PatternPlanets.noSound) {
            var soundHandle = document.getElementById('soundHandle');
            if (soundHandle && soundHandle.play) {
                soundHandle.src = 'sounds/' + file;
                soundHandle.play();             
            }            
        }
    },
    
    playHooray: function() {
        PatternPlanets.playSound('yaahooo.wav');
    },
 
    playValid: function() {
        PatternPlanets.playSound('pluck.wav');
    },
    
    playMiss: function() {
        PatternPlanets.playSound('thunk.wav');
    },
    
    playInvalid: function() {
        PatternPlanets.playSound('boing2.wav');
    },
    
    about: function(show) {
        if (show) {
            $('#about').slideDown();
        } else {
            $('#about').slideUp();
        }
    },
    
    toggleAbout: function() {
        if ($('#about').is(':visible')) {
            PatternPlanets.about(false);
        } else {
            PatternPlanets.about(true);
        }
    }
};
 
