import Coordinates from "./Coordinates";

export default class Bonus extends Coordinates {
    points = 0;
    speedRatio = null;
    constructor(coordinates, config) {
        super(coordinates.x , coordinates.y );
        this.speedRatio = config.levelSpeedRatio
    }

    _transform(state, modification){
        const nextState = {...state}
        for(let key in modification){
            if(!modification.hasOwnProperty(key)) continue;
            nextState[key] = modification[key];
        }
        return nextState;
    }

    modify(state){
        return this._transform(state, {
            score: state.score + this.points,
            level: state.level + 1,
            speed: state.speed * this.speedRatio
        });
    }

    toView(){
        return {
            x : this.x,
            y : this.y,
            type: this.type,
        }
    }
}