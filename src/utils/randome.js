export default function random(from = 0, to = 0){
    return Math.round(Math.random() * (to - from) + from);
}