var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userChosenColor = [];
var level = 0;
var randomChosenColor;
var iden;
var j = 0;

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    return randomNumber;
}

function initialise() {
    document.addEventListener("keydown", startGame, { once: true });
}

function startGame() {
    level++;
    document.querySelector("h1").innerHTML = "Level " + level;
    userChosenColor = [];
    j = 0;

    randomChosenColor = buttonColors[nextSequence()];
    gamePattern.push(randomChosenColor);

    // Show sequence to user with animation and sound
    animatePress(randomChosenColor);
    playSound(randomChosenColor);
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(color) {
    document.querySelector("." + color).classList.add("overlay");
    setTimeout(function() {
        document.querySelector("." + color).classList.remove("overlay");
    }, 150);
}

// Button click listener
for (let i = 0; i < document.querySelectorAll(".button").length; i++) {
    document.querySelectorAll(".button")[i].addEventListener("click", function() {
        iden = this.getAttribute('id');
        userChosenColor.push(iden);
        playSound(iden);
        animatePress(iden);

        // Check the user's answer
        if (iden === gamePattern[j]) {
            j++;
            if (j === gamePattern.length) {
                setTimeout(nextLevel, 1000);
            }
        } else {
            document.querySelector("h1").innerHTML = "Wrong, Press Any Key To Continue!";
            var audio= new Audio("./sounds/wrong.mp3");
            audio.play();
            startOver();
        }
    });
}

function nextLevel() {
    level++;
    document.querySelector("h1").innerHTML = "Level " + level;
    userChosenColor = [];
    j = 0;

    randomChosenColor = buttonColors[nextSequence()];
    gamePattern.push(randomChosenColor);

    // Show sequence to user with animation and sound
    animatePress(randomChosenColor);
    playSound(randomChosenColor);
}

function startOver() {
    level = 0;
    gamePattern = [];
    initialise();
}

// Initialize the game
initialise();

