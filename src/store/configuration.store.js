import React from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {makeAutoObservable, runInAction} from 'mobx';

export class ConfigurationStore {
    _config = {
        themeName: "blue",
        difficulty: "beginner",
        drawBackground: false,
        wallThrough : true,

        gameSize : 25,

        levelSpeedRatio : 0.98,
        startSteepInterval : 1200,

        turtleProbability : 1/200,
        turtleExpiryLimitRange : [5000, 20000],
        turtleLimit : 2,

        lives : 3,
        heartProbability : 1/200,
        heartExpiryLimitRange : [5000, 10000],
        heartLimit : 2,

        diamondProbability : 1/25,
        diamondLimit : 3,
        diamondExpiryLimitRange : [10000, 50000],

        bombProbability: 1/100,
        bombLimit: 1,
        bombExpiryLimitRange: [5000, 10000],

        swordProbability: 1/750,
        swordLimit: 2,
        swordExpiryLimitRange: [2000, 10000],
        swordCutRange: [30, 60], // catting about 30 to 50 %
    }

    _state = {storeLoadingState: "loading"}

    constructor() {
        makeAutoObservable(this);
        AsyncStorage.clear();
        this._restoreFromStore().catch((error) => {
            console.warn("During restore value from local storage occur problem", error.message);
        })
    }

    _restoreFromStore = async() =>{
        const nextStore = {}
        for(let key in this._config){
            if(!this._config.hasOwnProperty(key)) continue;
            let item = JSON.parse(await AsyncStorage.getItem(key));
            if(!item) continue;
            let value;
            switch (item.type){
                case "number": {
                    value = parseFloat(item.value);
                    break;
                }
                case "boolean": {
                    value = item.value === "true";
                    break;
                }
                case "object" : {
                    value = JSON.parse(item.value);
                    break;
                }
                default : {
                    value = item.value
                }
            }
            nextStore[key] = value
        }

        runInAction( () => {
            this._config = Object.assign(this._config, nextStore);
            this._state = {storeLoadingState: "loaded"}
        })
    }

    _storeData = async(data) => {
        for(let key in data){
            if(data.hasOwnProperty(key))
            await AsyncStorage.setItem(key, JSON.stringify({
                type: typeof data[key],
                value: typeof data[key] === "object" ? JSON.stringify(data[key]) : data[key].toString()
            }))
        }
    }

    update(data){
        for(let key in data){
            if(data.hasOwnProperty(key))
            this._config[key] = data[key]
        }
        this._storeData(data).catch(error => {
            console.warn("Unable to store config data in local storage", error.message)
        })
    }

    get current(){
        return this._config;
    }

    get state(){
        return this._state.storeLoadingState;
    }
}

// const ConfigurationContext = React.createContext(null);
//
// export const ConfigurationProvider = ({children}) => {
//     return (
//         <ConfigurationContext.Provider value={new ConfigurationStore()}>
//              {children}
//         </ConfigurationContext.Provider>
//     )
// }
//
// export const useConfigurationStore = () => React.useContext(ConfigurationContext);


