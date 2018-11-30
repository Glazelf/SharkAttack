class GameItem {
    constructor(canvas, imageSource, xCoor, yCoor, width, height) {
        this._canvas = new Canvas(canvas);
        this._imgSource = imageSource;
        this._xPos = xCoor;
        this._yPos = yCoor;
        this._width = width;
        this._height = height;
    }
    draw() {
        this._canvas.writeImageToCanvas(this._imgSource, this._xPos, this._yPos);
    }
    getX() {
        return this._xPos;
    }
    getY() {
        return this._yPos;
    }
    getWidth() {
        return this._width;
    }
    getHeight() {
        return this._height;
    }
}
class Boat extends GameItem {
    constructor(canvas, imageSource, xCoor, yCoor, width, height) {
        super(canvas, imageSource, xCoor, yCoor, width, height);
        this._keyboardlistener = new KeyBoardListener();
    }
    move() {
        if (this._keyboardlistener.getUpPressed()) {
            if (this._yPos >= 0) {
                this._yPos -= 10;
            }
        }
        if (this._keyboardlistener.getRightPressed()) {
            if (this._xPos <= this._canvas.getWidth() - 165) {
                this._xPos += 10;
            }
        }
        if (this._keyboardlistener.getDownPressed()) {
            if (this._yPos <= this._canvas.getHeight() - 133) {
                this._yPos += 10;
            }
        }
    }
    isColliding(shark) {
        if (this.getX() < shark.getX() + shark.getWidth() && this.getX() + this.getWidth() > shark.getX() &&
            this.getY() < shark.getY() + shark.getHeight() && this.getY() + this.getHeight() > shark.getY()) {
            return true;
        }
        return false;
    }
}
class Canvas {
    constructor(canvasId) {
        this._canvas = canvasId;
        this.ctx = this._canvas.getContext('2d');
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;
    }
    clearScreen() {
        this.ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }
    writeTextToCanvas(text, fontSize, xCoordinate, yCoordinate, color = "white", alignment = "center") {
        this.ctx.font = `${fontSize}px Comic Sans`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
    writeImageToCanvas(src, xCoordinate, yCoordinate) {
        let element = document.createElement("img");
        element.src = src;
        element.addEventListener("load", () => {
            this.ctx.drawImage(element, xCoordinate, yCoordinate);
        });
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    getWidth() {
        return this._canvas.width;
    }
    getHeight() {
        return this._canvas.height;
    }
}
class Game {
    constructor() {
        this._sharkArray = new Array();
        this.lives = 3;
        this.counter = 0;
        this.draw = () => {
            if (this.lives > 0) {
                this._canvas.clearScreen();
                this._boat.move();
                this._boat.draw();
                this.timer();
                this.moveSharks();
                this._canvas.writeTextToCanvas(`You survived for: ${Math.round(this.counter / 60)} seconds!`, 50, this._canvas.getWidth() / 1.3, this._canvas.getHeight() / 15, "black");
                this._canvas.writeTextToCanvas(`You have ${this.lives} lives remaining!`, 50, this._canvas.getWidth() / 5, this._canvas.getHeight() / 15, "black");
                for (let i = 0; i < this._sharkArray.length; i++) {
                    if (this._boat.isColliding(this._sharkArray[i])) {
                        this.lives -= 1;
                        this._sharkArray.splice(i, 1);
                        this._sharkArray.push(new Shark(this._canvasElement, './assets/images/shark.png', this._canvas.getWidth() / 1.05, this._canvas.randomNumber(0, this._canvas.getHeight() - 149), 122, 149));
                    }
                    else {
                        this._sharkArray[i].draw();
                    }
                }
            }
            else if (this.lives == 0) {
                this._canvas.clearScreen();
                this.ctx = null;
                this._canvas.writeTextToCanvas(`You died! You survived for: ${Math.round(this.counter / 60)} seconds!`, 50, this._canvas.getWidth() / 2, this._canvas.getHeight() / 2, "black");
            }
        };
        this._canvasElement = document.getElementById('canvas');
        this._canvas = new Canvas(this._canvasElement);
        this._boat = new Boat(this._canvasElement, './assets/images/boat.png', 100, 100, 165, 133);
        for (let index = 0; index < 4; index++) {
            this._sharkArray.push(new Shark(this._canvasElement, './assets/images/shark.png', this._canvas.getWidth() / 1.05, this._canvas.randomNumber(0, this._canvas.getHeight() - 149), 122, 149));
        }
    }
    timer() {
        this.counter++;
    }
    moveSharks() {
        this._sharkArray[0]._xPos -= this._canvas.randomNumber(1, 15);
        this._sharkArray[1]._xPos -= this._canvas.randomNumber(1, 15);
        this._sharkArray[2]._xPos -= this._canvas.randomNumber(1, 15);
        this._sharkArray[3]._xPos -= this._canvas.randomNumber(1, 15);
        if (this._sharkArray[0]._xPos < -200) {
            this._sharkArray[0]._xPos = this._canvas.getWidth() / 1.05;
            this._sharkArray[0]._yPos = this._canvas.randomNumber(0, this._canvas.getHeight() - 149);
        }
        if (this._sharkArray[1]._xPos < -200) {
            this._sharkArray[1]._xPos += this._canvas.getWidth() / 1.05;
            this._sharkArray[1]._xPos = this._canvas.randomNumber(0, this._canvas.getHeight() - 149);
        }
        if (this._sharkArray[2]._xPos < -200) {
            this._sharkArray[2]._xPos = this._canvas.getWidth() / 1.05;
            this._sharkArray[2]._yPos = this._canvas.randomNumber(0, this._canvas.getHeight() - 149);
        }
        if (this._sharkArray[3]._xPos < -200) {
            this._sharkArray[3]._xPos = this._canvas.getWidth() / 1.05;
            this._sharkArray[3]._yPos = this._canvas.randomNumber(0, this._canvas.getHeight() - 149);
        }
    }
}
window.addEventListener('load', init);
function init() {
    const SharkAttack = new Game();
    window.setInterval(SharkAttack.draw, 1000 / 60);
}
class Shark extends GameItem {
    constructor(canvas, imageSource, xCoor, yCoor, width, height) {
        super(canvas, imageSource, xCoor, yCoor, width, height);
        this.speed = 7;
        this.moveRightToLeft = () => {
        };
    }
}
class KeyBoardListener {
    constructor() {
        this.keyDownHandler = (event) => {
            if (event.keyCode == 38 || event.keyCode == 87) {
                this.upPressed = true;
            }
            if (event.keyCode == 39 || event.keyCode == 68) {
                this.rightPressed = true;
            }
            if (event.keyCode == 40 || event.keyCode == 83) {
                this.downPressed = true;
            }
        };
        this.keyUpHandler = (event) => {
            if (event.keyCode == 38 || event.keyCode == 87) {
                this.upPressed = false;
            }
            if (event.keyCode == 39 || event.keyCode == 68) {
                this.rightPressed = false;
            }
            if (event.keyCode == 40 || event.keyCode == 83) {
                this.downPressed = false;
            }
        };
        this.upPressed = false;
        this.rightPressed = false;
        this.downPressed = false;
        window.addEventListener("keydown", this.keyDownHandler);
        window.addEventListener("keyup", this.keyUpHandler);
    }
    getUpPressed() {
        return this.upPressed;
    }
    getRightPressed() {
        return this.rightPressed;
    }
    getDownPressed() {
        return this.downPressed;
    }
}
//# sourceMappingURL=app.js.map