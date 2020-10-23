import React, {useCallback} from "react";

export default function useTerminalOrientation(config){
    return useCallback((current, relative)=>{
        const size = config.current.gameSize;
        if(current.x === relative.x){
            if((current.y + 1) % size === relative.y){
                return "Up";
            } else {
                return "Down"
            }
        } else if(current.y === relative.y){
            if((current.x + 1) % size === relative.x){
                return "Left"
            } else {
                return "Right";
            }
        }
        return null;
    }, [config])
}