console.log("appjs is active");
let scores,
  roundScore,
  activePlayer,
  lastDice,
  gamePlaying = true;
init();
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    //random number
    let dice = Math.floor(Math.random() * 6) + 1;
    //display the result
    let domDice = document.querySelector(".dice");
    domDice.style.display = "block";
    domDice.src = "dice-" + dice + ".png";
    //update the round score if the roll number was not a 1
    if (dice === 6 && lastDice === 6) {
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent = "0";
      nextPlayer();
    } else if (dice !== 1) {
      roundScore = roundScore + dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }
    lastDice = dice;
  }
});
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    //add curent score to global score
    scores[activePlayer] += roundScore;
    //update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
    //check if the plater won the game
    if (scores[activePlayer] >= 100) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      //nex player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  roundScore = 0;
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  document.querySelector("#current-0").textContent = "0";
  document.querySelector("#current-1").textContent = "0";
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  document.querySelector(".dice").style.display = "none";
  document.querySelector("#score-0").textContent = "0";
  document.querySelector("#current-0").textContent = "0";
  document.querySelector("#score-1").textContent = "0";
  document.querySelector("#current-1").textContent = "0";
  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

let power = function(base, exponent) {
  if (exponent == undefined) exponent = 2;
  var result = 1;
  for (var count = 0; count < exponent; count++) {
    result *= base;
    console.log(result);
  }
  return result;
};

console.log(power(3));
