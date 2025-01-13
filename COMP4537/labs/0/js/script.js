const Colours = [
    "#7FFFD4", // Aquamarine
    "#8A2BE2", // Blue Violet
    "#6495ED", //Cornflower Blue
    "#DC143C", //Crimson
    "#FFD700", //Gold
    "#ADFF2F", //Green Yellow
    "#C71585", //Medium Violet Red
    "40E0D0", //Turquoise
    "#FF6347", //Tomato
]

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

class Button {
    constructor(number, color, container) {
        this.number = number;
        this.color = color;
        this.container = container;
        this.button = null;
    }

    createButton() {
        const button = document.createElement("button");
        button.innerHTML = this.number;
        button.style.backgroundColor = this.color;

        button.classList.add("visible");

        this.button = button;
        this.container.appendChild(button);
    }

    hideNumber() {
        this.button.classList.remove("visible");
        this.button.classList.add("hidden");
    }

    revealNumber() {
        this.button.classList.remove("hidden");
        this.button.classList.add("revealed");
        this.button.style.pointerEvents = "none";
    }

    makeClickable(handler) {
        if (this.button) {
            this.button.onclick = () => handler(this);
        }
    }
}

class Game {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.buttons = [];
        this.numButtons = 0;
        this.counter = 1;
    }

    startGame(count) {
        this.numButtons = count;
        this.createButtons(count);
        setTimeout(() => {
            this.shuffleButtons();
        }, 1000 * count);
    }

    createButtons(count) {
        this.container.innerHTML = "";
        this.buttons = [];

        const shuffledColours = shuffleArray(Colours);
        for (let i = 1; i <= count; i++) {
            const color = shuffledColours[i - 1];
            const button = new Button(i, color, this.container);
            button.createButton();
            this.buttons.push(button);
        }
    }

    shuffleButtons() {
        this.buttons.forEach(button => {
            button.hideNumber();
            button.makeClickable(this.playGame.bind(this));
            const randomX = Math.random() * 90;
            const randomY = Math.random() * 80 + 10;
            button.button.style.left = `${randomX}%`;
            button.button.style.top = `${randomY}%`;
        });
    }

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


    gameOver() {
        this.buttons.forEach(button => {
            button.revealNumber();
        });
    }
}

injectText();
document.getElementById("go").addEventListener("click", () => {
    const count = parseInt(document.getElementById("numButtons").value, 0);

    if (!isNaN(count) && count >= 3 && count <= 7) {
        const game = new Game("buttonContainer");
        game.startGame(count);
    } else {
        alert(MESSAGES.incorrectNumber);
    }
});



function injectText() {
    const instructionLabel = document.getElementById("numButtonsLabel");
    if (instructionLabel) {
        instructionLabel.textContent = MESSAGES.instructions;
    }
    const goButton = document.getElementById("go");
    if (goButton) {
        goButton.textContent = MESSAGES.goButton;
    }
}

