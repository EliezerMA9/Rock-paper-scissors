window.addEventListener('load', function () {
//Init vars
    var clickCounter = 0;
    var time = 100;
    var selectedChoice;
    var randomChoice;
    var finished = false;
    var numx, numy = [0, 0];
    var imthewinner = undefined;

    var frame = document.getElementById('topbody');
    var centerFrame = document.getElementById('centerbody');
    var bottomFrame = document.getElementById('bottombody');
    var userChoice = document.getElementById('choice');
    var vs = document.getElementById('vs');
    var random = document.getElementById('random');
    var rockElem = document.getElementById('rock');
    var winner = document.getElementById('winner');
    var paperElem = document.getElementById('paper');
    var scissorsElem = document.getElementById('scissors');
    var playAgainButton = document.getElementById('playbutton');
    var playLogo = document.getElementById('playlogo');
//Misc transition
    function someTransitions(x, y, transitionTime, timeoutTime) {
        setTimeout(() => {
            if (finished) {
                translateElem(random, x[0], y[0], transitionTime);
                translateElem(userChoice, x[1], y[1], transitionTime);
            }
        }, timeoutTime);
    }
//Moves elements
    function translateElem(elem, x, y, transTime){
        elem.style.transform = 'translate('+ x +'px, '+ y +'px)';
        elem.style.transition = 'all ' + transTime;
    }
//Random imgs initalizer
    function repeatChangeRandom(n){
        changeRandom(n);
        changeChoice(n);
    }
//Sleep function
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
//Images randomizer
    async function changeRandom(time) {
        randomImg = ['resources/paper.png', 'resources/rock.png', 'resources/scissors.png'];
        
        while (true){
            var oldRandomInt = newRandomInt; 
            var newRandomInt = Math.floor(Math.random() * 3);
            while(oldRandomInt == newRandomInt){
                newRandomInt = Math.floor(Math.random() * 3)
            }
            if (clickCounter != 0) {
                time = time + 50;
            }
            if (time > 400){
                document.getElementById('random').src = 'resources/'+randomChoice+'.png';
                finished = true;
                break;
            }
            document.getElementById('random').src = randomImg[newRandomInt];
            await sleep(time);
        }
    }

    async function changeChoice(time) {
        randomImg = ['resources/paper.png', 'resources/rock.png', 'resources/scissors.png'];
        while (true) {

            var oldRandomInt = newRandomInt;
            var newRandomInt = Math.floor(Math.random() * 3);
            while (oldRandomInt == newRandomInt) {
                newRandomInt = Math.floor(Math.random() * 3)
            }
            if (clickCounter != 0) {
                document.getElementById('choice').src = 'resources/' + selectedChoice + '.png';
                break;
            }
            if (true) {
                document.getElementById('choice').src = randomImg[newRandomInt];
            }
            await sleep(time);
        }
    }
//Select winner
    function choice(c) {
        selector = Math.floor(Math.random() * 3);
        var vsChoice = ['rock', 'paper', 'scissors'];

        c = this.id;
        if (c == "rock" && vsChoice[selector] == "scissors") {var winner = "You win"; imthewinner = 'yes';}
        if (c == "rock" && vsChoice[selector] == "paper") { var winner = "You lose"; imthewinner = 'no'}
        if (c == "paper" && vsChoice[selector] == "rock") { var winner = "You win"; imthewinner = 'yes';}
        if (c == "paper" && vsChoice[selector] == "scissors") { var winner = "You lose"; imthewinner = 'no'}
        if (c == "scissors" && vsChoice[selector] == "paper") { var winner = "You win"; imthewinner = 'yes';}
        if (c == "scissors" && vsChoice[selector] == "rock") { var winner = "You lose"; imthewinner = 'no'}
        if (vsChoice[selector] == c) {var winner = "Draw"; imthewinner = '';}

        //Select images
        randomSource = "resources/" + vsChoice[selector] + ".png"; 
        userSource = "resources/" + c + ".png";
        userChoice.src = userSource;
        random.src = randomSource;

        var winnerdiv = document.getElementsByClassName('winner');
        winnerdiv[0].innerHTML = winner;
        
        selectedChoice = c;
        randomChoice = vsChoice[selector];
        beforePlay();
    }
//Before play
    function beforePlay(){

        clickCounter = 1;
        //Choice selection
        frame.style.pointerEvents = 'none';
        translateElem(frame, '0', '-1000', '1.2s');
        //Result
        translateElem(centerFrame, '0', '-512', '1.2s');
        //Play things again
        bottomFrame.style.visibility = 'initial';
        translateElem(bottomFrame, '0', '-500', '1s');
        
        //"Fight" animation
        numx = [140, -140];
        someTransitions(numx, numy, '0.6s', 2050);
        
        setTimeout(() => {
            numx = [150, -150];
            someTransitions(numx, numy, '1.3s', 2050);
        }, 800);
        setTimeout(() => {
            vs.style.transform = 'scale(0)';
            vs.style.transition = 'all 1.2s';
        }, 1700);
        setTimeout(() => {
            numx = [-236, 236];
            someTransitions(numx, numy, '0.5s', 2050);
            setTimeout(() => {
                var el = document.querySelector('#choice');
                var ex = document.querySelector('#choice');
                if (el.offsetLeft == ex.offsetLeft && el.offsetTop == ex.offsetTop){
                    var gg = winner.innerHTML;
                    if(imthewinner == 'yes'){
                        random.style.opacity = '0';
                        random.style.transition = 'all 1.1s';
                    }
                    else if(imthewinner == 'no'){
                        userChoice.style.opacity = '0';
                        userChoice.style.transition = 'all 1.1s';
                    }
                    else{
                        numx = [-100, 100];
                        someTransitions(numx, numy, '1s', 0);
                    }
                }
            }, 2550);
        }, 1700);
        setTimeout(() => {
            winner.style.opacity = '1';
            winner.style.transition = 'all 1s';
        }, 4400);
        setTimeout(() => {
            winner.style.transform = 'translateY(-20px)';
            winner.style.transition = 'all 0.3s';
            setTimeout(() => {
                winner.style.transform = 'translateY(15px)';
                winner.style.transition = 'all 0.2s';
                setTimeout(() => {
                    winner.style.transform = 'translateY(0px)';
                    winner.style.transition = 'all 0.1s';
                }, 250);
            }, 550);
        }, 4700);
        setTimeout(() => {
            playAgainButton.style.pointerEvents = 'all';
            playAgainButton.style.opacity = '1';
            playAgainButton.style.bottom = '-10px'
            playAgainButton.style.transition = 'all 1s';
            playLogo.style.opacity = '1';
        }, 4400);
    }
//Play again button
    function playAgain(){
        
        frame.style.pointerEvents = 'all';
        translateElem(frame, '0', '0', '1');

        translateElem(centerFrame, '0', '0', '1s');

        translateElem(bottomFrame, '0', '0', '1s');
        bottomFrame.style.visibility = 'hidden';
        bottomFrame.style.transition = 'all 1s'
        
        playAgainButton.style.opacity = '0';
        playAgainButton.style.transition = 'opacity 0.5s';
        playAgainButton.style.pointerEvents = 'none';

        winner.style.opacity = '0';
        winner.style.transition = 'opacity 0.5s';
        
        setTimeout(() => {
            if (imthewinner == 'yes') {
                random.style.opacity = '1';
                random.style.transition = 'all 1.1s';
            }
            if (imthewinner == 'no') {
                userChoice.style.opacity = '1';
                userChoice.style.transition = 'all 1.1s';
            }
            vs.style.transform = 'scale(1)';
            vs.style.transition = 'all 1s';
        }, 800);

        clickCounter = 0;
        repeatChangeRandom(100);
        numx = [0, 0]
        someTransitions(numx, numy, '1s', 0);
    }

//Main
    repeatChangeRandom(100);

    rockElem.addEventListener('click', choice);
    paperElem.addEventListener('click', choice);
    scissorsElem.addEventListener('click', choice);
    playAgainButton.addEventListener('click', playAgain)
})