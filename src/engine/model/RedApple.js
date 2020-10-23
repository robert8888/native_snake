import Apple from "./Apple";

export default class RedApple extends Apple{
    constructor(...args) {
        super(...args);
        this.points = 10;
        this.type = "redApple"
        this.isApple = true;
    }
}