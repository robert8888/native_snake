export default class Coordinates {
    _x = 0;
    _y = 0;

    constructor(x = 0, y = 0) {
        this._x = ~~x;
        this._y = ~~y;
    }

    get x() {return this._x};
    get y() {return this._y};

    toString(){
        return `row:${this.x}-col:${this.y}`
    }
}