var playing = false;
var score;
var trialsLeft;
var i;
var step;
var action;
var fruits = ['greenapple', 'lemon', 'orange', 'peach', 'pear', 'pineapple', 'redapple', 'strawberry'];


$(function () {
    // click on the start reset button
    $("#startreset").click(function () {
        // we are playin

        if (playing == true) {
            //reload page
            location.reload();

        } else {
            //we are not playing
            playing = true; // game started
            // set score to 0

            score = 0;
            $("#scorevalue").html(score);

            // make trials box appear
            $("#trialsLeft").show();
            trialsLeft = 3;
            addHearts();

            // hide game over box
            $("#gameover").hide();
            //change button to reset game
            $("startreset").html("Reset Game")

            startAction();
        }
    });

});

$("#fruit1").mouseover(function () {
    score++;
    $("#scorevalue").html(score);
    document.getElementById("slicesound").play(); // play sounds

    // stop fruit
    stopAction();

    //hide fruit throught animation

    //send a new fruit
    setTimeout(startAction, 500);
});

function addHearts() {
    $("#trialsLeft").empty();
    for (i = 0; i < trialsLeft; i++) {
        $("#trialsLeft").append('<img src="images/heart.png" class="life">');
    }
}

function startAction() {
    $("#fruit1").show();
    chooseFruit(); //choose a random fruit
    $("#fruit1").css({
        'left': Math.round(550 * Math.random()),
        'top': -100
    });
    // generate a random step
    step = 1 + Math.round(5 * Math.random());

    //move fruit down by one step every 10ms
    action = setInterval(function () {
        $("#fruit1").css('top', $("#fruit1").position().top + step);

        //check if the fruit is too low
        if ($("#fruit1").position().top > $("#fruitContainer").height()) { // check if we have any trials left
            if (trialsLeft > 1) {
                $("#fruit1").show();
                chooseFruit(); //choose a random fruit
                $("#fruit1").css({
                    'left': Math.round(550 * Math.random()),
                    'top': -100
                });
                // generate a random step
                step = 1 + Math.round(5 * Math.random());
                // reduce the trials by one
                trialsLeft--;
                //populate trialsleft box
                addHearts();

            } else {
                // game over
                playing = false;
                $("#startreset").html("Start Game");
                $("#gameover").show();
                $("#gameover").html('<p> Game Over!</p><p>Your score is ' + score + '</p>');
                $("#trialsLeft").hide();
                stopAction();

            }

        }
    }, 10)
}


//generate a random fruit
function chooseFruit() {
    $("#fruit1").attr('src', 'images/' + fruits[Math.round(7 * Math.random())] + '.png');
}

function stopAction() {
    clearInterval(action);
    $("#fruit1").hide();
}
// are we playing?
// yes
// reload page
// no
// show trials left
// change button text to reset game
// 1. create a random fruit
// define a random step
// 2. move fruit down one step every 30s
// is fruit too low?
// no -> repeat step 2
// yes -> do we have any trials left?
// yes: repeat number 1
// no: show game over, button text: change to start game

// slice a fruit
// play sound
// explode fruit
