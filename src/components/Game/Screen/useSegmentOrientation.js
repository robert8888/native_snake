import React, {useCallback} from "react";

export default function useSegmentOrientation(config){
    return useCallback((prev, current, next) => {
        const size = config.current.gameSize;
        if(prev.x === next.x){
            return "vertical"
        } else if(prev.y === next.y){
            return "horizontal";
        } else if(
            (prev.x === (next.x + 1) % size && (prev.y + 1) % size === next.y && current.y === prev.y) ||
            ((prev.x + 1) % size === next.x && prev.y === (next.y + 1) % size && current.x === prev.x)){
            return "leftUp"
        } else if((prev.x === (next.x + 1) % size && prev.y === (next.y + 1) % size && current.y === next.y) ||
            ((prev.x + 1) % size === next.x && (prev.y + 1) % size === next.y && current.x === next.x)){
            return "rightUp"
        } else if(((prev.x + 1) % size === next.x && (prev.y + 1) % size === next.y && current.x === prev.x) ||
            (prev.x === (next.x + 1) % size && prev.y === (next.y + 1) % size && current.y === prev.y)){
            return "leftDown"
        } else if(((prev.x + 1) % size === next.x && prev.y === (next.y + 1) % size && current.x === next.x) ||
            (prev.x === (next.x + 1) % size && (prev.y + 1) % size === next.y && current.y === next.y)){
            return "rightDown"
        }
        return null;
    }, [config])
}