function choice(c) {
    vsChoice = Math.floor(Math.random() * 3);
    var winner;

    switch (vsChoice){
        case 0:
            sChoice = "rock";
            break;
        case 1:
            sChoice = "paper";
            break;
        case 2:
            sChoice = "scissors";
            break;
    }

    //Rock vs scissors
    if (c == "rock" && sChoice == "scissors") {
        winner = "You win";
    }
    //Rock vs paper
    else if (c == "rock" && sChoice == "paper") {
        winner = "You lose";
    }
    //Paper vs scissors
    else if (c == "paper" && sChoice == "scissors") {
        winner = "You lose";
    }
    //Paper vs rock
    else if (c == "paper" && sChoice == "rock") {
        winner = "You win";
    }
    //Scissors vs rock
    else if (c == "scissors" && sChoice == "rock") {
        winner = "You lose";
    }
    //Scissors vs paper
    else if (c == "scissors" && sChoice == "paper") {
        winner = "You win";
    }
    //Draw
    else if (sChoice == c) {
        winner = "Draw";
    }
    //Reset
    else if (sChoice != c) {
        winner = "";
    }

    randomSource = "resources/" + sChoice + ".png"; 
    userSource = "resources/" + c + ".png";
    document.getElementById('choice').src = userSource;
    document.getElementById('random').src = randomSource;

    var x = document.getElementsByClassName('winner');
    x[0].innerHTML = winner
}

