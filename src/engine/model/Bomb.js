import Bonus from "./Bonus";
import random from "../../utils/randome";

class Bomb extends Bonus {
    constructor(coordinates, config) {
        super(coordinates, config);
        this.type = "bomb"
        this.expired = random(config.bombExpiryLimitRange[0], config.bombExpiryLimitRange[1])
    }
    modify(state, snake) {
        return {
            state : this._transform(state, {
                over: (state.lives < 2),
                lives: state.lives - 1,
                score: state.score - 50,
            }),
            snake: snake
        }
    }
}

export default Bomb;