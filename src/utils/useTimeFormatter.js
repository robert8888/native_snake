import React, {useCallback} from "react";

export default function useTimeFormatter(){
    const secondsToStr = useCallback((seconds) => {
        const date =  new Date(seconds);
        const options = {
            // hour12: false,
            timeStyle: 'short',
            hour: '2-digit',
            minute:'2-digit',
            seconds: '2-digit'
        }
        return date.toLocaleTimeString([], options).substr(3)
    }, [])

    return {
        secondsToStr
    }
}