import React, {useCallback, useState} from "react"
import Coordinates from "./model/Coordinates";
import GoldApple from "./model/GoldApple";
import RedApple from "./model/RedApple";
import GreenApple from "./model/GreenApple";

export default function useBonusGenerator(config){
    const [size] = useState(config.gameSize);

    const random = useCallback((from = 0, to = size - 1) => {
        return Math.round(Math.random() * (to - from) + from);
    }, [size])

    const randomCoordinates = useCallback(()=>{
        return new Coordinates(random(), random())
    }, [random])

    const generate = useCallback((exclude = new Set())=>{
        let coordinates = randomCoordinates()
        while(exclude.has(coordinates.toString())){
            coordinates = randomCoordinates()
        }
        return new [RedApple, GreenApple, GoldApple][random(0,2)](coordinates, config);
    }, [random]);

    return [generate]
}