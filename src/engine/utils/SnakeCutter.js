export default class SnakeCutter {
    cut(snake, about){
        if(!about){
            about = 50;
        }
        about /= 100;
        const toRemove = Math.round(snake.length *  about);
        const left = Math.max(snake.length - toRemove, 3);
        const removed = snake.segments.slice(left);
        snake.segments = snake.segments.slice(0, left);
        const ids = snake.segmentsIds;
        for(let segment of removed){
            ids.delete(segment.toString())
        }
        snake.segmentsIds = ids;
    }
}