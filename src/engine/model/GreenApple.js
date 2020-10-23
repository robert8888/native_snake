import Apple from "./Apple";

export default class RedApple extends Apple{
    constructor(...args) {
        super(...args);
        this.points = 20;
        this.type = "greenApple";
        this.isApple = true;
    }
}