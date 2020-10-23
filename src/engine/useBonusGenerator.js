import React, {useCallback} from "react"
import GoldApple from "./model/GoldApple";
import RedApple from "./model/RedApple";
import GreenApple from "./model/GreenApple";
import useRandomCoordinates from "./useRandomCordinates";
import random from "../utils/randome";

export default function useBonusGenerator(config){
    const getCoordinates = useRandomCoordinates(config.current.gameSize);

    const generate = useCallback((exclude = new Set())=>{
        let coordinates = getCoordinates(exclude);
        return new [RedApple, GreenApple, GoldApple][random(0,2)](coordinates, config.current);
    }, [getCoordinates, config]);

    return [generate]
}