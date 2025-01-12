

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

    revealNumber(){
        this.button.classList.remove("hidden");
        this.button.classList.add("revealed");
        if (this.button) {
            this.button.removeEventListener("click", () => {
                this.revealNumber();
            });
        }
    }

    makeClickable(handler) {
        if (this.button) {
            this.button.addEventListener("click", () => handler(this));                   }
    
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


        for (let i = 1; i <= count; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
            const button = new Button(i, color, this.container);
            button.createButton();
            this.buttons.push(button);
        }
    }

    shuffleButtons() {

        this.buttons.forEach(button => {
            button.hideNumber();
            button.makeClickable();
            const randomX = Math.random() * 100;
            const randomY = Math.random() * 100;

            button.button.style.left = `${randomX}%`;
            button.button.style.top = `${randomY}%`;
        });
    }

    playGame(button) {
        if(button.number === counter) {
            button.revealNumber();
            this.counter++;
            if (this.counter > this.numButtons) {
                alert(MESSAGES.win);
                this.gameOver();
            }
        }}


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

