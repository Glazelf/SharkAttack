class GameItem {
    public _xPos: number;
    public _yPos: number;
    protected _height: number;
    protected _width: number;
    protected _imgSource: string
    protected _canvas: Canvas

    public constructor(
        canvas: HTMLCanvasElement,
        imageSource: string,
        xCoor: number,
        yCoor: number,
        width: number,
        height: number
        ) {
        this._canvas = new Canvas(canvas);
        this._imgSource = imageSource;
        this._xPos = xCoor;
        this._yPos = yCoor;
        this._width = width;
        this._height = height;
        }

        public draw() {
            this._canvas.writeImageToCanvas(this._imgSource, this._xPos, this._yPos);
        }
    
        public getX(): number
        {
            return this._xPos;
        }
    
        public getY(): number
        {
            return this._yPos;
        }
    
        public getWidth(): number
        {
            return this._width;
        }
    
        public getHeight(): number
        {
            return this._height;
        }
}