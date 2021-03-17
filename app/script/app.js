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
var informationArea = document.querySelector("header");
// APP Class
var App = /** @class */ (function () {
    function App() {
        this.init();
        // #Event Listeners
        btnNew.addEventListener("click", this.init.bind(this));
        btnRoll.addEventListener("click", this.rollDice.bind(this));
        btnHold.addEventListener("click", this.holdScore.bind(this));
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
        this.displayInformation("New game started ⚡️🚀", 3000);
    };
    App.prototype.switchPlayer = function () {
        // #Reset Scores
        // ##Reset current score on current player
        document.querySelector("#current--" + this.activePlayer).textContent = "0";
        // ##Reset current score to 0
        this.currentScore = 0;
        // #Switch to next player
        this.activePlayer = this.activePlayer === 0 ? 1 : 0;
        // #Change background for active player
        player0El.classList.toggle("player--active");
        player1El.classList.toggle("player--active");
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
            if (dice === 1) {
                this.switchPlayer();
            }
        }
    };
    App.prototype.holdScore = function () {
        var _a, _b;
        if (this.playing) {
            // # Set holding score to the scores array
            this.scores[this.activePlayer] += this.currentScore;
            // # Add current score to active player's big score
            document.querySelector("#score--" + this.activePlayer).textContent = "" + this.scores[this.activePlayer];
            // # Check if player's score is >= 100
            if (this.scores[this.activePlayer] >= 50) {
                this.playing = false;
                // ## Add winner class
                (_a = document
                    .querySelector(".player--" + this.activePlayer)) === null || _a === void 0 ? void 0 : _a.classList.add("player--winner");
                // ## Remove player active class
                (_b = document
                    .querySelector(".player--" + this.activePlayer)) === null || _b === void 0 ? void 0 : _b.classList.remove("player--active");
                diceEl === null || diceEl === void 0 ? void 0 : diceEl.classList.add("hidden");
                // ## Show information text
                this.displayInformation("Congratulations Player " + (this.activePlayer + 1) + " \uD83C\uDFC6", 5000);
            }
            else {
                // # Swith to the next player
                this.switchPlayer();
            }
        }
    };
    App.prototype.displayInformation = function (text, time) {
        if (time === void 0) { time = 2000; }
        informationArea.innerText = text;
        informationArea.classList.remove("hidden");
        setTimeout(function () {
            informationArea.classList.add("hidden");
        }, time);
    };
    return App;
}());
var app = new App();
