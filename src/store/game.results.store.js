import {makeAutoObservable} from "mobx";
import React, {useContext} from "react";

export class GameResultsStore {
    results;
    last;
    constructor() {
        makeAutoObservable(this);
    }

    _restoreFromStore(){

    }

    pushResult(result){
        //console.log("push results", result)
        this.results = result;
        this.last = result;
    }

    get best(){

    }
}

// const GameResultsContext = React.createContext(null);
//
// export const GamerResultsProvider = ({children, ...props}) => (
//     <GameResultsContext.Provider value={new GameResultsStore()}>
//         {children}
//     </GameResultsContext.Provider>
// )
//
// export default () => useContext(GameResultsContext);
