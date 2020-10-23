import Apple from "./Apple";

export default class RedApple extends Apple{
    constructor(...args) {
        super(...args);
        this.points = 30;
        this.type = "goldApple";
        this.isApple = true;
    }
}