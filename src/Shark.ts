///<reference path="GameItem.ts" />
class Shark extends GameItem {
    private _game: Game
    private speed: number = 7

    constructor(
        canvas: HTMLCanvasElement,
        imageSource: string,
        xCoor: number,
        yCoor: number,
        width: number,
        height: number
        ){
        super(canvas, imageSource, xCoor, yCoor, width, height)
    }
    public moveRightToLeft = () => {
        //this._game._sharkArray[0]._xPos -= 7
        //Als ik deze method probeerde te gebruiken kreeg ik Game.ts:35 Uncaught TypeError: Cannot read property 'moveRightToLeft' of undefined, dus deze method heb ik verplaatst naar Game.ts onder de naam moveSharks()
    }
}