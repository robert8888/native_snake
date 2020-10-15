import React from "react";
import {makeAutoObservable} from 'mobx';

export class GameViewStore {
    data = null;

    constructor() {
        makeAutoObservable(this);
    }

    update(data){
        this.data = data;
    }
}

// const GameViewContext = React.createContext(null);
//
// export const GameViewProvider = ({children}) => {
//     return (
//         <GameViewContext.Provider  value={new GameViewStore()}>
//             {children}
//         </GameViewContext.Provider>
//     )
// }
//
// export const useGameView = () => React.useContext(GameViewContext);
