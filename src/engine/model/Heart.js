import Bonus from "./Bonus";
import random from "../../utils/randome";

class Heart extends Bonus {
    constructor(coordinates, config) {
        super(coordinates, config);
        this.type = "heart"
        this.expired = random(config.heartExpiryLimitRange[0], config.heartExpiryLimitRange[1])
    }
    modify(state, snake) {
        return {
            state : this._transform(state, {
                lives: state.lives + 1
            }),
            snake: snake
        }
    }
}

export default Heart;