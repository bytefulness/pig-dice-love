"use strict";
// Select DOM Elements
var score0El = document.querySelector("#score--0");
var score1El = document.querySelector("#score--1");
var current0El = document.querySelector("#current--0");
var current1El = document.querySelector("#current--1");
var player0El = document.querySelector(".player--0");
var player1El = document.querySelector(".player--1");
var diceEl = document.querySelector(".dice");
var btnNew = document.querySelector(".btn--new");
var btnRoll = document.querySelector(".btn--roll");
var btnHold = document.querySelector(".btn--hold");
// APP Class
var App = /** @class */ (function () {
    function App() {
        this.init();
        // #Event Listeners
        btnNew.addEventListener("click", this.init.bind(this));
        btnRoll.addEventListener("click", this.rollDice.bind(this));
    }
    App.prototype.init = function () {
        this.scores = [0, 0];
        this.currentScore = 0;
        this.activePlayer = 0;
        this.playing = true;
        // #Set initial and reset UI
        // ##Big Scores
        score0El.textContent = "0";
        score1El.textContent = "0";
        // ##Current Scores
        current0El.textContent = "0";
        current1El.textContent = "0";
        diceEl.classList.add("hidden");
        // #Remove winner style class
        player0El.classList.remove("player--winner");
        player1El.classList.remove("player--winner");
        player0El.classList.add("player--active");
        player1El.classList.remove("player--active");
    };
    App.prototype.rollDice = function () {
        if (this.playing) {
            // #Generate random dice roll
            var dice = Math.floor(Math.random() * 6) + 1;
            // #Display dice
            diceEl.classList.remove("hidden");
            diceEl.src = "/images/dice-" + dice + ".png";
            // #Check for rolled 1
            if (dice !== 1) {
                // Add dice value to current score
                this.currentScore += dice;
                document.querySelector("#current--" + this.activePlayer).textContent = "" + this.currentScore;
            }
        }
    };
    return App;
}());
var app = new App();
