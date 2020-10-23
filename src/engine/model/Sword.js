import Bonus from "./Bonus";
import random from "../../utils/randome";
import SnakeCutter from "./../utils/SnakeCutter";

class Sword extends Bonus {
    cutter;

    constructor(coordinates, config) {
        super(coordinates, config);
        this.type = "sword"
        this.expired = random(config.swordExpiryLimitRange[0], config.swordExpiryLimitRange[1])
        this.cutter = new SnakeCutter();
        this.range = config.swordCutRange;
    }
    modify(state, snake) {
        if(!this.range) return {state, snake}
        const about = random(this.range[0], this.range[1]);
        return {
            state: state,
            snake: this.cutter.cut(snake, about)
        }
    }
}

export default Sword;