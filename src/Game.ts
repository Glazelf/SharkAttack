//TODO
//Shark spawn right side of screen random height
//Boat movement WASD
//Time display
//reverse death mechanic

class Game {
    private readonly _canvasElement: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D;
    private readonly _canvas: Canvas;
    private readonly _boat: Boat;
    private readonly _shark: Shark;
    public _sharkArray = new Array<Shark>();
    private lives: number = 3;
    private counter = 0;

    constructor() {
        this._canvasElement = <HTMLCanvasElement>document.getElementById('canvas');
        this._canvas = new Canvas(this._canvasElement);
        this._boat = new Boat(this._canvasElement, './assets/images/boat.png', 100, 100, 165, 133);
        //Creates the first few sharks
        for (let index = 0; index < 4; index++) {
            this._sharkArray.push(new Shark(this._canvasElement, './assets/images/shark.png', this._canvas.getWidth() / 1.05, this._canvas.randomNumber(0, this._canvas.getHeight() - 149), 122, 149));
            //console.log("Game.constructorFor")
        }
    }

    public draw = () => {
        if (this.lives > 0) {
            //console.log("game.draw")
            this._canvas.clearScreen();
            this._boat.move();
            this._boat.draw();
            this.timer();
            //this._shark.moveRightToLeft();
            this.moveSharks()
            this._canvas.writeTextToCanvas(`You survived for: ${Math.round(this.counter / 60)} seconds!`, 50, this._canvas.getWidth() / 1.3, this._canvas.getHeight() / 15, "black")
            this._canvas.writeTextToCanvas(`You have ${this.lives} lives remaining!`, 50, this._canvas.getWidth() / 5, this._canvas.getHeight() / 15, "black")
            for (let i = 0; i < this._sharkArray.length; i++) {
                if (this._boat.isColliding(this._sharkArray[i])) {
                    //If boat and shark collide -->
                    this.lives -= 1
                    this._sharkArray.splice(i, 1);
                    this._sharkArray.push(new Shark(this._canvasElement, './assets/images/shark.png', this._canvas.getWidth() / 1.05, this._canvas.randomNumber(0, this._canvas.getHeight() - 149), 122, 149));
                } else {
                    this._sharkArray[i].draw();
                    //console.log("Game.drawElse")
                }
            }
        } else if (this.lives == 0) {
            //console.log("game.draw.for.ifstart")
            this._canvas.clearScreen();
            this.ctx = null;
            //Displays time you lived for, divided by 60 to convert to seconds
            this._canvas.writeTextToCanvas(`You died! You survived for: ${Math.round(this.counter / 60)} seconds!`, 50, this._canvas.getWidth() / 2, this._canvas.getHeight() / 2, "black")
            //console.log("game.draw.for.if")
        }
    }

    //Counts the time the game has been going on for in frames
    public timer() {
        this.counter++
    }

    public moveSharks() {
        this._sharkArray[0]._xPos -= this._canvas.randomNumber(1, 15)
        this._sharkArray[1]._xPos -= this._canvas.randomNumber(1, 15)
        this._sharkArray[2]._xPos -= this._canvas.randomNumber(1, 15)
        this._sharkArray[3]._xPos -= this._canvas.randomNumber(1, 15)
        if (this._sharkArray[0]._xPos < -200) {
            this._sharkArray[0]._xPos = this._canvas.getWidth() / 1.05
            this._sharkArray[0]._yPos = this._canvas.randomNumber(0, this._canvas.getHeight() - 149)
        }
        if (this._sharkArray[1]._xPos < -200) {
            this._sharkArray[1]._xPos += this._canvas.getWidth() / 1.05
            this._sharkArray[1]._xPos = this._canvas.randomNumber(0, this._canvas.getHeight() - 149)
        }
        if (this._sharkArray[2]._xPos < -200) {
            this._sharkArray[2]._xPos = this._canvas.getWidth() / 1.05
            this._sharkArray[2]._yPos = this._canvas.randomNumber(0, this._canvas.getHeight() - 149)
        }
        if (this._sharkArray[3]._xPos < -200) {
            this._sharkArray[3]._xPos = this._canvas.getWidth() / 1.05
            this._sharkArray[3]._yPos = this._canvas.randomNumber(0, this._canvas.getHeight() - 149)
        }
    }
}


window.addEventListener('load', init);
function init(): void {
    const SharkAttack = new Game();
    window.setInterval(SharkAttack.draw, 1000 / 60)
}