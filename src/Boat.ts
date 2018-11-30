///<reference path="GameItem.ts" />
class Boat extends GameItem {
    private readonly _keyboardlistener: KeyBoardListener;

    constructor(
        canvas: HTMLCanvasElement,
        imageSource: string,
        xCoor: number,
        yCoor: number,
        width: number,
        height: number
    ) {
        super(canvas, imageSource, xCoor, yCoor, width, height);
        this._keyboardlistener = new KeyBoardListener();
    }

    //Translates keypresses into movement
    public move() {
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

    //Check if boat and shark are colliding
    public isColliding(shark: GameItem): boolean {
        if (this.getX() < shark.getX() + shark.getWidth() && this.getX() + this.getWidth() > shark.getX() &&
            this.getY() < shark.getY() + shark.getHeight() && this.getY() + this.getHeight() > shark.getY()) {
            return true;
            //console.log("Collidingtrue")
        }
        return false;
        //console.log("Collidingfalse")
    }
}