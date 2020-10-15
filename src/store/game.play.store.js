import React from "react";
import {makeAutoObservable} from 'mobx';

export class GamePlayStateStore {
    score = 1;
    level = 0;
    speed = 0;
    gameOver = false;
    pause = false;

    constructor() {
        makeAutoObservable(this)
    }

    update(data){
        for(let key in data){
            if(!this.hasOwnProperty(key)) continue;
            this[key] = data[key];
        }
    }
}

// const PlayStateCtx = React.createContext(null);
//
// export const GamePlayProvider = ({children}) => {
//     return (
//         <PlayStateCtx.Provider value={new PlayStateStore()}>
//             {children}
//         </PlayStateCtx.Provider>
//     )
// }
//
// export const useGamePlayStore = () => React.useContext(PlayStateCtx);
