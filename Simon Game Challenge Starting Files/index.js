let buttonColors = ["red", "blue", "green", "yellow"];
//
let gamePattern = [];
//
let userClickedPattern = [];
//
let level = 0;
let started = false;
//
let nextSequence = function () {
  //
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  //
  let randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
};
//
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
//
let playSound = function (name) {
  audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
};
//
let animatePress = function (currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};
//
$(".btn").click(function () {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  //   console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});
//
let startOver = function () {
  $("#level-title").text("Press A Key to Start");
  level = 0;
  gamePattern = [];
  started = false;
};
//
let checkAnswer = function (currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 2000);
    console.log("wrong");
    startOver();
  }
};
