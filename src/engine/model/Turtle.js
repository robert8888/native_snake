import Bonus from "./Bonus";
import random from "../../utils/randome";

class Turtle extends Bonus {
    constructor(coordinates, config) {
        super(coordinates, config);
        this.type = "turtle";
        this.expired = random(config.turtleExpiryLimitRange[0], config.turtleExpiryLimitRange[1]);
    }
    modify(state, snake) {
        return {
            state : this._transform(state, {
                speed: state.speed * 1.1,
                score: state.score - 10,
            }),
            snake: snake
        }
    }
}

export default Turtle;