/*eslint-env browser*/
var playing = false;
var score;
var action;
var timeLeft;
var x;
var y;
var correctAnswer = x * y;

document.getElementById("startreset").onclick = function () {
    if (playing === true) {
        location.reload(); // reloads the page
    } else { //if we are not palying

        // change mode to playing
        playing = true;
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;

        //show the countdown box
        show("timeleft");
        timeLeft = 60;
        document.getElementById("timeleftvalue").innerHTML = timeLeft;
        //hide game over box
        hide("gameover");

        //change text to reset game
        document.getElementById("startreset").innerHTML = "Reset Game";

        // start countdown

        startCountdown();

        // generate a new Q&A's

        generateQA();
    }
}
//clicking on an answer box
for (var i = 1; i < 5; i++) {
    document.getElementById("box" + i).onclick = function () {
        // check if we are playing
        if (playing == true) {
            if (this.innerHTML == correctAnswer) {
                score++;
                document.getElementById("scorevalue").innerHTML = score;
                // show correct box, hide wrong box
                hide("wrong");
                show("correct");
                setTimeout(function () {
                    hide("correct");
                }, 1000);

                // generate a new q&A
                generateQA();
            } else {
                hide("correct");
                show("wrong");
                setTimeout(function () {
                    hide("wrong");
                }, 1000);
            }
        }
    }

}

// functions

// start counter
function startCountdown() {
    action = setInterval(function () {
        timeLeft -= 1;
        document.getElementById("timeleftvalue").innerHTML = timeLeft;
        if (timeLeft === 0) {
            // game over
            stopCountdown();
            show("gameover")
            document.getElementById("gameover").innerHTML = "<p>Game over!</p><p>You scored " + score + " points!</p>"
            document.getElementById("timeleft").style.display = "none";
            hide("timeleft");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000);
}
// stop the counter
function stopCountdown() {
    clearInterval(action);
}

// hides a certain element
function hide(Id) {
    document.getElementById(Id).style.display = "none";
}

// show a certain element
function show(Id) {
    document.getElementById(Id).style.display = "block";
}

// generate question!
function generateQA() {
    x = 1 + Math.round(9 * Math.random());
    y = 1 + Math.round(9 * Math.random());
    correctAnswer = x * y;

    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1 + Math.round(3 * Math.random());
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer; // fill one box with the correct answer

    // fill other boxes with wrong answers
    var answers = [correctAnswer];
    for (var i = 1; i < 5; i++) {
        if (i !== correctPosition) {
            var wrongAnswer;
            do {
                wrongAnswer =
                    wrongAnswer = 1 + Math.round(9 * Math.random()) * 1 + Math.round(9 * Math.random()); // wrong answer
            }
            while (answers.indexOf(wrongAnswer) > -1)
            document.getElementById("box" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }



}
