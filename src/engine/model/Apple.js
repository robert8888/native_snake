import Bonus from "./Bonus";

export default class Apple extends Bonus {

    constructor(...args) {
        super(...args)
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

}