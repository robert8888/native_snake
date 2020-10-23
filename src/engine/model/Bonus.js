import Coordinates from "./Coordinates";

export default class Bonus extends Coordinates {
    points = 0;
    speedRatio = null;
    expired = null;
    creationTime = null;
    constructor(coordinates, config) {
        super(coordinates.x , coordinates.y );
        this.speedRatio = config.levelSpeedRatio;
        this.creationTime = new Date().getTime();
    }

    _transform(state, modification){
        const nextState = {...state}
        for(let key in modification){
            if(!modification.hasOwnProperty(key)) continue;
            nextState[key] = modification[key];
        }
        return nextState;
    }

    modify(state, snake){
        const changes = {
            score: state.score + this.points * (state.diamonds + 1),
            level: state.level + 1,
            speed: state.speed * this.speedRatio,
            diamonds: 0
        }

        return {
            state : this._transform(state, changes),
            snake: snake
        }
    }

    toView(){
        return {
            x : this.x,
            y : this.y,
            type: this.type,
        }
    }

    isExpired(){
        if(this.expired === undefined || this.expired === null) return false;
        return new Date().getTime() - this.creationTime > this.expired;
    }
}