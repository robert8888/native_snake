import Bonus from "./Bonus";
import random from "../../utils/randome";

class Diamond extends Bonus {
    constructor(coordinates, config) {
        super(coordinates, config);
        this.type = "diamond"
        this.expired = random(config.diamondExpiryLimitRange[0], config.diamondExpiryLimitRange[1])
    }

    modify(state, snake) {
        return {
            state : this._transform(state, {
                diamonds: state.diamonds + 1,
            }),
            snake: snake
        }
    }
}

export default Diamond;