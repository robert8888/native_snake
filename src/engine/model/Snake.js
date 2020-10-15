import Coordinates from "./Coordinates";


export default class Snake {
    _ids = new Set();
    _segments = [];

    constructor(start = new Coordinates(), width = 0, height = 0) {
        this._segments = [
            new Coordinates(start.x + 1, start.y), //tail
            start, //body
            new Coordinates(start.x - 1, start.y) // head
        ];
        this._ids = new Set(this._segments.map(segment => segment.toString()));
    }

    crawl(next){
        this._segments.push(next);
        const tail = this._segments.shift();
        this._ids.delete(tail.toString());
        this._ids.add(next.toString())
    }

    eat(next){
        this._segments.push(next);
        this._ids.add(next.toString());
    }

    get head(){
        return this._segments[this._segments.length - 1];
    }

    get tail(){
        return this._segments[0];
    }

    get segments(){
        return this._segments.slice(1, -1);
    }

    get segmentsIds(){
        return this._ids;
    }

    has(coordinates){
        return this._segments.some(segment => segment.x === coordinates.x && segment.y === coordinates.y)
    }

    toView(){
        return ({
            segments: [...this._segments].reverse()
        })
    }
}