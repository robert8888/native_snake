import Bonus from "./Bonus";

export default class RedApple extends Bonus{
    constructor(...args) {
        super(...args);
        this.points = 20;
        this.type = "greenApple";
    }
}