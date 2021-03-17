// Select DOM Elements
const score0El = document.querySelector("#score--0") as HTMLTextAreaElement;
const score1El = document.querySelector("#score--1") as HTMLTextAreaElement;
const current0El = document.querySelector("#current--0") as HTMLTextAreaElement;
const current1El = document.querySelector("#current--1") as HTMLTextAreaElement;

const player0El = document.querySelector(".player--0") as HTMLElement;
const player1El = document.querySelector(".player--1") as HTMLElement;

const diceEl = document.querySelector(".dice") as HTMLImageElement;
const btnNew = document.querySelector(".btn--new") as HTMLButtonElement;
const btnRoll = document.querySelector(".btn--roll") as HTMLButtonElement;
const btnHold = document.querySelector(".btn--hold") as HTMLButtonElement;

// APP Class
class App {
  scores!: number[];
  currentScore!: number;
  activePlayer!: number;
  playing!: Boolean;

  constructor() {
    this.init();

    // #Event Listeners
    btnNew.addEventListener("click", this.init.bind(this));
    btnRoll.addEventListener("click", this.rollDice.bind(this));
    btnHold.addEventListener("click", this.holdScore.bind(this));
  }

  private init() {
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
  }

  private switchPlayer() {
    // #Reset Scores

    // ##Reset current score on current player
    document.querySelector(`#current--${this.activePlayer}`)!.textContent = "0";

    // ##Reset current score to 0
    this.currentScore = 0;

    // #Switch to next player
    this.activePlayer = this.activePlayer === 0 ? 1 : 0;

    // #Change background for active player
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
  }

  private rollDice() {
    if (this.playing) {
      // #Generate random dice roll
      const dice: number = Math.floor(Math.random() * 6) + 1;

      // #Display dice
      diceEl.classList.remove("hidden");
      diceEl.src = `/images/dice-${dice}.png`;

      // #Check for rolled 1
      if (dice !== 1) {
        // Add dice value to current score
        this.currentScore += dice;
        document.querySelector(
          `#current--${this.activePlayer}`
        )!.textContent = `${this.currentScore}`;
      }

      if (dice === 1) {
        this.switchPlayer();
      }
    }
  }

  private holdScore() {
    if (this.playing) {
      // # Set holding score to the scores array
      this.scores[this.activePlayer] += this.currentScore;
      // # Add current score to active player's big score
      document.querySelector(`#score--${this.activePlayer}`)!.textContent = `${
        this.scores[this.activePlayer]
      }`;

      // # Check if player's score is >= 100
      if (this.scores[this.activePlayer] >= 100) {
        this.playing = false;

        // ## Add winner class
        document
          .querySelector(`.player--${this.activePlayer}`)
          ?.classList.add("player--winner");

        // ## Remove player active class
        document
          .querySelector(`.player--${this.activePlayer}`)
          ?.classList.remove("player--active");
        diceEl?.classList.add("hidden");
      } else {
        // # Swith to the next player
        this.switchPlayer();
      }
    }
  }
}

const app = new App();
