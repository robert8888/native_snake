import {useCallback} from "react";
import randomGenerator from "../utils/randome";
import Coordinates from "./model/Coordinates";

export default function useRandomCoordinates(size){
    const random =  useCallback(() => randomGenerator(0, size - 1),[size])

    return useCallback((exclude)=>{
        let coordinates = new Coordinates(random(), random())
        while(exclude.has(coordinates.toString())){
            coordinates = new Coordinates(random(), random())
        }
        return coordinates
    },[random])
}