import React, {useCallback} from "react";

export default function useTerminalOrientation(config){
    return useCallback((current, relative)=>{
        const size = config.current.gameSize;
        if(current.x === relative.x){
            if((current.y + 1) % size === relative.y){
                return "up";
            } else {
                return "down"
            }
        } else if(current.y === relative.y){
            if((current.x + 1) % size === relative.x){
                return "left"
            } else {
                return "right";
            }
        }
        return null;
    }, [config])
}