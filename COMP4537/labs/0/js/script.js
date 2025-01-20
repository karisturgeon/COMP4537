/**
 * Kari Sturgeon
 * Lab 0
 * ChatGPT was used for this lab. (brainstorming, troubleshooting, refining the code, etc.)
 */

const MIN_BUTTONS = 3;
const MAX_BUTTONS = 7;

/**
 * Colours array for the buttons
 */
const COLOURS = [
    "#7FFFD4", // Aquamarine
    "#8A2BE2", // Blue Violet
    "#6495ED", //Cornflower Blue
    "#DC143C", //Crimson
    "#FFD700", //Gold
    "#C71585", //Medium Violet Red
    "#7CFC00", //Lawn Green
    "#FF6347", //Tomato
    "#DA70D6", //Orchid
    "#FFFFFF", //White
]

/**
 * Function to shuffle an array
 * @param array to be shuffled
 * @returns shuffled array
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


/**
 * The Button class
 * Handles creation of buttons as well as their visibility
 */
class Button {
    constructor(number, color) {
        this.number = number;
        this.color = color;
        this.button = this.createButton();
    }


    /**
     * Creates the actually dom element button
     * @returns a button element
     */
    createButton() {
        const button = document.createElement("button");
        button.innerHTML = `${this.number}`;

        button.style.setProperty("--button-color", this.color);
        button.classList.add("visible");
        return button;
    }


    /**
     * Moves button's number from visible to hidden
     */
    hideNumber() {
        this.button.classList.remove("visible");
        this.button.classList.add("hidden");
    }

    /**
     * Moves button's number from hidden to revealed
     */
    revealNumber() {
        this.button.classList.remove("hidden");
        this.button.classList.add("revealed");
    }

    /**
     * Assigns a click event handler to hte button
     * @param {function} handler - A function that handles the click event.
     */
    makeClickable(handler) {
        if (this.button) {
            this.button.onclick = () => handler(this);
        }
    }
}


/**
 * The Game class
 */
class Game {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.buttons = [];
        this.numButtons = 0;
        this.counter = 1;
    }

    /**
     * Starts the game by creating n(number from the input) buttons and shuffling them after n seconds   
     * @param {integer} count 
     */
    startGame(count) {
        this.numButtons = count;
        this.createButtons(count);
        setTimeout(() => {
            this.shuffleButtons();
        }, 1000 * count);
    }

    /**
     * Creates the buttons and appends them to the game container
     * @param {integer} count 
     */
    createButtons(count) {
        this.container.innerHTML = "";
        this.buttons = [];

        const shuffledColours = shuffleArray(COLOURS);
        for (let i = 1; i <= count; i++) {
            const color = shuffledColours[i - 1];
            const button = new Button(i, color, this.container);
            this.container.appendChild(button.button);
            this.buttons.push(button);
        }
    }

    /**
     * Shuffles the buttons in the container, and makes them clickable
     */
    shuffleButtons() {
        this.buttons.forEach(button => {
            button.hideNumber();
            button.makeClickable(this.playGame.bind(this));
            const randomX = Math.random() * 90;
            const randomY = Math.random() * 80 + 10;
            button.button.style.setProperty('--pos-x', `${randomX}%`);
            button.button.style.setProperty('--pos-y', `${randomY}%`);

        });
    }

    /**
     * Handles the game play logic
     * Uses a counter to check if the buttons are clicked in the correct order
     * @param {button} button 
     */
    playGame(button) {
        if (button.number === this.counter) {
            button.revealNumber();
            this.counter++;
            if (this.counter > this.numButtons) {
                alert(MESSAGES.win);
                this.gameOver();
            }
        } else {
            alert(MESSAGES.wrongOrder);
            this.gameOver();
        }
    }

    /**
     * Ends the game, calls revealNumber on all buttons (makes them unclickable and visible)
     */
    gameOver() {
        this.buttons.forEach(button => {
            button.revealNumber();
        });
    }
}


/**
 * Injects the instructions from the MESSSAGES object in user.js
 */
function injectTextInstructions() {
    const instructionLabel = document.getElementById("numButtonsLabel");
    if (instructionLabel) {
        instructionLabel.textContent = MESSAGES.instructions;
    }
    const goButton = document.getElementById("go");
    if (goButton) {
        goButton.textContent = MESSAGES.goButton;
    }
}



/**
 * Initalizes the app by injecting the text and starting the game
 */
injectTextInstructions();
document.getElementById("go").addEventListener("click", () => {
    const count = parseInt(document.getElementById("numButtons").value, 0);

    if (!isNaN(count) && count >= MIN_BUTTONS && count <= MAX_BUTTONS) {
        const game = new Game("buttonContainer");
        game.startGame(count);
    } else {
        alert(MESSAGES.incorrectNumber);
    }
});


